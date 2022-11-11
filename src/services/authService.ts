import httpService, { HttpServiceInterface } from "./httpService";
import { userStore } from '../store';
import type { UserStoreInterface } from "../store/user";
import { navigate } from "svelte-navigator";

class AuthService {
    httpService: HttpServiceInterface
    userStore: UserStoreInterface

    constructor(httpService: HttpServiceInterface, userStore: UserStoreInterface) {
        this.httpService = httpService;
        this.userStore = userStore;
    }

    async login(username: string, password: string): Promise<void> {
        const { accessToken } = await this.httpService.request({
            url: '/api/signin',
            method: 'POST',
            body: {
                username,
                password
            }
        })

        localStorage.setItem('accessToken', accessToken);

        this.userStore.setToken(accessToken);

        const user = await this.httpService.request({
            url: '/api/users/me',
            method: 'GET',
            body: {
                username,
                password
            }
        })

        this.userStore.setUser(user);

        navigate('/profile');
    }
}

const authService = new AuthService(httpService, userStore)

export default authService;
