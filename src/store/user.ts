import { Writable, writable } from "svelte/store";

export interface UserStoreInterface {
    setUser(userData: any): void
    getUser(): Writable<any>
    setToken(token: string): void
    getToken(): Writable<string>
}

class UserStore implements UserStoreInterface {
    _token: Writable<string>
    _user: Writable<any>

    constructor() {
        this._token = writable(localStorage.getItem('accessToken'));
        this._user = writable({});
    }

    setUser(userData: any): void {
        this._user.set(userData);
    }

    getUser(): Writable<any> {
        return this._user;
    }

    setToken(token: string): void {
        this._token.set(token);
    }

    getToken(): Writable<string> {
        return this._token;
    }
}

const userStore = new UserStore();

export default userStore;
