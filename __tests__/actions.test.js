import * as ACTIONS from '../src/actions';
import { LayoutState, Item, ItemKey } from 'react-layout-core';

const Key = (key) => ({ key });

const items = {
  root: { key: 'root', type: 'div', props: {}, children: [Key('a'), Key('b')] },
  a: { key: 'a', type: 'div', props: {}, children: [Key('c')], parent: 'root' },
  b: { key: 'b', type: 'div', props: {}, children: [], parent: 'root' },
  c: { key: 'c', type: 'div', props: {}, children: [Key('d')], parent: 'a' },
  d: { key: 'd', type: 'div', props: {}, children: [], parent: 'c' }
}

let layoutState;

describe('actions', () => {

  beforeEach(() => {
    layoutState = LayoutState.fromRaw(items);
  })

  describe('#insert', () => {
    it('inserts the item', () => {
      const item = layoutState.createItem({ type: 'div' });
      const parentKey = LayoutState.ROOT_KEY;
      const index = 1;
      const nextState = ACTIONS.insertOrMoveItem(layoutState, { item, parentKey, index });
      expect(nextState).toBeInstanceOf(LayoutState);
      expect(nextState.getIn(['itemMap', item.key, 'key'])).toEqual(item.key);
      expect(nextState.getIn(['itemMap', parentKey, 'children', index])).toEqual(item.key);
      expect(nextState.getIn(['itemMap', item.key, 'parent'])).toEqual(parentKey);
    })
  })
  
  describe('#move', () => {
    it('moves the item', () => {
      const itemKey = new ItemKey('c');
      const parentKey = LayoutState.ROOT_KEY;
      const oldParentKey = layoutState.getItem(itemKey).parent;
      const index = 1;
      const nextState = ACTIONS.insertOrMoveItem(layoutState, { item: itemKey, parentKey, index });
      expect(nextState).toBeInstanceOf(LayoutState);
      expect(nextState.getIn(['itemMap', parentKey, 'children', index])).toEqual(itemKey);
      expect(nextState.getIn(['itemMap', itemKey, 'parent'])).toEqual(parentKey);
      expect(nextState.getIn(['itemMap', oldParentKey, 'children', 0])).not.toEqual(itemKey);
    })
  })

  describe('#remove', () => {
    it('removes the item', () => {
      const itemKey = new ItemKey('a');
      const childKey = new ItemKey('c');
      const grandChildKey = new ItemKey('d');
      const nextState = ACTIONS.removeItem(layoutState, itemKey);
      const expected = [new ItemKey('b')];
      expect(nextState.getIn(['itemMap', itemKey])).toBeUndefined();
      expect(nextState.getIn(['itemMap', childKey])).toBeUndefined();
      expect(nextState.getIn(['itemMap', grandChildKey])).toBeUndefined();
      expect(nextState.getIn(['itemMap', LayoutState.ROOT_KEY, 'children'])).toEqual(expect.arrayContaining(expected));
    })
  })
});