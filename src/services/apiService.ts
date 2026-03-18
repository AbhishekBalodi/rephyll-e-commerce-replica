/**
 * API Service - Handles all HTTP requests to the Express backend.
 */

const API_BASE_URL = (import.meta.env.VITE_BASE_URL || 'https://www.brandingidiots.tech') + '/api';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
    console.log('[ApiService] Initialized with base URL:', this.baseUrl);
  }

  /**
   * Get stored JWT token.
   */
  private getToken(): string | null {
    return localStorage.getItem('rephyl_token');
  }

  /**
   * Build headers for requests.
   */
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Generic fetch wrapper with error handling.
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log(`[ApiService] ${options.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(options.headers?.['Authorization'] !== undefined),
          ...options.headers,
        },
      });

      const data: ApiResponse<T> = await response.json();
      console.log(`[ApiService] Response ${response.status}:`, data);

      if (!response.ok) {
        console.error(`[ApiService] Request failed:`, data.message);
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error(`[ApiService] Network error on ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Submit contact form message.
   */
  async submitContactForm(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<ApiResponse> {
    console.log('[ApiService] Submitting contact form:', { name: data.name, email: data.email });
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Subscribe to newsletter.
   */
  async subscribeNewsletter(email: string): Promise<ApiResponse> {
    console.log('[ApiService] Subscribing to newsletter:', email);
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  /**
   * Register a new user.
   */
  async register(data: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
  }): Promise<ApiResponse> {
    console.log('[ApiService] Registering user:', data.email);
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Login user.
   */
  async login(email: string, password: string): Promise<ApiResponse> {
    console.log('[ApiService] Logging in:', email);
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * Health check.
   */
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health');
  }
}

// Export singleton instance
export const apiService = new ApiService();
