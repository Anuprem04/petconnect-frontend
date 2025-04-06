import { useState } from 'react';
import { Anchor, Box, Burger, Container, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from '../../assets/logo2.png';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';

export interface MainLink {
  link: string;           
  label: string;         
  display?: React.ReactNode; 
}

interface HeaderProps {
  mainLinks?: MainLink[];
}

const userLinks = [
  { link: '/about/aboutus', label: 'About Us' },
  { link: '/contact/contactus', label: 'Contact Us' }
];

export function Header({ mainLinks = [] }: HeaderProps) {
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
      {item.display ? item.display : item.label}
    </Anchor>
  ));

  const secondaryItems = userLinks.map((item) => (
    <Anchor
    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      navigate(item.link);
      close(); // Close drawer if on mobile
    }}
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
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" hiddenFrom="sm" />
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
          <Stack gap="sm">
            {mainItems}
          </Stack>
          <Group gap="sm">
            {secondaryItems}
          </Group>
        </Stack>
      </Drawer>
    </>
  );
}
