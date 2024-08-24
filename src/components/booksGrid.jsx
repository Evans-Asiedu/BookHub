import React from "react";
import Card from "./common/card";

const BooksGrid = ({ books }) => {
  return (
    <div className="container mt-4 px-0">
      <div className="row">
        {books.map((book) => (
          <Card key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksGrid;
