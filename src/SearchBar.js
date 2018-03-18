import React from 'react'
import { Link } from 'react-router-dom'
import Book from "./Book"
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBar extends React.Component {
    state = {
        query: '',
        searchResults: []
    };

    /**
     * Handle search result. If the query is not empty or valid,
     * map over searchResults and render the Book component.
    */
    handleSearchResult = () => {
        const {query, searchResults} = this.state

        if( query === ''){
            return (
                <div>Please enter a research</div>
            )
        } else if (!searchResults.length){
            return (
                <div>Please enter a valid research</div>
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

    /**
     * Check if there is a query. If so, call search API and check if books from the search query
     * Already exist in my list of books in main.
     * If the book already exist, set the shelf value in results to the shelf value in main.
     * @param {Object} query -
    */
    newQuery = (query) => {
        // If there is a query, call search API
        // If no results, set searchResults to empty
        // Else map over results and check if the book already exists in the main page
        // If the book already exist, set the shelf value in results to the shelf value in main.
       if (query) {
           BooksAPI.search(query).then(results => {
               if(!results) {
                   this.setState({searchResults:[]});

               } else {
                   let checkedResults = results.map((book) => {
                       book.shelf = "none"
                   //loop over myBookList in main. If the book id from the result
                   //is the same as the book id from main,
                   //then set shelf value to the book id in the search results
                   for(let i=0; i < this.props.checkBookList.length ; i++) {
                       if(book.id === this.props.checkBookList[i].id) {
                           book.shelf = this.props.checkBookList[i].shelf
                           break;
                       }
                   }
               return book
           })
               //update searchResults after checking for shelves values
               this.setState({searchResults: checkedResults})
           }

           }).catch(err => console.log(err, 'error occured'))
       }}

   /**
    * Update query when we do a new research.
    * @param {Object} query - user search
   */
   updateQuery = (query) => {
       this.setState({query:query})
       this.newQuery(query)
   }

    render(){
        const {query} = this.state

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
                     onChange={(e => this.updateQuery(e.target.value))}
                     value={query}
                     placeholder="Search by title or author"
                  />
                </div>
              </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                    {
                        this.handleSearchResult()
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
    handleSearchResult: PropTypes.func.isRequired,
    newQuery: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
    moveBooks: PropTypes.func.isRequired
}

export default SearchBar;
