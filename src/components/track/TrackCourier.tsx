import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Title, Text, Group, Button, Container, Grid, Card } from '@mantine/core';

const Tracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trackingId = new URLSearchParams(location.search).get('trackingId'); // Get the trackingId from URL
  
  const handleBackToHomeClick = () => {
    navigate('/home');
  };

  return (
    <Container size="lg" style={{ marginTop: '50px' }}>
      <Paper shadow="xl" radius="md" p="xl" style={{ backgroundColor: '#f9fafb' }}>
        <Title ta="center" mb="md" c="teal">
          Tracking Information
        </Title>
        <Text align="center" size="lg" weight={600} style={{ color: '#333' }}>
          Tracking ID: <span style={{ color: '#0077b6' }}>{trackingId}</span>
        </Text>

        {/* Tracking Information Grid */}
        <Grid gutter="xl" style={{ marginTop: '20px' }}>
          <Card shadow="sm" radius="md" p="lg" style={{ backgroundColor: '#e0f7fa' }}>
            <Text size="lg" weight={500} mb="md">
              Tracking Details
            </Text>
            <Text size="sm" style={{ color: '#555' }}>
              This is where the map and vehicle information will go. The delivery status is
              updated in real-time as the vehicle moves along the route.
            </Text>
          </Card>

          {/* Map section */}
          <Card shadow="sm" radius="md" p="lg" style={{ backgroundColor: '#f0f0f0' }}>
            <Text size="lg" weight={500} mb="md">Current Location</Text>
            <div
              style={{
                width: '100%',
                height: '300px',
                backgroundColor: '#ccc',
                borderRadius: '8px',
                position: 'relative',
              }}
            >
              <Text align="center" style={{ paddingTop: '140px', fontSize: '18px', color: '#888' }}>
                Map Placeholder
              </Text>
              {/* Future Map Integration would go here */}
            </div>
          </Card>
        </Grid>

        {/* Back to Home Button */}
        <Group justify="center" mt="xl">
          <Button onClick={handleBackToHomeClick}>Back to Home</Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default Tracker;
