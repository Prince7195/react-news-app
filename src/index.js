import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './index.css';
import App from './components/App';
import About from './components/About';
import Javascript from './components/Javascript';
import Python from './components/Python';

const Root = () => 
<Router basename="/react-news-app" >
    <div>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/" >NEWSAPP</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem>
                        <NavLink exact to="/" activeClassName="active" >Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/about" activeClassName="active" >About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/javascript" activeClassName="active" >Javascript</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/python" activeClassName="active" >Python</NavLink>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" component={ App } />
        <Route exact path="/about" component={ About } />
        <Route exact path="/javascript" component={ Javascript } />
        <Route exact path="/python" component={ Python } />
    </div>
</Router>

ReactDOM.render(
    <Root />, 
    document.getElementById('root')
);