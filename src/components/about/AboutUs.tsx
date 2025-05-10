import React from 'react';
import {
  Container,
  Title,
  Text,
  Image,
  Grid,
  Paper,
  Divider,
  Group,
  rem,
  Center,
  ThemeIcon,
  Stack,
  BackgroundImage,
  Anchor,
} from '@mantine/core';
import { IconPaw, IconHeart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const AboutUs: React.FC = () => {
    const navigate = useNavigate();
    const handleBackToHomeClick = () => {
        navigate('/home');
      };
  return (
    <BackgroundImage
      src="https://images.unsplash.com/photo-1525253013412-55c1a69a5738?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      radius="md"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative', 
        minHeight: '100vh', // <-- this makes it full screen height
        display: 'flex',
        alignItems: 'center'
      }}
    >
    <div
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 0,
    pointerEvents: 'none', // 🔥 This is the key!
  }}
/>
      <Container size="lg" py="xl">
        <Center mb="xl">
          <Title order={1} c="yellow.4">
            About PetConnect+
          </Title>
        </Center>

        <Text ta="center" c="yellow" size="lg" mb="xl">
          At PetConnect+, we're not just creating an app—we're building a community where love and loyalty meet technology. 🐶🐱
        </Text>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper
            shadow="lg"
            p="lg"
            radius="md"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // transparent white
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)', // optional: subtle border
                color: 'white', // ensures text remains readable on dark background
            }}
        >
              <Group>
                <ThemeIcon color="yellow" size="lg" radius="xl">
                  <IconPaw />
                </ThemeIcon>
                <Title order={3}>Our Mission</Title>
              </Group>
              <Text mt="sm" style={{ color: 'black', fontStyle: 'italic' }}>
                Our mission is to create a digital bridge between pets and their forever homes. We aim to simplify the pet adoption journey while offering support, resources, and love to every pet parent out there.
              </Text>

              <Divider my="md" />

              <Group>
                <ThemeIcon color="blue" size="lg" radius="xl">
                  <IconHeart />
                </ThemeIcon>
                <Title order={3}>Our Vision</Title>
              </Group>
              <Text mt="sm" style={{ color: 'black', fontStyle: 'italic'}}>
                To be the bridge that unites every pet with a loving home. We envision a future where technology and empathy work hand in paw—empowering communities, improving animal welfare, and making pet adoption a norm, not a choice.
              </Text>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack align="center" justify="center" h="100%">
              <Image
                radius="md"
                src="https://images.unsplash.com/photo-1415369629372-26f2fe60c467?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Happy pets"
                style={{ maxHeight: rem(350) }}
              />
              <Text ta="center" c="white">
                Because every pet deserves a happy tail. 🐾
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>

        <Group justify="center" mt="xl">
          <Text c="black" size="sm">
            &copy; {new Date().getFullYear()} PetConnect+. All rights reserved.
          </Text>
        </Group>
        <Text ta="center" mt="lg" style={{ color: '#0d0f12' }}>
                    <Anchor href="/home" onClick={handleBackToHomeClick} fw={700} style={{ color: 'black', fontSize: '1rem' }}>
                      Back to Home
                    </Anchor>
                  </Text>
      </Container>
    </BackgroundImage>
  );
};

export default AboutUs;