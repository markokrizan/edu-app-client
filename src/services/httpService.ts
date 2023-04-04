import variables from "../variables";

export interface HttpServiceInterface {
    request({ method, url, body, headers } : { method: string, url: string, body?: any, headers?: Record<string, string> }): Promise<any>
    download(url: string, fileName: string): void
    setBaseHeaders(headers: Record<string, string>): void
    withAuth(): HttpServiceInterface
}

class FetchHttpService implements HttpServiceInterface {
    baseHeaders: Record<string, string>;
    isAuthenticatedRequest: boolean = false;
    helperAnchor = null;

    async request({ method, url, body, headers = {} } : { method: string, url: string, body?: any, headers?: Record<string, string>}): Promise<any> {
        const requestHeaders = {
            ...this.baseHeaders,
            ...headers,
            ...(this.isAuthenticatedRequest ? { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } : {})
        }

        delete requestHeaders['Content-Type'];

        const response = await fetch(`${variables.apiBaseUri}/${url}`, { method, headers: requestHeaders, body: body});

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

    async download(url: string, fileName: string): Promise<void> {
        const response = await this.withAuth().request({ method: 'GET', url });

        const rawResponse = await response.blob();

        if (!rawResponse) {
            return;
        }

        const rawDataDownloadableUrl = window.URL.createObjectURL(new Blob([rawResponse]));
    
        if (!this.helperAnchor) {
            this.helperAnchor = document.createElement('a');
        }

        this.helperAnchor.download = fileName;
        this.helperAnchor.href = rawDataDownloadableUrl;
        this.helperAnchor.click();
    
        window.URL.revokeObjectURL(rawDataDownloadableUrl);
    }
}


const httpService = new FetchHttpService();

export default httpService;
