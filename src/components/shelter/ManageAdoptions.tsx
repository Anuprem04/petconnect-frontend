import { useEffect, useState } from 'react';
import cx from 'clsx';
import {
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
    Modal,
    ScrollArea,
    Button,
    Group,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconClipboardCheck } from '@tabler/icons-react';
import { useAuth } from '../security/useAuth';
import { notifications } from '@mantine/notifications';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import classes from '../user/AdoptionStatus.module.css';
import { PetDetailsPopup } from './PetDetailsPopup';
import { ViewProfileModal } from '../view/ViewProfile';

const mainLinks: MainLink[] = [
    { link: '/home', label: 'PetConnect Home' },
    { link: '/shelter/dashboard', label: 'Shelter Home' },
    { link: '/view/profile', label: 'View Profile' },
];

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

export function ManageAdoptionsTable() {
    interface Adoption {
        adoptionId: number;
        petId: number;
        userId: number;
        approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
        applicationDate: string;
        reason: string;
        name: string;
        phone: number;
        pet?: {
            breed: string;
        };
        user?: {
            name: string;
            phone?: string;
        };
    }

    const auth = useAuth();
    const [profileModalOpened, setProfileModalOpened] = useState(false);
    const [adoptions, setAdoptions] = useState<Adoption[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdoption, setSelectedAdoption] = useState<Adoption | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showPetDetails, setShowPetDetails] = useState(false);

    useEffect(() => {
        const fetchAdoptions = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8090/api/petConnect/adoptions/shelter/${auth?.id}`,
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
                console.error('Error fetching adoptions:', err);
            } finally {
                setLoading(false);
            }
        };

        if (auth?.id) fetchAdoptions();
    }, [auth?.id]);

    const handleApprove = async (adoptionId: number) => {
        try {
            const res = await fetch(`http://localhost:8090/api/petConnect/adoptions/${adoptionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ approvalStatus: 'APPROVED' }),
            });
            if (!res.ok) throw new Error('Failed to approve adoption');
            setAdoptions((prev) =>
                prev.map((ad) =>
                    ad.adoptionId === adoptionId ? { ...ad, approvalStatus: 'APPROVED' } : ad
                )
            );
            notifications.show({ title: 'Success', message: 'Adoption approved!', color: 'green' });
            setModalOpen(false);
            setShowPetDetails(false);
        } catch (err) {
            console.error(err);
            notifications.show({ title: 'Error', message: 'Approval failed', color: 'red' });
        }
    };

    const handleDecline = async (adoptionId: number) => {
        try {
            const res = await fetch(`http://localhost:8090/api/petConnect/adoptions/${adoptionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ approvalStatus: 'REJECTED' }),
            });
            if (!res.ok) throw new Error('Failed to decline adoption');
            setAdoptions((prev) =>
                prev.map((ad) =>
                    ad.adoptionId === adoptionId ? { ...ad, approvalStatus: 'REJECTED' } : ad
                )
            );
            notifications.show({ title: 'Success', message: 'Adoption declined!', color: 'green' });
            setModalOpen(false);
            setShowPetDetails(false);
        } catch (err) {
            console.error(err);
            notifications.show({ title: 'Error', message: 'Decline failed', color: 'red' });
        }
    };

    const handleRevoke = async (adoptionId: number) => {
        try {
            // Revoking resets the status to PENDING regardless of current decision.
            const res = await fetch(`http://localhost:8090/api/petConnect/adoptions/${adoptionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ approvalStatus: 'PENDING' }),
            });
            if (!res.ok) throw new Error('Failed to revoke decision');
            setAdoptions((prev) =>
                prev.map((ad) =>
                    ad.adoptionId === adoptionId ? { ...ad, approvalStatus: 'PENDING' } : ad
                )
            );
            notifications.show({ title: 'Success', message: 'Decision revoked!', color: 'green' });
            setModalOpen(false);
            setShowPetDetails(false);
        } catch (err) {
            console.error(err);
            notifications.show({ title: 'Error', message: 'Revoking decision failed', color: 'red' });
        }
    };

    if (loading) {
        return (
            <Center my="lg">
                <Loader />
            </Center>
        );
    }

    // Minimal table: Adoption ID, Pet ID, and Status
    const tableContent = (
        <Table striped highlightOnHover miw={1000} style={{ width: '100%' }}>
            <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <Table.Tr>
                    <Table.Th>Adoption ID</Table.Th>
                    <Table.Th>Pet ID</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Action</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {adoptions.map((ad) => (
                    <Table.Tr key={ad.adoptionId}>
                        <Table.Td>{ad.adoptionId}</Table.Td>
                        <Table.Td>
                            {ad.petId} {ad.pet?.breed ? `- ${ad.pet.breed}` : ''}
                        </Table.Td>
                        <Table.Td>
                            <Badge
                                color={
                                    ad.approvalStatus === 'APPROVED'
                                        ? 'green'
                                        : ad.approvalStatus === 'REJECTED'
                                            ? 'red'
                                            : 'gray'
                                }
                                variant="light"
                            >
                                {ad.approvalStatus}
                            </Badge>
                        </Table.Td>
                        <Table.Td>
                            <Tooltip label="View Details & Approval" withArrow>
                                <ActionIcon
                                    variant="light"
                                    onClick={() => {
                                        setSelectedAdoption(ad);
                                        setModalOpen(true);
                                        setShowPetDetails(false);
                                    }}
                                >
                                    <IconClipboardCheck size={20} />
                                </ActionIcon>
                            </Tooltip>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );

    return (
        <Box className={classes.container} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header
                mainLinks={transformedMainLinks}
                onProfileClick={() => setProfileModalOpened(true)}
            />
            <Box maw={1100} mx="auto" style={{ flex: 1 }}>
                <Paper withBorder shadow="sm" p="lg" radius="md" mx="auto" maw={1100}>
                    <Title order={3} mb="md" ta="center" c="yellow">
                        {adoptions.length === 1 ? 'You have 1 adoption' : `You have ${adoptions.length} adoptions`}
                    </Title>
                    {adoptions.length > 4 ? (
                        <ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                            {tableContent}
                        </ScrollArea>
                    ) : (
                        tableContent
                    )}
                </Paper>
            </Box>
            <Footer />
            <ViewProfileModal
                opened={profileModalOpened}
                onClose={() => setProfileModalOpened(false)}
            />
            <Modal
                opened={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setShowPetDetails(false);

                }}
                title={<Center><Title order={3} c="yellow">Adoption Details</Title></Center>}
                centered
                withCloseButton
                size="lg"
                zIndex={2000}
            >
                {selectedAdoption && (
                    <Box>
                        <Text>
                            <strong>Adoption ID:</strong> {selectedAdoption.adoptionId}
                        </Text>
                        <Text>
                            <strong>Pet ID:</strong> {selectedAdoption.petId} {selectedAdoption.pet?.breed ? `- ${selectedAdoption.pet.breed}` : ''}
                        </Text>
                        <Text>
                            <strong>Application Date:</strong> {selectedAdoption.applicationDate}
                        </Text>
                        <Text>
                            <strong>User Name:</strong> {selectedAdoption.name}
                        </Text>
                        <Text>
                            <strong>User Phone:</strong> {selectedAdoption.phone}
                        </Text>
                        <Text>
                            <strong>Reason for Adoption:</strong> {selectedAdoption.reason}
                        </Text>
                        <Text>
                            <strong>Status:</strong> {selectedAdoption.approvalStatus}
                        </Text>

                        {selectedAdoption.approvalStatus === 'PENDING' && (
                            <Group mt="md" justify="center">
                                <Button color="green" onClick={() => handleApprove(selectedAdoption.adoptionId)}>
                                    Approve
                                </Button>
                                <Button color="red" onClick={() => handleDecline(selectedAdoption.adoptionId)}>
                                    Decline
                                </Button>
                            </Group>
                        )}

                        {(selectedAdoption.approvalStatus === 'APPROVED' ||
                            selectedAdoption.approvalStatus === 'REJECTED') && (
                                <Group mt="md" justify="center">
                                    <Button color="orange" onClick={() => handleRevoke(selectedAdoption.adoptionId)}>
                                        Revoke Decision
                                    </Button>
                                </Group>
                            )}

                        <Group mt="md" justify="center">
                            <Button variant="outline" onClick={() => setShowPetDetails((prev) => !prev)}>
                                {showPetDetails ? 'Hide' : 'View'} Pet Details
                            </Button>
                        </Group>

                        {showPetDetails && (
                            <Box mt="md">
                                <PetDetailsPopup petId={selectedAdoption.petId} />
                            </Box>
                        )}
                    </Box>
                )}
            </Modal>
        </Box>
    );
}
