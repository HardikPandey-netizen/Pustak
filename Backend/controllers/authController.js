const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.EXPIRES_IN,
    });
}

exports.signup = catchAsync(async (req,res,next)=>{
    const {name,email,password,passwordConfirm} = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm
    }); 

    const token = signToken(newUser._id);

    res.status(201).json({
        status: "sucess",
        token,
        data: {
            user: newUser
        }
    })
});

exports.login = catchAsync(async(req,res,next) => {
    const { email,password } = req.body;
    if(!email || !password){
        return next(new AppError('Please provide email or password!', 400));
    }
    const user = await User.findOne({ email }).select('+password');

    const correct = await user.correctPassword(password,user.password);
    if(!user || !correct){
        return next(new AppError('incorrect email or password',401));
    }
    const token = signToken(user._id);
    res.status(200).json({
        status: "sucess",
        token
    });
});  

exports.protect = catchAsync((req,res,next)=>{
    next();
    
})