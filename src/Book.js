import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'


class Book extends React.Component {
    //handleEvent function - Source: https://reactjs.org/docs/handling-events.html
    constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    // Update UI with book's new shelf value
    this.props.moveBooks(this.props.book, e.target.value)
    // Update backend data
    BooksAPI.update(this.props.book, e.target.value)
  }

  handleBookResult = (bookResult) => {
      const {myBookList} = this.props
      console.log(this.props)
      const matched = myBookList.map(book => book.id === bookResult.id);
      if (bookResult.id !== matched.id) {
          return matched.shelf
      } else {
          return "none"
      }
    }



  //Error handling in case book doesn't have thumbnails
  handleThumbnail = (book) => {
      //Check if book have thumbnail
  if (book.imageLinks == null) {
    return "http://bdfjade.com/data/out/81/5870933-unicorn-wallpaper.png"
  } else {
      return book.imageLinks.thumbnail
  }
}

  //Error handling in case book doesn't have authors
  handleAuthor = (book) => {
      //Check if book have author
  if (book.authors == null) {
     return "N/A"
  } else {
      return book.authors[0]
    }
 }

    render(){
        const {book}=this.props

        return(
                <li>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${this.handleThumbnail(book)})`}}>
                      </div>
                      <div className="book-shelf-changer">
                        <select defaultValue={this.handleBookResult(book)} onChange={this.handleChange}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{this.handleAuthor(book)}</div>
                  </div>
                </li>
        )
    }
}

Book.PropTypes = {
    book: PropTypes.array.isRequired,
    shelf: PropTypes.array.isRequired,
    moveBooks: PropTypes.func.isRequired
}

export default Book;
