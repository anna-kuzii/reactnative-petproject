import { createStore, applyMiddleware } from 'redux';
import app from './reducers';
import { composeWithDevTools } from 'remote-redux-devtools';

import createSagaMiddleware from 'redux-saga';
import saga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const composeEnhancers = composeWithDevTools({realtime: true});
    const store = createStore(app, composeEnhancers(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(saga);
    return store;
}
