import React from 'react';
import { Container, Grid, Card, Center, ActionIcon, Text } from '@mantine/core';
import { IconPlus, IconEye, IconSettings } from '@tabler/icons-react';
import classes from './ShelterCards.module.css';

export function ShelterCards() {
  return (
    <Container fluid my="xl" p={0} style={{ margin: 0, padding: 0 }}>
      <Grid gutter="sm" style={{ margin: 0, padding: 0 }}>
        {/* Card 1: Add Pet */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage: 'url(/assets/add-pet.jpg)', // Replace with your pet image path
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon size="xl" variant="filled">
                <IconPlus size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                Add Pet
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        {/* Card 2: Add Accessory */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage: 'url(/assets/add-accessory.jpg)', // Replace with your accessory image path
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon size="xl" variant="filled">
                <IconPlus size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                Add Accessory
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        {/* Card 3: Manage Pets */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage: 'url(/assets/manage-pets.jpg)', // Replace with your manage pets image path
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon size="xl" variant="filled">
                <IconSettings size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                Manage Pets
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        {/* Card 4: Manage Accessories */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card
            shadow="sm"
            radius="md"
            style={{
              margin: 0,
              padding: 0,
              backgroundImage: 'url(/assets/manage-accessories.jpg)', // Replace with your manage accessories image path
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px',
              position: 'relative',
            }}
          >
            <Center style={{ height: '100%', flexDirection: 'column' }}>
              <ActionIcon size="xl" variant="filled">
                <IconEye size={24} />
              </ActionIcon>
              <Text mt="xs" weight={500} style={{ color: 'white' }}>
                Manage Accessories
              </Text>
            </Center>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
