// ViewProfileModal.tsx
import { useEffect, useState } from 'react';
import { Modal, Group, Avatar, Text, Loader, Center } from '@mantine/core';
import { IconAt, IconPhoneCall } from '@tabler/icons-react';
import classes from './ViewProfile.module.css';
import { useAuth } from '../security/useAuth';

interface ViewProfileModalProps {
  opened: boolean;
  onClose: () => void;
}

interface ShelterProfile {
  shelterId: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  // additional fields as needed
}

interface UserProfile {
  userId: number;
  name: string;
  email: string;
  phone: string;
  // additional fields as needed
}

export function ViewProfileModal({ opened, onClose }: ViewProfileModalProps) {
  const auth = useAuth();
  const [profileData, setProfileData] = useState<ShelterProfile | UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (opened && auth) {
        setLoadingProfile(true);
        setError(null);
        try {
          const token = localStorage.getItem('token');
          let response;
          if (auth.role === 'SHELTER') {
            response = await fetch(`http://localhost:8090/api/petConnect/shelters/${auth.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            response = await fetch(`http://localhost:8090/api/petConnect/users/${auth.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          }
          if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.statusText}`);
          }
          const data = await response.json();
          setProfileData(data);
        } catch (err: any) {
          console.error(err);
          setError(err.message);
        } finally {
          setLoadingProfile(false);
        }
      }
    };

    fetchProfile();
  }, [opened, auth]);

  return (
    <Modal opened={opened} onClose={onClose} title="Profile" centered>
      {loadingProfile ? (
        <Center>
          <Loader />
        </Center>
      ) : error ? (
        <Center>
          <Text color="red">Error: {error}</Text>
        </Center>
      ) : (
        <Group wrap="nowrap">
          <Avatar
            src={
              auth?.role === 'SHELTER'
                ? 'https://images.unsplash.com/photo-1633093823511-fa9d7d5699a1?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                : 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png'
            }
            size={94}
            radius="md"
          />
          <div>
            {auth?.role === 'SHELTER' ? (
              <>
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                  Shelter
                </Text>
                <Text fz="lg" fw={500} className={classes.name}>
                  {(profileData as ShelterProfile)?.name || 'Shelter Name'}
                </Text>
                <Text fz="sm" c="dimmed">
                  {(profileData as ShelterProfile)?.email || 'email@example.com'}
                </Text>
                <Text fz="sm" c="dimmed">
                  {(profileData as ShelterProfile)?.phone || '+1234567890'}
                </Text>
                <Text fz="sm" c="dimmed">
                  {(profileData as ShelterProfile)?.city || 'City'}
                </Text>
              </>
            ) : (
              <>
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                  User
                </Text>
                <Text fz="lg" fw={500} className={classes.name}>
                  {(profileData as UserProfile)?.name || 'User Name'}
                </Text>
                <Group wrap="nowrap" gap={10} mt={3}>
                  <IconAt stroke={1.5} size={16} className={classes.icon} />
                  <Text fz="sm" c="dimmed">
                    {(profileData as UserProfile)?.email || 'user@example.com'}
                  </Text>
                </Group>
                <Group wrap="nowrap" gap={10} mt={5}>
                  <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
                  <Text fz="sm" c="dimmed">
                    {(profileData as UserProfile)?.phone || '+1234567890'}
                  </Text>
                </Group>
              </>
            )}
          </div>
        </Group>
      )}
    </Modal>
  );
}
