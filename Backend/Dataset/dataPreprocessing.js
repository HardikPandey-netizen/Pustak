const fs = require("fs");
const Book = require("./../models/bookModel");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB Connection Successful!");
});

const libraries = JSON.parse(
  fs.readFileSync(`${__dirname}/libraries.json`, "utf-8")
);
const x = async () => {
  await Book.find({
    $or: [
      { retailPrice: null },
      { cover_image: null },
      { author: { $eq: [] } }, // or use null if your default is null
      { description: "" },
      { published_year: null },
    ],
  });
};

const y = async () => {
  try {
    const booksWithMissingData = await Book.find({
      $or: [
        { retailPrice: null },
        { listPrice: null}
      ],
    });

    const minimalFailedData = booksWithMissingData.map((book) => {
      const missing = { title: book.name };

      if (book.retailPrice === null) missing.retailPrice = null;
      if (book.retailPrice === null) missing.listPrice = null;

      return missing;
    });

    fs.writeFileSync(
      "failed_books.json",
      JSON.stringify(minimalFailedData, null, 2)
    );

    console.log(minimalFailedData.length);
    console.log("Done");
  } catch (err) {
    console.log("Error:", err.message);
  }
};

y();
