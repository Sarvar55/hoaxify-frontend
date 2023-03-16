import { createStore, applyMiddleware } from "redux";
import authreducer from "./authReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import { clearAuthHeader, setAuthHeader } from "../api/apiCalls";
const secureLS = new SecureLS();

const getStateFromStorage = () => {
    const auth = secureLS.get("auth");

    let stateInLocalStorage = {
        isLoggedIn: false,
        userName: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined,
    };
    if (auth) {
        try {
            stateInLocalStorage = auth;
        } catch (error) {
            console.log(error.message);
        }
    }
    return stateInLocalStorage;
};

const updateStateInStorage = (newState) => {
    secureLS.set("auth", newState);
};
const configureStore = () => {
    const initState = getStateFromStorage();
    setAuthHeader(initState);
    const store = createStore(authreducer, initState, applyMiddleware(thunk));
    store.subscribe(() => {
        //storda her degisim oldugunda burasi calisir
        updateStateInStorage(store.getState());
        setAuthHeader(store.getState());
    });
    return store;
};

export default configureStore;