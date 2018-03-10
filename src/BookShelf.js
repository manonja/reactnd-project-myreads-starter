import React, { Component } from 'react'
import Book from './Book.js'


class BookShelf extends React.Component{

    render() {
        const shelf = this.props.shelf
        const book = this.props.book
        return(
              <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Book/>
                    </ol>
                  </div>
              </div>
        )
    }
}

export default BookShelf
