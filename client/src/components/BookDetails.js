import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'


class BookDetails extends Component {
    render() {
        console.log(this.props)
        const { book } = this.props.data

        return (
            <div>
                {
                    book ?
                        <div id='book-details'>
                            <h2>
                                {book.name}
                            </h2 >
                            < p >
                                {book.genre}
                            </p >
                            <p>
                                {book.author.name}
                            </p>
                            <ul>
                                {book.author.books.map(book =>

                                    <li key={book.id}>{book.name}</li>

                                )}
                            </ul>
                        </div >
                        : null
                }
            </div>
        )


    }
}

export default graphql(
    getBookQuery,
    {
        options: props => ({
            variables: {
                id: props.bookId
            }
        })
    }

)(BookDetails);
