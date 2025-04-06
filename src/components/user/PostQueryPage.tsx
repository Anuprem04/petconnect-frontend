import React, { useState } from 'react';
import {
  Container,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Box,
  Stack,
  Notification,
  Center,
  Group,
  Divider,
  useMantineTheme,
  Anchor,
} from '@mantine/core';
import { IconSend, IconCheck, IconMail, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const PostQueryPage = () => {
    const navigate = useNavigate();
    const handleBackToHomeClick = () => {
        navigate('/home');
      };
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const theme = useMantineTheme();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Box
  style={{
    minHeight: '100vh',
    backgroundImage: `url('https://images.unsplash.com/photo-1607808915002-7019e6d07f82?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  }}
>
  {/* Overlay for blur */}
  <Box
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backdropFilter: 'blur(6px)',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      zIndex: 0,
    }}
  />

  {/* Foreground content */}
  <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Header */}
        <Center mb="xl" style={{ flexDirection: 'column'}}>
          <Title order={2} c="yellow" fw={700} >
            Post Your Query
          </Title>
          <Text c="black" size="md" mt="xs" ta="center">
            We'd love to hear from you! Feel free to reach out with questions or feedback.
          </Text>
        </Center>

        {/* Card-like Form Section */}
        <Box
          p="xl"
          style={{
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.md,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack justify="lg">
              <TextInput
                label="Full Name"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={(e) => handleChange('name', e.currentTarget.value)}
                styles={{
                    input: {
                      color: 'yellow', // input text color
                    },
                    label: {
                      color: 'black', // optional: label text color
                    },
                  }}
              />
              <TextInput
                label="Email Address"
                placeholder="you@example.com"
                required
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.currentTarget.value)}
                styles={{
                    input: {
                      color: 'yellow', // input text color
                    },
                    label: {
                      color: 'black', // optional: label text color
                    },
                  }}
              />
              <TextInput
                label="Subject"
                placeholder="Eg: Pet Adoption Inquiry"
                required
                value={form.subject}
                onChange={(e) => handleChange('subject', e.currentTarget.value)}
                styles={{
                    input: {
                      color: 'yellow', // input text color
                    },
                    label: {
                      color: 'black', // optional: label text color
                    },
                  }}
              />
              <Textarea
                label="Your Message"
                placeholder="Write your query here..."
                autosize
                minRows={4}
                required
                value={form.message}
                onChange={(e) => handleChange('message', e.currentTarget.value)}
                styles={{
                    input: {
                      color: 'yellow', // input text color
                    },
                    label: {
                      color: 'black', // optional: label text color
                    },
                  }}
              />

              <Divider my="sm" />

              <Group justify="flex-end">
                <Button
                  type="submit"
                  size="md"
                  color="teal"
                  leftSection={<IconSend size={18} />}
                  radius="xl"
                >
                  Submit Query
                </Button>
              </Group>
            </Stack>
          </form>

          {submitted && (
            <Notification
              icon={<IconCheck size={18} />}
              color="green"
              mt="lg"
              title="Query sent successfully!"
              onClose={() => setSubmitted(false)}
            >
              Thank you! We’ll get back to you shortly.
            </Notification>
          )}
        </Box>
        <Text ta="center" mt="lg" style={{ color: '#0d0f12' }}>
                                              <Anchor href="/home" onClick={handleBackToHomeClick} fw={700} style={{ color: 'black', fontSize: '1rem' }}>
                                                Back to Home
                                              </Anchor>
                                            </Text>
      </Container>
    </Box>
  );
};

export default PostQueryPage;
