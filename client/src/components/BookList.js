import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }

    generateOnClickCallback = (bookId) => (
        (e) => {
            console.log('selected:', bookId)
            this.setState({ selected: bookId })
        }
    )

    displayBooks() {
        const books = this.props.data.books
        return (
            books ?
                books.map(book =>

                    <li onClick={this.generateOnClickCallback(book.id)} key={book.id} >
                        {book.name}
                    </li>
                )
                : 'loading ...'
        )
    }

    render() {
        console.log(this.props)
        const bookId = this.state.selected
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                {bookId ?
                    <BookDetails bookId={this.state.selected} />
                    : null}

            </div>
        )
    }
}



export default graphql(getBooksQuery)(BookList)