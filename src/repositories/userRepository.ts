const User = require('../models/user');
import{ RegisterUserDTO, LoginUserDTO, UpdateUserDTO } from "../types/express";

const userRepository = {
    create: async(data: RegisterUserDTO) =>{
        return await User.create(data);
    },

    findByEmail: async(email: string) => {
        return await User.findOne({ email });
    },

    findById: async(id: string) => {
        return await User.findById(id);
    },

    findAll: async() =>{
        return await User.find().select('-password -__v');
    },

    updateById: async (id: string, updateData: UpdateUserDTO) =>{
        const user = await User.findById(id);
        if(!user) return null;
        Object.assign(user, updateData);
        return await user.save();
    },

    deleteById: async (id: string)=>{
        const user = await User.findById(id);
        if(!user) return null;
        await user.deleteOne();
        return user;
    }

};

export default userRepository;