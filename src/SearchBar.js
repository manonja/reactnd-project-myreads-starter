import React from 'react'
import { Link } from 'react-router-dom'
import Book from "./Book";
import PropTypes from 'prop-types'



class SearchBar extends React.Component {

    state = {
        query: '',
        searchResult: []
    };

    newQuery = (event) => {
        event.preventDefault();
        this.setState({ query: event.target.value })
        this.props.bookList(this.state.query);
}


    render(){
        const {books} = this.props

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
                     value={this.state.query}
                     onChange={this.newQuery}
                     placeholder="Search by title or author"
                  />
                </div>
              </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                    {books.map((book) => (
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
    books: PropTypes.array.isRequired,
    moveBooks: PropTypes.func.isRequired
}

export default SearchBar;
