import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import customMiddleWares from '../redux/middleware';
import appReducers from '../redux/reducers';


export const history = createBrowserHistory();

const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP_STATE') {
        state = undefined;
    }
    return appReducers(history)(state, action);
};

// add the middleWares
const middleWares = [...customMiddleWares, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
    middleWares.push(createLogger());
}
// apply the middleware
let middleware = applyMiddleware(...middleWares);
if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}


const store = createStore(rootReducer, { ui:{
    errors: {},
    loading: {},

}, app:{}, router: [] }, middleware);

store.subscribe(() => {
    saveState({ app: store.getState()});
});

export default store;


function saveState(state) {
   return state

}