import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { useAuth } from '../security/useAuth';
import { DisplayPets, Pet, Shelter } from './DisplayPets';
import { FilterBar } from './FilterBar';
import { Box, Container, Grid, Loader } from '@mantine/core';
import styles from './PetsDashboard.module.css';
import { ViewProfileModal } from '../view/ViewProfile';

const mainLinks: MainLink[] = [
  { link: '/home', label: 'PetConnect Home' },
  { link: '/user/dashboard', label: 'User Home' },
  { link: '/view/profile', label: 'View Profile' },
];

export function PetsDashBoard() {
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const auth = useAuth();
  if (!auth) return <Navigate to="/login/user" replace />;
 

  const [pets, setPets] = useState<Pet[]>([]);
  const [shelters, setShelters] = useState<Record<number, Shelter>>({});
  const [loading, setLoading] = useState(true);
console.log(pets)
  const [filters, setFilters] = useState({
    animalType: '',
    gender: '',
    breed: [] as string[],
    ageRange: [0, 200] as [number, number],      // full range
    priceRange: [0, 50000] as [number, number], // a very large upper limit to avoid hiding pets
  });


  useEffect(() => {
    fetch('http://localhost:8090/api/petConnect/pets/all')
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
        const uniqueShelterIds: string[] = Array.from(new Set(data.map((pet: { shelterId: any; }) => pet.shelterId)));
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
    display:
      item.link === '/view/profile' ? (
        item.label
      ) : (
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
console.log(pets.length)
  return (
    <div className={styles.root}>
      <Header
        mainLinks={transformedMainLinks}
        onProfileClick={() => setProfileModalOpened(true)}
      />

      <Container size="xl" className={styles.container}>
        {/* Show filter button only if pets are available */}
        {pets.length > 0 && (
          <Box mb="md" style={{ textAlign: 'right' }}>
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              uniqueAnimalTypes={uniqueAnimalTypes}
              uniqueBreeds={uniqueBreeds}
            />
          </Box>
        )}

        <Grid gutter="lg" align="flex-start">
          <Grid.Col span={12} style={{ minHeight: '400px' }}>
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
      <ViewProfileModal
        opened={profileModalOpened}
        onClose={() => setProfileModalOpened(false)}
      />
    </div>
  );
}  
