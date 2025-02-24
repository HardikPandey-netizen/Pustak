const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const app = require('./app');
dotenv.config({ path: "./config.env"});
const DB = process.env.DATABASE.replace(
    "<db_password>",
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con)=>{
    console.log("DB Connection sucessfull")
})

const port = process.env.PORT || 4444;
const server = app.listen(port,()=>{
    console.log(`App running on Port ${port}`);
})
