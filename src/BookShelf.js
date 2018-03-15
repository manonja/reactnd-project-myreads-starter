import React from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types'

class BookShelf extends React.Component{

    render() {
        const {shelf, books} = this.props
    
        return (
              <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <Book
                                book={book}
                                shelf={shelf}
                                key={book.id}
                                moveBooks={this.props.moveBooks}
                            />
                        ))}
                    </ol>
                  </div>
              </div>
        )
    }
}

BookShelf.PropTypes = {
    shelf: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    moveBooks: PropTypes.func.isRequired
}

export default BookShelf;
