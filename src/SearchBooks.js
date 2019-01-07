import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";

class SearchBooks extends Component {

  static propTypes = {
    shelvedBooks: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  state = {
    query: "",
    books: []
  };

  searchBooks = query => {

    this.setState(() => ({ query }));

    const search = query.trim();

    if (search === "") {
      this.setState(() => ({ books: [] }));
      return;
    };

    BooksAPI
      .search(search)
      .then(books => {
        this.setState(() => ({
          books: (books && books.length) ? books : []
        }));
      });
  };

  render() {
    const { query, books } = this.state;
    const { shelvedBooks, onMoveBook } = this.props;

    // get shelved books that matched the search
    const libraryBooksShelf = {
      key: "library",
      title: "Already In Library",
      books: shelvedBooks.filter(shelved => books.findIndex(book => book.id === shelved.id) > 0)
    };

    // get matched books that are not already in the library
    const availableBooksShelf = {
      key: "available",
      title: "Available Reads",
      books: books.filter(book => shelvedBooks.findIndex(shelved => shelved.id === book.id) <= 0)
    };

    // merge both sets
    const bookShelves = [availableBooksShelf, libraryBooksShelf];

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.searchBooks(event.target.value)}
            />
          </div>
        </div>

        <div className="list-books" style={({ marginTop: '6em' })}>
          <div className="list-books-content">
            {bookShelves.map(shelf => (
              shelf.books.length > 0 &&
              <BookShelf
                key={shelf.key}
                title={shelf.title}
                books={shelf.books}
                onMoveBook={onMoveBook}
              />
            ))}
          </div>
        </div>

      </div>
    )
  }
}

export default SearchBooks