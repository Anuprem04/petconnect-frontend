import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Center, Loader, Title, Text, Card, Image, Group, Badge, Stack } from '@mantine/core';
import { IconGenderFemale, IconGenderMale, IconMapPin, IconPhoneCall } from '@tabler/icons-react';

interface Pet {
  petId: number;
  animalType: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  photos: string;
  price: number;
  shelterId: number;
}

interface Shelter {
  name: string;
  phone: string;
}

export function PetDetails() {
  const { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pet details
    fetch(`http://localhost:8090/api/petConnect/pets/${petId}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
        console.log('Pet data fetched:', data); 
        return fetch(`http://localhost:8090/api/petConnect/shelters/${data.shelterId}`);
      })
      .then((res) => res.json())
      .then((shelterData) => {
        setShelter(shelterData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch pet details:', err);
        setLoading(false);
      });
  }, [petId]);

  if (loading) {
    return (
      <Center style={{ height: '400px' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!pet) {
    return (
      <Center style={{ height: '400px' }}>
        <Text>Pet not found</Text>
      </Center>
    );
  }

  // Use only the first image for display
  const photoUrls = pet.photos.split(',').map((filename) => `http://localhost:8090/images/${filename.trim()}`);

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 800, margin: 'auto' }}>
      <Image src={photoUrls[0]} alt={pet.breed} height={300} fit="cover" />
      <Stack gap="sm" mt="md">
        <Group justify="space-between">
          <Title order={3}>{pet.breed}</Title>
          <Badge color="blue" variant="light">
            {pet.animalType}
          </Badge>
        </Group>
        <Group gap="xs">
          {pet.gender.toLowerCase() === 'male' ? (
            <IconGenderMale size={20} />
          ) : (
            <IconGenderFemale size={20} />
          )}
          <Text>{pet.gender}</Text>
        </Group>
        <Text>Age: {pet.age} months</Text>
        <Text>{pet.description || 'No description available.'}</Text>
        <Text weight={700} size="xl" color="yellow">
          ₹{pet.price?.toFixed(2)}
        </Text>
        {shelter && (
          <Group gap="xs">
            <IconMapPin size={20} />
            <Text>{shelter.name}</Text>
            <IconPhoneCall size={20} />
            <Text>{shelter.phone}</Text>
          </Group>
        )}
      </Stack>
    </Card>
  );
}
