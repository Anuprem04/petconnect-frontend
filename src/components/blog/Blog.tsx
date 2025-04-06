import React from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  Image,
  Group,
  Badge,
  Avatar,
  Button,
  Flex,
  Anchor,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
const blogs = [
  {
    id: 1,
    title: '10 Things to Know Before Adopting a Dog',
    author: 'Andrew',
    date: 'April 4, 2025',
    image:
      'https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    excerpt:
      'Thinking of getting a dog? Discover key tips on breed selection, training, and home setup before adoption.',
  },
  {
    id: 2,
    title: 'How to Make Cats Feel at Home',
    author: 'Anu',
    date: 'March 29, 2025',
    image:
      'https://images.unsplash.com/photo-1672694526200-b71940984adb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    excerpt:
      'Cats are independent, yet they need love and structure. Here’s how to create a feline-friendly space.',
  },
  {
    id: 3,
    title: 'Caring for Colorful Companions: Macaw Basics',
    author: 'Maxwell',
    date: 'March 15, 2025',
    image:
      'https://images.unsplash.com/photo-1543479201-17bcda84d43a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    excerpt:
      'Macaws are intelligent and social parrots. Learn how to keep them stimulated and healthy at home.',
  },
  {
    id: 4,
    title: 'Fish Tanks 101: A Beginner’s Guide',
    author: 'Rohit',
    date: 'March 10, 2025',
    image:
      'https://images.unsplash.com/photo-1667379215254-050c72479b30?q=80&w=2189&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    excerpt:
      'Setting up a fish tank? Here’s how to choose the right tank, fish species, and maintain water quality.',
  },
  {
    id: 5,
    title: 'Why You Should Adopt, Not Shop',
    author: 'Neha',
    date: 'March 1, 2025',
    image:
      'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    excerpt:
      'Every adopted pet changes a life—dog, cat, bird, or fish. Here why shelter pets deserve a second chance.',
  },
];

const BlogCard = ({ title, author, date, image, excerpt }: (typeof blogs)[0]) => (
  <Paper
    shadow="lg"
    radius="md"
    p="md"
    style={{ transition: 'transform 0.2s ease', cursor: 'pointer', width: 260 }}
    withBorder
  >
    <Image src={image} radius="md" height={160} alt={title} />
    <Badge color="teal" mt="sm">Pet Advice</Badge>
    <Title order={3} mt="xs" mb="xs" size="h4">
      {title}
    </Title>
    <Text size="sm" c="dimmed" lineClamp={3}>
      {excerpt}
    </Text>
    <Group justify="space-between" mt="md">
      <Group gap="xs">
        <Avatar size="sm" radius="xl" />
        <div>
          <Text size="xs" fw={500}>{author}</Text>
          <Text size="xs" c="dimmed">{date}</Text>
        </div>
      </Group>
      <Button size="xs" rightSection={<IconArrowRight size={16} />} variant="light">
        Read More
      </Button>
    </Group>
  </Paper>
);

const BlogPage = () => {
    const navigate = useNavigate();
    const handleBackToHomeClick = () => {
        navigate('/home');
      };
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Full screen background image */}
    <div
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage:
                'url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            filter: 'blur(8px)',
            transform: 'scale(1.1)', // Prevent edge clipping after blur
        }}
    />

      {/* Main Content */}
      <Container
        py="xl"
        fluid
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: 12,
          margin: '2rem auto',
        }}
      >
      <Title order={1} ta="center" mb="md">
        🐾 PetConnect+ Blog
      </Title>
      <Text ta="center" size="md" mb="xl" c="black">
        Explore expert advice and inspiring stories about dogs, cats, macaws, fish, and more!
      </Text>

      <Flex gap="lg" justify="center" wrap="wrap">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </Flex>
      <Text ta="center" mt="lg" style={{ color: '#0d0f12' }}>
                          <Anchor href="/home" onClick={handleBackToHomeClick} fw={700} style={{ color: 'black', fontSize: '1rem' }}>
                            Back to Home
                          </Anchor>
                        </Text>
    </Container>
    </div>
  );
};

export default BlogPage;
