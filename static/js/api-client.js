class ApiClient {
  constructor({ baseUrl, timeout = 10000 }) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.beforeRequest = [];
    this.afterResponse = [];
  }

  // --- Interceptor registration ---
  useRequestInterceptor(fn) {
    this.beforeRequest.push(fn);
  }

  useResponseInterceptor(fn) {
    this.afterResponse.push(fn);
  }

  // --- Token helpers ---
  getAccessToken() {
    return localStorage.getItem("access_token");
  }

  setAccessToken(token) {
    localStorage.setItem("access_token", token);
  }

  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  async refreshToken() {
    const refresh = this.getRefreshToken();
    if (!refresh) return null;

    const resp = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });

    if (!resp.ok) return null;
    const data = await resp.json();
    this.setAccessToken(data.access_token);
    return data.access_token;
  }

  // --- Core request ---
  async request(path, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    // Default headers
    let token = this.getAccessToken();
    let config = {
      url: `${this.baseUrl}${path}`,
      options: {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        signal: controller.signal,
      },
    };

    // Jalankan beforeRequest interceptors
    for (const fn of this.beforeRequest) {
      config = (await fn(config)) || config;
    }

    let response;
    try {
      response = await fetch(config.url, config.options);
    } finally {
      clearTimeout(timeoutId);
    }

    // Handle expired token → try refresh
    if (response.status === 401) {
      token = await this.refreshToken();
      if (!token) {
        window.location.href = "/login";
        return;
      }

      config.options.headers.Authorization = `Bearer ${token}`;
      response = await fetch(config.url, config.options);
    }

    // Run afterResponse interceptors
    for (const fn of this.afterResponse) {
      response = (await fn(response, config)) || response;
    }

    return response;
  }

  // --- Shortcut methods ---
  get(path, options = {}) {
    return this.request(path, { ...options, method: "GET" });
  }

  post(path, body, options = {}) {
    return this.request(path, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  }

  put(path, body, options = {}) {
    return this.request(path, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  }

  delete(path, options = {}) {
    return this.request(path, { ...options, method: "DELETE" });
  }
}
