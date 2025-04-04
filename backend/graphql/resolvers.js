import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const SECRET = 'COMP3133';

export const resolvers = {
  Mutation: {
    signup: async (_, { email, firstName, lastName, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, firstName, lastName, password: hashedPassword });

      const token = jwt.sign({ userId: user._id }, SECRET);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign({ userId: user._id }, SECRET);
      return { token, user };
    }
  }
};
