import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './scss/base.scss';
import App from './lib/App';

class ApplicationRoot extends Component {
  render() {
    return(
      <div id="root">
        <App />
      </div>
    )
  }
}

ReactDOM.render(
    <ApplicationRoot />,
    document.getElementById('root')
);
