import React from 'react';
import {
  Container,
  Title,
  Text,
  Image,
  Paper,
  Badge,
  Button,
  SimpleGrid,
  Box,
  Anchor,
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Organic Dog Food',
    price: '₹799',
    category: 'Dog',
    image: 'https://plus.unsplash.com/premium_photo-1683134382202-aac458a92c19?q=80&w=2070',
  },
  {
    id: 2,
    name: 'Cat Scratching Post',
    price: '₹499',
    category: 'Cat',
    image: 'https://images.unsplash.com/photo-1630843764858-00ab3ed30db8?q=80&w=1974',
  },
  {
    id: 3,
    name: 'Colorful Bird Cage',
    price: '₹1299',
    category: 'Bird',
    image: 'https://plus.unsplash.com/premium_photo-1664304957188-a2f67dd1f721?q=80&w=1939',
  },
  {
    id: 4,
    name: 'Aquarium LED Lights',
    price: '₹899',
    category: 'Fish',
    image: 'https://images.unsplash.com/photo-1545613556-697d689a8dae?q=80&w=2070',
  },
  {
    id: 5,
    name: 'Dog Chew Toy Set',
    price: '₹299',
    category: 'Dog',
    image: 'https://images.unsplash.com/photo-1601758004584-903c2a9a1abc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Cat Feather Wand',
    price: '₹199',
    category: 'Cat',
    image: 'https://images.unsplash.com/photo-1702570913548-0bb3a1126bc7?q=80&w=2045&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    name: 'Bath Bowl',
    price: '₹399',
    category: 'Pets',
    image: 'https://images.unsplash.com/photo-1547565527-389ccd19e85b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    name: 'Aquarium Air Pump',
    price: '₹699',
    category: 'Fish',
    image: 'https://images.unsplash.com/photo-1579967327980-2a4117da0e4a?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

type Product = typeof products[0];

const ProductCard = ({ name, price, category, image }: Product) => (
  <Paper shadow="md" radius="md" p="sm" withBorder style={{ width: '100%' }}>
    <Image src={image} height={160} radius="md" alt={name} />
    <Badge mt="sm" color="teal">
      {category}
    </Badge>
    <Title order={4} mt="xs">
      {name}
    </Title>
    <Text c="dimmed" size="sm">
      {price}
    </Text>
    <Button
      fullWidth
      mt="md"
      variant="light"
      rightSection={<IconShoppingCart size={16} />}
    >
      Add to Cart
    </Button>
  </Paper>
);

const StorePage = () => {
  const navigate = useNavigate();
    const handleBackToHomeClick = () => {
        navigate('/home');
      };
  return (
    <Box
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // This keeps the background fixed
  }}
>
      <Container>
        <Title order={1} ta="center" mb="sm" c="black">
          🛍️ PetConnect+ Store
        </Title>
        <Text ta="center" mb="xl" c="black">
          Explore the best for your pets—handpicked food, toys, accessories, and more!
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </SimpleGrid>
        <Text ta="center" mt="lg" style={{ color: '#0d0f12' }}>
                                      <Anchor href="/home" onClick={handleBackToHomeClick} fw={700} style={{ color: 'black', fontSize: '1rem' }}>
                                        Back to Home
                                      </Anchor>
                                    </Text>
      </Container>
    </Box>
  );
};

export default StorePage;
