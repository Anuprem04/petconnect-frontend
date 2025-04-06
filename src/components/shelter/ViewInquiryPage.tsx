import { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Title,
  Text,
  Loader,
  Center,
  Paper,
  ScrollArea,
  Badge,
  Anchor,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const ViewInquiriesPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleBackToHomeClick = () => {
      navigate('/home');
    };

  useEffect(() => {
    fetch('/api/inquiries')
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching inquiries:', error);
        setLoading(false);
      });
  }, []);

  const rows = inquiries.map((inquiry) => (
    <tr key={inquiry.id}>
      <td>{inquiry.name}</td>
      <td>{inquiry.email}</td>
      <td>{inquiry.subject}</td>
      <td>{inquiry.message}</td>
      <td>
        <Badge color="blue" variant="light">
          {new Date(inquiry.createdAt).toLocaleString()}
        </Badge>
      </td>
    </tr>
  ));

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Blurred background */}
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1608121173858-7fe89bf2c81f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />

      {/* Foreground content */}
      <Container size="xl" py="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Title order={2} mb="lg" ta="center" c="teal">
          User Inquiries
        </Title>

        {loading ? (
          <Center>
            <Loader size="lg" color="teal" />
          </Center>
        ) : inquiries.length === 0 ? (
          <Center>
            <Text>No inquiries found.</Text>
          </Center>
        ) : (
          <Paper
            shadow="md"
            radius="md"
            p="lg"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
          >
            <ScrollArea>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          </Paper>
        )}
        <Text ta="center" mt="lg" style={{ color: '#0d0f12' }}>
                                              <Anchor href="/home" onClick={handleBackToHomeClick} fw={700} style={{ color: 'black', fontSize: '1rem' }}>
                                                Back to Home
                                              </Anchor>
                                            </Text>
      </Container>
    </div>
  );
};

export default ViewInquiriesPage;
