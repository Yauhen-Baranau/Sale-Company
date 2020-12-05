import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css'

class PagesLinks extends React.Component {
          
  render() {

    return (
      <div className='links'>
        <NavLink to="/director" exact className="PageLink" activeClassName="ActivePageLink">Director</NavLink>
        <NavLink to="/meneger" className="PageLink" activeClassName="ActivePageLink">Manager</NavLink>
        <NavLink to="/logistics" className="PageLink" activeClassName="ActivePageLink">Logistics</NavLink>
        <NavLink to="/courier_Alex" className="PageLink" activeClassName="ActivePageLink">Courier Alex</NavLink>
        <NavLink to="/courier_Vadim" className="PageLink" activeClassName="ActivePageLink">Courier Vadim</NavLink>
      </div>
    );
    
  }

}
    
export default PagesLinks;