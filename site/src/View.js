import React from 'react';
import { LayoutState } from 'react-layout-core';

import { withEditLayoutState, actions } from '../../src'
import { createStyle } from './utils';

const View = ({ layoutState, onChange, ...props }) => {

  const addItem = () => {
    const item = layoutState.createItem({ type: 'View', props: { style: createStyle() } });
    onChange(actions.insertItem(layoutState, { item, parentKey: props['data-id'], index: 0 }));
  }

  const remove = () => {
    onChange(actions.removeItem(layoutState, props['data-id']))
  }

  return (
    <div {...props}>
      <button onClick={addItem}>Add Child</button>
      { props['data-id'].equals(LayoutState.ROOT_KEY) ? null : <button onClick={remove}>Remove</button> }
      {props.children}
    </div>
  )
};

export default withEditLayoutState(View);