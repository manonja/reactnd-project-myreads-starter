import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBar from './SearchBar.js'


class BooksApp extends React.Component {
  state={
    //Empty array that will store the books being called by the BooksAPI.getAll()
    books: [],

    //BookShelf object representing the app structure
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
}

  //Adds life cycle event - Fetching infos from BooksApi.js to retrieve books
  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books })
      })
  }

  /**
   * Move books from shelves
   * @param {object} bookToMove - The book.id to move to another shelf
   * @param {object} shelfValue - The shelf 's target value where the book needs to move to.
   * @returns {array} - new array with the new value of state.books
  */
  moveBooks=(bookToMove, shelfValue) => {

     this.setState(state => {
         //Filter the selected book within books array
         const newShelf=state.books.filter(book => book.id !== bookToMove.id);
         //Update shelf value
         bookToMove.shelf = shelfValue
         //Returns a new array with new book and shelf values
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
            render={() => (
                 <SearchBar moveBooks={this.moveBooks}/>
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
