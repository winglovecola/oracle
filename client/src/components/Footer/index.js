import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="bg-green-300">
      <h6>TEST</h6>
      <ul>
        <li>
          <a href="">
            Photo by{' '}
            <a href="https://unsplash.com/es/@marivsteo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Marius Teodorescu
            </a>{' '}
            on{' '}
            <a href="https://unsplash.com/photos/pXQncqqo1O4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
