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

    constructor(props) {
      super();
      this.nextState = props.layoutState;
      this.animationFrameRequested = false;
      props.setOnChange(this.onChange);
    }

    componenentDidReceiveProps(nextProps) {
      if (this.props.layoutState !== nextProps.layoutState) {
        this.nextState = nextProps.layoutState;
      }
    }

    onChange = (callback) => {
      this.nextState = callback(this.nextState);
      if (!this.animationFrameRequested) {
        window.requestAnimationFrame(this.onAnimationFrame);
        this.animationFrameRequested = true;
      }
    }

    onAnimationFrame = () => {
      this.animationFrameRequested = false;
      if (this.props.layoutState !== this.nextState) {
        this.props.onChange(this.nextState);
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