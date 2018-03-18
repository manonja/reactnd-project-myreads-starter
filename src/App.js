import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar.js'
import BookList from './BookList.js'


class BooksApp extends React.Component {
  state={
    //Empty array that will store the books being called by the BooksAPI.getAll()
    myBookList: [],
}

  //Adds life cycle event - Fetching infos from BooksApi.js to retrieve books
  componentDidMount() {
      BooksAPI.getAll().then(books => {
          this.setState({ myBookList : books })
      })
  }

  /**
   * Move books from shelves and setState of myBookList with accurate shelves values.
   * If the current state of myBookList includes bookToMove, set myBookList to a
   * new variable with the accurate shelves values
   * @param {object} bookToMove - The book.id to move to another shelf
   * @param {object} shelfValue - The shelf 's target value where the book needs to move to.
  */

  moveBooks = (bookToMove, shelfValue) => {
      // Check if the current state includes bookToMove
      if(this.state.myBookList.includes(bookToMove)) {
          // Creates a variable storing the state of books
          let checkBookList = this.state.books
          // Find the same bookToMove and set the value to the corresponding shelf
          checkBookList[checkBookList.indexOf(bookToMove)].shelf = shelfValue
          // Update the state of books
          BooksAPI.update(bookToMove, shelfValue).then(response => {
              console.log(response)
          })
          // Update the state of myBookList with accurate shelves
          this.setState({myBookList : checkBookList})
      // Updates the database with current state of books
      } else {
          BooksAPI.update(bookToMove, shelfValue).then(response => {
              BooksAPI.getAll().then((books) => {
                  this.setState({myBookList:books})
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
                 <SearchBar checkBookList={this.state.myBookList} moveBooks={this.moveBooks}/>
            )}
        />

        <Route
            exact path='/'
            render={() => (
                <BookList books={this.state.myBookList} moveBooks={this.moveBooks} />
               )}
              />

      </div>
    )
  }
}

export default BooksApp;
