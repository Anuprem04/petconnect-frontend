import { useEffect, useState, useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import {
  Paper,
  Text,
  Title,
  useMantineTheme,
  Loader,
  Center,
  Button,
  Group,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from '../home/PetCarousel.module.css';

interface Pet {
  petId: number;
  animalType: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  photos: string; // comma-separated URLs
  price: number;
  shelterId: number;
}

interface Shelter {
  name: string;
  phone: string;
}

function PetCard({ pet, image, shelter }: { pet: Pet; image: string; shelter: Shelter | null }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
      }}
      className={classes.card}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '20px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100%',
        }}
      >
        <Text className={classes.category} size="xs" fw={700} style={{ textTransform: 'uppercase', color: 'white' }}>
          {pet.animalType} • {pet.breed}
        </Text>
        <Title order={2} className={classes.title} style={{ color: 'white', fontWeight: 900 }}>
          Age: {pet.age} months • {pet.gender}
        </Title>
        <Text size="sm" mt="sm" color="white" opacity={0.9}>
          {pet.description || 'No description provided.'}
        </Text>
        <Text size="lg" mt="md" fw={600} color="yellow">
          ₹{pet.price?.toFixed(2)}
        </Text>

        {shelter && (
          <Group mt="xs">
            <Text size="xs" color="white">Shelter: <strong>{shelter.name}</strong></Text>
            <Text size="xs" color="white">📞 {shelter.phone}</Text>
          </Group>
        )}

        <Button mt="md" variant="white" color="dark" radius="md" size="xs">
          Book Now
        </Button>
      </div>
    </Paper>
  );
}

export function DisplayPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [shelters, setShelters] = useState<Record<number, Shelter>>({});
  const [loading, setLoading] = useState(true);
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    fetch('http://localhost:8090/api/petConnect/pets/all')
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);

        // Fetch shelter details for each unique shelterId
        const uniqueShelterIds: string[] = Array.from(new Set<string>(data.map((pet: Pet) => pet.shelterId)));


        uniqueShelterIds.forEach((id) => {
            fetch(`http://localhost:8090/api/petConnect/shelters/${id}`)
              .then((res) => res.json())
              .then((shelter) => {
                setShelters((prev) => ({ ...prev, [id]: shelter }));
              })
              .catch((err) => console.error(`Failed to fetch shelter ${id}`, err));
          });
          
      })
      .catch((err) => {
        console.error('Failed to fetch pets:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center h="400px">
        <Loader size="lg" />
      </Center>
    );
  }
  const BASE_IMAGE_URL = 'http://localhost:8090/images/';

  const slides = pets.flatMap((pet) => {
    const photoUrls = pet.photos
      ?.split(',')
      .map((filename) => `${BASE_IMAGE_URL}${filename.trim()}`);
    return photoUrls.map((image, index) => (
      <Carousel.Slide key={`${pet.petId}-${index}`}>
        <PetCard pet={pet} image={image} shelter={shelters[pet.shelterId] || null} />
      </Carousel.Slide>
    ));
  });

  return (
    <Carousel
      slideSize={pets.length === 1 ? '50%' : { base: '100%', sm: '50%' }}
      slideGap={{ base: 2, sm: 'xl' }}
      align={pets.length === 1 ? 'center' : 'start'}
      slidesToScroll={mobile ? 1 : 2}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {slides}
    </Carousel>
  );
}
