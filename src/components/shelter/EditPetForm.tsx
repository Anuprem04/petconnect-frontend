import {
  TextInput,
  NumberInput,
  Select,
  Group,
  Grid,
  Box,
  Image,
  Text,
  Button,
  Textarea
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconUpload, IconX } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { Pet } from '../user/DisplayPets';

type EditPetFormProps = {
  pet: Pet;
  setPet: React.Dispatch<React.SetStateAction<Pet>>;
  onSave: (files: File[], existingPhotos: string[]) => void;
};

export function EditPetForm({ pet, setPet, onSave }: EditPetFormProps) {
  const BREEDS_BY_TYPE: Record<string, string[]> = {
    Dog: ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Beagle', 'Bulldog', 'Pomeranian', 'Rottweiler', 'Doberman', 'Boxer', 'Indian Pariah Dog', 'Great Dane', 'Siberian Husky', 'Maltese', 'Shih Tzu', 'Cocker Spaniel', 'Dachshund', 'Bull Terrier', 'Chihuahua', 'Pug', 'Dalmatian', 'Other'],
    Cat: ['Indian Domestic Shorthair', 'Persian', 'Siamese', 'Bengal', 'Maine Coon', 'British Shorthair', 'Ragdoll', 'Sphynx', 'Russian Blue', 'Scottish Fold', 'Oriental Shorthair', 'Birman', 'Himalayan', 'Exotic Shorthair', 'American Shorthair', 'Other'],
    Bird: ['Budgerigar (Budgie)', 'Cockatiel', 'Lovebird', 'Indian Ringneck', 'Parrot', 'Finch', 'Canary', 'Macaw', 'Other'],
    Fish: ['Goldfish', 'Guppy', 'Betta', 'Molly', 'Tetra', 'Angelfish', 'Gourami', 'Other'],
  };

  const breedOptions = pet.animalType && BREEDS_BY_TYPE[pet.animalType]
    ? BREEDS_BY_TYPE[pet.animalType].map((b) => ({ value: b, label: b }))
    : [];

  const animalTypeOptions = Object.keys(BREEDS_BY_TYPE).map((type) => ({ value: type, label: type }));

  const [files, setFiles] = useState<File[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>(
    pet.photos ? pet.photos.split(',').map((p) => p.trim()) : []
  );

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const removeNewFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (index: number) => {
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box pos="relative" style={{ position: 'relative' }}>
      {/* Pet ID Field */}
      <TextInput
        label="Pet ID"
        value={pet.petId.toString()}
        disabled
        mt="xs"
        mb="xs"
      />

      <Grid columns={12} gutter="sm">
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <Select
            label="Animal Type"
            placeholder="Select animal type"
            data={animalTypeOptions}
            value={pet.animalType || ''}
            comboboxProps={{ withinPortal: true, zIndex: 9000 }}
            onChange={(value) => {
              const formatted = value
                ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
                : '';
              setPet({ ...pet, animalType: formatted, breed: '' });
            }}
            searchable
            clearable
          />
        </Grid.Col>

        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <Select
            label="Breed"
            placeholder="Select breed"
            data={breedOptions}
            value={breedOptions.some((b) => b.value === pet.breed) ? pet.breed : ''}
            onChange={(value) => setPet({ ...pet, breed: value || '' })}
            searchable
            clearable
            comboboxProps={{ withinPortal: true, zIndex: 9000 }}
          />
        </Grid.Col>
      </Grid>

      {pet.breed === 'Other' && (
        <TextInput
          label="Enter Breed"
          placeholder="Type custom breed"
          value={pet.breed}
          onChange={(e) => setPet({ ...pet, breed: e.currentTarget.value })}
          mt="sm"
        />
      )}

      <Grid columns={12} gutter="sm" mt="sm">
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <NumberInput
            label="Price (₹)"
            value={pet.price}
            onChange={(val) =>
              setPet({ ...pet, price: typeof val === 'string' ? parseFloat(val) : val || 0 })
            }
          />
        </Grid.Col>
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <NumberInput
            label="Age (months)"
            value={pet.age}
            onChange={(val) =>
              setPet({ ...pet, age: typeof val === 'string' ? parseFloat(val) : val || 0 })
            }
          />
        </Grid.Col>
      </Grid>

      <Textarea
        label="Description"
        placeholder="Add a description"
        value={pet.description || ''}
        onChange={(e) => setPet({ ...pet, description: e.currentTarget.value })}
        mt="sm"
      />

      <Grid columns={12} gutter="sm" mt="sm">
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <Select
            label="Gender"
            placeholder="Select gender"
            data={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
            value={pet.gender || ''}
            onChange={(val) => setPet({ ...pet, gender: val || '' })}
            clearable
            comboboxProps={{ withinPortal: true, zIndex: 9000 }}
          />
        </Grid.Col>
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <Select
            label="Adoption Status"
            value={pet.adoptionStatus || ''}
            onChange={(val) => setPet({ ...pet, adoptionStatus: val || null })}
            data={[
              { value: '', label: 'Available for Adoption' },
              { value: 'adopted', label: 'Adopted / Reserved' },
            ]}
            clearable
            comboboxProps={{ withinPortal: true, zIndex: 9000 }}
          />
        </Grid.Col>
      </Grid>

      {existingPhotos.length > 0 && (
        <Box mt="sm">
          <Text size="sm" mb="xs">Existing Images:</Text>
          <Group gap="sm" align="flex-start">
            {existingPhotos.map((photo, i) => (
              <Box key={i} sx={{ position: 'relative', border: '1px solid #ddd', padding: 4 }}>
                <Image
                  src={`http://localhost:8090/images/${photo}`}
                  width={100}
                  height={100}
                  fit="cover"
                />
                <Button
                  variant="light"
                  size="xs"
                  color="red"
                  mt={4}
                  fullWidth
                  onClick={() => removeExistingPhoto(i)}
                  leftIcon={<IconX size={14} />}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Group>
        </Box>
      )}

      <Dropzone
        onDrop={(accepted) => setFiles([...files, ...accepted])}
        accept={{ 'image/*': [] }}
        multiple
        mt="sm"
      >
        <Group justify="center" gap="xs">
          <IconUpload size={18} />
          <Text size="sm" color="dimmed">Drag or click to select images</Text>
        </Group>
      </Dropzone>

      {files.length > 0 && (
        <Group mt="sm" gap="sm">
          {files.map((file, i) => (
            <Box key={i} sx={{ border: '1px solid #ddd', padding: 4 }}>
              <Image src={URL.createObjectURL(file)} width={100} height={100} fit="cover" />
              <Button
                variant="light"
                size="xs"
                color="red"
                mt={4}
                fullWidth
                onClick={() => removeNewFile(i)}
                leftIcon={<IconX size={14} />}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Group>
      )}

      <Group justify="center" mt="md">
        <Button color="yellow" onClick={() => onSave(files, existingPhotos)}>
          Save
        </Button>
      </Group>
    </Box>
  );
}
