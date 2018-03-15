import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from "./Book";

class SearchBar extends React.Component {

    state = {
        query: '',
        books: []
    };

    newQuery = (query) => {
        this.setState({ query: query })

        //Check if there is a query
        query ?
            BooksAPI.search(query).then(books => {
                if (books.length) {
                    this.setState({books});
                }
            })
            :
            this.setState({books:[]});
    };

    render(){
        const query = this.state.query;
        const books = this.state.books;

        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link
                    to="/"
                    className="close-search"
                    onClick={() => this.setState({ showSearchPage: false })}>Close
                </Link>
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
                   value={query}
                   onChange={(event) => this.newQuery(event.target.value)}
                   placeholder="Search by title or author" />

                </div>
              </div>
               {books.length > 0 && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                        {
                            //map though books and render Book component
                            books.map((book) => (
                   				     <Book
                                        key={book.id}
                   				        book={book}
                                        moveBooks={this.props.moveBooks}
                                     />
                            ))}
                        </ol>
                    </div>
               )}

            </div>
        );
    }
}


export default SearchBar;
