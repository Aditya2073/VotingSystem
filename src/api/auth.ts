
import User from '@/models/User';
import connectToDatabase from '@/lib/mongodb';

// Login user
export const loginUser = async (email: string, password: string) => {
  await connectToDatabase();
  
  // Find user by email
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  
  // Create safe user object (without password)
  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    voterId: user.voterId,
    isAdmin: user.isAdmin,
    hasVoted: user.hasVoted
  };
  
  return safeUser;
};

// Register user
export const registerUser = async (name: string, email: string, voterId: string, password: string) => {
  await connectToDatabase();
  
  // Check if user with email or voterId already exists
  const existingUser = await User.findOne({ $or: [{ email }, { voterId }] });
  
  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error('Email already in use');
    }
    if (existingUser.voterId === voterId) {
      throw new Error('Voter ID already registered');
    }
  }
  
  // Create new user
  const user = await User.create({
    name,
    email,
    voterId,
    password,
    isAdmin: false,
    hasVoted: false
  });
  
  // Create safe user object (without password)
  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    voterId: user.voterId,
    isAdmin: user.isAdmin,
    hasVoted: user.hasVoted
  };
  
  return safeUser;
};
