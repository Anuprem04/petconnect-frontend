import { Container, Title, Text, Button, Image, Center, Box, Flex } from '@mantine/core';

export default function LandingPage() {
  const handleLogin = () => {
    console.log('Login button clicked');
  };

  return (
    <>
      <Box component="header" p="md" mb={20} style={{ borderBottom: '1px solid #e0e0e0' }}>
        <Title order={3}>PetConnect</Title>
      </Box>

      <Container size="xl" py={50}>
        <Center>
          <Image src="/images/petconnect-banner.jpg" alt="PetConnect" width={600} mb={20} />
        </Center>
        <Text align="center" size="lg" mb={30}>
          PetConnect helps you find and adopt pets easily while providing services from trusted shelters and pet stores.
        </Text>

        <Flex justify="center" gap="md" mb={40}>
          <Button size="lg" onClick={handleLogin}>
            Sign In / Sign Up
          </Button>
        </Flex>
      </Container>

      <Box component="footer" p="md" mt={20} style={{ borderTop: '1px solid #e0e0e0' }}>
        <Text align="center" size="sm">© 2025 PetConnect. All rights reserved.</Text>
      </Box>
    </>
  );
}
