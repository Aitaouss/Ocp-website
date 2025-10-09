// API Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper function for API calls
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

// Authentication API
export const authAPI = {
  // Register new user
  register: async (email: string, password: string, phone?: string) => {
    return fetchAPI("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, phone }),
    });
  },

  // Login user
  login: async (email: string, password: string) => {
    return fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // Logout user
  logout: async () => {
    return fetchAPI("/auth/logout", {
      method: "POST",
    });
  },

  // Get current user
  getCurrentUser: async () => {
    return fetchAPI("/auth/me");
  },
};

// Users API
export const usersAPI = {
  // Get all users
  getAll: async () => {
    return fetchAPI("/users");
  },

  // Get user by ID
  getById: async (id: number) => {
    return fetchAPI(`/users/${id}`);
  },

  // Create user
  create: async (userData: {
    email: string;
    password: string;
    phone?: string;
  }) => {
    return fetchAPI("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Update user
  update: async (id: number, userData: { email?: string; phone?: string }) => {
    return fetchAPI(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  // Delete user
  delete: async (id: number) => {
    return fetchAPI(`/users/${id}`, {
      method: "DELETE",
    });
  },
};
