import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/tennis-ball.png';
import HamburgerIcon from '../../assets/images/icons8-menu-100.png';
import { navButtons } from '../../assets/data/navButtons';

const listButtons = navButtons.map((button) =>
    <NavLink activeStyle={{ color: '#C7FF07', fontWeight: '700' }} className="nav__button" to={button.link} alt={button.title} key={button.title.toString()}><img src={button.src} alt={button.alt} /><span>{button.title}</span></NavLink>
)

export default class Header extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
            scrolled: false
        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        })

        window.scrollTo(0, 0)
    }

    handleScroll() {
        if (window.scrollY > 1) {
            this.setState({
                scrolled: true
            })
        } else {
            this.setState({
                scrolled: false
            })
        }
    }

    render() {
        return (
            <>
                <header 
                    className={this.state.scrolled === false ? "header" : "header--scrolled"}
                >
                    <img
                        src={HamburgerIcon}
                        className="hamburger_menu"
                        alt="menu"
                        onClick={this.toggleMenu}
                    />
                    <NavLink
                        className="header__link"
                        to="/">
                        <img src={logo} className="logo" alt="logo" />
                        <span>Tennis Club Management System</span>
                    </NavLink>
                </header>

                <nav
                    className={this.state.showMenu === true ? "nav" : "nav--hidden"}
                    onClick={this.toggleMenu}
                >
                    {listButtons}
                </nav>
            </>
        )
    }
}
