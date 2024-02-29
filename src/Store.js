import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules'; // 루트 리듀서
import chatbotModule from '../src/modules/ChatbotModule';

const store = configureStore({
  reducer: {
    // 기존 루트 리듀서를 사용하고 추가적으로 counter 리듀서를 등록합니다.
    root: rootReducer,
    counter: chatbotModule,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // 기본 미들웨어 사용
  // Redux DevTools Extension은 자동으로 활성화됩니다.
});

export default store;
