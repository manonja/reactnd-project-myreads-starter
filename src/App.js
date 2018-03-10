import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import Book from './Book.js'
import BookSearchBar from './BookSearchBar.js'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    // Empty array that will store books called by the API
    books: [],

    // bookShelf object representing the app structure of shelves
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

  //Adds life cycle event - Fetching infos from BooksApi.js
  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({books})
      })
  }

  updateShelves = (bookToUpdate, shelf) => {
      this.setState(state => {
          const updateState = state.books.filter( book => book.id !== bookToUpdate.id);
          return {
              books: [...updateState, {...bookToUpdate, shelf}]
          };
      });
  };

  render() {
    return (
      <div className="app">
      // If showSearchPage is true, show bookSearchPage
        {this.state.showSearchPage ? (
            <BookSearchBar/>
          // else: show the bookShelf
        ) : (
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                //map over shelves
                {this.state.shelves.map(shelf => (
                    <BookShelf
                        key={shelf.id}
                        shelf={shelf}
                        books={this.state.books.filter(b => {
                            return b.shelf === shelf.id;
                        })}
                        updateShelves={this.updateShelves}
                    />
                ))}

              </div>
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp;
