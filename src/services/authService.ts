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

        httpService.setBaseHeaders({
            'Content-Type': 'application/json'
        })

        this.loadCurrentUser();
    }

    async login(username: string, password: string): Promise<void> {
        const { accessToken } = await this.httpService.request({
            url: 'api/auth/signin',
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        })

        localStorage.setItem('accessToken', accessToken);

        this.userStore.setToken(accessToken);

        this.loadCurrentUser();
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('accessToken');
    }

    async loadCurrentUser(): Promise<any> {
        if (!this.isLoggedIn()) {
            return;
        }

        try {
            const user = await this.httpService
                .withAuth()
                .request({
                    url: 'api/users/me',
                    method: 'GET'
                })

            this.userStore.setUser(user);
        } catch (e) {
            if (e.status === 401) {
                localStorage.removeItem('accessToken');

                navigate('/login');
            }
        }
    }

    logout() {
        localStorage.removeItem('accessToken');
        this.userStore.setUser(null);
        this.userStore.setToken(null);
    }
}

const authService = new AuthService(httpService, userStore)

export default authService;
