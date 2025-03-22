import { Button, Group, Checkbox, PasswordInput, TextInput, Title, Text, Input, InputWrapper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications, showNotification } from '@mantine/notifications';
import classes from './RegisterUser.module.css';
import { IMaskInput } from 'react-imask';

export function RegisterUser() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: '',
      phone: '',
      petPreferences: [] as string[],
    },
    // This flag makes fields validate on blur (i.e. outside click)
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
        // Here, adjust the test if your mask doesn't use underscores or similar placeholders.
        return /^\+91 \(\d{5}\) \d{5}$/.test(value)
          ? null
          : 'Incomplete phone number';
      },
    },
  } );
  console.info(form.errors)
  const handleSubmit = form.onSubmit(async (values) => {
    console.log("executed");
    // Prepare payload matching backend UserDto (omit confirmPassword)
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      petPreferences: values.petPreferences.join(','),
      phone: (() => {
        // Extract only digits
        const numericPhone = values.phone.replace(/\D/g, '');
  
        // Remove +91 if it exists at the start
        const localPhone = numericPhone.startsWith('91') ? numericPhone.slice(2) : numericPhone;
  
        // Convert to number and validate
        const phoneNumber = parseInt(localPhone, 10);
        if (isNaN(phoneNumber)) {
          throw new Error('Invalid phone number');
        }
        return phoneNumber;
      })(),
      city: values.city,
    };

    try {
      const response = await fetch('http://localhost:8090/api/petConnect/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Registration failed');
      const result = await response.json();
      const successMsg = "User " + result.name + " registered successfully!";
      notifications.show({
        title: 'Success',
        message: successMsg,
        color: 'green',
        position: 'top-left',
        autoClose: 2000,
      });
  
      // Redirect to login after 2 seconds (to match autoClose)
      setTimeout(() => {
        window.location.href = '/login/user';
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
    <div className={classes.bg}>
      <div className={classes.glassContainer}>
        <Title order={2} ta="center">
          PetConnect Welcome Wagon
        </Title>
        <Text size="sm" align="center" mt={5}>
          Register to find your perfect pet match!
        </Text>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            placeholder="Your full name"
            mt="md"
            variant="filled"
            {...form.getInputProps('name')}
          />

          {/* Use Input.Wrapper if you want to wrap a custom component */}
          <InputWrapper label="Phone" variant="filled" mt="md" error={form.errors.phone} >
            <Input
              component={IMaskInput}
              mask="+91 (00000) 00000"
              placeholder="Your phone"
              variant="filled"
              {...form.getInputProps('phone')}
            />
          </InputWrapper>

          <TextInput
            label="Email"
            placeholder="hello@example.com"
            mt="md"
            variant="filled"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            variant="filled"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            mt="md"
            variant="filled"
            {...form.getInputProps('confirmPassword')}
          />
          <TextInput
            label="City"
            placeholder="Your city"
            mt="md"
            variant="filled"
            {...form.getInputProps('city')}
          />

          <Text mt="md" weight={500}>
            Pet Preferences
          </Text>
          <Group mt="xs">
            {['Dogs', 'Cats', 'Birds', 'Fishes'].map((pet) => (
              <Checkbox
                key={pet}
                label={pet}
                checked={form.values.petPreferences.includes(pet)}
                onChange={(event) => {
                  const updatedPreferences = event.currentTarget.checked
                    ? [...form.values.petPreferences, pet]
                    : form.values.petPreferences.filter((item) => item !== pet);
                  form.setFieldValue('petPreferences', updatedPreferences);
                }}
              />
            ))}
          </Group>

          <Group justify="center" mt="xl">
            <Button type="submit" size="md">
              Register
            </Button>
          </Group>
        </form>
        <Text ta="center" mt="md" style={{ color: '#fff' }}>
  Already have an account?{' '}
  <a href="/login/user" style={{ color: '#007bff', fontWeight: 700, cursor: 'pointer' }}>
    Login
  </a>
</Text>
      </div>
    </div>
  );
}
