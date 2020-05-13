import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App {...this.props}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
