import React, { Fragment } from 'react';

const images = [
  '/assets/images/mini-r.png',
  '/assets/images/mini-p.png',
  '/assets/images/mini-s.png'
];

const MatchCard = ({ humanSelection, cpuSelection }) => (
  <Fragment>
    <img src={images[humanSelection]} className="mini mini-rock" />
    <div className="hr"><br /></div>
    <img src={images[cpuSelection]} className="mini mini-scissors" />
  </Fragment>
);

export default MatchCard;