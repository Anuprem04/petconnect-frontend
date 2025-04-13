import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, Center, ActionIcon, Text } from '@mantine/core';
import { IconPlus, IconEye, IconSettings } from '@tabler/icons-react';
import inquiry from '../../assets/inquiry.jpg';

export function ShelterCards() {
  const navigate = useNavigate();

  // Common card style function using the image URL
  const cardStyle = (imageUrl: string) => ({
    position: 'relative' as const,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    aspectRatio: '1 / 1', // Keep card square
    maxWidth: 1920, // You can adjust this value if further reduction is needed
    borderRadius: 'var(--mantine-radius-md)',
    overflow: 'hidden',
    margin: 'auto',
  });

  // Overlay to darken the background image
  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  };

  // Content style for proper stacking above the overlay
  const contentStyle = {
    height: '100%',
    flexDirection: 'column' as const,
    zIndex: 2,
    position: 'relative' as const,
  };

  // Array of cards with their respective data
  const cards = [
    {
      label: 'Add Pet',
      icon: <IconPlus size={24} />,
      image:
        'https://images.unsplash.com/photo-1588752725970-853acb5b2621?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      path: '/add/pet',
    },
    {
      label: 'Manage Pets',
      icon: <IconSettings size={24} />,
      image:
        'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      path: '/manage/pets',
    },
    {
      label: 'Manage Adoptions',
      icon: <IconSettings size={24} />,
      image:
        'https://images.unsplash.com/photo-1597174209067-c57f9400cf4c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      path: '/manage/adoptions',
    },
    {
      label: 'View Inquiries',
      icon: <IconEye size={24} />,
      image: inquiry,
      path: '/shelter/viewinquiry',
    },
  ];

  return (
    <Container fluid my="xl"  p={'5rem 0 0 0'}>
      <Grid gutter="xl" justify="center">
        {cards.map((card, index) => (
          // Changed md span from 4 to 3 so that 4 cards fit evenly in one row on medium screens
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" radius="md" style={cardStyle(card.image)}>
              <div style={overlayStyle} />
              <Center style={contentStyle}>
                <ActionIcon size="xl" variant="filled" onClick={() => navigate(card.path)}>
                  {card.icon}
                </ActionIcon>
                <Text mt="xs" weight={500} style={{ color: 'white' }}>
                  {card.label}
                </Text>
              </Center>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
