import {
    TextInput,
    NumberInput,
    Textarea,
    Button,
    Group,
    Title,
    Paper,
    Text,
    CloseIcon,
    Select,
  } from '@mantine/core';
  import { Dropzone } from '@mantine/dropzone';
  import { useForm } from '@mantine/form';
  import { notifications } from '@mantine/notifications';
  import { Navigate, Link } from 'react-router-dom';
  import { Footer } from '../footer/Footer';
  import { Header, MainLink } from '../header/Header';
  import { useAuth } from '../security/useAuth';
  import styles from './AddPet.module.css';
  import { IconCirclePlusFilled, IconUpload } from '@tabler/icons-react';
  import { jwtDecode } from 'jwt-decode';

  
  const mainLinks: MainLink[] = [
    { link: '/home', label: 'PetConnect Home' },
    { link: '/shelter/dashboard', label: 'Shelter Home' },
    { link: '/view/profile', label: 'View Profile' },
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
        animalType: null as string | null,
        breed: null as string | null,
        ageValue: 0,
        ageUnit: 'Years',
        customBreed: '',
        gender: null as string | null,
        description: '',
        price: 0,
        photoFiles: [] as File[],
      },
      validate: {
        animalType: (value) =>
          value == null ? 'Animal type is required' : null,
        breed: (value) =>
          value == null ? 'Breed is required' : null,
        ageValue: (v) => (v <= 0 ? 'Age must be greater than 0' : null),
        ageUnit: (u) => (!u ? 'Select unit' : null),
        customBreed: (_, values) =>
          values.breed === 'Other' && !values.customBreed.trim()
            ? 'Please specify breed'
            : null,
        gender: (value) =>
          value == null ? 'Gender is required' : null,
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
        formData.append(
          'pet',
          new Blob(
            [JSON.stringify({
              shelterId: values.shelterId,
              animalType: values.animalType,
              breed: values.breed === 'Other' ? values.customBreed : values.breed,
              age: values.ageUnit === 'Months' ? values.ageValue : values.ageValue * 12,
              gender: values.gender,
              description: values.description,
              price: values.price,
            })],
            { type: 'application/json' }
          )
        );
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
  
        // Reset form values using null for select fields
        form.setValues({
          shelterId: auth.id || '',
          animalType: null,
          breed: null,
          ageValue: 0,
          ageUnit: 'Years',
          customBreed: '',
          gender: null,
          description: '',
          price: 0,
          photoFiles: [],
        });
        form.resetDirty();
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
  
    const removeIcon = <CloseIcon size="14" />;
    const addIcon = <IconCirclePlusFilled size="14" />;
  
    return (
      <>
        <div className={styles.container}>
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
                    disabled
                    readOnly
                    styles={whiteInputStyles}
                    {...form.getInputProps('shelterId')}
                  />
                  <Select
                    label="Animal Type"
                    placeholder="Select animal type"
                    data={['Dog', 'Cat', 'Bird', 'Fish']}
                    styles={whiteInputStyles}
                    required
                    {...form.getInputProps('animalType')}
                  />
                  <Select
                    label="Breed"
                    placeholder="Select breed"
                    data={
                      form.values.animalType
                        ? BREEDS_BY_TYPE[form.values.animalType] || []
                        : []
                    }
                    styles={whiteInputStyles}
                    required
                    {...form.getInputProps('breed')}
                  />
                  {form.values.breed === 'Other' && (
                    <TextInput
                      label="Enter breed"
                      placeholder="Type custom breed"
                      styles={whiteInputStyles}
                      required
                      {...form.getInputProps('customBreed')}
                    />
                  )}
                  <Group grow>
                    <NumberInput
                      label="Age"
                      placeholder="Enter pet age"
                      min={0}
                      required
                      styles={whiteInputStyles}
                      {...form.getInputProps('ageValue')}
                    />
                    <Select
                      label="Unit"
                      data={['Years', 'Months']}
                      styles={whiteInputStyles}
                      required
                      {...form.getInputProps('ageUnit')}
                    />
                  </Group>
                  <Select
                    label="Gender"
                    placeholder="Select gender"
                    data={['Male', 'Female']}
                    styles={whiteInputStyles}
                    required
                    {...form.getInputProps('gender')}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Enter a description"
                    styles={whiteInputStyles}
                    {...form.getInputProps('description')}
                  />
                  <NumberInput
                    label="Price (INR)"
                    placeholder="Enter pet price"
                    min={0}
                    required
                    styles={whiteInputStyles}
                    {...form.getInputProps('price')}
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
                    }}
                    onDrop={(newFiles) => {
                      const existing = form.values.photoFiles;
                      const fileKey = (file: File) => `${file.name}-${file.size}`;
                      const existingKeys = new Set(existing.map(fileKey));
                      const uniqueNew = newFiles.filter(
                        (file) => !existingKeys.has(fileKey(file))
                      );
                      const updated = [...existing, ...uniqueNew];
  
                      if (uniqueNew.length < newFiles.length) {
                        notifications.show({
                          title: 'Some files were skipped',
                          message: `${newFiles.length - uniqueNew.length} duplicate file(s) not added.`,
                          color: 'yellow',
                        });
                      }
  
                      form.setFieldValue('photoFiles', updated);
                    }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Group gap="xs" align="center">
                      <IconUpload size={18} />
                      <Text size="sm" color="dimmed">
                        Upload JPG, JPEG, or AVIF images (max 2MB each)
                      </Text>
                    </Group>
                  </Dropzone>
  
                  {form.values.photoFiles.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <Text size="sm">
                        📁 {form.values.photoFiles.length} file
                        {form.values.photoFiles.length > 1 ? 's' : ''} selected
                      </Text>
                      {form.values.photoFiles.map((file, index) => (
                        <Group key={index} justify="space-between" mt={4}>
                          <Text size="xs">{file.name}</Text>
                          <Button
                            leftSection={removeIcon}
                            size="xs"
                            color="red"
                            onClick={() => {
                              const updatedFiles = [...form.values.photoFiles];
                              updatedFiles.splice(index, 1);
                              form.setFieldValue('photoFiles', updatedFiles);
                            }}
                          >
                            Remove
                          </Button>
                        </Group>
                      ))}
                    </div>
                  )}
                  <Group style={{ justifyContent: 'flex-end' }} mt="md">
                    <Button leftSection={addIcon} size="xs" type="submit">
                      Add Pet
                    </Button>
                  </Group>
                </form>
              </Paper>
            </div>
          </div>
          <div className={styles.rightColumn} />
        </div>
        <Footer style={{ marginTop: '0px' }} />
      </>
    );
  }
  