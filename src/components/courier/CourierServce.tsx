import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import {
    Container,
    TextInput,
    Select,
    NumberInput,
    Textarea,
    Button,
    Group,
    Paper,
    Title,
    Box,
    Flex,
    Modal,
} from '@mantine/core';

const CourierService = () => {
    const [form, setForm] = useState({
        senderName: '',
        senderContact: '',
        receiverName: '',
        receiverContact: '',
        courierType: '',
        weight: '',
        specialInstructions: '',
    });

    const [trackingId, setTrackingId] = useState('');
    const [modalOpened, setModalOpened] = useState(false); // For controlling modal visibility

    const navigate = useNavigate(); // Initialize navigate function from react-router-dom

    const handleInputChange = (field: string, value: string | number) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form Data:', form);

        if (form.senderName && form.receiverName && form.courierType && form.weight) {
            alert('Courier service request submitted successfully!');
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const handleTrackSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Tracking ID:', trackingId);

        // Navigate to the Tracker page and pass the trackingId as query parameter
        navigate(`/track/track?trackingId=${trackingId}`);

        setModalOpened(false); // Close the modal after submitting
    };

    const handleBackToHomeClick = () => {
        navigate('/home');
    };

    return (
        <div
            style={{
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1623704840616-bb8363de774d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Replace with your image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                backdropFilter: 'blur(8px)', // Apply blur effect
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <Flex gap="xl" justify="space-between">
                {/* Courier Service Form */}
                <Paper
                    shadow="md"
                    radius="md"
                    p="xl"
                    style={{
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent gray
                        color: 'white', // Text color
                    }}
                >
                    <Title ta="center" mb="md" c="teal">
                        Pet Courier Service
                    </Title>
                    <form onSubmit={handleSubmit}>
                        <Box mb="md">
                            <TextInput
                                label="Sender Name"
                                placeholder="John Doe"
                                value={form.senderName}
                                onChange={(e) => handleInputChange('senderName', e.currentTarget.value)}
                                required
                            />
                        </Box>
                        <Box mb="md">
                            <TextInput
                                label="Sender Contact"
                                placeholder="1234567890"
                                value={form.senderContact}
                                onChange={(e) => handleInputChange('senderContact', e.currentTarget.value)}
                                required
                            />
                        </Box>
                        <Box mb="md">
                            <TextInput
                                label="Receiver Name"
                                placeholder="Jane Doe"
                                value={form.receiverName}
                                onChange={(e) => handleInputChange('receiverName', e.currentTarget.value)}
                                required
                            />
                        </Box>
                        <Box mb="md">
                            <TextInput
                                label="Receiver Contact"
                                placeholder="0987654321"
                                value={form.receiverContact}
                                onChange={(e) => handleInputChange('receiverContact', e.currentTarget.value)}
                                required
                            />
                        </Box>
                        <Box mb="md">
                            <Select
                                label="Courier Type"
                                placeholder="Select Courier Type"
                                value={form.courierType}
                                onChange={(value) => handleInputChange('courierType', value || '')}
                                data={[
                                    { value: 'Express', label: 'Express' },
                                    { value: 'Standard', label: 'Standard' },
                                    { value: 'Overnight', label: 'Overnight' },
                                ]}
                                required
                            />
                        </Box>
                        <Box mb="md">
                            <NumberInput
                                label="Weight (in kg)"
                                placeholder="Enter weight"
                                value={form.weight}
                                onChange={(value) => handleInputChange('weight', value || '')}
                                required
                            />
                        </Box>
                        <Box mb="md">
                            <Textarea
                                label="Special Instructions"
                                placeholder="Enter any special instructions"
                                value={form.specialInstructions}
                                onChange={(e) => handleInputChange('specialInstructions', e.currentTarget.value)}
                            />
                        </Box>
                        <Group justify="center" mt="lg">
                            <Button type="submit" color="teal">
                                Submit
                            </Button>
                        </Group>
                    </form>
                </Paper>

                {/* Track Courier Section */}
                <Paper
                    shadow="md"
                    radius="md"
                    p="xl"
                    style={{
                        width: '28%',
                        height: 'fit-content', // Adjust the height to content
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent gray
                        color: 'white',
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                    }}
                >
                    <Title ta="center" mb="md" c="blue">
                        Track Courier
                    </Title>
                    <Flex direction="column" gap="md" align="center" mt="lg">
                        <Button onClick={() => setModalOpened(true)} color="blue">
                            Track Courier
                        </Button>
                        <Button
                            onClick={handleBackToHomeClick}
                            color="gray"
                        >
                            Back to Home
                        </Button>
                    </Flex>
                </Paper>
            </Flex>

            {/* Modal for Tracking ID Input */}
            <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Enter Tracking ID" size="sm">
                <form onSubmit={handleTrackSubmit}>
                    <Box mb="md">
                        <TextInput
                            label="Tracking ID"
                            placeholder="Enter Tracking ID"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.currentTarget.value)}
                            required
                        />
                    </Box>
                    <Group justify="center" mt="md">
                        <Button type="submit" color="blue">
                            Track Courier
                        </Button>
                    </Group>
                </form>
            </Modal>
        </div>
    );
};

export default CourierService;
