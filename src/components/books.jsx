import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./searchBox";
import { getBooks, getSearchBooks } from "./../services/bookService";
import { getGenres } from "../services/genreServices";
import { paginate } from "../utils/paginate";
import "../css/styles.css";

class Books extends Component {
  state = {
    books: [],
    genres: [],
    pageSize: 6,
    currentPage: 1,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getBooks("all");
    const { items: books } = data;
    this.setState({ books, genres: getGenres() });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = async (genre) => {
    let { name } = genre;
    if (name === "All") name = this.getRandomQuery();
    else name = `subject:${name}`;
    const { data } = await getBooks(name);
    const { items: books } = data;
    this.setState({
      books,
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: " ",
    });
  };

  getRandomQuery = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    return randomLetter;
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.getSearchBookData(e.currentTarget.value);
    }
  };

  async getSearchBookData(searchQuery) {
    const { data } = await getSearchBooks(searchQuery);
    const { items: books } = data;
    this.setState({
      searchQuery,
      books,
      selectedGenre: null,
      currentPage: 1,
    });
  }

  render() {
    const { length: count } = this.state.books;
    const { pageSize, searchQuery, currentPage, books: allBooks } = this.state;

    if (count === 0) return <p>There are no books in the database.</p>;

    const books = paginate(allBooks, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>There are {books.length} books in the database.</p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            onKeyDown={this.handleKeyDown}
          />
          <div className="container mt-4">
            <div className="row">
              {books.map((book) => (
                <div className="col-md-4 mb-4" key={book.id}>
                  <div className="card rounded-lg" style={{ width: "17rem" }}>
                    <a
                      href={book.volumeInfo.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="card-img-top"
                        style={{ height: "17rem" }}
                        src={
                          book.volumeInfo.imageLinks
                            ? book.volumeInfo.imageLinks.smallThumbnail
                            : "https://media.istockphoto.com/id/1411701868/photo/magic-book-with-glitter-open-book-with-lights-glowing-in-dark-background.jpg?s=2048x2048&w=is&k=20&c=AKbxbPjl_pIna-t3O7-MA3_vXlQGVt4zF9EiawlsdiQ="
                        }
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
                        {book.volumeInfo.authors && (
                          <span>
                            <span>{book.volumeInfo.authors[0]}</span>
                            {book.volumeInfo.authors[1] && (
                              <span> & {book.volumeInfo.authors[1]}</span>
                            )}
                          </span>
                        )}
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
