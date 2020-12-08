import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css'

class PagesLinks extends React.Component {
          
  render() {

    return (
      <ul className='links'>
        <li><NavLink to="/director" exact className="PageLink" activeClassName="ActivePageLink">Director</NavLink></li>
        <li><NavLink to="/meneger" className="PageLink" activeClassName="ActivePageLink">Manager</NavLink></li>
        <li><NavLink to="/logistics" className="PageLink" activeClassName="ActivePageLink">Logistics</NavLink></li>
        <li><NavLink to="/courier_Alex" className="PageLink" activeClassName="ActivePageLink">Courier Alex</NavLink></li>
        <li><NavLink to="/courier_Vadim" className="PageLink" activeClassName="ActivePageLink">Courier Vadim</NavLink></li>
      </ul>
    );
    
  }

}
    
export default PagesLinks;