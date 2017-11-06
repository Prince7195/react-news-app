import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';

import { Button, SortBtn } from '../Button';

const SORT = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
}

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sortKey: 'NONE',
            isSortReverse: false
        }

        this.onSort = this.onSort.bind(this);

    }

    // shorting function
    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({ sortKey, isSortReverse });
    }

    render() {
        const { list, removeItem } = this.props;
        const { sortKey, isSortReverse } = this.state;
        const sortedList = SORT[sortKey](list);
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

        return (
            <div className="col-sm-10 col-sm-offset-1" >
                <div className="text-center" >
                    <SortBtn
                        className="btn btn-xs btn-default sortBtn"
                        sortKey={'NONE'}
                        onSort={this.onSort}
                        activeSortKey={sortKey}
                    >Default</SortBtn>
                    <SortBtn
                        className="btn btn-xs btn-default sortBtn"
                        sortKey={'TITLE'}
                        onSort={this.onSort}
                        activeSortKey={sortKey}
                    >TITLE</SortBtn>
                    <SortBtn
                        className="btn btn-xs btn-default sortBtn"
                        sortKey={'AUTHOR'}
                        onSort={this.onSort}
                        activeSortKey={sortKey}
                    >AUTHOR</SortBtn>
                    <SortBtn
                        className="btn btn-xs btn-default sortBtn"
                        sortKey={'COMMENTS'}
                        onSort={this.onSort}
                        activeSortKey={sortKey}
                    >COMMENTS</SortBtn>
                    <SortBtn
                        className="btn btn-xs btn-default sortBtn"
                        sortKey={'POINTS'}
                        onSort={this.onSort}
                        activeSortKey={sortKey}
                    >POINTS</SortBtn>
                    <hr />
                </div>
                {
                    // list.filter(isSearched(searchTerm)).map(
                    reverseSortedList.map(
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

export default Table;