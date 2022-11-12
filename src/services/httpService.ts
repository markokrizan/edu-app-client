export interface HttpServiceInterface {
    request({ method, url, body, headers } : { method: string, url: string, body?: any, headers?: Record<string, string> }): Promise<any>
    setBaseHeaders(headers: Record<string, string>): void
    withAuth(): HttpServiceInterface
}

class FetchHttpService implements HttpServiceInterface {
    baseHeaders: Record<string, string>;
    isAuthenticatedRequest: boolean = false;

    async request({ method, url, body, headers = {} } : { method: string, url: string, body?: any, headers?: Record<string, string> }): Promise<any> {
        const requestHeaders = {
            ...this.baseHeaders,
            ...headers,
            ...(this.isAuthenticatedRequest ? { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } : {})
        }

        const response = await fetch(`${process.env.API_BASE_URI}/${url}`, { method, headers: requestHeaders, body: body});

        if (!response.ok) {
            if (response.headers.get('Content-Type') !== 'application/json') {
                throw { error: "Cannot parse API error message - response not in json format!"}
            }

            throw await response.json()
        }

        if (response.headers.get('Content-Type') === 'application/json') {
            return await response.json();
        }

        return response;
    }

    setBaseHeaders(headers: Record<string, string>): void {
        this.baseHeaders = headers
    }

    withAuth(): HttpServiceInterface {
        this.isAuthenticatedRequest = true;

        return this;
    }
}


const httpService = new FetchHttpService();

export default httpService;
