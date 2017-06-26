// @flow
import React, { PureComponent } from 'react';
import { connectLayout } from 'react-layout-core';
import hoistNonReactStatic from 'hoist-non-react-statics';

const Provider = (WrappedComponent: Function) => {
  class EditProvider extends PureComponent {
    componentWillReceiveProps(nextProps) {
      if (nextProps.layoutState !== nextProps.nextLayoutState) {
        this.props.onChange(nextProps.nextLayoutState);
      }
    }

    render() {
      const { layoutState, nextLayoutState, ...props } = this.props;
      return <WrappedComponent {...props} />
    }
  }

  hoistNonReactStatic(EditProvider, WrappedComponent);

  const mapStateToProps = ({ layoutState, nextLayoutState }) => ({
    layoutState,
    nextLayoutState
  });

  return connectLayout(mapStateToProps)(EditProvider);
}

export default Provider;
