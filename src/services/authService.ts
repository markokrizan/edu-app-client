import httpService, { HttpServiceInterface } from "./httpService";
import { userStore } from '../store';
import type { UserStoreInterface } from "../store/user";
import { navigate } from "svelte-navigator";
import type { QueryClient } from "@sveltestack/svelte-query";
import queryClient from "../store/queryClient";

class AuthService {
    httpService: HttpServiceInterface
    userStore: UserStoreInterface
    queryClient: QueryClient

    constructor(httpService: HttpServiceInterface, userStore: UserStoreInterface, queryClient: QueryClient) {
        this.httpService = httpService;
        this.userStore = userStore;
        this.queryClient = queryClient;

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
        this.queryClient.clear()
    }
}

const authService = new AuthService(httpService, userStore, queryClient)

export default authService;
