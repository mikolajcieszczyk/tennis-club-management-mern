import React, { Component } from 'react';
import logo from '../../assets/images/tennis-ball.png';

export default class TopBar extends Component {
    render() {
        return (
            <div className="topbar">
                <img src={logo} className="logo" alt="logo" />
                <span>Tennis Club Management System</span>
            </div>
        )
    }
}
