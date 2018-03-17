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

    //Function checking is there is a query and if so calling Books API to update books
    newQuery = (query) => {
        this.setState({ query })
        //Check if there is a query
       query ?
           BooksAPI.search(query).then(searchResults => {
               if (searchResults.length) {
                   //Check if any of the search results already exist in the list of books
                   // books.filter(book => mainBooks[book.id] && (book.shelf = mainBooks[book.id].shelf));
                   this.setState({searchResults});
               }
           })
           //If there is not query, set books to empty
           :
           this.setState({searchResults:[]});
   };


    render(){
        const {searchResults} = this.state;

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
                    {searchResults.map((book) => (
                        <Book
                            book={book}
                            key={book.id}
                            moveBooks={this.props.moveBooks}
                        />
                    ))}
                    </ol>
                </div>

            </div>
        );
    }
}

SearchBar.PropTypes = {
    query: PropTypes.string.isRequired,
    myBooks: PropTypes.array.isRequired,
    moveBooks: PropTypes.func.isRequired
}

export default SearchBar;
