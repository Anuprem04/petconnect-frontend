import React from 'react';
import {
    Anchor,
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
  import classes from './Login.module.css';
  
  export function Login() {
    const handleRegisterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
      };
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome to PetConnect
          </Title>
  
          <TextInput label="Email" placeholder="hello@gmail.com" size="md" styles={{ label: { color: '#333'} }} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" styles={{ label: { color:  '#333'} }} />
          <Checkbox label="Keep me logged in" mt="xl" size="md" styles={{ label: { color:  '#333' } }} />
          <Button fullWidth mt="xl" size="md">
            Login
          </Button>
  
          <Text ta="center" mt="md" style={{ color: '#333' }}>
            Don&apos;t have an account?{' '}
            <Anchor<'a'> href="#" fw={700} onClick={handleRegisterClick}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </div>
    );
  }