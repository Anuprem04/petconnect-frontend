import React from 'react';
import {
  Container,
  Title,
  Text,
  Paper,
  Divider,
  Anchor,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();
    const handleBackToHomeClick = () => {
        navigate('/home');
      };
  return (
    <div
      style={{
        height: '100vh',
        overflow: 'auto',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1571324524859-899fbd151860?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // This keeps the background fixed
      }}
    >
      <div
        style={{
          minHeight: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          padding: '40px 0',
        }}
      >
        <Container size="md">
          <Paper
            shadow="xl"
            p="xl"
            radius="md"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
            }}
          >
            <Title order={1} ta="center" mb="md">
              Privacy Policy
            </Title>
            <Text align="center" size="sm" mb="lg">
              Effective Date: April 5, 2025
            </Text>

            <Divider my="md" />

            <Title order={3} mt="sm">1. Introduction</Title>
            <Text mt="xs">
              At PetConnect+, your privacy is our priority...
            </Text>

            <Title order={3} mt="lg">2. Information We Collect</Title>
            <Text mt="xs">
              We may collect info such as your name, email...
            </Text>

            <Title order={3} mt="lg">3. How We Use Your Data</Title>
            <ul>
              <li>Personalize your pet search</li>
              <li>Connect you with nearby shelters</li>
              <li>Send newsletters (if opted-in)</li>
            </ul>

            <Title order={3} mt="lg">4. Data Sharing</Title>
            <Text mt="xs">We do not sell your data...</Text>

            <Title order={3} mt="lg">5. Security</Title>
            <Text mt="xs">We implement strict security protocols...</Text>

            <Title order={3} mt="lg">6. Your Choices</Title>
            <Text mt="xs">You can update or delete your data...</Text>

            <Title order={3} mt="lg">7. Changes to this Policy</Title>
            <Text mt="xs">We may update this policy periodically...</Text>

            <Divider my="lg" />

            <Text align="center" size="sm" mt="lg">
              If you have questions, contact us at{' '}
              <Anchor href="mailto:support@petconnectplus.com" c="blue.3">
                support@petconnectplus.com
              </Anchor>
            </Text>
          </Paper>
          <Text ta="center" mt="lg" style={{ color: '#0d0f12' }}>
                              <Anchor href="/home" onClick={handleBackToHomeClick} fw={700} style={{ color: 'black', fontSize: '1rem' }}>
                                Back to Home
                              </Anchor>
                            </Text>
        </Container>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
