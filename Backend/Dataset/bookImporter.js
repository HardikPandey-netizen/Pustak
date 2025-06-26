const Book = require("./../models/bookModel");
const Library = require("./../models/libraryModel");
const fs = require("fs");
const libraries = JSON.parse(
  fs.readFileSync(`${__dirname}/libraries.json`, "utf-8")
);
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { findOne } = require("../models/reviewModel");
const bookStore = JSON.parse(
  fs.readFileSync(`${__dirname}/bookStore.json`, "utf-8")
);

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB Connection Successful!");
});

const addBookNames = async () => {
  const usedBooks = {};

  // 1️⃣ Insert Books and collect ObjectIds
  for (const lib of libraries) {
    const libraryDoc = await Library.findOne({ name: lib.name });
    if (!libraryDoc) {
      continue;
    }
    const bookIDs = [];
    for (const bookName of lib.books) {
      if (usedBooks[bookName]) {
        bookIDs.push(usedBooks[bookName].toString());
        continue;
      } // Already processed

      // Check if book already exists (optional, based on your setup)
      let book = await Book.findOne({ name: bookName });
      if (!book) {
        book = await Book.create({
          name: bookName,
          availibility: [libraryDoc._id],
        });
        console.log(`📚 Added book: ${bookName}`);
      } else {
        console.log(`📖 Book already exists: ${bookName}`);
        if (!book.availibility.includes(libraryDoc._id)) {
          book.availibility.push(libraryDoc._id);
          await book.save();
        }
      }

      usedBooks[bookName] = book._id;
      bookIDs.push(usedBooks[bookName].toString());
    }
    await Library.findByIdAndUpdate(
      libraryDoc._id,
      { books: bookIDs },
      { new: true }
    );
  }

  fs.writeFileSync(
    `${__dirname}/libraries_DB.json`,
    JSON.stringify(libraries, null, 2),
    "utf-8"
  );
};

const addBookStores = async () => {
  const usedBooks = {};

  for (const store of bookStore) {
    let lib = await Library.findOne({ name: store.name });

    if (!lib) {
      // ✅ Create Library instance manually and bypass validation
      lib = new Library({
        name: store.name,
        address: store.address,
        books: [],
      });

      await lib.save({ validateBeforeSave: false });
    }

    const bookIDs = [];

    for (const bookName of store.books) {
      let book;

      // Use cached book ID if available
      if (usedBooks[bookName]) {
        book = await Book.findById(usedBooks[bookName]);
      } else {
        book = await Book.findOne({ name: bookName });
        if (!book) {
          continue;
        }
        usedBooks[bookName] = book._id;
      }

      if (!book.availibility.includes(lib._id)) {
        book.availibility.push(lib._id);
        await book.save();
      }

      bookIDs.push(book._id);
    }

    // Update the library with the resolved book ObjectIds
    await Library.findByIdAndUpdate(
      lib._id,
      { books: bookIDs },
      { new: true, runValidators: false }
    );
  }

  console.log("✅ Bookstores added and linked with books");
};


const checkBooks = async () => {
  const missing = [];

  for (const store of bookStore) {
    for (const bookName of store.books) {
      const exists = await Book.exists({ name: bookName });
      if (!exists) {
        missing.push(bookName);
      }
    }
  }

  if (missing.length === 0) {
    console.log("✅ All books from the bookstore exist in the Book DB.");
  } else {
    console.log("❌ These books are missing in the Book DB:");
    console.log(missing);
  }
};

if (process.argv[2] === "--addBooks") {
  (async () => {
    try {
      await addBookNames();
      console.log("booksAdded");
    } catch (err) {
      console.log(err);
    }
  })();
} else if (process.argv[2] === "--addMode") {
  updateLibraries();
} else if (process.argv[2] === "--addBookstore") {
  addBookStores();
}
