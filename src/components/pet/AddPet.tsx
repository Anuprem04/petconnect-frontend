import {
    TextInput,
    NumberInput,
    Textarea,
    Button,
    Select,
    Group,
    Title,
    Paper,
    Text,

} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Navigate, Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { useAuth } from '../security/useAuth';
import styles from './AddPet.module.css';
import { IconUpload } from '@tabler/icons-react';
import { jwtDecode } from 'jwt-decode';
const mainLinks: MainLink[] = [
    { link: '/home', label: 'Home' },
    { link: '/view/profile', label: 'View Profile' }
];

const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
    ...item,
    display: (
        <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
            {item.label}
        </Link>
    ),
}));

export function AddPet() {
    const BREEDS_BY_TYPE: Record<string, string[]> = {
        Dog: [
            'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Beagle', 'Bulldog',
            'Pomeranian', 'Rottweiler', 'Doberman', 'Boxer', 'Indian Pariah Dog',
            'Great Dane', 'Siberian Husky', 'Maltese', 'Shih Tzu', 'Cocker Spaniel',
            'Dachshund', 'Bull Terrier', 'Chihuahua', 'Pug', 'Dalmatian', 'Other'
        ],
        Cat: [
            'Indian Domestic Shorthair', 'Persian', 'Siamese', 'Bengal', 'Maine Coon',
            'British Shorthair', 'Ragdoll', 'Sphynx', 'Russian Blue', 'Scottish Fold',
            'Oriental Shorthair', 'Birman', 'Himalayan', 'Exotic Shorthair', 'American Shorthair', 'Other'
        ],
        Bird: [
            'Budgerigar (Budgie)', 'Cockatiel', 'Lovebird', 'Indian Ringneck', 'Parrot',
            'Finch', 'Canary', 'Macaw', 'Other'
        ],
        Fish: [
            'Goldfish', 'Guppy', 'Betta', 'Molly', 'Tetra', 'Angelfish', 'Gourami', 'Other'
        ],
    };

    const auth = useAuth();
    if (!auth) return <Navigate to="/login/shelter" replace />;
    if (auth.role !== 'SHELTER') return <Navigate to="/login/shelter" replace />;

    const shelterId = auth.id || '';
    console.log(jwtDecode(auth.token));
    const form = useForm({
        initialValues: {
            shelterId: shelterId,
            animalType: '',
            breed: '',
            ageValue: 0,
            ageUnit: 'Years',
            customBreed: '',
            gender: '',
            description: '',
            price: 0,
            // Change from single file to an array of files
            photoFiles: [] as File[],
        },
        validate: {
            animalType: (value) =>
                value.trim().length === 0 ? 'Animal type is required' : null,
            breed: (value) =>
                value.trim().length === 0 ? 'Breed is required' : null,
            ageValue: (v) => (v <= 0 ? 'Age must be greater than 0' : null),
            ageUnit: (u) => (!u ? 'Select unit' : null),
            customBreed: (_, values) =>
                values.breed === 'Other' && !values.customBreed.trim()
                    ? 'Please specify breed'
                    : null,
            gender: (value) =>
                value.trim().length === 0 ? 'Gender is required' : null,
            price: (value) => (value < 0 ? 'Price must be greater than 0' : null),
            photoFiles: (files: File[]) => {
                if (!files || files.length === 0) {
                    return 'At least one image is required';
                }
                for (const file of files) {
                    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/avif'].includes(file.type)) {
                        return 'Only JPG/JPEG/AVIF/PNG images are allowed';
                    }
                    if (file.size > 2 * 1024 * 1024) {
                        return 'Each file must be less than 2MB';
                    }
                }
                return null;
            },
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const formData = new FormData();
            // Append pet details as JSON blob
            formData.append(
                'pet',
                new Blob(
                    [
                        JSON.stringify({
                            shelterId: values.shelterId,
                            animalType: values.animalType,
                            breed: values.breed === 'Other' ? values.customBreed : values.breed,
                            age: values.ageUnit === 'Months' ? values.ageValue : values.ageValue * 12,
                            gender: values.gender,
                            description: values.description,
                            price: values.price,
                        }),
                    ],
                    { type: 'application/json' }
                )
            );
            // Append each file separately
            values.photoFiles.forEach((file) =>
                formData.append('photoFiles', file)
            );

            const response = await fetch('http://localhost:8090/api/petConnect/pets', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to add pet');
            notifications.show({
                title: 'Success',
                message: 'Pet added successfully',
                color: 'green',
            });
            form.reset();
        } catch (error: any) {
            notifications.show({
                title: 'Error',
                message: error.message || 'Failed to add pet',
                color: 'red',
            });
        }
    };

    const whiteInputStyles = {
        label: { color: 'white' },
        input: { color: 'white' },
    };

    return (
        <>
            <div className={styles.container}>
                {/* Left Column: Form with header and footer */}
                <div className={styles.leftColumn}>
                    <Header mainLinks={transformedMainLinks} />
                    <div className={styles.formWrapper}>
                        <Paper className={styles.fixedForm} shadow="md" p="xl">
                            <Title order={2} ta="center" mb="md" className={styles.titleWhite}>
                                Add New Pet
                            </Title>
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <TextInput
                                    label="Shelter ID"
                                    value={form.values.shelterId}
                                    readOnly
                                    disabled
                                    styles={whiteInputStyles}
                                />
                                <Select
                                    label="Animal Type"
                                    placeholder="Select animal type"
                                    data={['Dog', 'Cat', 'Bird', 'Fish']}
                                    value={form.values.animalType}
                                    onChange={(val) => form.setFieldValue('animalType', val || '')}
                                    error={form.errors.animalType}
                                    required
                                    styles={whiteInputStyles}
                                />
                                <Select
                                    label="Breed"
                                    placeholder="Select breed"
                                    data={BREEDS_BY_TYPE[form.values.animalType] || []}
                                    value={form.values.breed}
                                    onChange={(val) => form.setFieldValue('breed', val || '')}
                                    error={form.errors.breed}
                                    required
                                    styles={whiteInputStyles}
                                />

                                {form.values.breed === 'Other' && (
                                    <TextInput
                                        label="Enter breed"
                                        placeholder="Type custom breed"
                                        {...form.getInputProps('customBreed')}
                                        required
                                        styles={whiteInputStyles}
                                    />
                                )}

                                <Group grow>
                                    <NumberInput
                                        label="Age"
                                        placeholder="Enter pet age"
                                        {...form.getInputProps('ageValue')}
                                        min={0}
                                        required
                                        styles={whiteInputStyles}
                                    />
                                    <Select
                                        label="Unit"
                                        data={['Years', 'Months']}
                                        {...form.getInputProps('ageUnit')}
                                        required
                                        styles={whiteInputStyles}
                                    />
                                </Group>
                                <Select
                                    label="Gender"
                                    placeholder="Select gender"
                                    data={['Male', 'Female']}
                                    {...form.getInputProps('gender')}
                                    required
                                    styles={whiteInputStyles}
                                />
                                <Textarea
                                    label="Description"
                                    placeholder="Enter a description"
                                    {...form.getInputProps('description')}
                                    styles={whiteInputStyles}
                                />
                                <NumberInput
                                    label="Price (INR)"
                                    placeholder="Enter pet price"
                                    {...form.getInputProps('price')}
                                    min={0}
                                    required
                                    styles={whiteInputStyles}
                                />
                                <Text size="sm" weight={500} mb="4px" style={{ color: 'white' }}>
                                    Upload Photos
                                </Text>
                                <Dropzone
                                    multiple

                                    accept={{
                                        'image/png': ['.png'],
                                        'image/jpeg': ['.jpg', '.jpeg'],
                                        'image/avif': ['.avif'],
                                    }} onDrop={(files) => form.setFieldValue('photoFiles', files)}
                                    style={{ width: '100%', height: '100%' }}
                                    mx={{ border: '1px solid rgba(255,255,255,0.3)', borderRadius: 4 }}
                                >
                                    <Group gap="xs" align="center">
                                        <IconUpload size={18} />
                                        <Text size="sm" color="dimmed">
                                            Upload JPG, JPEG or AVIF images (max 2MB each)
                                        </Text>
                                    </Group>
                                </Dropzone>

                                {form.values.photoFiles.length > 0 && (
                                    <Text size="sm" mt="xs">
                                        📁 {form.values.photoFiles.length} file{form.values.photoFiles.length > 1 ? 's' : ''} selected
                                    </Text>
                                )}
                                <Group style={{ justifyContent: 'flex-end' }} mt="md">
                                    <Button type="submit">Add Pet</Button>
                                </Group>
                            </form>
                        </Paper>
                    </div>
                </div>

                {/* Right Column: Background Image */}
                <div className={styles.rightColumn} />
            </div>
            <Footer style={{ marginTop: '0px' }} />
        </>
    );
}
