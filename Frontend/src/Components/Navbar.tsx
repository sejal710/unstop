import React, { useState } from 'react';
import '../Sass/Navbar.sass'
import Popup from './Popup';

interface NavbarProps {
  getData : () => void;
}

const Navbar: React.FC<NavbarProps> = ({getData}) => {
  const [showPopup,setShowPopup] = useState(false);
  const openPopup = () => {
    setShowPopup(true);
  }
  
  return (
    <nav className='navbar'>
      <div className="navbar-title">Book Now</div>
      <div className="navbar-button">
        <button onClick={openPopup}>Book Your Seats</button>
      </div>
      {showPopup && <Popup setpopup={setShowPopup} getData={getData}/>}
    </nav>
  );
};

export default Navbar;
