import React, { useState, useEffect } from 'react';
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
  Anchor,
  Select,
  useMantineTheme,
} from '@mantine/core';
import { IconSend, IconCheck } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { MainLink, Header } from '../header/Header';
import { ViewProfileModal } from '../view/ViewProfile';
const mainLinks: MainLink[] = [
  { link: '/home', label: 'PetConnect Home' },
  { link: '/shelter/dashboard', label: 'Shelter Home' },
  { link: '/view/profile', label: 'View Profile' },
];
const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
  ...item,
  display:
    item.link === '/view/profile' ? (
      item.label
    ) : (
      <Link
        to={item.link}
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {item.label}
      </Link>
    ),
}));
const PostQueryPage = () => {
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [submitted, setSubmitted] = useState(false);

  // Form state includes shelter selection; note that we use shelterId
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    shelterId: '',
  });

  // State to hold list of shelters for the Select component
  const [shelters, setShelters] = useState<{ value: string; label: string }[]>([]);

  // Fetch shelters on component mount
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const res = await fetch('http://localhost:8090/api/petConnect/shelters', {
          headers: {
            // Include authorization headers if required
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch shelters');
        }
        const data = await res.json();
        console.log('Fetched shelters:', data);
        // Transform data for Mantine Select:
        // Use shelter.name because your API returns "name"
        const transformed = data.map((shelter: any) => ({
          value: shelter.shelterId ? shelter.shelterId.toString() : '',
          label: shelter.name || 'Unknown Shelter',
        }));
        setShelters(transformed);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShelters();
  }, []);

  const handleBackToHomeClick = () => {
    navigate('/home');
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };
    try {
      const res = await fetch('http://localhost:8090/api/petConnect/queries', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        throw new Error('Failed to send query');
      }
      console.log('Submitted:', payload);
      setSubmitted(true);
      // Reset the form; note we reset shelterId (same case as initial state)
      setForm({ name: '', email: '', subject: '', message: '', shelterId: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
         <Header
            mainLinks={transformedMainLinks}
            onProfileClick={() => setProfileModalOpened(true)}
          />
    <Box
      style={{
        minHeight: '200vh',
        backgroundImage: `url('https://images.unsplash.com/photo-1607808915002-7019e6d07f82?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3')`,
        backgroundSize: 'fill',
        backgroundPosition: 'center',
        position: 'relative',
        paddingTop: '10%'
      }}
    >
      {/* Overlay */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.43)',
          zIndex: 0,
        }}
      />

      {/* Foreground content */}
      <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Center mb="xl" style={{ flexDirection: 'column' }}>
          <Title order={2} c="yellow" fw={700}>
            Post Your Query
          </Title>
          <Text c="black" size="md" mt="xs" ta="center">
            We'd love to hear from you! Feel free to reach out with questions or feedback.
          </Text>
        </Center>

        <Box
          p="xl"
          style={{
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.md,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Full Name"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={(e) => handleChange('name', e.currentTarget.value)}
                styles={{
                  input: { color: 'yellow' },
                  label: { color: 'black' },
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
                  input: { color: 'yellow' },
                  label: { color: 'black' },
                }}
              />
              <Select
                label="Select Shelter Home"
                placeholder="Choose a shelter"
                required
                data={shelters}
                value={form.shelterId}
                onChange={(value) => handleChange('shelterId', value || '')}
                styles={{
                  input: { color: 'yellow' },
                  label: { color: 'black' },
                }}
              />
              <TextInput
                label="Subject"
                placeholder="Eg: Pet Adoption Inquiry"
                required
                value={form.subject}
                onChange={(e) => handleChange('subject', e.currentTarget.value)}
                styles={{
                  input: { color: 'yellow' },
                  label: { color: 'black' },
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
                  input: { color: 'yellow' },
                  label: { color: 'black' },
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
          <Anchor
            href="/home"
            onClick={handleBackToHomeClick}
            fw={700}
            style={{ color: 'black', fontSize: '1rem' }}
          >
            Back to Home
          </Anchor>
        </Text>
      </Container>
    </Box>
     <Footer style={{ marginTop: '0%' }}/>
          <ViewProfileModal 
                opened={profileModalOpened} 
                onClose={() => setProfileModalOpened(false)}
              />
    </>
  );
};

export default PostQueryPage;
