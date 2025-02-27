import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>

        {/* New Inventory Link */}
        <NavLink to='/inventory/add' className="sidebar-option">
    <img src={assets.add_icon} alt="" />
    <p>Add Inventory</p>
</NavLink>
<NavLink to='/inventory/list' className="sidebar-option">
    <img src={assets.order_icon} alt="" />
    <p>List Inventory</p>
</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;