import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Anchor,
    Button,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
  import classes from './ShelterLogin.module.css';
  
  export function Shelter() {
    const navigate = useNavigate();

    const handleShelterRegisterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        navigate('/registerShelter');
      };
      
      const handleForgotPasswordClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        navigate('/forgot-password');
    };
    const handleBackToHomeClick = () => {
        navigate('/'); // Navigate to the landing page
      };
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome to ShelterSphere
          </Title>
  
          <TextInput label="Email" placeholder="hello@gmail.com" size="md" styles={{ label: { color: '#fff'} }} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" styles={{ label: { color:  '#fff'} }} />
          <Text ta="right" mt="xs" style={{ fontSize: '0.9rem', color: 'black' }}>
                    <Anchor<'a'> href="#" onClick={handleForgotPasswordClick} fw={500} style={{ color: 'black' }}>
                        Forgot Password?
                    </Anchor>
                </Text>
          <Button fullWidth mt="xl" size="md">
            Login
          </Button>
  
          <Text ta="center" mt="md" style={{ color: '#fff' }}>
            Don&apos;t have an account?{' '}
            <Anchor<'a'> href="#" fw={700} onClick={handleShelterRegisterClick} style={{ color: 'black' }}>
              Register
            </Anchor>
          </Text>
          <Text ta="center" mt="lg" style={{ color: '#fff' }}>
          <Anchor<'a'>
            href="#"
            onClick={handleBackToHomeClick}
            fw={700}
            style={{ color: 'black', fontSize: '1rem' }}
          >
            Back to Home
          </Anchor>
        </Text>
        </Paper>
      </div>
    );
  }