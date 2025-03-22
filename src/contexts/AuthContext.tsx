import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { AuthService } from '../services/auth/AuthService';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { name: string; email: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS = {
  admin: {
    email: 'admin@example.com',
    password: 'admin',
    userData: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin' as const
    }
  },
  user: {
    email: 'user@example.com',
    password: 'user',
    userData: {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Regular User',
      email: 'user@example.com',
      role: 'user' as const
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  
  const navigate = useNavigate();
  const toast = useToast();
  const authService = new AuthService();

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const userData = await authService.validateToken(token);
          setUser(userData);
        } catch (error) {
          console.error('Erro ao validar token:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    };

    validateAuth();
  }, []);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Check demo credentials first
      const demoAdmin = DEMO_USERS.admin;
      const demoUser = DEMO_USERS.user;

      if (email === demoAdmin.email && password === demoAdmin.password) {
        setUser(demoAdmin.userData);
        toast.success('Login realizado com sucesso!');
        return;
      }
      
      if (email === demoUser.email && password === demoUser.password) {
        setUser(demoUser.userData);
        toast.success('Login realizado com sucesso!');
        return;
      }

      // If not demo user, try API auth
      const { token, user: userData } = await authService.login(email, password);
      localStorage.setItem('auth_token', token);
      setUser(userData);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Email ou senha inválidos');
      throw new Error('Invalid credentials');
    }
  }, [toast]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const { token, user: userData } = await authService.register(name, email, password);
      localStorage.setItem('auth_token', token);
      setUser(userData);
      toast.success('Conta criada com sucesso!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Erro ao criar conta. Tente novamente.');
      throw new Error('Error creating account');
    }
  }, [toast]);

  const updateProfile = useCallback(async (data: { name: string; email: string }) => {
    if (!user) throw new Error('No user logged in');

    try {
      const updatedUser = await authService.updateProfile(user.id, data);
      setUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Erro ao atualizar perfil');
      throw error;
    }
  }, [user, toast, authService]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('user');
      navigate('/', { replace: true });
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Erro ao fazer logout');
      throw new Error('Error during logout');
    }
  }, [navigate, toast]);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}