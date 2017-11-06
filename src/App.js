import React from 'react';
import { Grid, Row, FormGroup } from "react-bootstrap";
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';

import data from './data';
import { PATH_BASE, PATH_SEARCH, PARAM_SEARCH, DEFAULT_QUERY, PARAM_PAGE, DEFAULT_PAGE, PARAM_HPP, DEFAULT_HPP } from './constants';

const SORT = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}${DEFAULT_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;
console.log(url);

function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

// higher order component
const withLoading = (Component) => ({ isLoading, ...rest }) => isLoading ? <Loading /> : <Component {...rest} />

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
      isLoading: false,
      sortKey: 'NONE'
    }

    // bind the functions to this (app.component)
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSort = this.onSort.bind(this);

  }

  // shorting function
  onSort(sortKey) {
    this.setState({sortKey});
  }

  // check top stories search term
  checkTopStoriesSearchTerm(searchTerm) {
    return !this.state.results[searchTerm];
  }

  // setting top stories
  setTopStories(result) {
    // get the hits and page from result
    const { hits, page } = result;
    const { results, searchKey } = this.state;
    // meaning page is not 0, button is already clicked, page might be 1 or 2
    // old page is already in the state
    // const oldHits = page !== 0 ? this.state.result.hits : [];

    const oldHits = results && results[searchKey] ? results[searchKey].hits : []
    const updatedHits = [...oldHits, ...hits];
    this.setState({ results: { ...results, [searchKey]: {hits: updatedHits, page}}, isLoading: false });
  }

  // fetch top stories
  fetchTopStories(searchTerm, page) {
    this.setState({ isLoading: true });
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => { return response.json() } )
    .then(result => this.setTopStories(result))
    .catch(err => err);
  }

  //component did mount
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
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
    this.setState({ results: { ...results, [searchKey]: {hits: updatedData, page}} })
  }

  // get input field value from search form
  searchValue(event) {
    this.setState({searchTerm: event.target.value});
  }

  render() {
    const { results, searchTerm, searchKey, isLoading, sortKey } = this.state;

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
                sortKey={sortKey}
                onSort={this.onSort}
                searchTerm={searchTerm}
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

class Search extends React.Component {
  componentDidMount() {
    this.input.focus();
  }
  render() {
    const { onChange, value, children, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit} >
        <FormGroup>
          <h1 style={{ fontWeight: 'bold' }} >{children}</h1>
          <hr style={{ border: '2px solid black', width: '100px' }} />
          <div className="input-group" >
            <input
              className="form-control width100 searchForm"
              type="text"
              onChange={onChange}
              value={value}
              ref={ (node) => { this.input = node } }
            />
            <span className="input-group-btn" >
                <button 
                  className="btn btn-primary searchBtn" 
                  type="submit"
                  >
                <i className="fa fa-search fa-2x" ></i>
                </button>
            </span>
          </div>
        </FormGroup>
      </form>
    );
  }
}

const Table = ({ list, searchTerm, removeItem, sortKey, onSort }) => {
  return (
    <div className="col-sm-10 col-sm-offset-1" >
      <div>
        <SortBtn
          sortKey={'TITLE'}
          onSort={onSort}
        >TITLE</SortBtn>
        <SortBtn
          sortKey={'AUTHOR'}
          onSort={onSort}
        >AUTHOR</SortBtn>
        <SortBtn
          sortKey={'COMMENTS'}
          onSort={onSort}
        >COMMENTS</SortBtn>
        <SortBtn
          sortKey={'POINTS'}
          onSort={onSort}
        >POINTS</SortBtn>
      </div>
      {
        // list.filter(isSearched(searchTerm)).map(
        SORT[sortKey](list).map(
          (item) => {
            return (
              <div key={item.objectID} >
                <h1> <a href={item.url} >{item.title}</a> </h1>
                <h4> {item.author} | {item.num_comments} Comments | {item.points
                } Points 
                 <Button className="btn btn-danger btn-xs" onClick={() => removeItem(item.objectID)} > Remove </Button>
                </h4>
                <hr />
              </div>              
            )
          }
        )
      }
    </div>
  );
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  removeItem: PropTypes.func.isRequired
}

const Button = ({ onClick, children, className="" }) => <button className={className} type="button" onClick={onClick}>{children}</button>

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  className: ""
}

const Loading = () => {
  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
}

const ButtonWithLoading = withLoading(Button);

const SortBtn = ({ sortKey, onSort, children }) => {
   return <Button
      onClick={() => onSort(sortKey)}
    >
      {children}
    </Button>
}

export default App;
