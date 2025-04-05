import { Center, Loader, useMantineTheme, SimpleGrid, Pagination } from '@mantine/core';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { PetCard } from './PetCard';

export interface Pet {
  petId: number;
  animalType: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  photos: string;
  price: number;
  shelterId: number;
  adoptionStatus: string | null;
}

export interface Shelter {
  name: string;
  phone: string;
}

interface DisplayPetsProps {
  pets: Pet[];
  shelters: Record<number, Shelter>;
  loading: boolean;
  filters: {
    animalType: string;
    gender: string;
    breed: string[];
    ageRange: [number, number];
    priceRange: [number, number];
  };
}

export function DisplayPets({ pets, shelters, loading, filters }: DisplayPetsProps) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [page, setPage] = useState(1);

  if (loading) {
    return (
      <Center style={{ height: '400px' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  // Filter the pets based on provided filters
  const filteredPets = pets.filter((pet) => {
    const matchesType = filters.animalType ? pet.animalType === filters.animalType : true;
    const matchesGender = filters.gender
      ? pet.gender.toLowerCase() === filters.gender.toLowerCase()
      : true;
    const matchesBreed = filters.breed.length ? filters.breed.includes(pet.breed) : true;
    const matchesAge = pet.age >= filters.ageRange[0] && pet.age <= filters.ageRange[1];
    const matchesPrice = pet.price >= filters.priceRange[0] && pet.price <= filters.priceRange[1];
    return matchesType && matchesGender && matchesBreed && matchesAge && matchesPrice;
  });

  // Pagination logic
  const itemsPerPage = mobile ? 2 : 6;
  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
  const currentPets = filteredPets.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ minHeight: '400px' }}>
      {filteredPets.length > 0 ? (
        <>
          <SimpleGrid cols={mobile ? 1 : 3} spacing="lg">
            {currentPets.map((pet) => (
              <PetCard key={pet.petId} pet={pet} shelter={shelters[pet.shelterId] || null} />
            ))}
          </SimpleGrid>
  
          {totalPages > 1 && (
            <Center mt="xl">
              <Pagination
                value={page}
                onChange={(value) => setPage(value)}
                total={totalPages}
              />
            </Center>
          )}
        </>
      ) : (
        <Center style={{ height: '100%' }}>
          <div style={{ textAlign: 'center', paddingTop: '100px' }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6598/6598517.png"
              alt="No results"
              width={100}
              height={100}
              style={{ opacity: 0.5 }}
            />
            <p style={{ marginTop: '1rem', color: '#888' }}>No pets match the current filters.</p>
          </div>
        </Center>
      )}
    </div>
  );
  
}
