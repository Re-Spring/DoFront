import { combineReducers } from 'redux';

import chatbot from "./ChatbotModule";
import { authReducer } from './AuthModule';

const rootReduceer = combineReducers({
    chatbot,
    authReducer,
});

export default rootReduceer;
