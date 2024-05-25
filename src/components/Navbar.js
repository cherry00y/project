import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavbarStyles.css";

class Navbar extends Component {
    render() {
        return (
            <nav className="NavbarItems">
                <h3 className="navbar-logo">wonder why wonder wash</h3>

                <ul className="nav-menu">
                    {this.props.MenuItems && this.props.MenuItems.map((item, index) =>  {
                        return (
                            <li key={index}>
                                {item.subItems ? (
                                    <div className="dropdown">
                                        <span className="nav-links">{item.title}</span>
                                        <div className="dropdown-content">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <Link key={subIndex} className="dropdown-link" to={subItem.url}>
                                                    {subItem.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link className={item.cName} to={item.url}>
                                        <i className={item.icon}></i>
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                    <button>Log Out</button>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
