# React Layout Plugin Edit

A plugin for the [react-layout-core](https://www.github.com/gregchamberlain/react-layout-core) package.
This plugin enables other plugins to edit the layoutState by dispatching `redux` actions. It also adds an onChange prop to `react-layout-core` `Layout`.

## Usage

```js
import React, { Component} from 'react';
import { Layout, LayoutState } from 'react-layout-core';
import Edit from 'react-layout-plugin-edit';

class MyComponent extends Component {

  constructor() {
    super();
    this.state = {
      layoutState: new LayoutState('div')
    }
  }

  layoutChange = layoutState => {
    this.setState({ layoutState });
  }

  render() {
    return (
      <Layout
        layoutState={this.state.layoutState}
        onChange={this.layoutChange}
        plugins={[Edit]}
      />
    )
  }
}
```

## Action creators

### insertOrMoveItem

> insertOrMoveItem(parentId, idx, item)

| Name | Type | Description |
| ---- | ---- | ----------- |
|parentId|string|The id of the parent this item will be assigned|
|idx|integer|The index in the parent's children the item will be placed|
|item|`LayoutState item`|The item that is being inserted or moved|

***Example***

This example will insert a new item, adding it to the layoutState and putting it in the `root` item's children and index `0`.

```js
insertOrMoveItem('root', 0, { type: 'div', props: {}, children: [] })
```

### updateItem

> updateItem(id, updater)

| Name | Type | Description |
| ---- | ---- | ----------- |
|id|string|The id of the item to be updated|
|updater|object|The object passed as the second argument of update from [immutability-helper](https://facebook.github.io/react/docs/update.html)|

***Example***

This example will update item with id `as873k`'s `name` prop to 'New Name'.

```js
updateItem('as873k', { props: { name: { $set: 'New Name' } } });
```

### removeItem

> removeItem(id)

| Name | Type | Description |
| ---- | ---- | ----------- |
|id|string|The id of the item to be removed|

***Example***

This example will remove the item with id `as873k`.

```js
removeItem('as873k');
```
