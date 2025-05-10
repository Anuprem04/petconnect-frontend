import { useEffect, useState } from 'react';
import {
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
} from '@mantine/core';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { ViewProfileModal } from '../view/ViewProfile';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/useAuth';
import { showNotification } from '@mantine/notifications';

const CourierService = () => {
  const auth = useAuth();
  const [profileModalOpened, setProfileModalOpened] = useState(false);

  const [form, setForm] = useState({
    senderName: '',
    senderContact: '',
    receiverName: '',
    receiverContact: '',
    receiverAddress: '',
    courierType: '',
    weight: '',
    specialInstructions: '',
  });

  const [adoptions, setAdoptions] = useState<any[]>([]);
  const [selectedAdoptionId, setSelectedAdoptionId] = useState<string | null>(null);
  const [selectedReceiver, setSelectedReceiver] = useState<string | null>(null);
  const [showManualReceiver, setShowManualReceiver] = useState(false);
  const navigate = useNavigate();
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
        const data = await res.json();
        const eligible = data.filter(
          (item: any) => item.paymentSuccessful && item.deliveryRequested
        );
        setAdoptions(eligible);
      } catch (err) {
        console.error('Error fetching adoptions:', err);
      }
    };

    if (auth?.id) fetchAdoptions();
  }, [auth?.id]);

  const handleInputChange = (field: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdoptionSelect = (id: string | null) => {
    setSelectedAdoptionId(id);
    setSelectedReceiver(null);
    setShowManualReceiver(false);
    setForm((prev) => ({
      ...prev,
      receiverName: '',
      receiverContact: '',
      receiverAddress: '',
    }));
  };

  const handleReceiverSelect = (name: string | null) => {
    setSelectedReceiver(name);
    if (name === 'Other') {
      setShowManualReceiver(true);
      return;
    }

    const adoption = adoptions.find(
      (a) => a.adoptionId.toString() === selectedAdoptionId && a.name === name
    );

    if (adoption) {
      setForm((prev) => ({
        ...prev,
        receiverName: adoption.name || '',
        receiverContact: adoption.phone || '',
        receiverAddress: `${adoption.address?.streetAddress || ''}, ${adoption.address?.city || ''}, ${adoption.address?.state || ''} - ${adoption.address?.zipCode || ''}`,
      }));
      setShowManualReceiver(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', form);

    if (
      form.senderName &&
      form.receiverName &&
      form.courierType &&
      form.weight &&
      form.receiverAddress
    ) {
          showNotification({
                title: 'Courier Service Reuqested Successfully ',
                message: 'Courier service request submitted successfully!.',
                color: 'green',
              });
              navigate('/manage/adoptions')
    } else {
      alert('Please fill in all required fields.');
    }
  };

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
        <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
          {item.label}
        </Link>
      ),
  }));

  const receiverOptions =
    selectedAdoptionId !== null
      ? [
          ...adoptions
            .filter((a) => a.adoptionId.toString() === selectedAdoptionId)
            .map((a) => ({
              value: a.name,
              label: `${a.name} (${a.phone})`,
            })),
          { value: 'Other', label: 'Other (Manual Entry)' },
        ]
      : [];

  return (
    <>
      <Header mainLinks={transformedMainLinks} onProfileClick={() => setProfileModalOpened(true)} />
      <div
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1623704840616-bb8363de774d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: "4%"
           
        }}
      >
        <Flex
          justify="center"
          align="center"
          style={{
            width: '100%',
            maxWidth: '600px',
            height: '90vh',
            overflowY: 'auto',
          }}
        >
          <Paper
            shadow="md"
            radius="md"
            p="xl"
            style={{
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              maxHeight: '100%',
              overflowY: 'auto',
            }}
          >
            <Title ta="center" mb="md" c="teal">
              Pet Courier Service
            </Title>
            <form onSubmit={handleSubmit}>
              <Box mb="md">
                <Select
                  label="Select Adoption ID"
                  placeholder="Select an adoption with payment and delivery requested"
                  data={adoptions.map((a) => ({
                    value: a.adoptionId.toString(),
                    label: `Adoption ID: ${a.adoptionId}`,
                  }))}
                  value={selectedAdoptionId}
                  onChange={handleAdoptionSelect}
                  required
                />
              </Box>

              {selectedAdoptionId && (
                <Box mb="md">
                  <Select
                    label="Select Receiver"
                    placeholder="Select a receiver"
                    data={receiverOptions}
                    value={selectedReceiver}
                    onChange={handleReceiverSelect}
                    required
                  />
                </Box>
              )}

              {showManualReceiver && (
                <>
                  <Box mb="md">
                    <TextInput
                      label="Receiver Name"
                      placeholder="Enter receiver name"
                      value={form.receiverName}
                      onChange={(e) => handleInputChange('receiverName', e.currentTarget.value)}
                      required
                    />
                  </Box>
                  <Box mb="md">
                    <TextInput
                      label="Receiver Contact"
                      placeholder="Enter receiver phone"
                      value={form.receiverContact}
                      onChange={(e) => handleInputChange('receiverContact', e.currentTarget.value)}
                      required
                    />
                  </Box>
                  <Box mb="md">
                    <Textarea
                      label="Receiver Address"
                      placeholder="Enter receiver address"
                      value={form.receiverAddress}
                      onChange={(e) => handleInputChange('receiverAddress', e.currentTarget.value)}
                      required
                    />
                  </Box>
                </>
              )}

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

              {!showManualReceiver && (
                <>
                  <Box mb="md">
                    <TextInput
                      label="Receiver Contact"
                      placeholder="Receiver's phone"
                      value={form.receiverContact}
                      onChange={(e) => handleInputChange('receiverContact', e.currentTarget.value)}
                      required
                    />
                  </Box>
                  <Box mb="md">
                    <Textarea
                      label="Receiver Address"
                      placeholder="Receiver's address"
                      value={form.receiverAddress}
                      onChange={(e) => handleInputChange('receiverAddress', e.currentTarget.value)}
                      required
                    />
                  </Box>
                </>
              )}

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
        </Flex>
      </div>
      <Footer style={{ marginTop: '0%' }} />
      <ViewProfileModal opened={profileModalOpened} onClose={() => setProfileModalOpened(false)} />
    </>
  );
};

export default CourierService;
