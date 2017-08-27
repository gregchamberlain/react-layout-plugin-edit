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
      props.setOnChange(props.onChange);
    }

    componentWillReceiveProps(props) {
      if (props.onChange !== this.props.onChange) {
        this.props.setOnChange(props.onChange);
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