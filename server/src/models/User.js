import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
    },
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
      type: String,
      enum: ['student', 'institution_tpo', 'industry_recruiter', 'admin'],
      default: 'student'
    },
    institutionName: {
      type: String,
      trim: true,
      default: ''
    },
    organizationName: {
      type: String,
      trim: true,
      default: ''
    },
    department: {
      type: String,
      trim: true,
      default: ''
    },
    avatarSeed: {
      type: String,
      default: ''
    },
    degree: {
      type: String,
      trim: true,
      default: 'B.Tech Computer Science & Engineering'
    },
    cgpa: {
      type: Number,
      default: 8.4,
      min: 0,
      max: 10
    },
    graduationYear: {
      type: Number,
      default: 2026
    },
    studentId: {
      type: String,
      trim: true,
      default: ''
    },
    bio: {
      type: String,
      trim: true,
      default: ''
    },
    githubUrl: {
      type: String,
      trim: true,
      default: ''
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: ''
    },
    portfolioUrl: {
      type: String,
      trim: true,
      default: ''
    },
    targetRole: {
      type: String,
      trim: true,
      default: 'fullstack_mern'
    },
    skills: [
      {
        name: { type: String, trim: true },
        proficiency: {
          type: String,
          enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
          default: 'Intermediate'
        },
        category: { type: String, default: 'Technical' }
      }
    ],
    projects: [
      {
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        techStack: [{ type: String, trim: true }],
        githubUrl: { type: String, trim: true },
        liveUrl: { type: String, trim: true }
      }
    ],
    certifications: [
      {
        name: { type: String, trim: true },
        issuer: { type: String, trim: true },
        issueYear: { type: String, trim: true },
        credentialUrl: { type: String, trim: true }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Filter out password when converting to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);
export default User;
