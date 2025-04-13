import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Center,
  Loader,
  Title,
  Text,
  Image,
  Group,
  Badge,
  Stack,
  SimpleGrid,
  Container,
  Button,
  Textarea,
  Input,
  Paper,
  TextInput,
  InputWrapper,
  Checkbox,
  Select,
} from '@mantine/core';
import {
  IconGenderFemale,
  IconGenderMale,
  IconMapPin,
  IconPhoneCall,
} from '@tabler/icons-react';
import { Header, MainLink } from '../header/Header';
import { Footer } from '../footer/Footer';
import { IMaskInput } from 'react-imask';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useAuth } from '../security/useAuth';
import { ViewProfileModal } from '../view/ViewProfile';

interface Pet {
  petId: number;
  animalType: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  photos: string;
  price: number;
  shelterId: number;
}

interface Shelter {
  name: string;
  phone: string;
  city?: string;
}

const mainLinks: MainLink[] = [
  { link: '/home', label: 'PetConnect Home' },
  { link: '/user/dashboard', label: 'User Home' },
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

// Hardcoded list of Indian states
const indianStates = [
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Tripura', label: 'Tripura' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Uttarakhand', label: 'Uttarakhand' },
  { value: 'West Bengal', label: 'West Bengal' },
];

export function PetDetails() {
  const auth = useAuth();
  if (!auth) return <Navigate to="/login/user" replace />;
  if (auth.role !== 'USER') return <Navigate to="/login/user" replace />;

  // Updated form with separate address fields;
  // city is now a text input that will be auto-filled via pincode detection.
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      reason: '',
      phone: '',
      isDeliveryRequested: false,
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
    },
    validate: (values) => ({
      name: values.name.trim().length < 2 ? 'Name must be at least 2 characters' : null,
      email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
      reason: values.reason.trim().length < 10 ? 'Reason must be at least 10 characters' : null,
      phone: values.phone.trim().length < 10 ? 'Invalid phone number' : null,
      streetAddress:
        values.isDeliveryRequested && !values.streetAddress.trim() ? 'Street address is required' : null,
      state: values.isDeliveryRequested && !values.state ? 'State is required' : null,
      city: values.isDeliveryRequested && !values.city.trim() ? 'City is required' : null,
      zipCode: values.isDeliveryRequested
        ? /^\d{6}$/.test(values.zipCode)
          ? null
          : 'Invalid zip code'
        : null,
    }),
  });

  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8090/api/petConnect/pets/public/${petId}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
        const urls = data.photos.split(',').map((f: string) => `http://localhost:8090/images/${f.trim()}`);
        setActiveImage(urls[0]);
        return fetch(`http://localhost:8090/api/petConnect/shelters/${data.shelterId}`);
      })
      .then((res) => res.json())
      .then((shelterData) => {
        setShelter(shelterData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch pet details:', err);
        setLoading(false);
      });
  }, [petId]);

  // Auto-detect location based on valid pincode (6 digits)
  useEffect(() => {
    const zip = form.values.zipCode.trim();
    if (zip.length === 6 && /^\d{6}$/.test(zip)) {
      const timer = setTimeout(() => {
        fetch(`https://api.postalpincode.in/pincode/${zip}`)
          .then((res) => res.json())
          .then((data) => {
            if (
              data[0]?.Status === 'Success' &&
              data[0]?.PostOffice &&
              data[0].PostOffice.length > 0
            ) {
              const postOffice = data[0].PostOffice[0];
              // Auto-fill the state (via the dropdown) and city (via text input)
              form.setFieldValue('state', postOffice.State);
              form.setFieldValue('city', postOffice.District);
            }
          })
          .catch((err) => {
            console.error('Error detecting location:', err);
          });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [form.values.zipCode, form]);

  if (loading) {
    return (
      <Center style={{ height: '400px' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!pet || !activeImage) {
    return (
      <Center style={{ height: '400px' }}>
        <Text>Pet not found</Text>
      </Center>
    );
  }

  const photoUrls = pet.photos
    .split(',')
    .map((filename) => `http://localhost:8090/images/${filename.trim()}`);

  const handleSubmit = async () => {
    if (form.validate().hasErrors || !petId) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8090/api/petConnect/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          petId: parseInt(petId),
          name: form.values.name,
          email: form.values.email,
          phone: form.values.phone,
          reason: form.values.reason,
          deliveryRequested: form.values.isDeliveryRequested,
          address: form.values.isDeliveryRequested
            ? {
              streetAddress: form.values.streetAddress,
              state: form.values.state,
              city: form.values.city,
              zipCode: form.values.zipCode,
            }
            : undefined,
        }),
      });
      if (response.ok) {
        showNotification({ title: 'Request Submitted', message: 'Your adoption request has been submitted!', color: 'green' });
        navigate('/pets')
      } else if (response.status === 409) {
        showNotification({ title: 'Already Requested', message: 'You have already requested to adopt this pet.', color: 'orange' });
      } else {
        throw new Error('Failed to submit adoption request');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification({ title: 'Error', message: 'Something went wrong. Please try again.', color: 'red' });
    }
  };

  return (
    <>
      <Header mainLinks={transformedMainLinks} onProfileClick={() => setProfileModalOpened(true)} />
      <Container size="xl" style={{ marginTop: '8%', marginBottom: '2%', marginRight: '5%', marginLeft: '5%' }}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" verticalSpacing="xl">
          {/* Column 1: Image + Thumbnails */}
          <Stack gap="xl">
            <Image src={activeImage} alt={pet.breed} height={380} radius="md" fit="contain" />
            <Group gap="xl" wrap="nowrap" style={{ overflowX: 'auto' }}>
              {photoUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  width={70}
                  height={70}
                  radius="sm"
                  fit="cover"
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setActiveImage(url)}
                  style={{
                    cursor: 'pointer',
                    border: activeImage === url ? '2px solid #ffcc00' : '1px solid #ccc',
                  }}
                />
              ))}
            </Group>
          </Stack>

          {/* Column 2: Pet Description with sticky positioning */}
          <div style={{ position: 'sticky', top: '50px' }}>
            <Stack justify="space-between" gap="md" style={{ paddingTop: '0rem', paddingLeft: '10%' }}>
              <Stack gap={5}>
                <Title order={1} style={{ marginBottom: 0 }}>{pet.breed}</Title>
                <Badge color="blue" variant="filled" size="sm" style={{ width: 'fit-content' }}>
                  {pet.animalType}
                </Badge>
              </Stack>
              <Group gap="md" align="center">
                {pet.gender.toLowerCase() === 'male' ? (
                  <IconGenderMale size={20} color="#3b82f6" />
                ) : (
                  <IconGenderFemale size={20} color="#ec4899" />
                )}
                <Text size="md">{pet.gender}</Text>
              </Group>
              <Text size="md">Age: {pet.age} months</Text>
              <Text size="md">{pet.description || 'No description available.'}</Text>
              <Text weight={700} size="xl" color="yellow">
                ₹{pet.price?.toFixed(2)}
              </Text>
              {shelter && (
                <Stack gap="md" mt="sm">
                  <Title order={5} c="yellow">Shelter Details</Title>
                  <Group gap="xs">
                    <IconMapPin size={18} color="#38bdf8" />
                    <Text size="md">{shelter.name}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconPhoneCall size={18} color="#10b981" />
                    <Text size="md">{shelter.phone}</Text>
                  </Group>
                  {shelter.city && (
                    <Group gap="xs">
                      <IconMapPin size={18} color="#f59e0b" />
                      <Text size="md">{shelter.city}</Text>
                    </Group>
                  )}
                </Stack>
              )}
            </Stack>
          </div>

          {/* Column 3: Adoption Form */}
          <Paper
            shadow="sm"
            radius="md"
            p="sm"
            withBorder
            style={{ alignSelf: 'flex-start', width: '100%', maxWidth: 360 }}
          >
            <Title order={4} mb="md">🐾 Adoption Request</Title>
            <Stack gap="sm">
              <TextInput
                label="Your Name"
                placeholder="John Doe"
                required
                radius="md"
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Your Email"
                placeholder="john@example.com"
                required
                type="email"
                radius="md"
                {...form.getInputProps('email')}
              />
              <Textarea
                label="Why would you like to adopt this pet?"
                placeholder="Share your thoughts..."
                radius="md"
                minRows={3}
                {...form.getInputProps('reason')}
              />
              <InputWrapper label="Phone" variant="filled">
                <Input
                  component={IMaskInput}
                  mask="+91 (00000) 00000"
                  placeholder="Your phone"
                  variant="filled"
                  {...form.getInputProps('phone')}
                />
              </InputWrapper>
              <Checkbox label="I prefer to have the pet delivered" {...form.getInputProps('isDeliveryRequested', { type: 'checkbox' })} />
              {form.values.isDeliveryRequested && (
                <Stack gap="sm">
                  <TextInput
                    label="Street Address"
                    placeholder="123 Main St"
                    required
                    radius="md"
                    {...form.getInputProps('streetAddress')}
                  />
                  <Select
                    label="State"
                    placeholder="Select state"
                    required
                    data={indianStates}
                    {...form.getInputProps('state')}
                  />
                  <TextInput
                    label="City"
                    placeholder="City"
                    required
                    radius="md"
                    {...form.getInputProps('city')}
                  />
                  <TextInput
                    label="Zip Code"
                    placeholder="62704"
                    required
                    radius="md"
                    {...form.getInputProps('zipCode')}
                  />
                </Stack>
              )}
              <Button
                fullWidth
                radius="md"
                variant="filled"
                color="yellow"
                mt="sm"
                onClick={handleSubmit}
              >
                Submit Request
              </Button>
            </Stack>
          </Paper>
        </SimpleGrid>

      </Container>

      <ViewProfileModal opened={profileModalOpened} onClose={() => setProfileModalOpened(false)} />

      <Footer style={{ marginTop: '10%' }} />
    </>
  );
}
