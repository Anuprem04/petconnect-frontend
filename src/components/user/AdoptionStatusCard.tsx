import { useEffect, useState } from 'react';
import { Table, Loader, Center, Badge, Title, Box, Paper, Text } from '@mantine/core';
import { useAuth } from '../security/useAuth';

interface AdoptionRequest {
  adoptionId: number;
  petId: number;
  applicationDate: string;
  approvalStatus: string;
  reason: string;
}

export function AdoptionRequestTable() {
  const auth = useAuth();
  const [adoptions, setAdoptions] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);

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
        const data = await res.json();
        setAdoptions(data);
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

  return (
    <Box maw={1100} mx="auto" mt="xl">
      <Title order={3} mb="md" ta="center" c="yellow">
        🐾 Your Adoption Requests
      </Title>

      {adoptions.length === 0 ? (
        <Center mt="md">
          <Text>No adoption requests found.</Text>
        </Center>
      ) : (
        <Paper withBorder shadow="sm" p="md" radius="md">
          <Table striped highlightOnHover withTableBorder>
            <thead>
              <tr>
                <th>Adoption ID</th>
                <th>Pet ID</th>
                <th>Reason</th>
                <th>Requested On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {adoptions.map((req) => (
                <tr key={req.adoptionId}>
                  <td>{req.adoptionId}</td>
                  <td>{req.petId}</td>
                  <td>{req.reason}</td>
                  <td>{new Date(req.applicationDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}</td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
