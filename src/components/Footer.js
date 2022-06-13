import React from 'react';
import githubLogo from '../../assets/github.png';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__text'>
        <div className='footer__break footer__break--one'>
          Designed, Created and Built by&nbsp;
          <div className='footer__break-one-subset'>
            <a
              className='footer__linkedin'
              href='https://www.linkedin.com/in/emily-daykin/'
              target='_blank'
            >
              Emily Daykin
            </a>
            &nbsp;
            <a href='https://github.com/emilydaykin' target='_blank'>
              <img src={githubLogo} alt='github' className='footer__github' />
            </a>
          </div>
        </div>
        <div className='footer__break footer__break--two'>
          &nbsp;in React.js, Node, Express and MongoDB&nbsp;
        </div>
        <div className='footer__break footer__break--three'>&#126; Copyright &copy; 2022</div>
      </div>
    </footer>
  );
};

export default Footer;
