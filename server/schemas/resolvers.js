const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args) => {
      const userData = await User.findOne({ _id: User._id }).select('-__v -password');
      return userData;
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      return user;
    },
    saveBook: async (parent, { theBook }) => {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: User._id },
        { $push: { savedBooks: theBook }},
        { new: true }
      );
      return updatedUser;
    },
    saveBook: async (parent, { bookId }) => {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: User._id },
        { $pull: { savedBooks: { bookId }}},
        { new: true }
      );
      return updatedUser;
    }

  }
};

module.exports = resolvers;