import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import {
    getAuthorsQuery,
    addBookMutation,
    getBooksQuery
} from '../queries/queries'



class AddBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: null,
            genre: null,
            authorId: null
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        //console.log(this.state)
        this.props.addBookMutation({
            variables: this.state,
            refetchQueries: [{
                query: getBooksQuery
            }]
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    displayAuthors = () => {
        const authors = this.props.getAuthorsQuery.authors
        return (
            authors ?
                authors.map(author =>
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
                : <option disabled>Loading authors ...'</option>
        )
    }

    render = () => {
        return (
            <form id="add-book" onSubmit={this.onSubmit}>
                <div className="field">
                    <label htmlFor='name'>Book name:</label>
                    <input id='name' name='name' type="text" onChange={this.onChange} />
                </div>
                <div className="field">
                    <label htmlFor='genre'>Genre:</label>
                    <input i='genre' name='genre' type="text" onChange={this.onChange} />
                </div>
                <div className="field">
                    <label htmlFor='authorId'>Author:</label>
                    <select id='authorId' name='authorId' onChange={this.onChange}>
                        <option>choose author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}


export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)