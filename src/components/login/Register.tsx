import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './Register.module.css';

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [petPreferences, setPetPreferences] = useState<string[]>([]);

  const handleCheckboxChange = (preference: string) => {
    setPetPreferences((prevPreferences) =>
      prevPreferences.includes(preference)
        ? prevPreferences.filter((item) => item !== preference) // Remove preference if already selected
        : [...prevPreferences, preference] // Add preference if not selected
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // Logic to handle registration (e.g., API call)
      console.log('User registered successfully');
      navigate('/login'); // Navigate back to login after successful registration
    } else {
      alert("Passwords don't match!");
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        PetConnect Welcome Wagon
        </Title>

        <form onSubmit={handleSubmit}>
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
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            mt="md"
            size="md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Text mt="md" style={{ fontWeight: 500, fontSize: '1rem', color: 'yellow' }}>
            Pet Preference
          </Text>
          <Group mt="xs">
            <Checkbox
              label="Dogs"
              checked={petPreferences.includes('Dog')}
              onChange={() => handleCheckboxChange('Dog')}
            />
            <Checkbox
              label="Cats"
              checked={petPreferences.includes('Cat')}
              onChange={() => handleCheckboxChange('Cat')}
            />
            <Checkbox
              label="Birds"
              checked={petPreferences.includes('Bird')}
              onChange={() => handleCheckboxChange('Bird')}
            />
            <Checkbox
              label="Fishes"
              checked={petPreferences.includes('Bird')}
              onChange={() => handleCheckboxChange('Bird')}
            />
          </Group>
          <Button fullWidth mt="xl" size="md" type="submit">
            Register
          </Button>
        </form>

        <Text ta="center" mt="md" style={{ color: '#333' }}>
          Already have an account?{' '}
          <Text
            component="a"
            href="/login"
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
