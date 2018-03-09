import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import Book from './Book.js'
import BookSearchBar from './BookSearchBar.js'



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // Empty array that will store books
    books: [],

    // bookShelf object representing the app structure of shelves
    bookShelf: [
        {
            id: 'currentlyReading',
            name: 'Currently Reading'
        },
        {
            id: 'wantToRead',
            name: 'Want to Read'

        },
        {
            id: 'read',
            name: 'Read'
        }
    ],
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
      // If showSearchPage is true, show bookSearchPage
        {this.state.showSearchPage ? (
            BookSearchBar
          // else: show the bookShelf
        ) : (
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>

              // BookShelf starts
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
             // Bookshelf ends

                  <div className="bookshelf-books">
                    <ol className="books-grid">

                      <Book/>

                    </ol>
                  </div>

                </div>
              </div>
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
