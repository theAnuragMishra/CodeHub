import React from 'react';
import './Footer.css';
import NiTLogo from './mnnit_logo.png';
import CTLogo from './logo_half.png';

export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (

<footer className="FooterContainer">
  <div className="footerLogo">
    <img className= "ct_logo" src={CTLogo} alt="CodeHub Logo" />
    <img className= "nit_logo" src={NiTLogo} alt="Motilal Nehru National Institute of Technology Logo" />
    <span className="mnnitLabel">MNNIT</span>
  </div>
  <div className="footerTitle">
    <span>&#169; {year} CodeHub. All Rights Reserved.</span>
  </div>
  <div className="LinkContainer">
  </div>
</footer>

  )
}

