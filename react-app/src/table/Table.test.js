import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const table = (<Table products={[]}></Table>);
  ReactDOM.render(table, div);
  ReactDOM.unmountComponentAtNode(div);
});
