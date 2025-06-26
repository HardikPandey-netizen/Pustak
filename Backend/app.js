const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./routes/bookRoutes');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const libraryRouter = require('./routes/libraryRoutes');
const cors = require('cors');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/v1/books',bookRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/libraries',libraryRouter);

app.all('*',(req,res,next)=>{
    next(new AppError(`cannot find ${req.originalUrl} on this server.`,404))
})

app.use(globalErrorHandler);

module.exports = app; 