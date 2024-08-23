import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./searchBox";
import { getBooks, getSearchBooks } from "./../services/bookService";
import { getGenres } from "../services/genreServices";
import { paginate } from "../utils/paginate";
import "../css/styles.css";
import BooksGrid from "./booksGrid";
import DropDown from "./common/dropDown";

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

  getPageData = () => {
    const { currentPage, pageSize, books: allBooks } = this.state;

    const books = paginate(allBooks, currentPage, pageSize);

    return { totalCount: books.length, books };
  };

  render() {
    const { length: count } = this.state.books;
    const { pageSize, searchQuery, currentPage } = this.state;

    if (count === 0) return <p>There are no books in the database.</p>;

    const { totalCount, books } = this.getPageData();

    return (
      <div className="row">
        <div className="col-12 col-md-3 col-lg-2 text-md-left text-right mb-3">
          <div className="dropdown-component">
            <DropDown
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="listgroup-component">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
        </div>
        <div className="col">
          <h4 className="pb-1">Showing {totalCount} books in the database.</h4>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            onKeyDown={this.handleKeyDown}
          />
          <BooksGrid books={books} />
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
