import React from 'react';
import { connect } from 'react-redux';
import { insertOrMoveItem } from '../../src/actions';

const getItem = () => ({ type: 'div', props: { style: { backgroundColor: 'red', margin: 20, minHeight: 40 } }, children: [] })

const Comp = ({ addItem }) => (
  <button onClick={addItem}>Add Item</button>
);

const mapDispatchToProps = dispatch => ({
  addItem: () => dispatch(insertOrMoveItem('root', 0, getItem()))
});

export default connect(null, mapDispatchToProps)(Comp);