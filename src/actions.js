import { Item, ItemKey, LayoutState } from 'react-layout-core';

export const insertOrMoveItem = (layoutState, { item, parentKey, index }) => {
  if (item instanceof ItemKey) {
    return moveItem(layoutState, { itemKey: item, parentKey, index });
  } else {
    return insertItem(layoutState, { item, parentKey, index });
  }
};

export const insertItem = (layoutState, { item, parentKey, index }) => {
  item = item.set('parent', parentKey);
  return layoutState.setIn(['itemMap', item.key], item).updateIn(['itemMap', parentKey, 'children'], (children) => {
    return children.splice(index, 0, item.key);
  })
}

export const moveItem = (layoutState, { itemKey, parentKey, index }) => {
  const oldparentKey = layoutState.getItem(itemKey).parent;
  return layoutState.updateIn(['itemMap', oldparentKey, 'children'], (children) => {
    return children.filter((child) => !itemKey.equals(child));
  }).updateIn(['itemMap', parentKey, 'children'], (children) => {
    return children.splice(index, 0, itemKey);
  }).setIn(['itemMap', itemKey, 'parent'], parentKey);
}

export const removeItem = (layoutState, itemKey) => {
  if (itemKey.equals(LayoutState.ROOT_KEY)) {
    console.warn('Removing the root item is not allowed.');
    return layoutState;
  }
  const parentKey = layoutState.getIn(['itemMap', itemKey, 'parent']);
  let nextState = removeWithChildren(layoutState, itemKey);
  nextState = nextState.updateIn(['itemMap', parentKey, 'children'], (children) => {
    return children.filter((child) => !itemKey.equals(child));
  })
  return nextState;
}

const removeWithChildren = (layoutState, itemKey) => {
  let nextState = layoutState;
  const children = layoutState.getIn(['itemMap', itemKey, 'children']);
  children.forEach((child) => {
    nextState = removeWithChildren(nextState, child);
  })
  nextState = nextState.deleteIn(['itemMap', itemKey]);
  return nextState;
};