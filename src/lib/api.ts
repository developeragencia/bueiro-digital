// Generic error handler
const handleError = (error: any) => {
  console.error('API Error:', error);
  throw new Error(error.message || 'An unexpected error occurred');
};

const baseUrl = process.env.REACT_APP_API_URL || '';

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('auth_token');

// Helper function to make authenticated requests
const authRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unexpected error occurred' }));
    throw new Error(error.message);
  }

  return response.json();
};

// Profiles
export const profiles = {
  get: async (userId: string) => {
    try {
      return await authRequest(`/profiles/${userId}`);
    } catch (error) {
      handleError(error);
    }
  },

  update: async (userId: string, updates: any) => {
    try {
      return await authRequest(`/profiles/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch (error) {
      handleError(error);
    }
  }
};

// Dashboards
export const dashboards = {
  list: async (userId: string) => {
    try {
      return await authRequest(`/dashboards?userId=${userId}`);
    } catch (error) {
      handleError(error);
    }
  },

  create: async (dashboard: any) => {
    try {
      return await authRequest('/dashboards', {
        method: 'POST',
        body: JSON.stringify(dashboard)
      });
    } catch (error) {
      handleError(error);
    }
  },

  update: async (id: string, updates: any) => {
    try {
      return await authRequest(`/dashboards/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (id: string) => {
    try {
      await authRequest(`/dashboards/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      handleError(error);
    }
  }
};

// Integration Settings
export const integrations = {
  list: async (userId: string) => {
    try {
      return await authRequest(`/integrations?userId=${userId}`);
    } catch (error) {
      handleError(error);
    }
  },

  get: async (platform: string, userId: string) => {
    try {
      return await authRequest(`/integrations/${platform}?userId=${userId}`);
    } catch (error) {
      handleError(error);
    }
  },

  save: async (settings: any) => {
    try {
      return await authRequest('/integrations', {
        method: 'POST',
        body: JSON.stringify(settings)
      });
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (id: string) => {
    try {
      await authRequest(`/integrations/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      handleError(error);
    }
  }
};