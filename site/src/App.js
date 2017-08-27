// @flow
import React, { Component } from 'react';
import { Layout, LayoutState, LayoutProvider, RootLayout } from 'react-layout-core';

import Edit, { actions } from '../../src';
import AddItemButton from './AddItemButton';
import View from './View';

const rVal = () => Math.floor(Math.random() * 255);

const createStyle = () => ({
  padding: 15,
  margin: 5,
  backgroundColor: `rgba(${rVal()}, ${rVal()}, ${rVal()}, 1)`
});

const Key = (key) => ({ key });

const items = {
  root: { key: 'root', type: 'View', props: { style: createStyle() }, children: [Key('a'), Key('b')] },
  a: { key: 'a', type: 'div', props: { style: createStyle() }, children: [], parent: 'root' },
  b: { key: 'b', type: 'div', props: { style: createStyle() }, children: [], parent: 'root' },
};

const components = {
  View
};

type State = {
  layoutState: LayoutState
};

type Props = {

}

class App extends Component<Props, State> {

  constructor() {
    super();
    // let layoutState = LayoutState.fromRaw(items);
    let layoutState = new LayoutState('View');
    console.log(layoutState.toJS());
    this.state = {
      layoutState
    }
  }

  changeLayout = (layoutState: LayoutState) => {
    this.setState({ layoutState });
  }

  render() {
    return (
        <LayoutProvider
          layoutState={this.state.layoutState}
          onChange={this.changeLayout}
          plugins={[Edit]}
          components={components}
        >
          <div>
            <RootLayout />
          </div>
        </LayoutProvider>
    );
  }
}

export default App;
