import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'capstone-super-secret-key-2026';

// In-memory store fallback if MongoDB is not connected
const inMemoryUsers = new Map();

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function register(req, res) {
  try {
    const { name, email, username, password, role = 'student', institutionName = '', organizationName = '', department = '' } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      // Check if user already exists in MongoDB
      const existingUser = await User.findOne({
        $or: [{ email: cleanEmail }, { username: cleanUsername }]
      });

      if (existingUser) {
        const field = existingUser.email === cleanEmail ? 'Email' : 'Username';
        return res.status(400).json({ success: false, message: `${field} is already registered.` });
      }

      const newUser = new User({
        name: name.trim(),
        email: cleanEmail,
        username: cleanUsername,
        password,
        role,
        institutionName: institutionName.trim(),
        organizationName: organizationName.trim(),
        department: department.trim(),
        avatarSeed: cleanUsername
      });

      await newUser.save();

      const token = generateToken({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        token,
        user: newUser
      });
    } else {
      // Fallback in-memory
      for (const [, existing] of inMemoryUsers) {
        if (existing.email === cleanEmail || existing.username === cleanUsername) {
          const field = existing.email === cleanEmail ? 'Email' : 'Username';
          return res.status(400).json({ success: false, message: `${field} is already registered.` });
        }
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const memUser = {
        _id: 'usr_' + Date.now(),
        name: name.trim(),
        email: cleanEmail,
        username: cleanUsername,
        password: hashedPassword,
        role,
        institutionName: institutionName.trim(),
        organizationName: organizationName.trim(),
        department: department.trim(),
        avatarSeed: cleanUsername,
        createdAt: new Date().toISOString()
      };

      inMemoryUsers.set(memUser._id, memUser);

      const safeUser = { ...memUser };
      delete safeUser.password;

      const token = generateToken({
        id: memUser._id,
        name: memUser.name,
        email: memUser.email,
        username: memUser.username,
        role: memUser.role
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        token,
        user: safeUser
      });
    }
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ success: false, message: 'Server error during registration: ' + err.message });
  }
}

export async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both username/email and password.' });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const user = await User.findOne({
        $or: [{ email: cleanIdentifier }, { username: cleanIdentifier }]
      });

      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials. User not found.' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials. Incorrect password.' });
      }

      const token = generateToken({
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role
      });

      return res.status(200).json({
        success: true,
        message: 'Logged in successfully!',
        token,
        user
      });
    } else {
      // In-memory lookup
      let foundUser = null;
      for (const [, user] of inMemoryUsers) {
        if (user.email === cleanIdentifier || user.username === cleanIdentifier) {
          foundUser = user;
          break;
        }
      }

      // Default demo account in memory if empty
      if (!foundUser && (cleanIdentifier === 'aryan' || cleanIdentifier === 'aryan@skillsync.edu')) {
        const isDefaultMatch = password === 'password123';
        if (isDefaultMatch) {
          foundUser = {
            _id: 'usr_default_aryan',
            name: 'Aryan Prasher',
            email: 'aryan@skillsync.edu',
            username: 'aryan',
            role: 'student',
            institutionName: 'Campus Technology Institute',
            avatarSeed: 'aryan'
          };
        }
      }

      if (!foundUser) {
        return res.status(400).json({ success: false, message: 'Invalid credentials.' });
      }

      if (foundUser.password) {
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid credentials.' });
        }
      }

      const safeUser = { ...foundUser };
      delete safeUser.password;

      const token = generateToken({
        id: safeUser._id,
        name: safeUser.name,
        email: safeUser.email,
        username: safeUser.username,
        role: safeUser.role
      });

      return res.status(200).json({
        success: true,
        message: 'Logged in successfully!',
        token,
        user: safeUser
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error during login: ' + err.message });
  }
}

export async function getMe(req, res) {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch user session: ' + err.message });
  }
}
