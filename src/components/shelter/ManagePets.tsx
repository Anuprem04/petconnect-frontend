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
    ActionIcon,
    Tooltip,
    Modal,
    Button,
    Group,
} from '@mantine/core';
import { Link, Navigate } from 'react-router-dom';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import { useAuth } from '../security/useAuth';
import classes from '../user/AdoptionStatus.module.css';
import { Header, MainLink } from '../header/Header';
import { Footer } from '../footer/Footer';
import { Pet } from '../user/DisplayPets';
import { PetDetailsPopup } from './PetDetailsPopup';
import { EditPetForm } from './EditPetForm';
import { notifications } from '@mantine/notifications';
import { ViewProfileModal } from '../view/ViewProfile';

const mainLinks: MainLink[] = [
    { link: '/home', label: 'PetConnect Home' },
    { link: '/shelter/dashboard', label: 'Shelter Home' },
    { link: '/view/profile', label: 'View Profile' },
];

const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
    ...item,
    display: (
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

export function ManagePetsTable() {
    const [profileModalOpened, setProfileModalOpened] = useState(false);
    const auth = useAuth();
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingPet, setEditingPet] = useState<Pet | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingPetId, setDeletingPetId] = useState<number | null>(null);


    const handleEdit = async (petId: number) => {
        try {
            const res = await fetch(`http://localhost:8090/api/petConnect/pets/${petId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await res.json();
            setEditingPet(data);
            setEditModalOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveEdit = async (files: File[], existingPhotos: string[]) => {
        if (!editingPet) return;

        const updatedPet = {
            ...editingPet,
            photos: [...existingPhotos, ...files.map((file) => file.name)].join(', ')
        };

        try {
            const res = await fetch(`http://localhost:8090/api/petConnect/pets/${editingPet.petId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedPet),
            });

            if (!res.ok) throw new Error('Failed to save');
            setPets((prev) =>
                prev.map((p) => (p.petId === editingPet.petId ? updatedPet : p))
            );
            setEditModalOpen(false);
            notifications.show({
                title: 'Success',
                message: 'Pet edited successfully',
                color: 'green',
              });
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Failure',
                message: 'Pet edit failed',
                color: 'red',
              });
        }
    };

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8090/api/petConnect/pets?shelterId=${auth?.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                if (!res.ok) throw new Error('Failed to fetch pets');
                const data: Pet[] = await res.json();
                setPets(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (auth?.id) {
            fetchPets();
        }
    }, [auth?.id]);


    if (!auth) return <Navigate to="/login/shelter" replace />;
    if (auth.role !== 'SHELTER') return <Navigate to="/login/shelter" replace />;

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
                    <Table.Th>Pet ID</Table.Th>
                    <Table.Th>Animal Type</Table.Th>
                    <Table.Th>Breed</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {pets.map((pet) => (
                    <Table.Tr key={pet.petId}>
                        <Table.Td>{pet.petId}</Table.Td>
                        <Table.Td>{pet.animalType}</Table.Td>
                        <Table.Td>{pet.breed}</Table.Td>
                        <Table.Td>
                            <Badge
                                color={pet.adoptionStatus === null ? 'green' : 'red'}
                                variant="light"
                            >
                                {pet.adoptionStatus === null ? 'Available for Adoption' : 'Adopted / Reserved'}
                            </Badge>
                        </Table.Td>
                        <Table.Td>
                            <Tooltip label="View Pet Details" withArrow>
                                <ActionIcon
                                    variant="light"
                                    onClick={() => {
                                        setSelectedPetId(pet.petId);
                                        setViewModalOpen(true);
                                    }}
                                >
                                    <IconEye size={20} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Edit Pet" withArrow>
                                <ActionIcon variant="light" onClick={() => handleEdit(pet.petId)}>
                                    <IconPencil size={20} />
                                </ActionIcon>

                            </Tooltip>
                            <Tooltip label="Delete Pet" withArrow color="red">
                                <ActionIcon
                                    variant="light"
                                    color="red"
                                    onClick={() => {
                                        setDeletingPetId(pet.petId);
                                        setDeleteModalOpen(true);
                                    }}
                                >
                                    <IconTrash size={20} />
                                </ActionIcon>

                            </Tooltip>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );

    return (
        <>
            {/* Layout content */}
            <div className={classes.container}>
                   <Header 
                       mainLinks={transformedMainLinks}  
                       onProfileClick={() => setProfileModalOpened(true)}
                     />
                <Box maw={1100} mx="auto">
                    {pets.length === 0 ? (
                        <Center mt="md">
                            <Text size="lg" c="dimmed">
                                No pets found. Consider adding some!
                            </Text>
                        </Center>
                    ) : (
                        <Paper withBorder shadow="sm" p="lg" radius="md" mx="auto" maw={1100}>
                            <Title order={3} mb="md" ta="center" c="yellow">
                                {pets.length === 1 ? 'You have 1 pet' : `You have ${pets.length} pets`}
                            </Title>
                            {pets.length > 4 ? (
                                <ScrollArea
                                    h={400}
                                    onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
                                >
                                    {tableContent}
                                </ScrollArea>
                            ) : (
                                tableContent
                            )}
                        </Paper>
                    )}
                </Box>
                <Footer />
                <ViewProfileModal 
                        opened={profileModalOpened} 
                        onClose={() => setProfileModalOpened(false)}
                      />
                      <Footer />
            </div>

            {/* Modal placed outside layout DOM */}
            <Modal
                opened={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                size="lg"
                title={<Title ta='center' order={2} c='yellow'>Pet Details</Title>}
                centered
                withCloseButton
                zIndex={2000}

            >
                {selectedPetId && <PetDetailsPopup petId={selectedPetId} />}
            </Modal>
            <Modal
                opened={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                size="lg"
                title={<Center ><Title ta='center' order={2} c='yellow'>Edit Pet</Title></Center>}
                centered
                zIndex={2000}
            >
                {editingPet && (
                    <EditPetForm
                        pet={editingPet}
                        setPet={setEditingPet as React.Dispatch<React.SetStateAction<Pet>>}
                        onSave={handleSaveEdit}

                    />
                )}
            </Modal>
            <Modal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title={<Center><Title order={3}>Are you sure?</Title></Center>}
                centered
                withCloseButton={false}
            >
                <Text ta="center" mb="md">
                    Do you really want to delete this pet {deletingPetId}? This action cannot be undone.
                </Text>
                <Group justify="center" mt="md">
                    <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={async () => {
                            if (!deletingPetId) return;
                            try {
                                const res = await fetch(`http://localhost:8090/api/petConnect/pets/${deletingPetId}`, {
                                    method: 'DELETE',
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                    },
                                });
                                if (!res.ok){  const error = await res.json(); console.log(error) ; throw new Error(error.message);}
                                setPets((prev) => prev.filter((p) => p.petId !== deletingPetId));
                                setDeleteModalOpen(false);
                                setDeletingPetId(null);
                                 notifications.show({
                                       title: 'Success',
                                       message: 'Pet deleted successfully',
                                       color: 'green',
                                     });
                            } catch (err) {
                                console.error(err);
                                notifications.show({
                                    title:  'Pet deletion failed',
                                    message: String(err),
                                    color: 'red',
                                  });
                            }
                        }}
                    >
                        Delete
                    </Button>
                </Group>
            </Modal>

        </>
    );
}
