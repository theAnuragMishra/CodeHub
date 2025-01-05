import React from 'react';
import './Footer.css';
import NiTLogo from './mnnit_logo.png';
import CTLogo from './logo_half.png';

export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (
    // <div className='FooterContainer'>
    //     <div className='footerTitle'>
    //         <div style={{display : 'flex', flexDirection : 'row', marginRight : '4px'}}> &#169;{year} <span className='desktopHidden'>Copyrights reserved</span> </div>
    //         <div> CodeTogether </div> 
    //         <div className='mobileHidden'> <h4 style={{padding : '0', margin : '0', marginLeft : '4px', marginRight : '4px'}}><b>|</b></h4> </div> 
    //         <a className='FooterLink' href='https://www.nit.ac.in/'> Narula Institute of Technology</a>
    //     </div>
    //     <div>
    //         <img height={'50px'} width={'50px'} style={{margin : '20px'}} src={CTLogo} />
    //         <img height={'50px'} width={'80px'} style={{margin : '20px'}} src={NiTLogo} />
    //     </div>
    // </div>

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
    <a href="mailto:computer.club@mnnit.ac.in" className="FooterLink">Contact Us</a>
  </div>
  <div className='additionalInfo'>
    <p><b>Contributors</b></p>
    <hr/>
      <p><a href='https://www.linkedin.com/in/link-aditya-rai/'>Aditya Raj Rai</a></p>
      <p><a href='https://www.linkedin.com/in/mrinal-varshney-971a27250/'>Mrinal Varshney</a></p>
      <p><a href='https://www.linkedin.com/in/ayush-tiwari-84a823281/'>Ayush Tiwari</a></p>
      <p><a href='https://www.linkedin.com/in/sumit-verma-smt/'>Sumit Verma</a></p>
      <p><a href='https://www.linkedin.com/in/a-v-singh/'>Aishwarya Vikram Singh</a></p>
      <p><a href='https://www.linkedin.com/in/aryan-singh-44a931251/'>Aryan Singh</a></p>
      <p><a href='https://www.linkedin.com/in/khanak-patwari/'>Khanak Patwari</a></p>
      <p><a href='https://www.linkedin.com/in/kagarwal1811/'>Kavya Agarwal</a></p>
      <p><a href='https://www.linkedin.com/in/akhil-g-131923136/'>Akhil Gupta</a></p>
      <p><a href='https://www.linkedin.com/in/imsubratpandey/'>Subrat Pandey</a></p>
      <p><a href='https://www.linkedin.com/in/archana1203/'>Archana Yadav</a></p>
      <p><a href='https://www.linkedin.com/in/janhavi-rai24/'>Janhavi Rai</a></p>
    <br/>

    <div>
      <p><b>Do you wish to contribute in CodeHub?</b></p>
      <hr/>
      <p>CodeHub is open-sourced for MNNIT students to cultivate a vibrant culture of open-source learning within the college community.</p>
      <p>Check out CodeHub's <a href='https://github.com/adityarai0705/CodeHub'><u>Github repository</u></a></p>
    </div>
  </div>
  
</footer>

  )
}

