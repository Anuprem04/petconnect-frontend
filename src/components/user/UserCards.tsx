import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, Center, ActionIcon, Text } from '@mantine/core';
import { IconEye, IconMessageCircle, IconCheckupList } from '@tabler/icons-react';

export function UserCards() {
  const navigate = useNavigate();

  const cardStyle = (imageUrl: string) => ({
    position: 'relative' as const,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    aspectRatio: '1 / 1', // Keep square
    maxWidth: 1920,         // Reduce card width
    borderRadius: 'var(--mantine-radius-md)',
    overflow: 'hidden',
    margin: 'auto',
  });

  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  };

  const contentStyle = {
    height: '100%',
    flexDirection: 'column' as const,
    zIndex: 2,
    position: 'relative' as const,
  };

  return (
    <Container fluid my="xl" pt="xl" p={0}>
      <Grid gutter="xl" justify="center">
        {[
          {
            label: 'View Pets',
            icon: <IconEye size={24} />,
            image: 'https://images.unsplash.com/photo-1575470888319-e362d2c71063',
            path: '/pets',
          },
          {
            label: 'Adoption Status',
            icon: <IconCheckupList size={24} />,
            image: 'https://images.unsplash.com/photo-1695250855909-2443486d5e84',
            path: '/user/adoptions',
          },
          {
            label: 'Post a Query',
            icon: <IconMessageCircle size={24} />,
            image: 'https://images.unsplash.com/photo-1572152666560-5e7746e843eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            path: '/user/post',
          },
        ].map((card, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
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
