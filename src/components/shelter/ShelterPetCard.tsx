import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { Title, Text, Loader, Center, Paper, Button, Badge, Image, Group, Stack, Container, Box } from '@mantine/core';
import { Header, MainLink } from '../header/Header';
import { Footer } from '../footer/Footer';
import { useAuth } from '../security/useAuth';
import { Pet } from '../user/DisplayPets';

export function ShelterPetCard() {
  const { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const mainLinks: MainLink[] = [
    { link: '/home', label: 'PetConnect Home' },
    { link: '/shelter/dashboard', label: 'Shelter Home' },
    { link: '/view/profile', label: 'View Profile' },
  ];

  const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
    ...item,
    display: (
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

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`http://localhost:8090/api/petConnect/pets/${petId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch pet');
        const data: Pet = await res.json();
        setPet(data);
        if (data.photos) {
          const urls = data.photos
            .split(',')
            .map((f: string) => `http://localhost:8090/images/${f.trim()}`);
          setActiveImage(urls[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (petId) {
      fetchPet();
    }
  }, [petId]);

  if (!auth) return <Navigate to="/login/shelter" replace />;
  if (loading) {
    return (
      <Center my="lg">
        <Loader />
      </Center>
    );
  }
  if (!pet) {
    return (
      <Center my="lg">
        <Text>No pet found</Text>
      </Center>
    );
  }

  // Parse photo URLs from the pet's photos property
  const photoUrls = pet.photos
    ? pet.photos.split(',').map((f: string) => `http://localhost:8090/images/${f.trim()}`)
    : [];

  return (
    <>
      <Header mainLinks={transformedMainLinks} />
      <Container size="lg" my="xl" style={{ paddingTop: '8%' }}>
        <Paper shadow="md" p="xl" radius="md" withBorder>
          <Title mb="lg" >
            Pet Details
          </Title>

          {activeImage && (
            <Box mb="lg">
              <Image
                src={activeImage}
                alt={`Photo of ${pet.breed}`}
                radius="md"
                height={300}
                fit="contain"
              />
              {photoUrls.length > 1 && (
                <Group gap="xs" mt="sm" justify="center">
                  {photoUrls.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      width={70}
                      height={70}
                      radius="sm"
                      fit="cover"
                      sx={{
                        cursor: 'pointer',
                        border: activeImage === url ? '2px solid #ffcc00' : '1px solid #ccc',
                        transition: 'border 0.2s ease',
                        '&:hover': {
                          border: '2px solid #ffcc00',
                        },
                      }}
                      onClick={() => setActiveImage(url)}
                    />
                  ))}
                </Group>
              )}
            </Box>
          )}

          <Stack gap="xs">
            <Text>
              <strong>Pet ID:</strong> {pet.petId}
            </Text>
            <Text>
              <strong>Animal Type:</strong> {pet.animalType}
            </Text>
            <Text>
              <strong>Breed:</strong> {pet.breed}
            </Text>
            <Text>
              <strong>Price:</strong> ₹{pet.price}
            </Text>
            <Text>
              <strong>Age:</strong> {pet.age} months
            </Text>
            <Badge color={pet.adoptionStatus === null ? 'green' : 'red'} variant="light">
              {pet.adoptionStatus === null ? 'Available for Adoption' : 'Available'}
            </Badge>
          </Stack>

          <Group justify="center" mt="lg">
            <Button onClick={() => navigate(`/pets/edit/${pet.petId}`)} color="yellow">
              Edit Pet
            </Button>
          </Group>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}
