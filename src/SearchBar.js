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
        //If the query is invalid, ask the user to do a new research
        if( query === ''){
            return (
                <div>
                    <strong>
                        Please enter a research
                    </strong>
                </div>
            )
        //If the query is valid, map over searchResults and render the results
    } else if (!searchResults.length){
        return (
            <div>
                <strong>
                    Please enter a valid research
                </strong>
            </div>
        )

    } else {
            return (
                searchResults.map((book) => (
                    <Book
                      key={book.id}
                      book={book}
                      moveBooks={this.props.moveBooks}
                    />
                ))
            )
        }
    }

    //Check if there is a query. If so, check if books from search exist in books
    //from main. If
    newQuery = (query) => {
        //Check if there is a query
       if (query) {
           BooksAPI.search(query).then(results => {
               if(!results) {
                   this.setState({searchResults:[]});

               } else {
                   //map over the results we got from the query
                   let newList = results.map((book) => {
                   //set the shelf value to "none"
                   book.shelf = "none"
                   //loop over this.props.books in main. If the book id from the result
                   //is the same as the book id from this.props.books in main,
                   //then set shelf value to the book id in the search results
                   for(let i=0; i < this.props.book.length ; i++) {
                       if(book.id === this.props.book[i].id) {
                           book.shelf = this.props.book[i].shelf
                           break;
                       }
                   }
               return book
           })
               //update searchResults after checking for shelves values
               this.setState({searchResults: newList})
           }

           }).catch(err => console.log(err, 'error occured'))
       }}




   //Update each state so we can render update results in search
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
                     onChange={(event) => this.updateQuery(event.target.value)}
                     value={this.state.query}
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
