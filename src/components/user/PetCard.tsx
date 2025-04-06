import { Card, Image, Text, Button, Group, Badge, ThemeIcon, Stack, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';

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

interface PetCardProps {
  pet: Pet;
  shelter: Shelter | null;
}

export function PetCard({ pet }: PetCardProps) {
  const navigate = useNavigate();
  const BASE_IMAGE_URL = 'http://localhost:8090/images/';
  const photoUrls =
    pet.photos?.split(',').map((filename) => `${BASE_IMAGE_URL}${filename.trim()}`) || [];

  const handleViewDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/pet/${pet.petId}`);
  };

  return (
    <Card
      radius="sm"
      withBorder
      padding={8}
      style={{
        margin: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Card.Section>
        <Image
          src={photoUrls[0]}
          height={200}
          fit="cover"
          style={{ backgroundColor: '#1a1b1e' }}
        />
      </Card.Section>

      <Stack gap={4} style={{ color: 'white' }}>
        <Group justify="space-between" align="flex-start" style={{ marginTop: 4 }}>
          <Badge color="blue" variant="light" size="sm" style={{ marginTop: 4 }}>
            {pet.animalType}
          </Badge>
          <Group gap={4} style={{ marginTop: 4 }}>
            <ThemeIcon size="sm" variant="light" color="gray">
              {pet.gender.toLowerCase() === 'male' ? (
                <IconGenderMale size={14} />
              ) : (
                <IconGenderFemale size={14} />
              )}
            </ThemeIcon>
            <Text size="xs" color="gray.2">
              {pet.gender}
            </Text>
          </Group>
        </Group>

        <Title order={5} style={{ color: 'white', margin: 0, lineHeight: 1.2 }}>
          {pet.breed}
        </Title>
        <Text size="xs" color="gray.4">
          Age: {pet.age} months
        </Text>

        <Text
          size="sm"
          style={{
            color: '#ddd',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {pet.description || 'No description available.'}
        </Text>

        <Group justify="space-between">
          <Text size="md" weight={700} color="yellow">
            ₹{pet.price?.toFixed(2)}
          </Text>
        </Group>

        <Button
          size="xs"
          radius="sm"
          variant="white"
          color="dark"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </Stack>
    </Card>
  );
}
