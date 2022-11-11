export interface HttpServiceInterface {
    request({ method, url, body, headers } : { method: string, url: string, body: any, headers?: Record<string, string> }): Promise<any>
}

class FetchHttpService implements HttpServiceInterface {
    async request({ method, url, body, headers = {} } : { method: string, url: string, body: any, headers?: Record<string, string> }): Promise<any> {
        const response = await fetch(`${process.env.API_BASE_URI}/${url}`, { method, headers, body});

        if (response.headers.get('Content-Type') === 'application/json') {
            return await response.json();
        }

        return response;
    }
}


const httpService = new FetchHttpService();

export default httpService;
