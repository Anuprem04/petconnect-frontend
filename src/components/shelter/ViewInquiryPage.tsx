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
  Anchor,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { MainLink, Header } from '../header/Header';
import { ViewProfileModal } from '../view/ViewProfile';

const mainLinks: MainLink[] = [
  { link: '/home', label: 'PetConnect Home' },
  { link: '/shelter/dashboard', label: 'Shelter Home' },
  { link: '/view/profile', label: 'View Profile' },
];

interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
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

const ViewInquiriesPage = () => {
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBackToHomeClick = () => {
    navigate('/home');
  };

  useEffect(() => {
    fetch('http://localhost:8090/api/petConnect/queries', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
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
    <Table.Tr key={inquiry.id}>
      <Table.Td>{inquiry.name}</Table.Td>
      <Table.Td>{inquiry.email}</Table.Td>
      <Table.Td>{inquiry.subject}</Table.Td>
      <Table.Td>{inquiry.message}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
       <Header 
            mainLinks={transformedMainLinks}  
            onProfileClick={() => setProfileModalOpened(true)}
          />
    <div style={{ position: 'relative', minHeight: '100vh' ,paddingTop: '10%'}}>
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
          //  style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
          >
            <ScrollArea>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Subject</Table.Th>
                    <Table.Th>Message</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </ScrollArea>
          </Paper>
        )}

        <Text ta="center" mt="lg" style={{ color: '#0d0f12' }}>
          <Anchor
            href="/shelter/dashboard"
            onClick={handleBackToHomeClick}
            fw={700}
            style={{ color: 'black', fontSize: '1rem' }}
          >
            Back to Home
          </Anchor>
        </Text>
      </Container>
    </div>
    <Footer style={{ marginTop: '0%' }}/>
      <ViewProfileModal 
            opened={profileModalOpened} 
            onClose={() => setProfileModalOpened(false)}
          />
    </>
  );
};

export default ViewInquiriesPage;
