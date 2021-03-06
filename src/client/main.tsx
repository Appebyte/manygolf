require('../../styles/main.less');

import './util/registerPolyfill';
import './util/registerErrorHandler';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Main from './components/Main';
import initialize from './initialize';

function main() {
  const el = document.getElementById('react-container');

  // Bail out early if missing required browser features
  // XXX: typescript doesn't think window.WebSocket exists?
  if (!(window as any).WebSocket) {
    renderMissingFeatures(el);
    return;
  }

  const store = initialize();

  ReactDOM.render((
    <Provider store={store}>
      <Main />
    </Provider>
  ), el);
}

function renderMissingFeatures(el: HTMLElement) {
  el.innerHTML = `
    <div class="browser-error">
      <p>
        Your browser does not support WebSockets, which are required for Manygolf to work.
      </p>
      <p>
        Please upgrade your browser to one of the following: Google Chrome, Firefox 11+, Internet
        Explorer 10+, or Safari 6+.
      </p>
    </div>
  `;
}

main();