import { clearUserData,getUserData,setUserData} from "../util.js";

const host = 'http://localhost:3030';

async function request(method,url,data) {

    const options = {
        method,
        headers:{}
    }

    const token = getUserData();

    if(token) {
        options.headers['X-Authorization'] = token.token;
    }

    if(data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }


    try {
        let response = await fetch(host + url, options);


        if(!response.ok){ 
            if(response.status == 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status == 204) {
            return response
        } else {
            return response.json();
        }
    } catch(error) {
        alert(error.message);
        throw error;
    }
}


export const get = request.bind(null,'get');
export const post = request.bind(null,'post');
export const put = request.bind(null,'put');
export const del = request.bind(null,'delete');



export async function login(email,password) {
    let result = await post('/users/login', {email,password});

    let userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }

    setUserData(userData);
    return result;
}
export async function register(email,password) {
    let result = await post('/users/register', {email,password});

    let userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }

    setUserData(userData);
    return result;
}


export async function logout() {
    get('users/logout');
    clearUserData();
}