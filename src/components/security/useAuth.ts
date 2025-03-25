import { useMemo } from 'react';
import {jwtDecode} from 'jwt-decode';

export interface JwtPayload {
  role: string;
  id?: string;
  // add other fields as needed
}

export function useAuth() {
  const token = localStorage.getItem('token');
  return useMemo(() => {
    if (!token) return null;
    try {
      const payload = jwtDecode<JwtPayload>(token);
      return { token, ...payload };
    } catch (error) {
      return null;
    }
  }, [token]);

}
