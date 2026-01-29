const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository=require('../repositories/userRepository');
const AppError = require('../utils/appError');

const userService = {
    register: async ({ name, email, password, role}) =>{
        if(!name || !email || !password || !role) {
            throw new AppError('Faltan datos obligatorios', 400);
        }
    
        const exist = await userRepository.findByEmail(email);
        if(exist) throw new AppError('Email ya registrado', 400);

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await userRepository.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        const token = jwt.sign(
            {id:newUser._id, email: newUser.email, role:newUser.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        return {newUser, token};
    },

    login: async ({email, password}) =>{
        if(!email || !password) throw new AppError('Faltan datos obligatorios',400);

        const user = await userRepository.findByEmail(email);
        if(!user) throw new AppError('Usuario no encontrado', 404);

        const passwordMatch = await bcrypt.compareSync(password, user.password);
        if(!passwordMatch) throw new AppError('Contraseña incorrecta', 401);
        
        const token =jwt.sign(
            {id:user._id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        return {user, token};
    },

    getAllUsers: async () =>{
        return await userRepository.findAll();
    },

    getUserById: async (id) =>{
        const user = await userRepository.findById(id);
        if(!user) throw new AppError('Usuario no encontrado', 404);
        return user;
    },

    updateUser: async (id, updateUser) =>{
        const user = await userRepository.updateById(id, updateUser);
        if(!user) throw new AppError('Usuario no encontrado', 404);
        return user;
    },

    deleteUser: async (id) =>{
        const user = await userRepository.deleteById(id);
        if(!user) throw new AppError('Usuario no encontrado', 404);
        return user;
    }
}

module.exports = userService;