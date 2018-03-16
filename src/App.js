import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar.js'
import BookList from './BookList.js'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state={
    //Empty array that will store the books being called by the BooksAPI.getAll()
    books: [],
    search:[],
}

  //Adds life cycle event - Fetching infos from BooksApi.js to retrieve books
  componentDidMount() {
      BooksAPI.getAll().then(books => {
          this.setState({ books })
      })
  }

  /**
   * Move books from shelves
   * @param {object} bookToMove - The book.id to move to another shelf
   * @param {object} shelfValue - The shelf 's target value where the book needs to move to.
   * @returns {array} - new array with the new value of state.books
  */

  moveBooks = (book, shelf) => {
      BooksAPI.update(book, shelf).then(() => {
          BooksAPI.getAll().then(books => {
              this.setState({ books });
          });
      });
  };



  render() {

    return (
      <div className="app">
        <Route
            path='/search'
            render={() => (
                 <SearchBar bookList={this.bookList} books={this.state.search} moveBooks={this.moveBooks}/>
            )}
        />

        <Route
            exact path='/'
            render={() => (
                <BookList books={this.state.books} moveBooks={this.moveBooks} />
               )}
              />
            }
      </div>
    )
  }
}

export default BooksApp;
