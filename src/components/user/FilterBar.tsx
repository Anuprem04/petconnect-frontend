import {
    Select,
    MultiSelect,
    RangeSlider,
    Button,
    Text,
    Modal,
    Group,
    Box,
    Stack,
  } from '@mantine/core';
  import { IconFilter } from '@tabler/icons-react';
  import { useState } from 'react';
  import classes from './FilterBar.module.css';
  
  interface FilterBarProps {
    filters: {
      animalType: string;
      gender: string;
      breed: string[];
      ageRange: [number, number];
      priceRange: [number, number];
    };
    setFilters: (filters: FilterBarProps['filters']) => void;
    uniqueAnimalTypes: string[];
    uniqueBreeds: string[];
  }
  
  export function FilterBar({
    filters,
    setFilters,
    uniqueAnimalTypes,
    uniqueBreeds,
  }: FilterBarProps) {
    const [modalOpened, setModalOpened] = useState(false);
  
    const handleClearAll = () => {
      const cleared = {
        animalType: '',
        gender: '',
        breed: [],
        ageRange: [0, 200] as [number, number],
        priceRange: [0, 50000] as [number, number],
      };
      setFilters(cleared);
    };
  
    return (
      <>
        <Button
          variant="light"
          leftSection={<IconFilter size={16} />}
          onClick={() => setModalOpened(true)}
          fullWidth
        >
          Sort & Filter
        </Button>
  
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Filter Pets"
          centered
          size="xl"
          zIndex={2000}
        >
          <Box px="md">
            <Stack gap="xl">
              <Select
                label="Animal Type"
                data={uniqueAnimalTypes}
                placeholder="All"
                value={filters.animalType}
                onChange={(value) =>
                  setFilters({ ...filters, animalType: value || '' })
                }
                clearable
                variant="filled"
                comboboxProps={{ zIndex: 5000 }}
              />
  
              <Select
                label="Gender"
                data={['Male', 'Female']}
                placeholder="All"
                value={filters.gender}
                onChange={(value) =>
                  setFilters({ ...filters, gender: value || '' })
                }
                clearable
                variant="filled"
                comboboxProps={{ zIndex: 5000 }}
              />
  
              <MultiSelect
                label="Breed"
                data={uniqueBreeds}
                placeholder="All"
                value={filters.breed}
                onChange={(value) =>
                  setFilters({ ...filters, breed: value })
                }
                clearable
                variant="filled"
                comboboxProps={{ zIndex: 5000 }}
              />
  
              <div className={classes.rangeSliderWrapper}>
                <Text size="sm" weight={500} mb={4}>
                  Age Range (months)
                </Text>
                <RangeSlider
                  value={filters.ageRange}
                  onChange={(value) =>
                    setFilters({ ...filters, ageRange: value })
                  }
                  min={0}
                  max={200}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 100, label: '100' },
                    { value: 200, label: '200' },
                  ]}
                />
              </div>
  
              <div className={classes.rangeSliderWrapper}>
                <Text size="sm" weight={500} mb={4}>
                  Price Range (₹)
                </Text>
                <RangeSlider
                  value={filters.priceRange}
                  onChange={(value) =>
                    setFilters({ ...filters, priceRange: value })
                  }
                  min={0}
                  max={50000}
                  marks={[
                    { value: 0, label: '₹0' },
                    { value: 25000, label: '₹25k' },
                    { value: 50000, label: '₹50k' },
                  ]}
                />
              </div>
  
              <Group align="right" mt="md">
                <Button variant="outline" onClick={handleClearAll}>
                  Clear All
                </Button>
                <Button onClick={() => setModalOpened(false)}>
                  Done
                </Button>
              </Group>
            </Stack>
          </Box>
        </Modal>
      </>
    );
  }
  