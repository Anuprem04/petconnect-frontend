import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Button,
  Paper,
  Text,
  TextInput,
  Title,
  Group,
  Box,
  Center
} from '@mantine/core';
import classes from './ForgotPassword.module.css';

export function ForgotPassword() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title className={classes.title} ta="center" mb={15}>
          Forgot your password?
        </Title>
        <Text align="center" mb={20} style={{ color: 'black' }}>
          Enter your email to get a reset link
        </Text>

        <TextInput
          label="Your email"
          placeholder="me@mantine.dev"
          required
          styles={{ label: { color: 'black' } }}
        />

        <Group justify="space-between" mt="lg">
          <Anchor
            size="sm"
            onClick={handleBackToLogin}
            style={{ color: 'black', cursor: 'pointer' }}
          >
            <Center inline>
              <IconArrowLeft size={12}  stroke={1.5} />
              <Box c='black' ml={5}>Back to login</Box>
            </Center>
          </Anchor>
          <Button>Reset password</Button>
        </Group>
      </Paper>
    </div>
  );
}
