// PetDetailsPopup.tsx
import {
    Text,
    Badge,
    Image,
    Group,
    Stack,
    Box,
    Divider,
    Loader,
    Center,
  } from '@mantine/core';
  import { useEffect, useState } from 'react';
  import { Pet } from '../user/DisplayPets';
  
  export function PetDetailsPopup({ petId }: { petId: number }) {
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchPet = async () => {
        try {
          const res = await fetch(`http://localhost:8090/api/petConnect/pets/${petId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const data = await res.json();
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
      if (petId) fetchPet();
    }, [petId]);
  
    if (loading) return <Center><Loader /></Center>;
    if (!pet) return <Text>Pet not found</Text>;
  
    const photoUrls = pet.photos
      ? pet.photos.split(',').map((f: string) => `http://localhost:8090/images/${f.trim()}`)
      : [];
  
    return (
      <>
        {activeImage && (
          <Box >
            <Center>
              <Image
                src={activeImage}
                alt={`Photo of ${pet.breed}`}
                radius="md"
                height={250}
                fit="contain"
                withPlaceholder
              />
            </Center>
            {photoUrls.length > 1 && (
              <Group mt="sm" gap="xs" justify="center">
                {photoUrls.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    width={60}
                    height={60}
                    fit="cover"
                    radius="sm"
                    onClick={() => setActiveImage(url)}
                    style={{
                      border: activeImage === url ? '2px solid #FFD700' : '1px solid #ccc',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Group>
            )}
          </Box>
        )}
  
        <Divider my="sm" />
  
        <Stack gap="xs">
          <Text><strong>Pet ID:</strong> {pet.petId}</Text>
          <Text><strong>Animal Type:</strong> {pet.animalType}</Text>
          <Text><strong>Breed:</strong> {pet.breed}</Text>
          <Text><strong>Price:</strong> ₹{pet.price}</Text>
          <Text><strong>Age:</strong> {pet.age} months</Text>
          <Badge
            color={pet.adoptionStatus === null ? 'teal' : 'gray'}
            variant="filled"
            size="md"
          >
            {pet.adoptionStatus === null ? 'Available for Adoption' : 'Adopted / Reserved'}
          </Badge>
        </Stack>
      </>
    );
  }
  