const fs = require('fs');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Book = require('./../models/bookModel');
const Library = require('./../models/libraryModel');
const User = require('./../models/userModel');

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection Successful!");
  });



const users = JSON.parse(fs.readFileSync(`${__dirname}/owners.json`, 'utf-8'));
const books = JSON.parse(fs.readFileSync(`${__dirname}/books.json`, 'utf-8'));
const libraries = JSON.parse(fs.readFileSync(`${__dirname}/libraries.json`, 'utf-8'));
const libraries_DB = JSON.parse(fs.readFileSync(`${__dirname}/libraries_DB.json`, 'utf-8'));


const importData = async () => {
  try {
    await Book.create(books);
    await Library.create(libraries);
    await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Book.deleteMany();
    await User.deleteMany();
    await Library.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const deleteDataL = async () => {
  try{
    await Library.deleteMany();
    console.log('Data Library deleted')
  }
  catch(err){
    console.log(err);
  }
}

const importDataL = async () => {
  try{
    await Library.create(libraries, {validateBeforeSave: false});
    console.log('Data Library import')
  }
  catch(err){
    console.log(err);
  }
}

const deleteDataB = async () => {
  try{
    await Book.deleteMany();
    console.log("Data deleted book");
  }
  catch(err){
    console.log(err);
  }
}

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--deleteL') {
  deleteDataL();
} else if (process.argv[2] === '--importL') {
  importDataL();
} else if (process.argv[2] === '--deleteB') {
  deleteDataB();
} 
