import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  Group,
  Button,
  Loader,
  Center,
  Radio,
  Select,
  Stack,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { MainLink, Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { ViewProfileModal } from '../view/ViewProfile';

interface AdoptionRequest {
  adoptionId: number;
  petId: number;
  applicationDate: string;
  approvalStatus: string;
  reason: string;
  animalType?: string;
  breed?: string;
  shelterName?: string;
  price?: number;
  // ... any additional fields returned by your backend
}

export function PaymentPage() {
  const { adoptionId } = useParams();
  console.log(adoptionId)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adoptionDetails, setAdoptionDetails] = useState<AdoptionRequest | null>(null);
  const [profileModalOpened, setProfileModalOpened] = useState(false);

  const mainLinks: MainLink[] = [
    { link: '/home', label: 'PetConnect Home' },
    { link: '/user/dashboard', label: 'User Home' },
    { link: '/view/profile', label: 'View Profile' },
  ];

  const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
    ...item,
    display:
      item.link === '/view/profile'
        ? item.label
        : <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>{item.label}</Link>,
  }));

  useEffect(() => {
    async function fetchAdoptionDetails() {
      //setLoading(true);
      try {
        if (!adoptionId) {
          throw new Error('Adoption ID is required');
        }
        // Convert the adoptionId from URL to a number
        const id = parseInt(adoptionId, 10);
        if (isNaN(id)) {
          throw new Error('Invalid Adoption ID');
        }
        console.log('Fetching adoption record for ID:', id);

        // Fetch the specific adoption record using the numeric adoptionId
        const res = await fetch(
          `http://localhost:8090/api/petConnect/adoptions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error('Failed to fetch adoption details');
        }
        const rawAdoption: AdoptionRequest = await res.json();
        console.log('Raw adoption response:', rawAdoption);

        // Check if rawAdoption is empty
        if (!rawAdoption || Object.keys(rawAdoption).length === 0) {
          throw new Error('Adoption details not found');
        }

        // If the adoption record contains a petId, fetch additional pet details
        if (rawAdoption.petId) {
          const petRes = await fetch(
            `http://localhost:8090/api/petConnect/pets/public/${rawAdoption.petId}`
          );
          if (!petRes.ok) {
            throw new Error('Failed to fetch pet details');
          }
          const petData = await petRes.json();
          console.log('Pet data:', petData);

          // Fetch shelter details using petData.shelterId, if available
          let shelterName = '';
          if (petData.shelterId) {
            const shelterRes = await fetch(
              `http://localhost:8090/api/petConnect/shelters/${petData.shelterId}`
            );
            if (!shelterRes.ok) {
              throw new Error('Failed to fetch shelter details');
            }
            const shelterData = await shelterRes.json();
            console.log('Shelter data:', shelterData);
            shelterName = shelterData.name;
          }
          setAdoptionDetails({
            ...rawAdoption,
            animalType: petData.animalType,
            breed: petData.breed,
            shelterName,
            price: petData.price || 0,
          });
        } else {
          setAdoptionDetails(rawAdoption);
        }
      } catch (error) {
        console.error('Error fetching adoption details:', error);
      } finally {
        setLoading(false);
      }
    }
console.log("chekc ",adoptionId)
    if (adoptionId) {
      fetchAdoptionDetails();
    }
  }, [adoptionId]);

  const form = useForm({
    initialValues: {
      paymentMethod: 'card',
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      // UPI fields
      upiProvider: '',
      upiId: '',
      // Netbanking fields
      bankName: '',
      netbankingUserId: '',
    },
    validate: {
      paymentMethod: (value) => (!value ? 'Select a payment method' : null),
      cardholderName: (value, values) =>
        values.paymentMethod === 'card' && value.trim().length < 2
          ? 'Please enter your name'
          : null,
      cardNumber: (value, values) =>
        values.paymentMethod === 'card' && !/^[0-9]{16}$/.test(value)
          ? 'Card number must be 16 digits'
          : null,
      expiryDate: (value, values) =>
        values.paymentMethod === 'card' && !/^([0-9]{2}\/[0-9]{2})$/.test(value)
          ? 'Enter expiry date in MM/YY format'
          : null,
      cvv: (value, values) =>
        values.paymentMethod === 'card' && !/^[0-9]{3,4}$/.test(value)
          ? 'CVV must be 3 or 4 digits'
          : null,
      upiId: (value, values) =>
        values.paymentMethod === 'upi' && value.trim().length === 0
          ? 'Enter your UPI ID'
          : null,
      bankName: (value, values) =>
        values.paymentMethod === 'netbanking' && value.trim().length === 0
          ? 'Select your bank'
          : null,
      netbankingUserId: (value, values) =>
        values.paymentMethod === 'netbanking' && value.trim().length === 0
          ? 'Enter your Netbanking User ID'
          : null,
    },
  });

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Simulate a 2-second processing delay for payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!adoptionDetails) {
        throw new Error('Adoption details not available');
      }

      // Build the update payload by incorporating the existing adoption details
      // and setting the isPaymentSuccessful flag to true.
      const updatePayload = {
        ...adoptionDetails,
        paymentSuccessful: true,
      };

      // Send a PUT request (or use PATCH if your backend supports partial updates)
      const updateRes = await fetch(
        `http://localhost:8090/api/petConnect/adoptions/payment/${adoptionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(updatePayload),
        }
      );
      if (!updateRes.ok) throw new Error('Failed to update adoption status');

      showNotification({
        title: 'Payment Successful',
        message: 'Your payment has been processed successfully!',
        color: 'green',
      });
      navigate('/user/adoptions');
    } catch (error) {
      console.error('Payment error:', error);
      showNotification({
        title: 'Payment Error',
        message: 'There was an error processing your payment. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center mt="lg">
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Header mainLinks={transformedMainLinks} onProfileClick={() => setProfileModalOpened(true)} />
      <Container size="md" mt="xl" style={{ paddingTop: '5%', paddingBottom: '0%' }}>
        <Paper shadow="sm" style={{ padding: '3rem' }} radius="md" withBorder>
          <Stack gap="xl">
            <Title order={2} ta="center">
              {adoptionDetails
                ? `Adoption Payment (Amount: ₹${adoptionDetails.price?.toFixed(2)})`
                : 'Adoption Payment'}
            </Title>
            {adoptionDetails && (
              <Text align="center">
                {`Adoption ID: ${adoptionId} | Pet: ${adoptionDetails.breed} (${adoptionDetails.animalType}) | Shelter: ${adoptionDetails.shelterName}`}
              </Text>
            )}
            <form onSubmit={form.onSubmit(handlePayment)}>
              <Stack gap="xl" pt="sm">
                <Radio.Group
                  label="Payment Method"
                  description="Select your preferred payment option"
                  required
                  {...form.getInputProps('paymentMethod')}
                >
                  <Stack gap="xl" pt="sm">
                    <Radio value="card" label="Card" />
                    <Radio value="upi" label="UPI" />
                    <Radio value="netbanking" label="Netbanking" />
                  </Stack>
                </Radio.Group>
                <Box
                  style={{
                    height: '250px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {form.values.paymentMethod === 'card' && (
                    <Stack gap="sm" style={{ flex: 1 }}>
                      <TextInput
                        label="Cardholder Name"
                        placeholder="Name on your card"
                        required
                        {...form.getInputProps('cardholderName')}
                      />
                      <TextInput
                        label="Card Number"
                        placeholder="1234567812345678"
                        required
                        {...form.getInputProps('cardNumber')}
                      />
                      <Group grow>
                        <TextInput
                          label="Expiry Date (MM/YY)"
                          placeholder="MM/YY"
                          required
                          {...form.getInputProps('expiryDate')}
                        />
                        <TextInput
                          label="CVV"
                          placeholder="123"
                          required
                          {...form.getInputProps('cvv')}
                        />
                      </Group>
                    </Stack>
                  )}
                  {form.values.paymentMethod === 'upi' && (
                    <Stack gap="sm" style={{ flex: 1, justifyContent: 'center' }}>
                      <Group grow>
                        <Select
                          label="Select UPI Provider"
                          placeholder="Select provider (optional)"
                          data={['Google Pay', 'PhonePe', 'Paytm']}
                          {...form.getInputProps('upiProvider')}
                        />
                        <TextInput
                          label="UPI ID"
                          placeholder="yourname@bank"
                          required
                          {...form.getInputProps('upiId')}
                        />
                      </Group>
                    </Stack>
                  )}
                  {form.values.paymentMethod === 'netbanking' && (
                    <Stack gap="sm" style={{ flex: 1, justifyContent: 'center' }}>
                      <Group grow>
                        <Select
                          label="Select Bank"
                          placeholder="Pick one"
                          required
                          data={[
                            'HDFC Bank',
                            'ICICI Bank',
                            'State Bank of India',
                            'Axis Bank',
                            'Kotak Mahindra Bank',
                          ]}
                          {...form.getInputProps('bankName')}
                        />
                        <TextInput
                          label="Netbanking User ID"
                          placeholder="Enter your netbanking user id"
                          required
                          {...form.getInputProps('netbankingUserId')}
                        />
                      </Group>
                    </Stack>
                  )}
                </Box>
                <Button type="submit" fullWidth mt="md">
                  Pay Now
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Container>
      <Footer />
      <ViewProfileModal opened={profileModalOpened} onClose={() => setProfileModalOpened(false)} />
    </>
  );
}
