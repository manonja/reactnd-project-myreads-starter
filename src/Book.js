import React from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
    // Handle change Source: react doc "https://reactjs.org/docs/handling-events.html"
    constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    //update UI calling to app.js
    this.props.moveBooks(this.props.book, e.target.value);
    //update booksapi
    BooksAPI.update(this.props.book, e.target.value);

  }

    render(){
        const book = this.props.book;

        return(
                <li>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url( ${book.imageLinks.thumbnail})`}}>
                      </div>
                      <div className="book-shelf-changer">
                        <select defaultValue = {book.shelf} onChange={this.handleOnChange}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
        )
    }
}

export default Book;
