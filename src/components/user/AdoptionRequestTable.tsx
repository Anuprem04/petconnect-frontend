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
  Button,
  MantineTheme,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../security/useAuth';
import classes from './AdoptionRequestTable.module.css';

interface AdoptionRequest {
  adoptionId: number;
  petId: number;
  applicationDate: string;
  approvalStatus: string;
  reason: string;
  // These fields will be populated after fetching pet and shelter details
  animalType?: string;
  breed?: string;
  shelterName?: string;
}

export function AdoptionRequestTable() {
  const auth = useAuth();
  const [adoptions, setAdoptions] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const res = await fetch(
          `http://localhost:8090/api/petConnect/adoptions/user/${auth?.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (!res.ok) throw new Error('Failed to fetch adoptions');
        const rawAdoptions: AdoptionRequest[] = await res.json();

        // For each adoption request, fetch pet details and then shelter details.
        const adoptionsWithDetails = await Promise.all(
          rawAdoptions.map(async (req) => {
            // Fetch pet details for this adoption
            const petRes = await fetch(
              `http://localhost:8090/api/petConnect/pets/public/${req.petId}`
            );
            const petData = await petRes.json();

            // Fetch shelter details using petData.shelterId
            const shelterRes = await fetch(
              `http://localhost:8090/api/petConnect/shelters/${petData.shelterId}`
            );
            const shelterData = await shelterRes.json();

            return {
              ...req,
              animalType: petData.animalType,
              breed: petData.breed,
              shelterName: shelterData.name,
            };
          })
        );

        setAdoptions(adoptionsWithDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.id) {
      fetchAdoptions();
    }
  }, [auth?.id]);

  if (loading) {
    return (
      <Center my="lg">
        <Loader />
      </Center>
    );
  }

  const tableContent = (
    <Table striped highlightOnHover miw={1000} style={{ width: '100%' }}>
      <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
        <Table.Tr>
          <Table.Th>Adoption ID</Table.Th>
          <Table.Th>Pet ID</Table.Th>
          <Table.Th>Animal Type</Table.Th>
          <Table.Th>Breed</Table.Th>
          <Table.Th>Shelter Name</Table.Th>
          <Table.Th>Reason</Table.Th>
          <Table.Th>Requested On</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {adoptions.map((req) => (
          <Table.Tr key={req.adoptionId}>
            <Table.Td>{req.adoptionId}</Table.Td>
            <Table.Td>{req.petId}</Table.Td>
            <Table.Td>{req.animalType}</Table.Td>
            <Table.Td>{req.breed}</Table.Td>
            <Table.Td>{req.shelterName}</Table.Td>
            <Table.Td>{req.reason}</Table.Td>
            <Table.Td>
              {new Date(req.applicationDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </Table.Td>
            <Table.Td>
              <Badge
                color={
                  req.approvalStatus === 'PENDING'
                    ? 'yellow'
                    : req.approvalStatus === 'APPROVED'
                    ? 'green'
                    : 'red'
                }
                variant="light"
              >
                {req.approvalStatus}
              </Badge>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  return (
    <Box maw={1100} mx="auto" mt="xl">
      {adoptions.length === 0 ? (
        <Center mt="md">
          <Text size="lg" c="dimmed">
            🐾 No adoption requests found. Start exploring pets!
          </Text>
        </Center>
      ) : (
        <Paper withBorder shadow="sm" p="lg" radius="md" mx="auto" maw={1100}>
          <Title order={3} mb="md" ta="center" c="yellow">
            🐾 {adoptions.length === 1
              ? 'You have 1 adoption request'
              : `You have ${adoptions.length} adoption requests`}
          </Title>
          {adoptions.length > 4 ? (
            <ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
              {tableContent}
            </ScrollArea>
          ) : (
            tableContent
          )}
        </Paper>
      )}
      {adoptions.length > 0 && adoptions.length < 3 && (
        <Box
          mt="xl"
          p="md"
          sx={(theme: MantineTheme) => ({
            backgroundColor: theme.colors.gray[0],
            borderRadius: theme.radius.md,
            textAlign: 'center',
          })}
        >
          <Text size="xl" weight={500}>
            Looking for more pets to adopt?
          </Text>
          <Text size="md" color="dimmed" mt="xs">
            Visit our pet gallery and discover more adorable companions waiting for a loving home.
          </Text>
          <Button component={Link} to="/pets" mt="md">
            Explore Pets
          </Button>
        </Box>
      )}
    </Box>
  );
}
