module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })

}

const sendErrorDev = (err,res)=> {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    })
  };
  
  const sendErrorProd = (err,res) => {
    if(err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    }
    else{
      // console.error('Error 💥',err);
  
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      })
    }
  }
  
  
  module.exports = (error, req, res, next) => {   // When there is 4 parameters express will understand that it is a error handling middleware
      // console.log(err.stack);
      
      error.statusCode = error.statusCode || 500; //500-> Internal Server Error
      error.status = error.status || 'error'
      if(process.env.NODE_ENV === 'development') {
        sendErrorDev(error,res)
      }
      else if(process.env.NODE_ENV === 'production') {
        sendErrorProd(error,res);
      }
      
}