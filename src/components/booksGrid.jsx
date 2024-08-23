import React from "react";
import Card from "./common/card";

const BooksGrid = ({ books }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {books.map((book) => (
          <Card book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksGrid;
