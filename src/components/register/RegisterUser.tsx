import { Button, Group, Checkbox, PasswordInput, TextInput, Title, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './RegisterUser.module.css';

export function Register() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: '',
      petPreferences: [] as string[],
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value) => (!/^\S+@\S+$/.test(value) ? 'Invalid email' : null),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
      city: (value) => (value.trim().length === 0 ? 'City is required' : null),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log('Form submitted:', values);
    // Add your registration logic here (e.g., API call)
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
            name="name"
            variant="filled"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="hello@example.com"
            mt="md"
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            name="password"
            variant="filled"
            {...form.getInputProps('password')}
          />
        
          <TextInput
            label="City"
            placeholder="Your city"
            mt="md"
            name="city"
            variant="filled"
            {...form.getInputProps('city')}
          />

          <Text mt="md" weight={500}>
            Pet Preferences
          </Text>
          <Group mt="xs">
            <Checkbox
              label="Dogs"
              checked={form.values.petPreferences.includes('Dogs')}
              onChange={(event) => {
                const updatedPreferences = event.currentTarget.checked
                  ? [...form.values.petPreferences, 'Dogs']
                  : form.values.petPreferences.filter((item) => item !== 'Dogs');
                form.setFieldValue('petPreferences', updatedPreferences);
              }}
            />
            <Checkbox
              label="Cats"
              checked={form.values.petPreferences.includes('Cats')}
              onChange={(event) => {
                const updatedPreferences = event.currentTarget.checked
                  ? [...form.values.petPreferences, 'Cats']
                  : form.values.petPreferences.filter((item) => item !== 'Cats');
                form.setFieldValue('petPreferences', updatedPreferences);
              }}
            />
            <Checkbox
              label="Birds"
              checked={form.values.petPreferences.includes('Birds')}
              onChange={(event) => {
                const updatedPreferences = event.currentTarget.checked
                  ? [...form.values.petPreferences, 'Birds']
                  : form.values.petPreferences.filter((item) => item !== 'Birds');
                form.setFieldValue('petPreferences', updatedPreferences);
              }}
            />
            <Checkbox
              label="Fishes"
              checked={form.values.petPreferences.includes('Fishes')}
              onChange={(event) => {
                const updatedPreferences = event.currentTarget.checked
                  ? [...form.values.petPreferences, 'Fishes']
                  : form.values.petPreferences.filter((item) => item !== 'Fishes');
                form.setFieldValue('petPreferences', updatedPreferences);
              }}
            />
          </Group>

          <Group justify="center" mt="xl">
            <Button type="submit" size="md">
              Register
            </Button>
          </Group>
        </form>
      </div>
    </div>
  );
}
