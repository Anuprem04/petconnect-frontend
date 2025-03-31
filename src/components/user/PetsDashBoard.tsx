import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { useAuth } from '../security/useAuth';
import { DisplayPets, Pet, Shelter } from './DisplayPets';
import { FilterBar } from './FilterBar';
import { Box, Container, Grid, Loader } from '@mantine/core';
import styles from './PetsDashboard.module.css';

const mainLinks: MainLink[] = [
  { link: '/home', label: 'Home' },
  { link: '/view/profile', label: 'View Profile' },
];

export function PetsDashBoard() {
  const auth = useAuth();
  if (!auth) return <Navigate to="/login/user" replace />;
  if (auth.role !== 'USER') return <Navigate to="/login/user" replace />;

  const [pets, setPets] = useState<Pet[]>([]);
  const [shelters, setShelters] = useState<Record<number, Shelter>>({});
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    animalType: '',
    gender: '',
    breed: [] as string[],
    ageRange: [0, 120] as [number, number],
    priceRange: [0, 1000] as [number, number],
  });

  useEffect(() => {
    fetch('http://localhost:8090/api/petConnect/pets/all')
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
        const uniqueShelterIds : string[] = Array.from(new Set(data.map((pet: { shelterId: any; }) => pet.shelterId)));
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

  const uniqueAnimalTypes = Array.from(new Set(pets.map((p) => p.animalType)));
  const uniqueBreeds = Array.from(new Set(pets.map((p) => p.breed)));

  const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
    ...item,
    display: (
      <Link
        to={item.link}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {item.label}
      </Link>
    ),
  }));

  return (
    <div className={styles.root}>
      <Header mainLinks={transformedMainLinks} />
  
      <Container size="xl" className={styles.container}>
        <Grid gutter="lg" align="flex-start">
          <Grid.Col span={{ base: 12, md: 3 }} className={styles.sidebar}>
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              uniqueAnimalTypes={uniqueAnimalTypes}
              uniqueBreeds={uniqueBreeds}
            />
          </Grid.Col>
  
          <Grid.Col span={{ base: 12, md: 9 }} style={{ minHeight: '400px' }}>
            <div className={styles.main}>
              {loading ? (
                <Box className={styles.loaderContainer}>
                  <Loader size="lg" color="orange" />
                </Box>
              ) : (
                <DisplayPets
                  pets={pets}
                  shelters={shelters}
                  loading={loading}
                  filters={filters}
                />
              )}
            </div>
          </Grid.Col>
        </Grid>
      </Container>
  
      <Footer />
    </div>
  );
}  
