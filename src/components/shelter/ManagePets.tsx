import { useEffect, useState } from 'react';
import cx from 'clsx';
import {
  ScrollArea,
  Table,
  Loader,
  Center,
  Badge,
  Text,
  Title,
  Box,
  Paper,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import { useAuth } from '../security/useAuth';
import classes from '../user/AdoptionStatus.module.css'; // Reuse styles if applicable
import { Header, MainLink } from '../header/Header';
import { Footer } from '../footer/Footer';
import { Pet } from '../user/DisplayPets';

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

export function ManagePetsTable() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  if (!auth) return <Navigate to="/login/shelter" replace />;
  if (auth.role !== 'SHELTER') return <Navigate to="/login/shelter" replace />;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Adjust the API URL according to your backend implementation
        const res = await fetch(`http://localhost:8090/api/petConnect/pets?shelterId=${auth?.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch pets');
        const data: Pet[] = await res.json();
        setPets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.id) {
      fetchPets();
    }
  }, [auth?.id]);

  // Function to handle pet deletion
  const handleDelete = async (petId: number) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        const res = await fetch(`http://localhost:8090/api/petConnect/pets/${petId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to delete pet');
        setPets((prevPets) => prevPets.filter((pet) => pet.petId !== petId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <Center my="lg">
        <Loader />
      </Center>
    );
  }
  console.log(pets);
  const tableContent = (
    <Table striped highlightOnHover miw={1000} style={{ width: '100%' }}>
      <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
        <Table.Tr>
          <Table.Th>Pet ID</Table.Th>
          <Table.Th>Animal Type</Table.Th>
          <Table.Th>Breed</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Age (Months)</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {pets.map((pet) => (
          <Table.Tr key={pet.petId}>
            <Table.Td>{pet.petId}</Table.Td>
            <Table.Td>{pet.animalType}</Table.Td>
            <Table.Td>{pet.breed}</Table.Td>
            <Table.Td>₹{pet.price}</Table.Td>
            <Table.Td>{pet.age}</Table.Td>
            <Table.Td>
              <Badge color={pet.adoptionStatus === null ? 'green' : 'red'} variant="light">
                {pet.adoptionStatus === null ? 'Available for Adoption' : 'Available'}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Tooltip label="View Pet Details" withArrow>
                <ActionIcon variant="light" onClick={() => navigate(`/shelter/pets/card/${pet.petId}`)}>
                  <IconEye size={20} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Edit Pet" withArrow>
                <ActionIcon variant="light" onClick={() => navigate(`/shelter/pets/edit/${pet.petId}`)}>
                  <IconPencil size={20} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete Pet" withArrow color="red">
                <ActionIcon variant="light" color="red" onClick={() => handleDelete(pet.petId)}>
                  <IconTrash size={20} />
                </ActionIcon>
              </Tooltip>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  return (
    <div className={classes.container}>
      <Header mainLinks={transformedMainLinks} />
      <Box maw={1100} mx="auto">
        {pets.length === 0 ? (
          <Center mt="md">
            <Text size="lg" c="dimmed">
              No pets found. Consider adding some!
            </Text>
          </Center>
        ) : (
          <Paper withBorder shadow="sm" p="lg" radius="md" mx="auto" maw={1100}>
            <Title order={3} mb="md" ta="center" c="yellow">
              {pets.length === 1 ? 'You have 1 pet' : `You have ${pets.length} pets`}
            </Title>
            {pets.length > 4 ? (
              <ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                {tableContent}
              </ScrollArea>
            ) : (
              tableContent
            )}
          </Paper>
        )}
      </Box>
      <Footer />
    </div>
  );
}
