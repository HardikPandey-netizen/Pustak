const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./routes/bookRoutes');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/books',bookRouter);
app.use('api/v1/users',userRouter);

app.all('*',(req,res,next)=>{
    next(new AppError(`cannot find ${req.originalUrl} on this server.`,404))
})

app.use(globalErrorHandler);

module.exports = app; 