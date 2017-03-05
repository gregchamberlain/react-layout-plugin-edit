import React from 'react';
import { shallow } from 'enzyme';

import factory from '../src/index';

describe('Plugin', () => {
  it('returns a function, that when called with props returns the plugin object', () => {
    const plugin = factory({ layoutState: {} });
    expect(plugin.Name).toEqual('nextLayoutState');
    expect(plugin.reducer).not.toBeUndefined();
    expect(plugin.Provider).not.toBeUndefined();
  })
})