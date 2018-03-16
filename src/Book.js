import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

    //Create a state so we can update book-value and shelf-value in BookShelf and SearchBar
    state = {
        book: this.props.book,
        //Check if books are already in our shelves, if not, set it to 'none'
        shelfValue: (this.props.book.shelf)?(this.props.book.shelf):'none'
    }


  handleChange = (e) => {
      this.setState({
        shelfValue:e.target.value
      })
    this.props.moveBooks(this.state.book, e.target.value)
  }


    render(){
        const {book}=this.state

        return(
                <li>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                      </div>
                      <div className="book-shelf-changer">
                        <select value={this.state.shelfValue} onChange={this.handleChange}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
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
