const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const app = express();
const dbPath = path.join(__dirname, "goodreads.db");
const sqlite3 = require("sqlite3");
let db = null;

const intilizeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at http://localhost3000");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};

intilizeDBAndServer();

app.get("/books/", async (Request, Response) => {
  const getBooksQuery = `
    SELECT 
    *
    FROM
    ORDER BY
    book_id
    `;
  const booksArray = await db.all(getBooksQuery);
  Response.send(booksArray);
});
