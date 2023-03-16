import axios from "axios";

export const signUp = (body) => {
    return axios.post("/api/1.0/users", body);
};

export const login = (creds) => {
    return axios.post("/api/1.0/auth", creds);
};

export const changeLanguage = (language) => {
    axios.defaults.headers["accept-language"] = language;
};
export const getUsers = (page = 0, size = 3) => {
    return axios.get(`/api/1.0/users?currentPage=${page}&currentSize=${size}`);
};

export const setAuthHeader = ({ token, isLoggedIn }) => {
    if (isLoggedIn) {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
        clearAuthHeader();
    }
};
// const generateBase64 = (userName, password) => {
//     const token = userName + ":" + password;
//     const hash = btoa(token);
//     return "Basic " + hash;
// };
export const clearAuthHeader = () => {
    delete axios.defaults.headers["Authorization"];
};

export const getUser = (userName) => {
    return axios.get(`/api/1.0/users/${userName}`);
};

export const updateUser = (userName, body) => {
    return axios.put(`/api/1.0/users/${userName}`, body);
};

export const postHoax = (hoax) => {
    return axios.post(`/api/1.0/hoaxes`, hoax);
};

export const getHoaxes = (username = undefined, page = 0) => {
    const path = username ?
        `/api/1.0/users/${username}/hoaxes?currentPage${page}` :
        `/api/1.0/hoaxes/?currentPage${page}`;
    return axios.get(path);
};

export const getOldHoaxes = (hoaxId, username) => {
    const path = username ?
        `/api/1.0/users/${username}/hoaxes/${hoaxId}` :
        `/api/1.0/hoaxes/${hoaxId}`;
    return axios.get(path);
};

export const getNewHoaxCount = (hoaxId, username) => {
    const path = username ?
        `/api/1.0/users/${username}/hoaxes/${hoaxId}?count=true` :
        `/api/1.0/hoaxes/${hoaxId}?count=true`;
    return axios.get(path);
    //ilk hoaxi alip gondermemizin sebebi su ki desc dedik ve en buyuk id ilk siradaki hoaxin id si olucak
    // veri tanabinda da onda buyuk bir id varsa kac tane oldugu donulucek ve bu sekilde kontrol yapilicak
    // ama pek de sagilikli bir yontem degil
};
export const getNewHoaxes = async(hoaxId, username, direction = "before") => {
    const path = username ?
        `/api/1.0/users/${username}/hoaxes/${hoaxId}?direction=after` :
        `/api/1.0/hoaxes/${hoaxId}?direction=after`;
    return axios.get(path);
};

export const postHoaxAttacment = (body) => {
    return axios.post("/api/1.0/hoax-attacments", body);
};

export const deleteHoax = (hoaxId) => {
    return axios.delete(`/api/1.0/hoaxes/${hoaxId}`);
};

export const deleteUser = (userName) => {
    return axios.delete(`/api/1.0/users/${userName}`);
};