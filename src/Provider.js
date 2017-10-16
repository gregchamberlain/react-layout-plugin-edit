import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import connectLayout from 'react-layout-core/lib/utils/connectLayout';
import { setState } from 'react-layout-core/lib/redux/actions';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  setOnChange: (onChange) => dispatch(setState({ onChange }))
});

const Provider = (WrappedComponent) => {

  class EditProvider extends Component {

    pendingChanges = [];

    constructor(props) {
      super();
      this.nextState = props.layoutState;
      props.setOnChange(this.onChange);
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.layoutState !== nextProps.layoutState) {
        if (nextProps.layoutState === this.nextState) {
          this.applyPendingChanges();
        } else {
          this.pendingChanges = [];
        }
        this.nextState = nextProps.layoutState;
      }
    }

    applyPendingChanges = () => {
      if (!this.pendingChanges.length) return;
      for (const change of this.pendingChanges) {
        this.nextState = change(this.nextState);
      }
      this.pendingChanges = [];
      this.props.onChange(this.nextState);
    }

    onChange = (callback) => {
      if (this.props.layoutState === this.nextState) {
        this.nextState = callback(this.nextState);
        this.props.onChange(this.nextState);
      } else {
        this.pendingChanges.push(callback);
      }
    }

    render() {
      const { setOnChange, ...props } = this.props;
      return <WrappedComponent {...props} />
    }
  }

  hoistNonReactStatic(EditProvider, WrappedComponent);
  return connectLayout(mapStateToProps, mapDispatchToProps)(EditProvider);

}

export default Provider;