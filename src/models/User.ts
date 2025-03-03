
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the TypeScript interface for User
export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  voterId: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  createdAt: Date;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// Create the schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxLength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  voterId: {
    type: String,
    required: [true, 'Please provide voter ID'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if model exists before creating it to prevent errors when Hot Module Reloading
// This is the fix for the "Cannot read properties of undefined (reading 'User')" error
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
