import { combineReducers } from 'redux';
// Default import를 사용하여 authReducer라는 이름으로 import
import authReducer from './AuthModule'; // 'authReducer' 대신 default export를 authReducer로 import

const rootReducer = combineReducers({
    // 이제 authReducer를 combineReducers에 정확히 등록합니다.
    auth: authReducer,
});

export default rootReducer;
