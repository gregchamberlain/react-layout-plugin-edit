// @flow
import React, { PropTypes } from 'react';

const Starter = ({ title }: { title: string }) => (
  <div>
    <h1>{title}</h1>
  </div>
);

export const OtherComp = () => <div>Hello there!</div>;

export default Starter;