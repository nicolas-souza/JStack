import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
      // ...options,
    });
  }

  async delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
      // ...options,
    });
  }

  async makeRequest(path, options) {
    await delay(1000);
    let responseBody = null;

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      // Object.keys(options.headers).forEach((name) => {
      //   headers.append(name, options.headers[name]);
      // });
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }
    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
