const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./routes/bookRoutes');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');


app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/books',bookRouter);

app.all('*',(req,res,next)=>{
    next(new AppError(`cannot find ${req.originalUrl} on this server.`,404))
})

app.use(globalErrorHandler);

module.exports = app; 