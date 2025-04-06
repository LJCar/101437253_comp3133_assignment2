import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Employee from '../models/Employee.js';

const SECRET = 'COMP3133';

export const resolvers = {

  Query: {
    employees: async () => {
      return await Employee.find();
    },
    employee: async (_, { id }) => {
      const emp = await Employee.findById(id);
      return {
        ...emp._doc,
        date_of_joining: emp.date_of_joining instanceof Date
          ? emp.date_of_joining.toISOString().split('T')[0]
          : ''
      };
    }
  },

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
    },

    addEmployee: async (
      _,
      {
        first_name,
        last_name,
        email,
        gender,
        job_title,
        salary,
        date_of_joining,
        department,
        employee_photo
      }
    ) => {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        throw new Error('Email already exists');
      }

      return await Employee.create({
        first_name,
        last_name,
        email,
        gender,
        job_title,
        salary,
        date_of_joining,
        department,
        employee_photo
      });
    },

    deleteEmployee: async (_, { id }) => {
      try {
        await Employee.findByIdAndDelete(id);
        return "Employee deleted successfully";
      } catch (err) {
        throw new Error(`Error deleting employee: ${err.message}`);
      }
    },

    updateEmployee: async (_, args) => {
      try {
        const existingEmployee = await Employee.findOne({ email: args.email });
        if (existingEmployee && existingEmployee._id.toString() !== args.id) {
          throw new Error('Email already exists');
        }

        const updated = await Employee.findByIdAndUpdate(
          args.id,
          {
            $set: {
              first_name: args.first_name,
              last_name: args.last_name,
              email: args.email,
              gender: args.gender,
              job_title: args.job_title,
              salary: args.salary,
              date_of_joining: args.date_of_joining,
              department: args.department,
              employee_photo: args.employee_photo,
              updated_at: new Date()
            }
          },
          { new: true }
        );

        if (!updated) throw new Error('Employee not found');

        return updated;
      } catch (err) {
        throw new Error(`Update failed: ${err.message}`);
      }
    }
  }
};
