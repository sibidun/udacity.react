import React, { Component } from "react";
import PropTypes from "prop-types";

class BookShelf extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  render() {
    const { title, books, onMoveBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {books.map(book => (
              <li key={book.id} >
                <div className="book">
                  <div className="book-top">

                    <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
                    }}>
                    </div>

                    <div className="book-shelf-changer">
                      <select value={book.shelf || "none"} onChange={(event) => onMoveBook(book, event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>

                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors && book.authors.map(author => (<span key={author}>{author}</span>))}</div>
                </div>
              </li>
            ))}

          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
