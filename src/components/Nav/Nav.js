import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { navButtons } from '../../assets/data/navButtons';

const listButtons = navButtons.map((button) =>
    <NavLink activeStyle={{ color: '#C7FF07', fontWeight: '700' }} className="nav__button" to={button.link} alt={button.title} key={button.title.toString()}><img src={button.src} alt={button.alt} /><span>{button.title}</span></NavLink>
)

export default class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                {listButtons}
            </nav>
        )
    }
}
