import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk'; // 명명된 임포트로 변경
import rootReducer from './modules';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // 변경된 사용
);

export default store;
