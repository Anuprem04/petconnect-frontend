import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, Center, ActionIcon, Text } from '@mantine/core';
import { IconEye, IconShoppingCart, IconMessageCircle, IconCheckupList } from '@tabler/icons-react';

export function UserCards() {
  const navigate = useNavigate();

  const cardStyle = (imageUrl: string) => ({
    position: 'relative' as const,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    aspectRatio: '1 / 1', // Keep square
    maxWidth: 960,         // Reduce card width
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
      <Grid gutter="md" justify="center">
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
            label: 'Accessory Store',
            icon: <IconShoppingCart size={24} />,
            image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4',
            path: '/store/accessories',
          },
          {
            label: 'Post a Query',
            icon: <IconMessageCircle size={24} />,
            image: 'https://images.unsplash.com/photo-1710322916725-9489fbbc1a0b',
            path: '/post/query',
          },
        ].map((card, index) => (
          <Grid.Col key={index} span={{ base: 6, sm: 3 }}>
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
