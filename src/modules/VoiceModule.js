
import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = [];

// "auth" 기능에 대한 슬라이스 생성
const voiceSlice = createSlice({
    name: 'voice',
    initialState,
    reducers: {
    // 리듀서를 정의하고 관련된 액션을 자동으로 생성
    postClone: (state, action) => {
      // 함수는 새로운 상태를 반환할 것으로 예상되지만,
      // 내부적으로 Redux Toolkit은 Immer를 사용하기 때문에 상태를 직접 변형할 수 있습니다
    return action.payload;
        }
    },
});

// 생성된 Redux 액션 생성자를 내보냅니다
export const { postClone } = voiceSlice.actions;

// createSlice에 의해 자동 생성된 리듀서를 내보냅니다
export default voiceSlice.reducer;
