import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const POST_ENROLL = 'auth/POST_ENROLL';

const actions = createAction({
    [POST_ENROLL]: () => {},
});

export const authReducer = handleActions(
    {
        [POST_ENROLL]: (state, {payload}) => {
            return payload;
        },
    },
    initialState
);