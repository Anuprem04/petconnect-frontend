import { useState } from 'react';
import { Anchor, Box, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from '../../assets/logo2.png';

import classes from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const userLinks = [
  { link: '#', label: 'About Us' },
  { link: '#', label: 'Contact Us' }
];

const mainLinks = [
  { link: '/login', label: 'Login/Sign Up' },
  { link: '#', label: 'Shelter Services' }
];

export function LandingPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);

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
    <header className={classes.header}>
     <Container className={classes.inner} fluid px={50}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0' }}>
          <img src={logo} alt="PetConnect Logo" style={{ height: 105, marginRight: '20px'}} />
          <span style={{ fontSize: '40px', fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'cursive', color: 'var(--mantine-color-yellow-8)' }}>PetConnect+</span>
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
    
  );
}