import { useState } from 'react';
import { Anchor, Box, Burger, Container, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from '../../assets/logo2.png';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const userLinks = [
  { link: '#', label: 'About Us' },
  { link: '#', label: 'Contact Us' }
];

const mainLinks = [
  { link: '/home', label: 'Home' },
  { link: '/login/user', label: 'Login/Sign Up' },
  { link: '/login/shelter', label: 'Shelter Services' }
];

export function Header({mainLinks : []}) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event: any) => {
        event.preventDefault();
        setActive(index);
        navigate(item.link);
        close();
      }}
    >
      {item.label}
    </Anchor>
  ));

  const secondaryItems = userLinks.map((item) => (
    <Anchor
      href={item.link}
      key={item.label}
      onClick={(event: any) => event.preventDefault()}
      className={classes.secondaryLink}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <>
      <header className={classes.header}>
        <Container className={classes.inner} fluid px={50}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="PetConnect Logo" style={{ height: 105, marginRight: '20px' }} />
            <span
              style={{
                fontSize: '40px',
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontFamily: 'cursive',
                color: 'var(--mantine-color-yellow-8)'
              }}
            >
              PetConnect+
            </span>
          </div>
          <Box className={classes.links} visibleFrom="sm">
            <Group justify="flex-end">{secondaryItems}</Group>
            <Group gap={0} justify="flex-end" className={classes.mainLinks}>
              {mainItems}
            </Group>
          </Box>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            hiddenFrom="sm"
          />
        </Container>
      </header>

      <Drawer
        opened={opened}
        onClose={close}
        title="Menu"
        padding="md"
        size="sm"
        withCloseButton
      >
        <Stack gap="md">
          {/* Main menu items vertically */}
          <Stack gap="sm">
            {mainItems}
          </Stack>
          {/* Secondary links in one horizontal line */}
          <Group gap="sm">
            {secondaryItems}
          </Group>
        </Stack>
      </Drawer>
    </>
  );
}
