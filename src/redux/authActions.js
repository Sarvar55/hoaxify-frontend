import { login, setAuthHeader, signUp } from "../api/apiCalls";
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    UPDATE_SUCCESS,
} from "../config/Constants";

export const loguotSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};
export const loginSuccess = (state) => {
    return {
        type: LOGIN_SUCCESS,
        payload: state,
    };
};
export const updateSuccess = ({ displayName, image }) => {
    return {
        type: UPDATE_SUCCESS,
        payload: {
            displayName,
            image,
        },
    };
};

export const loginHandler = (creds) => {
    return async(dispatch) => {
        const res = await login(creds);
        const authState = {
            ...res.data.user,
            password: creds.password,
            token: res.data.token,
        };
        dispatch(loginSuccess(authState));
        return res;
    };
};
export const signUpHandler = (user) => {
    return async(dispatch) => {
        const response = await signUp(user);
        const { userName: username, password } = user;
        await dispatch(loginHandler({ username, password }));
        return response;
    };
};