# MyReads Project

MyReads project is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project is built with React and uses an API server and client library provided by Udacity's team.

## App Functionalities

The main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

    - Currently Reading
    - Want to Read
    - Read

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.

The main page also has a link to /search, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library.

## QuickStart

To get started:

    - Clone/Download the repo
    - cd into the project root
    - run `npm install`
    - run `npm start`

You should see `localhost:3000` opening in your browser.


## Note on the searching feature
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
