import React from 'react';
import { LayoutState } from 'react-layout-core';

import { withEditLayoutState, actions } from '../../src'
import { createStyle } from './utils';

const AddItemButton = ({ layoutState, onChange }) => {

  const addItem = () => {
    const item = layoutState.createItem({ type: 'div', props: { style: createStyle() } });
    onChange(actions.insertItem(layoutState, { item, parentKey: LayoutState.ROOT_KEY, index: 0 }));
  }

  return (
    <button onClick={addItem}>Add Item</button>
  )
};

export default withEditLayoutState(AddItemButton);