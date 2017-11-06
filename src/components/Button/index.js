import React from 'react';
import PropTypes from 'prop-types';


export const Button = ({ onClick, children, className = "" }) => <button className={className} type="button" onClick={onClick}>{children}</button>

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

Button.defaultProps = {
    className: ""
}

export const Loading = () => {
    return (
        <div>
            <h2>Loading...</h2>
        </div>
    );
}

export const SortBtn = ({ sortKey, onSort, children, className, activeSortKey }) => {

    const sortClass = ['btn default'];
    if (sortKey === activeSortKey) {
        sortClass.push('btn btn-primary');
    }

    return (<Button
        className={sortClass.join(' ')}
        onClick={() => onSort(sortKey)}
    >
        {children}
    </Button>
    );
}