import React from 'react';
import {
  Box,
  Title,
  Text,
  Container,
  Button,
  SimpleGrid,
  Paper,
  Badge,
  Group,
  Stack,
  Center,
  Anchor,
} from '@mantine/core';
import { IconBriefcase, IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const jobOpenings = [
  {
    id: 1,
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'Remote',
    description: 'Build beautiful and responsive user interfaces using React and Mantine.',
  },
  {
    id: 2,
    title: 'Backend Developer (Node.js)',
    type: 'Full-time',
    location: 'Bangalore',
    description: 'Design and implement scalable microservices with Node.js and Express.',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    type: 'Contract',
    location: 'Remote',
    description: 'Create user-centric designs for a seamless pet-parent experience.',
  },
];

const JobCard = ({ title, type, location, description }: (typeof jobOpenings)[0]) => (
  <Paper withBorder shadow="sm" radius="md" p="lg">
    <Group justify="space-between" mb="xs">
      <Title order={4}>{title}</Title>
      <Badge color="teal">{type}</Badge>
    </Group>
    <Text c="dimmed" size="sm" mb="xs">
      Location: {location}
    </Text>
    <Text size="sm">{description}</Text>
    <Button variant="light" mt="md" rightSection={<IconArrowRight size={16} />}>
      Apply Now
    </Button>
  </Paper>
);

const CareerPage = () => {
    const navigate = useNavigate();
    const handleBackToHomeClick = () => {
        navigate('/home');
      };
  return (
    <Box>
      {/* Hero Section */}
      <Box
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=2070')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '5rem 0',
        }}
      >
        <Container>
          <Center>
            <Stack align="center" justify="sm">
              <Title order={1} c="white">
                Join the PetConnect+ Team
              </Title>
              <Text c="white" ta="center" maw={600}>
                Love pets and technology? Build something meaningful with us and make pet parenting easier, smarter, and joyful.
              </Text>
              <Button color="teal" size="md" mt="md">
                View Openings
              </Button>
            </Stack>
          </Center>
        </Container>
      </Box>

      {/* Why Join Us */}
      <Container my="xl">
        <Title order={2} ta="center" mb="sm">
          Why Work With Us?
        </Title>
        <Text ta="center" mb="xl" c="dimmed">
          At PetConnect+, we value creativity, compassion, and collaboration. We’re building a future where pets and their people thrive together.
        </Text>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          <Paper shadow="xs" p="lg" radius="md">
            <Title order={4}>🐶 Pet-Loving Culture</Title>
            <Text size="sm" mt="sm" c="dimmed">
              We're passionate about pets—and we bring that passion into our daily work and office life.
            </Text>
          </Paper>
          <Paper shadow="xs" p="lg" radius="md">
            <Title order={4}>🌱 Growth & Learning</Title>
            <Text size="sm" mt="sm" c="dimmed">
              Learn, grow, and evolve with opportunities to work on challenging and rewarding projects.
            </Text>
          </Paper>
          <Paper shadow="xs" p="lg" radius="md">
            <Title order={4}>💻 Flexible Work</Title>
            <Text size="sm" mt="sm" c="dimmed">
              Enjoy remote-friendly roles, flexible hours, and a strong work-life balance.
            </Text>
          </Paper>
        </SimpleGrid>
      </Container>

      {/* Job Listings */}
      <Container my="xl">
        <Title order={2} ta="center" mb="sm">
          Open Positions
        </Title>
        <Text ta="center" mb="lg" c="dimmed">
          We're hiring across roles and experience levels. Find your fit below.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {jobOpenings.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </SimpleGrid>
      </Container>

      {/* CTA */}
      <Box bg="gray.1" py="xl">
        <Container ta="center">
          <Title order={3} mb="sm">
            Didn't find your role?
          </Title>
          <Text mb="md" c="dimmed">
            We're always on the lookout for passionate people. Drop us your resume!
          </Text>
          <Button color="teal" size="md" leftSection={<IconBriefcase size={16} />}>
            Send Resume
          </Button>
          <Text ta="center" mt="lg" style={{ color: '#0d0f12' }}>
                                                <Anchor href="/home" onClick={handleBackToHomeClick} fw={700} style={{ color: 'black', fontSize: '1rem' }}>
                                                  Back to Home
                                                </Anchor>
                                              </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default CareerPage;
