import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './RegisterShelter.module.css';

export function RegisterShelter() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
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
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        ShelterSphere Welcome Wagon
        </Title>

        <form onSubmit={handleSubmit}>
        <TextInput
            label="ShelterID"
            placeholder="Shelter ID"
            size="md"
            value={id}
            onChange={(e) => setId(e.target.value)}
            styles={{ label: { color: 'yellow' } }}
          />
          <TextInput
            label="Name"
            placeholder="Your full name"
            size="md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            styles={{ label: { color: 'yellow' } }}
          />
          <TextInput
            label="Email"
            placeholder="hello@example.com"
            size="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            styles={{ label: { color: 'yellow' } }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            styles={{ label: { color: 'yellow' } }}
          />
          <TextInput
            label="City"
            placeholder="Your city"
            size="md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            styles={{ label: { color: 'yellow' } }}
          />
          <TextInput
            label="Phone"
            placeholder="Your Contact Number"
            size="md"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            styles={{ label: { color: 'yellow' } }}
          />
          <Button fullWidth mt="xl" size="md" type="submit">
            Register
          </Button>
        </form>

        <Text ta="center" mt="md" style={{ color: '#333' }}>
          Already have an account?{' '}
          <Text
            component="a"
            href="/shelter"
            fw={700}
            style={{ color: 'yellow', cursor: 'pointer' }}
          >
            Login
          </Text>
        </Text>
      </Paper>
    </div>
  );
}
