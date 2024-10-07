export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    name: string;
    email: string;
    password: string;
    username: string;
    phone: string;
}

export interface IUserLogged {
    access_token: string;
    user:         IUserLoginResponse;
}

export interface IUserLoginResponse {
    _id:      string;
    email:    string;
    username: string;
    name:     string;
    phone:    string;
    __v:      number;
}
