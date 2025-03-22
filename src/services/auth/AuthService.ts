interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthResponse {
  token: string;
  user: User;
}

export class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || '';
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }

    return response.json();
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      throw new Error('Falha no registro');
    }

    return response.json();
  }

  async logout(): Promise<void> {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    const response = await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Falha no logout');
    }

    localStorage.removeItem('auth_token');
  }

  async validateToken(token: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/validate`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Token inválido');
    }

    return response.json();
  }

  async updateProfile(userId: string, data: { name: string; email: string }): Promise<User> {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Usuário não autenticado');

    const response = await fetch(`${this.baseUrl}/auth/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Falha ao atualizar perfil');
    }

    return response.json();
  }
} 