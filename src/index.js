import React from 'react';

import mirror, {render} from 'mirrorx';
import {AppContainer} from 'react-hot-loader';
import App from './routes/index'

import {Provider} from 'mobx-react';
import users from './models/index';

import stores from './mobx';


mirror.model(users);

//historyMode : browser, hash, memory
mirror.defaults({
  historyMode: 'browser'
});

// render(<App/>, document.getElementById('root'));
render(<AppContainer><Provider mainStore={stores}><App/></Provider></AppContainer>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./routes/index', () => {
    const NewApp = require('./routes/index').default;
    render(<AppContainer><Provider mainStore={stores}><NewApp/></Provider></AppContainer>, document.getElementById('root'));
  })
}
