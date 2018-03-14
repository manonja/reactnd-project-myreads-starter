import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearchBar from './BookSearchBar.js'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    // Empty array that will store books called by the API
    books: [],

    // bookShelf object representing the app structure
    shelves: [
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
};

  //Adds life cycle event - Fetching infos from BooksApi.js
  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books })
      })
  }

  moveBooks = (bookToMove, shelfValue) => {

     this.setState(state => {
         //Filter the selected book
         const newShelf = state.books.filter(book => book.id !== bookToMove.id);
         // Update shelf value
         bookToMove.shelf = shelfValue

         return {
           books: newShelf.concat(bookToMove)
       };
     });
     //Update the database
     BooksAPI.update(bookToMove, shelfValue);
 };

  render() {
    return (
      <div className="app">

        <Route
            path='/search'
            render= {() => (
                 <BookSearchBar moveBooks={this.moveBooks}/>
            )}
        />

        <Route
            exact path='/' 
            render={() => (

                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                      {
                          this.state.shelves.map((shelf) => (
                          <BookShelf
                              shelf={shelf}
                              key={shelf.id}
                              books={this.state.books.filter(book => book.shelf === shelf.id)}
                              moveBooks={this.moveBooks}
                          />
                        ))
                      }
                    </div>

                  <div className="open-search">
                  <Link
                      to="/search">Add a book</Link>
                  </div>
                </div>
              )}
              />

          }

      </div>
    )
  }
}

// <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>

export default BooksApp;
