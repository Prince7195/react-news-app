import React from 'react';
import { Grid, Row } from "react-bootstrap";

import Table from '../Table';
import { Button, Loading } from '../Button';
import Search from '../Search';
import { PATH_BASE, PATH_SEARCH, PARAM_SEARCH, DEFAULT_QUERY, PARAM_PAGE, DEFAULT_PAGE, PARAM_HPP, DEFAULT_HPP } from '../../constants';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}${DEFAULT_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;
console.log(url);

// higher order component
const withLoading = (Component) => ({ isLoading, ...rest }) => isLoading ? <Loading /> : <Component {...rest} />

const updateTopStories = (hits, page) => prevState => {
    const { results, searchKey } = prevState;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : []
    const updatedHits = [...oldHits, ...hits];

    return { results: { ...results, [searchKey]: { hits: updatedHits, page } }, isLoading: false };
}


class App extends React.Component {

    // setting up internal component state
    // ES6 class can use constructor to initialize internal state
    constructor(props) {
        super(props);

        // setting up state
        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            isLoading: false
        }

        // bind the functions to this (app.component)
        this.removeItem = this.removeItem.bind(this);
        this.searchValue = this.searchValue.bind(this);
        this.fetchTopStories = this.fetchTopStories.bind(this);
        this.setTopStories = this.setTopStories.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    // check top stories search term
    checkTopStoriesSearchTerm(searchTerm) {
        return !this.state.results[searchTerm];
    }

    // setting top stories
    setTopStories(result) {
        // get the hits and page from result
        const { hits, page } = result;

        this.setState(updateTopStories(hits, page));
    }

    // fetch top stories
    fetchTopStories(searchTerm, page) {
        this.setState({ isLoading: true });
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => { return response.json() })
            .then(result => this.setTopStories(result))
            .catch(err => err);
    }

    //component did mount
    componentDidMount() {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        this.fetchTopStories(searchTerm, DEFAULT_PAGE);
    }

    // on search submit function
    onSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });

        if (this.checkTopStoriesSearchTerm(searchTerm)) {
            this.fetchTopStories(searchTerm, DEFAULT_PAGE);
        }

        event.preventDefault();
    }

    // lets removing the selected data
    removeItem(id) {
        const { results, searchKey } = this.state;
        const { hits, page } = results[searchKey];
        const updatedData = hits.filter(item => item.objectID !== id);
        // this.setState({ result: Object.assign({}, this.state.result, { hits: updatedData})});
        this.setState({ results: { ...results, [searchKey]: { hits: updatedData, page } } })
    }

    // get input field value from search form
    searchValue(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { results, searchTerm, searchKey, isLoading } = this.state;

        const page = (results && results[searchKey] && results[searchKey].page) || 0;

        const list = (results && results[searchKey] && results[searchKey].hits) || [];

        return (
            <div>
                <Grid fluid>
                    <Row>
                        <div className="jumbotron text-center" >
                            <Search
                                onChange={this.searchValue}
                                value={searchTerm}
                                onSubmit={this.onSubmit}
                            >
                                NEWS APP
                </Search>
                        </div>
                    </Row>
                </Grid>

                <Grid>
                    <Row>
                        {results &&
                            <Table
                                list={list}
                                removeItem={this.removeItem}
                            />
                        }

                        <div className="text-center alert" >
                            <ButtonWithLoading
                                isLoading={isLoading}
                                className="btn btn-success"
                                onClick={() => this.fetchTopStories(searchTerm, page + 1)}
                            >
                                Load more
              </ButtonWithLoading>
                        </div>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const ButtonWithLoading = withLoading(Button);

export default App;
