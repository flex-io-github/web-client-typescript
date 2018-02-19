import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// import createSagaMiddleware from 'redux-saga'
// import rootSaga from '../_saga/sagas';

const loggerMiddleware = createLogger();
// const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
);

// export const store = createStore(
//     rootReducer,
//     composeWithDevTools(
//         applyMiddleware(
//             sagaMiddleware,
//             loggerMiddleware
//         )
//     )
// );

// sagaMiddleware.run(rootSaga);
