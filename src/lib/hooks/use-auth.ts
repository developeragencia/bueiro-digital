import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';
import { type User } from '../types';
import { authRequest } from '../api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const userData = await authRequest('/auth/validate');
          setUser(userData);
        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    validateAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      const { token, user: userData } = response;
      localStorage.setItem('auth_token', token);
      setUser(userData);
      navigate('/dashboard');
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Email ou senha inválidos');
      throw error;
    }
  }, [navigate, toast]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await authRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });

      const { token, user: userData } = response;
      localStorage.setItem('auth_token', token);
      setUser(userData);
      navigate('/dashboard');
      toast.success('Conta criada com sucesso!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Erro ao criar conta');
      throw error;
    }
  }, [navigate, toast]);

  const logout = useCallback(async () => {
    try {
      await authRequest('/auth/logout', { method: 'POST' });
      localStorage.removeItem('auth_token');
      setUser(null);
      navigate('/login');
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Erro ao fazer logout');
      throw error;
    }
  }, [navigate, toast]);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user?.id) throw new Error('No user logged in');

    try {
      const updatedUser = await authRequest(`/auth/profile/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });

      setUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Erro ao atualizar perfil');
      throw error;
    }
  }, [user, toast]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile
  };
}