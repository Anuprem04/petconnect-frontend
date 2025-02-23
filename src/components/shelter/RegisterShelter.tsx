import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import classes from './RegisterShelter.module.css';

export function RegisterShelter() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/shelter'); // Navigate back to login after successful registration
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={1} className={classes.title} ta="center" mt="xs" mb={40}>
          ShelterSphere Welcome Wagon
        </Title>

        <form onSubmit={handleSubmit}>
          
          <TextInput
            label="Name"
            placeholder="Your full name"
            size="md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email"
            placeholder="hello@example.com"
            size="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            label="City"
            placeholder="Your city"
            size="md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextInput
            label="Phone"
            placeholder="Your Contact Number"
            size="md"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Button fullWidth mt="xl" size="md" type="submit">
            Register
          </Button>
        </form>

        <Text ta="center" mt="md" style={{ color: '#fff' }}>
          Already have an account?{' '}
          <Text
            component="a"
            href="/shelter"
            fw={700}
            style={{ color: '#007bff', cursor: 'pointer' }}
          >
            Login
          </Text>
        </Text>
      </Paper>
    </div>
  );
}
