import React from 'react';
import { shallow } from 'enzyme';

import plugin from '../src/index';

describe('Plugin', () => {
  it('returns a function, that when called with props returns the plugin object', () => {
    expect(plugin.Name).toEqual('Edit');
    expect(plugin.Provider).not.toBeUndefined();
  })
})