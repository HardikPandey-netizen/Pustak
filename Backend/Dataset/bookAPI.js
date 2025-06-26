const mongoose = require("mongoose");
const axios = require("axios");
const Book = require("../models/bookModel");
const dotenv = require("dotenv");
const fs = require("fs");

const failedBooks = JSON.parse(
  fs.readFileSync("failed_books.json", "utf-8")
);

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB Connection Successful!");
});

const apiHandler = async () => {
  const books = await Book.find();
  const failedBooks = [];
  for (const book of books) {
    try {
      const title = book.name;
      const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
        title
      )}`;
      const response = await axios.get(url);

      const item = response.data.items?.[0];
      if (!item) {
        console.log(`No data available for ${title}`);
        continue;
      }

      const info = item.volumeInfo;
      const sale = item.saleInfo;
      const access = item.accessInfo;

      await Book.findOneAndUpdate(
        { name: title },
        {
          author: info.authors || [],
          genre: info.categories || [],
          published_year: info.publishedDate?.split("-")[0] || null,
          cover_image: info.imageLinks?.thumbnail || null,
          description: info.description || "",
          pdfAvailable: access.pdf?.isAvailable ?? false,
          audioBookAvailable: access.textToSpeechPermission === "ALLOWED",
          retailPrice: sale.retailPrice?.amount ?? null,
          listPrice: sale.listPrice?.amount ?? null,
          buyLink: sale.buyLink ?? null,
          pdfReader: access.webReaderLink ?? null,
        }
      );
      console.log(`${title} Done`);
    } catch (err) {
      console.log(`${err.message} for ${book.name}`);
      failedBooks.push(book.name);
    }
  }
  if (failedBooks.length > 0) {
      fs.writeFileSync(
        "failed_books.json",
        JSON.stringify(failedBooks, null, 2)
      );
    }
};

const updateRetailPrices = async () => {
  for (const book of failedBooks) {
    try {
      const title = book.title;
      const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
        title
      )}`;
      const response = await axios.get(url);

      const items = response.data.items;

      if (!items || items.length === 0) {
        console.log(`No items found for ${title}`);
        continue;
      }

      let updated = false;

      for (const item of items) {
        const sale = item.saleInfo;
        const retailPrice = sale?.retailPrice?.amount;
        const listPrice = sale?.listPrice?.amount;

        if (retailPrice !== undefined) {
          await Book.findOneAndUpdate(
            { name: title },
            { retailPrice }
          );
          console.log(`Updated retailPrice for "${title}" with amount ${retailPrice}`);
          updated = true;
          break;
        }
      }

      if (!updated) {
        console.log(`No valid retailPrice found for "${title}"`);
      }

    } catch (err) {
      console.error(`Error updating ${book.title}:`, err.message);
    }
  }

  console.log("Finished updating retail prices.");
};

const updateListPrices = async () => {
  for (const book of failedBooks) {
    try {
      const title = book.title;
      const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
        title
      )}`;
      const response = await axios.get(url);

      const items = response.data.items;

      if (!items || items.length === 0) {
        console.log(`No items found for ${title}`);
        continue;
      }

      let updated = false;

      for (const item of items) {
        const sale = item.saleInfo;
        const listPrice = sale?.listPrice?.amount;

        if (listPrice !== undefined) {
          await Book.findOneAndUpdate(
            { name: title },
            { listPrice }
          );
          console.log(`Updated listPrice for "${title}" with amount ${listPrice}`);
          updated = true;
          break;
        }
      }

      if (!updated) {
        console.log(`No valid listPrice found for "${title}"`);
      }

    } catch (err) {
      console.error(`Error updating ${book.title}:`, err.message);
    }
  }

  console.log("Finished updating list prices.");
};

if (process.argv[2] === "--addDetails") {
  apiHandler();
} else if(process.argv[2]==="--removeNull"){
    updateRetailPrices();
} else if(process.argv[2] === "--listPrice"){
    updateListPrices();
}
