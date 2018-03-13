import React from 'react'
import Book from './Book.js'


class BookShelf extends React.Component{

    render() {
        const shelf = this.props.shelf
        const books = this.props.books
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

export default BookShelf;
