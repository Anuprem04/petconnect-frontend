import {  useLocation, useNavigate } from 'react-router-dom';
import {
  Paper,
  Title,
  Text,
  Group,
  Button,
  Container,
  Grid,
  Card,
  Timeline,
} from '@mantine/core';
import {
  IconMapPin,
  IconTruckDelivery,
  IconClock,
  IconCheck,
} from '@tabler/icons-react';

// ✅ Added compact prop to control modal behavior
const Tracker = ({ trackingId: propTrackingId }: { trackingId?: string; compact?: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const trackingId = propTrackingId ?? new URLSearchParams(location.search).get('trackingId');

  const handleBackToHomeClick = () => {
    navigate('/user/dashboard');
  };

 


  return (
    <>
      <Container size="md" mt="md">
        <Paper shadow="md" radius="md" p="md" style={{ backgroundColor: '#1a1b1e' }}>
          <Title ta="center" order={2} mb="sm" style={{ color: '#ffffff' }}>
            Tracking Information
          </Title>
          <Text align="center" size="sm" weight={500} style={{ color: '#dee2e6' }}>
            Tracking ID: <span style={{ color: '#4dabf7' }}>{trackingId}</span>
          </Text>

          {/* Compact Tracking Info Grid */}
          <Grid mt="md" gutter="md">
            <Grid.Col span={6}>
              <Card shadow="sm" radius="md" p="sm" style={{ backgroundColor: '#2e2f3a' }}>
                <Text size="sm" weight={500} mb="xs" style={{ color: '#ffffff' }}>
                  Tracking Details
                </Text>
                <Text size="xs" style={{ color: '#adb5bd' }}>
                  Map and vehicle info will appear here. Status updates in real-time.
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={6}>
              <Card shadow="sm" radius="md" p="sm" style={{ backgroundColor: '#2e2f3a' }}>
                <Text size="sm" weight={500} mb="xs" style={{ color: '#ffffff' }}>
                  Current Location
                </Text>
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    backgroundColor: '#444',
                    borderRadius: '6px',
                    position: 'relative',
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                    alt="Map Icon"
                    style={{
                      width: '60px',
                      height: '60px',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: 0.6,
                    }}
                  />
                </div>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Compact Timeline */}
          <Title order={4} mt="lg" mb="xs" style={{ color: '#ffffff', textAlign: 'center' }}>
            Delivery Status
          </Title>
          <Timeline active={2} bulletSize={18} lineWidth={1} color="blue">
            <Timeline.Item bullet={<IconMapPin size={10} />} title="Pickup Scheduled">
              <Text size="xs" c="dimmed">Pickup has been scheduled.</Text>
              <Text size="xs" mt={2}>2 hrs ago</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<IconTruckDelivery size={10} />} title="In Transit">
              <Text size="xs" c="dimmed">Courier is en route.</Text>
              <Text size="xs" mt={2}>45 min ago</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<IconClock size={10} />} title="Out for Delivery">
              <Text size="xs" c="dimmed">Arriving shortly.</Text>
              <Text size="xs" mt={2}>Few minutes away</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<IconCheck size={10} />} title="Delivered">
              <Text size="xs" c="dimmed">Delivery pending confirmation.</Text>
              <Text size="xs" mt={2}>Pending…</Text>
            </Timeline.Item>
          </Timeline>

        
            <Group justify="center" mt="md">
              <Button color="gray" size="xs" variant="light" onClick={handleBackToHomeClick}>
                Back Home
              </Button>
            </Group>
        </Paper>
      </Container>

 
    </>
  );
};

export default Tracker;
