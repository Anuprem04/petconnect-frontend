import React from 'react';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Anchor, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './Footer.module.css';

interface FooterProps {
  style?: React.CSSProperties;
  className?: string;
}

const links = [
  { link: '/privacy/policy', label: 'Privacy' },
  { link: '/blog/blog', label: 'Blog' },
  { link: '/store/store', label: 'Store' },
  { link: '/career/career', label: 'Careers' },
  { link: '/courier/courier', label: 'Courier Service' }
];

export function Footer({ style, className }: FooterProps) {
  const navigate = useNavigate();

  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        navigate(link.link);
      }}
      size="sm"
      style={{ cursor: 'pointer' }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={`${classes.footer} ${className || ''}`} style={{ ...style }}>
      <div className={classes.inner}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 0 }}>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontFamily: 'cursive',
              color: 'var(--mantine-color-yellow-8)',
            }}
          >
            PetConnect+
          </span>
        </div>
        <Group className={classes.links}>{items}</Group>
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
