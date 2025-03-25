import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, Center, ActionIcon, Text } from '@mantine/core';
import { IconPlus, IconEye, IconSettings } from '@tabler/icons-react';

// Imported images
import addAccessories from '../../assets/AddAccessories.jpg';
import manageAccessories from '../../assets/manageAccessories.avif';
import inquiry from '../../assets/inquiry.jpg';

export function ShelterCards() {
  // Initialize navigate hook
  const navigate = useNavigate();

  return (
    <Container fluid my="xl" pt="xl" p={0} style={{ margin: 0, padding: 0 }}>
      <Grid gutter="sm" style={{ margin: 0, padding: 0 }}>
        {/* Card 1: Add Pet */}
        <Grid.Col span={{ base: 6, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage:
                'url(https://images.unsplash.com/photo-1588752725970-853acb5b2621?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '25vh',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon
                size="xl"
                variant="filled"
                onClick={() => navigate('/add/pet')}
              >
                <IconPlus size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                Add Pet
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        {/* Card 2: Manage Pets */}
        <Grid.Col span={{ base: 6, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage:
                'url(https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '25vh',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon
                size="xl"
                variant="filled"
                onClick={() => navigate('/manage/pets')}
              >
                <IconSettings size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                Manage Pets
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        {/* Card 3: Add Accessory */}
        <Grid.Col span={{ base: 6, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage: `url(${addAccessories})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '25vh',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon
                size="xl"
                variant="filled"
                onClick={() => navigate('/add/accessory')}
              >
                <IconPlus size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                Add Accessory
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        {/* Card 4: Manage Accessories */}
        <Grid.Col span={{ base: 6, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage: `url(${manageAccessories})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '25vh',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon
                size="xl"
                variant="filled"
                onClick={() => navigate('/manage/accessories')}
              >
                <IconSettings size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                Manage Accessories
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        {/* Card 5: Manage Adoptions */}
        <Grid.Col span={{ base: 6, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage:
                'url(https://images.unsplash.com/photo-1597174209067-c57f9400cf4c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '25vh',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon
                size="xl"
                variant="filled"
                onClick={() => navigate('/manage/adoptions')}
              >
                <IconSettings size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                Manage Adoptions
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        {/* Card 6: View Inquiries */}
        <Grid.Col span={{ base: 6, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage: `url(${inquiry})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '25vh',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon
                size="xl"
                variant="filled"
                onClick={() => navigate('/view/inquiries')}
              >
                <IconEye size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                View Inquiries
              </Text>
            </Center>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
