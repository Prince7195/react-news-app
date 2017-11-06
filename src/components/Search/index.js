import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from "react-bootstrap";


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
                            ref={(node) => { this.input = node }}
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

export default Search;