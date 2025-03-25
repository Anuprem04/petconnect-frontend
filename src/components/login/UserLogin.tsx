import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Alert,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './UserLogin.module.css';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Clear previous errors
    try {
      const response = await fetch('http://localhost:8090/api/petConnect/login/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
      }
      const data = await response.json();
      // Save the token and role in localStorage
      localStorage.setItem('token', data.token);
      notifications.show({
        title: 'Success',
        message: 'Login successful',
        color: 'green',
        autoClose: 2000,
      });
      navigate('/dashboard'); // Navigate to the user dashboard
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Login failed');
      // Optionally, you can also show a notification here.
      // showNotification({
      //   title: 'Error',
      //   message: error.message || 'Login failed',
      //   color: 'red',
      // });
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/register/user');
  };

  const handleForgotPasswordClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/forgot-password');
  };

  const handleBackToHomeClick = () => {
    navigate('/home');
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to PetConnect
        </Title>
        {errorMessage && (
          <Alert
            title="Error"
            color="red"
            mb="md"
            style={{
              backgroundColor: '#8B0000', // Darker red background
              borderColor: '#8B0000',
              color: '#fff',
            }}
          >
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            placeholder="hello@gmail.com"
            size="md"
            styles={{ label: { color: '#0d0f12' } }}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            styles={{ label: { color: '#0d0f12' } }}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Text ta="right" mt="xs" style={{ fontSize: '0.9rem', color: 'black' }}>
            <Anchor href="#" onClick={handleForgotPasswordClick} fw={500} style={{ color: 'black' }}>
              Forgot Password?
            </Anchor>
          </Text>
          <Button fullWidth mt="xl" size="md" type="submit" loading={loading}>
            Login
          </Button>
        </form>
        <Text ta="center" mt="md" style={{ color: '#0d0f12' }}>
          Don&apos;t have an account?{' '}
          <Anchor href="#" fw={700} onClick={handleRegisterClick} style={{ color: 'black' }}>
            Register
          </Anchor>
        </Text>
        <Text ta="center" mt="lg" style={{ color: '#0d0f12' }}>
          <Anchor href="/home" onClick={handleBackToHomeClick} fw={700} style={{ color: 'black', fontSize: '1rem' }}>
            Back to Home
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
