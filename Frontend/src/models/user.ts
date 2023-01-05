export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface UserRegisterData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserLoginData {
    username: string;
    password: string;
}