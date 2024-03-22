import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = [];

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
      // 리듀서를 정의하고 관련된 액션을 자동으로 생성
      getExpVoice: (state, action) => {
        // 함수는 새로운 상태를 반환할 것으로 예상되지만,
        // 내부적으로 Redux Toolkit은 Immer를 사용하기 때문에 상태를 직접 변형할 수 있습니다
        return action.payload;
      },
      posdtDeleteVoice: (state, action) => {
        return action.payload;
      },
    },
});

// 생성된 Redux 액션 생성자를 내보냅니다
export const { getExpVoice, posdtDeleteVoice } = adminSlice.actions;

// createSlice에 의해 자동 생성된 리듀서를 내보냅니다
export default adminSlice.reducer;