import { IconAt, IconPhoneCall } from '@tabler/icons-react';
import { Avatar, Group, Text } from '@mantine/core';
import classes from './ViewProfile.module.css';
import { Link } from 'react-router-dom';
import { Header, MainLink } from '../header/Header';
import { Footer } from '../footer/Footer';

const mainLinks: MainLink[] = [
  { link: '/home', label: 'PetConnect Home' },
];

const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
    ...item,
    display: (
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

  export function ViewProfile() {
    return (
      <div>
        <Header mainLinks={transformedMainLinks} />
  
        <div className={classes.profileContent}>
          <Group wrap="nowrap">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              size={94}
              radius="md"
            />
            <div>
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                Software engineer
              </Text>
  
              <Text fz="lg" fw={500} className={classes.name}>
                Robert Glassbreaker
              </Text>
  
              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size={16} className={classes.icon} />
                <Text fz="xs" c="dimmed">
                  robert@glassbreaker.io
                </Text>
              </Group>
  
              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
                <Text fz="xs" c="dimmed">
                  +11 (876) 890 56 23
                </Text>
              </Group>
            </div>
          </Group>
        </div>
  
        <Footer />
      </div>
    );
  }
  