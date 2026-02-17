"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/user');
const userRepository = {
    create: async (data) => {
        return await User.create(data);
    },
    findByEmail: async (email) => {
        return await User.findOne({ email });
    },
    findById: async (id) => {
        return await User.findById(id);
    },
    findAll: async () => {
        return await User.find().select('-password -__v');
    },
    updateById: async (id, updateData) => {
        const user = await User.findById(id);
        if (!user)
            return null;
        Object.assign(user, updateData);
        return await user.save();
    },
    deleteById: async (id) => {
        const user = await User.findById(id);
        if (!user)
            return null;
        await user.deleteOne();
        return user;
    }
};
exports.default = userRepository;
