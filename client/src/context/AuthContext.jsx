import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    name: 'Aryan Prasher',
    email: 'aryan@skillsync.edu',
    username: 'aryan',
    password: 'password123',
    role: 'student',
    institutionName: 'Apex Institute of Technology',
    department: 'Computer Science & Engineering',
    avatarSeed: 'aryan',
    joinedAt: new Date().toISOString()
  }
];

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('skillsync_auth_token') || null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('skillsync_auth_users');
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('skillsync_auth_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('skillsync_auth_users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to persist users to localStorage', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('skillsync_auth_session', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('skillsync_auth_session');
      }
    } catch (e) {
      console.error('Failed to persist session to localStorage', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem('skillsync_auth_token', token);
      } else {
        localStorage.removeItem('skillsync_auth_token');
      }
    } catch (e) {
      console.error('Failed to persist token to localStorage', e);
    }
  }, [token]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  const login = async (identifier, password) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanId || !cleanPass) {
      showToast('Please enter both username/email and password.', 'error');
      return { success: false, message: 'Please enter both username/email and password.' };
    }

    // Try backend API first
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: cleanId, password: cleanPass })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const sessionUser = {
          id: data.user._id || data.user.id,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          role: data.user.role || 'student',
          institutionName: data.user.institutionName || '',
          organizationName: data.user.organizationName || '',
          department: data.user.department || '',
          avatarSeed: data.user.avatarSeed || data.user.username,
          loginTime: new Date().toISOString()
        };

        setToken(data.token);
        setCurrentUser(sessionUser);
        showToast(`Welcome back, ${sessionUser.name}!`, 'success');
        return { success: true, user: sessionUser };
      } else if (response.status === 400 || response.status === 401) {
        showToast(data.message || 'Invalid credentials', 'error');
        return { success: false, message: data.message || 'Invalid credentials' };
      }
    } catch (apiErr) {
      console.warn('API unavailable, falling back to local session store:', apiErr.message);
    }

    // Client local store fallback
    const localUser = users.find(
      (u) =>
        (u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId) &&
        u.password === cleanPass
    );

    if (!localUser) {
      showToast('Invalid username or password', 'error');
      return { success: false, message: 'Invalid username/email or password.' };
    }

    const sessionUser = {
      name: localUser.name,
      email: localUser.email,
      username: localUser.username,
      role: localUser.role || 'student',
      institutionName: localUser.institutionName || '',
      organizationName: localUser.organizationName || '',
      department: localUser.department || '',
      avatarSeed: localUser.avatarSeed || localUser.username,
      loginTime: new Date().toISOString()
    };

    setToken('local_token_' + Date.now());
    setCurrentUser(sessionUser);
    showToast(`Welcome back, ${sessionUser.name}!`, 'success');
    return { success: true, user: sessionUser };
  };

  const register = async ({
    name,
    email,
    username,
    password,
    role = 'student',
    institutionName = '',
    organizationName = '',
    department = ''
  }) => {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanUsername = (username || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanName || !cleanEmail || !cleanUsername || !cleanPassword) {
      showToast('Please fill in all required fields', 'error');
      return { success: false, message: 'All required fields must be filled.' };
    }

    if (cleanPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    // Try backend API first
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          username: cleanUsername,
          password: cleanPassword,
          role,
          institutionName,
          organizationName,
          department
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const sessionUser = {
          id: data.user._id || data.user.id,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          role: data.user.role || role,
          institutionName: data.user.institutionName || institutionName,
          organizationName: data.user.organizationName || organizationName,
          department: data.user.department || department,
          avatarSeed: data.user.avatarSeed || cleanUsername,
          loginTime: new Date().toISOString()
        };

        setToken(data.token);
        setCurrentUser(sessionUser);
        setUsers((prev) => [...prev, { ...sessionUser, password: cleanPassword }]);
        showToast(`Account registered! Welcome to SkillSync, ${sessionUser.name}!`, 'success');
        return { success: true, user: sessionUser };
      } else if (response.status === 400) {
        showToast(data.message || 'Registration failed', 'error');
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (apiErr) {
      console.warn('API unavailable, registering locally:', apiErr.message);
    }

    // Client local store fallback
    const existing = users.find(
      (u) => u.username.toLowerCase() === cleanUsername || u.email.toLowerCase() === cleanEmail
    );

    if (existing) {
      const field = existing.username.toLowerCase() === cleanUsername ? 'Username' : 'Email';
      showToast(`${field} is already in use`, 'error');
      return { success: false, message: `${field} is already taken.` };
    }

    const newUser = {
      name: cleanName,
      email: cleanEmail,
      username: cleanUsername,
      password: cleanPassword,
      role,
      institutionName: (institutionName || '').trim(),
      organizationName: (organizationName || '').trim(),
      department: (department || '').trim(),
      joinedAt: new Date().toISOString(),
      avatarSeed: cleanUsername
    };

    setUsers((prev) => [...prev, newUser]);

    const sessionUser = {
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
      institutionName: newUser.institutionName,
      organizationName: newUser.organizationName,
      department: newUser.department,
      avatarSeed: newUser.avatarSeed,
      loginTime: new Date().toISOString()
    };

    setToken('local_token_' + Date.now());
    setCurrentUser(sessionUser);
    showToast(`Account created! Welcome, ${newUser.name}!`, 'success');
    return { success: true, user: sessionUser };
  };

  const logout = () => {
    const prevName = currentUser?.name || 'User';
    setToken(null);
    setCurrentUser(null);
    showToast(`Signed out successfully. See you soon, ${prevName}!`, 'info');
  };

  const dismissToast = () => setToast(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        toast,
        showToast,
        dismissToast,
        registeredCount: users.length
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
