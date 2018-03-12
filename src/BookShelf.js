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
                            key={book.id}
<<<<<<< HEAD
                            moveBooks={this.props.moveBooks}
=======
>>>>>>> 4b31d2c6725a7a5dcc6305f49e79625fdccbd919
                        />
                    ))}
                    </ol>
                  </div>
              </div>
        )
    }
}

export default BookShelf;
