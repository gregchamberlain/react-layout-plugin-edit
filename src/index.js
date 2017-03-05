import reducer from './reducer';
import Provider from './Provider';

const factory = props => {
  return {
    Name: 'nextLayoutState',
    reducer: reducer(props.layoutState),
    Provider
  };
}

export default factory;