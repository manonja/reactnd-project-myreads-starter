import React from 'react'
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BookList extends React.Component {


    render() {
        const {myBooks} = this.props

        let wantToRead = myBooks.filter((book) => book.shelf === 'wantToRead')
        let currentlyReading = myBooks.filter((book) => book.shelf === 'currentlyReading')
        let read = myBooks.filter((book) => book.shelf === 'read')

        return (

            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <div>
                      {currentlyReading.length >  0 && (
                        <BookShelf books={currentlyReading} title="Currently Reading" moveBooks={this.props.moveBooks}/>
                      )}
                      {wantToRead.length >  0 && (
                        <BookShelf books={wantToRead} title="To Read" moveBooks={this.props.moveBooks}/>
                      )}
                      {read.length >  0 && (
                        <BookShelf books={read} title="Read" moveBooks={this.props.moveBooks}/>
                      )}
                  </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        );
    }
}

BookList.PropTypes = {
    myBooks: PropTypes.array.isRequired,
    moveBooks: PropTypes.func.isRequired
}

    export default BookList;
