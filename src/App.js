import React from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";
import './App.css';
import { Route, Link } from "react-router-dom";

class BooksApp extends React.Component {

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => { this.setState(() => ({ books })) });
  }

  getShelf = (key, title) => ({
    key: key,
    title: title,
    books: this.state.books.filter(book => book.shelf === key)
  });

  moveBook = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(() => this.componentDidMount());
  };

  render() {
    // break the books into categories
    const currentBooksShelf = this.getShelf("currentlyReading", "Currently Reading");
    const futureBooksShelf = this.getShelf("wantToRead", "Want to Read");
    const pastBooksShelf = this.getShelf("read", "Read");

    // make an array of categories, in the order they will be displayed
    const bookShelves = [currentBooksShelf, futureBooksShelf, pastBooksShelf];

    return (
      <div className="app">

        <Route
          path="/search"
          render={() => (
            <SearchBooks
              shelvedBooks={this.state.books}
              onMoveBook={(book, shelf) => {
                this.moveBook(book, shelf);
              }}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">

              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
                {bookShelves.map(shelf => (
                  <BookShelf
                    key={shelf.key}
                    title={shelf.title}
                    books={shelf.books}
                    onMoveBook={this.moveBook}
                  />
                ))}
              </div>

              <div className="open-search">
                <Link to="/search" ><button>Add a book</button></Link>
              </div>

            </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
