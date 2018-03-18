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
}

  //Adds life cycle event - Fetching infos from BooksApi.js to retrieve books
  componentDidMount() {
      BooksAPI.getAll().then(books => {
          this.setState({ books : books })
      })
  }

  /**
   * Move books from shelves
   * @param {object} bookToMove - The book.id to move to another shelf
   * @param {object} shelfValue - The shelf 's target value where the book needs to move to.
   * @returns {array} - new array with the new value of state.books
  */

  moveBooks = (bookToMove, shelfValue) => {
      // Check if the current state includes bookToMove
      if(this.state.books.includes(bookToMove)) {
          let tempList = this.state.books
          // Find the same bookToMove and set the value to the corresponding shelf
          tempList[tempList.indexOf(bookToMove)].shelf = shelfValue
          // Update the state of books
          BooksAPI.update(bookToMove, shelfValue).then(response => {
              console.log(response)
          })
          this.setState({books : tempList})
      // If the current state doesn't include bookToMove, set the state to books
      } else {
          BooksAPI.update(bookToMove, shelfValue).then(response => {
              BooksAPI.getAll().then((books) => {
                  this.setState({books:books})
              })
          })
      }
  };

  render() {

    return (
      <div className="app">
        <Route
            path='/search'
            render={() => (
                 <SearchBar tempList={this.state.books} moveBooks={this.moveBooks}/>
            )}
        />

        <Route
            exact path='/'
            render={() => (
                <BookList books={this.state.books} moveBooks={this.moveBooks} />
               )}
              />

      </div>
    )
  }
}

export default BooksApp;
