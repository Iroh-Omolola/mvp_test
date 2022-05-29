import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ui from './ui';
import app from './app';

const appReducers = history => 
    combineReducers({
        router: connectRouter(history),
        ui,
        ...app,
    });


export default appReducers;
