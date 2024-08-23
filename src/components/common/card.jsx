import React from "react";
import "../../css/styles.css";

const Card = ({ book }) => {
  const renderImage = (bookImage) => {
    const defaultImage =
      "https://media.istockphoto.com/id/1411701868/photo/magic-book-with-glitter-open-book-with-lights-glowing-in-dark-background.jpg?s=2048x2048&w=is&k=20&c=AKbxbPjl_pIna-t3O7-MA3_vXlQGVt4zF9EiawlsdiQ=";

    if (bookImage) return bookImage["smallThumbnail"];
    return defaultImage;
  };

  const renderAuthors = (authors) => {
    if (authors)
      return (
        <span>
          <span>{authors[0]}</span>
          {authors[1] && <span> & {authors[1]}</span>}
        </span>
      );
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4 " key={book.id}>
      <div
        className="card rounded-lg card-size mx-auto"
        // style={{ width: "17rem" }}
      >
        <a
          href={book.volumeInfo.previewLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="card-img-top"
            style={{ height: "17rem" }}
            src={renderImage(book.volumeInfo.imageLinks)}
            alt="book-image"
          />
        </a>
        <div className="card-body">
          <a
            href={book.volumeInfo.previewLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h5 className="card-title d-block text-truncate">
              {book.volumeInfo.title}
            </h5>
          </a>
          <p className="card-text d-block text-truncate">
            {renderAuthors(book.volumeInfo.authors)}
          </p>
          <footer className="text-muted d-flex justify-content-between">
            <span>{book.volumeInfo.categories}</span>
            {book.volumeInfo.pageCount > 0 && (
              <span>{book.volumeInfo.pageCount} pages</span>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Card;
