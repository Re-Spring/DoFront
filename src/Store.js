import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules'; // 루트 리듀서

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // 기본 미들웨어 사용
  // Redux DevTools Extension은 자동으로 활성화됩니다.
});

export default store;
