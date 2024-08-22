import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getBooks } from "./../services/fakeBookService";
import { getGenres } from "../services/genreServices";
import { paginate } from "../utils/paginate";
import "../css/styles.css";

class Books extends Component {
  state = {
    books: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ books: getBooks(), genres: getGenres() });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
    console.log(genre);
  };

  render() {
    const { length: count } = this.state.books;
    const { pageSize, currentPage, books: allBooks } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const books = paginate(allBooks, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>There are {count} movies in the database.</p>
          <div className="container mt-4">
            <div className="row">
              {books.map((book) => (
                <div className="col-md-4 mb-4" key={book.id}>
                  <div className="card rounded-lg" style={{ width: "16rem" }}>
                    <a
                      href={book.volumeInfo.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="card-img-top"
                        style={{ height: "22rem" }}
                        src={book.volumeInfo.imageLinks.smallThumbnail}
                        alt=""
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
                        <span>{book.volumeInfo.authors[0]}</span>
                        {book.volumeInfo.authors[1] && (
                          <span> & {book.volumeInfo.authors[1]}</span>
                        )}
                      </p>
                      <footer className="text-muted d-flex justify-content-between">
                        <span>{book.volumeInfo.categories[0]}</span>
                        <span>{book.volumeInfo.pageCount} pages</span>
                      </footer>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Books;
