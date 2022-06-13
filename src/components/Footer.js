import React from 'react';
import githubLogo from '../../assets/github.png';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__text'>
        Designed, Created and Built by&nbsp;
        <a className='footer__linkedin' href='https://www.linkedin.com/in/emily-daykin/'>
          Emily Daykin
        </a>
        &nbsp;
        <a href='https://github.com/emilydaykin'>
          <img src={githubLogo} alt='github' className='footer__github' />
          &nbsp;
        </a>
        &#126; Copyright &copy; 2022
      </div>
    </footer>
  );
};

export default Footer;
