import { Carousel } from '@mantine/carousel';
import { Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './PetCarousel.module.css';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface CardProps {
  image: string;
  title: string;
  category: string;
  description: string;
}

function Card({ image, title, category, description }: CardProps) {
  return (
    <Paper
    shadow="md"
    p="xl"
    radius="md"
    style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '500px' }}
    className={classes.card}
>
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
        <Text className={classes.category} size="xs" weight={700} style={{ textTransform: 'uppercase', color: 'white' }}>
            {category}
        </Text>
        <Title order={2} className={classes.title} style={{ color: 'white', fontWeight: 900 }}>
            {title}
        </Title>
        <Text size="sm" mt="sm" color="white" opacity={0.9}>
            {description}
        </Text>
    </div>
</Paper>
  );
}

const data = [
    { image: 'src/assets/manDog2.avif', title: 'Unbreakable Bonds', category: 'Companionship', description: 'PetConnect fosters lifelong bonds between pets and humans.' },
    { image: 'src/assets/dog1.avif', title: 'Loyal Companions Await', category: 'Adoption', description: 'Find your next best friend through PetConnect.' },
    { image: 'src/assets/horse.avif', title: 'Beyond Cats and Dogs', category: 'All Pets', description: 'All pets deserve loving homes with PetConnect.' },
    { image: 'src/assets/manDog.avif', title: 'Every Pet Deserves Love', category: 'Care', description: 'We ensure pets find families who care.' },
    { image: 'src/assets/dogCat.avif', title: 'Furry Friendships', category: 'Togetherness', description: 'Connecting pets and people through love.' },
    { image: 'src/assets/parrot.avif', title: 'Feathered Friends', category: 'Avian Companions', description: 'PetConnect connects bird lovers with beautiful avian companions in need of homes.' }
];

export function PetCarousel() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 2, sm: 'xl' }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      plugins={[autoplay.current]}
     onMouseEnter={autoplay.current.stop}
     onMouseLeave={autoplay.current.reset}
    >
      {slides}
    </Carousel>
  );
}