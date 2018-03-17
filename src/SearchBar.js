import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from "./Book"
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBar extends React.Component {
    state = {
        query: '',
        searchResults: []
    };


    //Get the property shelf
    handleBookResult = () => {
        const {query} = this.state
        const {searchResults} = this.state
        //No query or invalid query
        if( !searchResults.length){
            return (
                <div>
                    <strong>
                        Please enter a query
                    </strong>
                </div>
            )
        //Show the results
        } else {
            return (
                searchResults.map((book) => (
                    <Book
                      key={book.id}
                      book={book}
                      moveBook={this.props.moveBook}
                    />
                ))
            )
        }
    }

    //Function checking is there is a query and if so calling Books API to update books
    newQuery = (query) => {
        //Check if there is a query
       if (query) {
           BooksAPI.search(query).then(results => {
               if(!results) {
                   this.setState({searchResults:[]});

               } else {
                   let newList = results.map((book) => {
                   book.shelf = "none"
                   for(let i=0; i <this.props.books.length ; i++) {
                       if(book.id === this.props.books[i].id) {
                           book.shelf = this.props.books[i].shelf
                           console.log(book.shelf)
                           break;
                       }
                   }
               return book
           })
               this.setState({searchResults: newList})
           }

           }).catch(err => console.log(err, 'error occured'))
       }}




   //Update each state
   updateQuery = (query) => {
       this.setState({query:query})
       this.newQuery(query)
   }


    render(){

        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input
                     type="text"
                     onChange={(event) => this.newQuery(event.target.value)}
                     placeholder="Search by title or author"
                  />
                </div>
              </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                    {
                        this.handleBookResult()
                    }
                    </ol>
                </div>

            </div>
        );
    }
}

SearchBar.PropTypes = {
    query: PropTypes.string.isRequired,
    searchResults: PropTypes.array.isRequired,
    moveBooks: PropTypes.func.isRequired
}

export default SearchBar;
