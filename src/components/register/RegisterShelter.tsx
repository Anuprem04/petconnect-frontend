import { Button, Group, PasswordInput, TextInput, Title, Text, Input, InputWrapper, Paper, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications, showNotification } from '@mantine/notifications';
import { IMaskInput } from 'react-imask';
import classes from './RegisterShelter.module.css';

export function RegisterShelter() {
 
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: '',
      phone: '',
    },
    // Validate fields on blur
    validateInputOnBlur: true,
    validate: {
      name: (value) =>
        value.trim().length < 2 ? 'Name must be at least 2 characters' : null,
      email: (value) =>
        !/^\S+@\S+$/.test(value) ? 'Invalid email' : null,
      password: (value) => {
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (!/[A-Z]/.test(value))
          return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(value))
          return 'Password must contain at least one lowercase letter';
        if (!/\d/.test(value))
          return 'Password must contain at least one digit';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return 'Password must contain at least one special character';
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
      city: (value) =>
        value.trim().length === 0 ? 'City is required' : null,
      phone: (value) => {
        if (!value || value.trim() === '')
          return 'Phone number is required';
        return /^\+91 \(\d{5}\) \d{5}$/.test(value)
          ? null
          : 'Incomplete phone number';
      },
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    // Prepare payload matching backend expected fields (omit confirmPassword)
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      city: values.city,
      phone: (() => {
        // Extract only digits from the masked phone number
        const numericPhone = values.phone.replace(/\D/g, '');
        // Remove country code if it exists
        const localPhone = numericPhone.startsWith('91') ? numericPhone.slice(2) : numericPhone;
        const phoneNumber = parseInt(localPhone, 10);
        if (isNaN(phoneNumber)) {
          throw new Error('Invalid phone number');
        }
        return phoneNumber;
      })(),
    };

    try {
      const response = await fetch('http://localhost:8090/api/petConnect/shelters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Registration failed');
      const result = await response.json();
      const successMsg = "Shelter " + result.name + " registered successfully!";
      notifications.show({
        title: 'Success',
        message: successMsg,
        color: 'green',
        position: 'top-left',
        autoClose: 2000,
      });

      setTimeout(() => {
        window.location.href = '/login/shelter';
      }, 2000);
    } catch (error) {
      console.error('Error during registration:', error);
      showNotification({
        title: 'Error',
        message: 'Registration failed. Please try again.',
        color: 'red',
      });
    }
  });

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
            variant="filled"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="hello@example.com"
            size="md"
            variant="filled"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            variant="filled"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            mt="md"
            size="md"
            variant="filled"
            {...form.getInputProps('confirmPassword')}
          />
          <TextInput
            label="City"
            placeholder="Your city"
            size="md"
            variant="filled"
            mt="md"
            {...form.getInputProps('city')}
          />
          <InputWrapper label="Phone" variant="filled" mt="md" error={form.errors.phone}>
            <Input
              component={IMaskInput}
              mask="+91 (00000) 00000"
              placeholder="Your phone"
              variant="filled"
              {...form.getInputProps('phone')}
            />
          </InputWrapper>

          <Group justify="center" mt="xl">
            <Button type="submit" size="md">
              Register
            </Button>
          </Group>
        </form>
        <Text ta="center" mt="md" style={{ color: '#fff' }}>
          Already have an account?{' '}
          <Anchor href="/login/shelter" style={{ color: '#007bff', fontWeight: 700, cursor: 'pointer' }}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
