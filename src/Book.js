import React from 'react'

class Book extends React.Component {

    //handleEvent function - Source: https://reactjs.org/docs/handling-events.html

    constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleEvent= this.handleEvent.bind(this);
  }

  handleEvent(e) {
    this.props.moveBooks(this.props.book, e.target.value);
  }

    render(){
        const book=this.props.book;

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
                        <select onChange={this.handleEvent} defaultValue={this.props.book.shelf}>
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

export default Book;
