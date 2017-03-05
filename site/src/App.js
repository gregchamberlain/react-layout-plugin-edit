// @flow
import React, { Component } from 'react';
import { Layout, LayoutState } from 'react-layout-core';

import Edit from '../../src';

import Comp from './Comp';

const components = {
  Comp
};

class App extends Component {
  state: {
    layoutState: LayoutState
  }
  
  constructor() {
    super();
    let layoutState = new LayoutState('div');
    layoutState = layoutState.insertOrMoveItem('root', 0, { type: 'Comp', props: {}, children: [] });
    this.state = {
      layoutState: layoutState
    }
  }

  changeLayout = (layoutState: LayoutState) => {
    this.setState({ layoutState });
  }

  render() {
    return (
      <Layout
        layoutState={this.state.layoutState}
        onChange={this.changeLayout}
        components={components}
        plugins={[Edit]}
      />
    );
  }
}

export default App;
