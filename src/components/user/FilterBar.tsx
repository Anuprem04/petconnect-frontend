import { useState } from 'react';
import {
    Select,
    MultiSelect,
    RangeSlider,
    Button,
    Stack,
    Text,
} from '@mantine/core';
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
    const [tempFilters, setTempFilters] = useState({ ...filters });

    const handleClearAll = () => {
        const cleared = {
            animalType: '',
            gender: '',
            breed: [],
            ageRange: [0, 120] as [number, number],
            priceRange: [0, 200000] as [number, number],
        };
        setTempFilters(cleared);
        setFilters(cleared);
    };

    const applyFilters = () => {
        setFilters({ ...tempFilters });
    };

    return (
        <div className={classes.filterBar}>
            <div className={classes.filterBarHeader}>
                <Text weight={600} size="lg">
                    Filters
                </Text>
                <Button variant="subtle" onClick={handleClearAll} size="xs">
                    Clear all
                </Button>
            </div>

            <div className={classes.filterBarContent}>
                <Stack gap="xl">
                    <Select
                        label="Animal Type"
                        data={uniqueAnimalTypes}
                        placeholder="All"
                        value={tempFilters.animalType}
                        onChange={(value) =>
                            setTempFilters((f) => ({ ...f, animalType: value || '' }))
                        }
                        clearable
                        variant="filled"
                    />
                    <Select
                        label="Gender"
                        data={['Male', 'Female']}
                        placeholder="All"
                        value={tempFilters.gender}
                        onChange={(value) =>
                            setTempFilters((f) => ({ ...f, gender: value || '' }))
                        }
                        clearable
                        variant="filled"
                    />
                    <MultiSelect
                        label="Breed"
                        data={uniqueBreeds}
                        placeholder="All"
                        value={tempFilters.breed}
                        onChange={(value) =>
                            setTempFilters((f) => ({ ...f, breed: value }))
                        }
                        clearable
                        variant="filled"
                    />
                    <div className={classes.rangeSliderWrapper}>
                        <Text size="sm" weight={500} mb={4}>
                            Age Range (months)
                        </Text>
                        <RangeSlider
                            value={tempFilters.ageRange}
                            onChange={(value) =>
                                setTempFilters((f) => ({ ...f, ageRange: value }))
                            }
                            min={0}
                            max={120}
                            marks={[
                                { value: 0, label: '0' },
                                { value: 60, label: '60' },
                                { value: 120, label: '120' },
                            ]}
                        />
                    </div>

                    <div className={classes.rangeSliderWrapper}>
                        <Text size="sm" weight={500} mb={4}>
                            Price Range (₹)
                        </Text>
                        <RangeSlider
                            value={tempFilters.priceRange}
                            onChange={(value) =>
                                setTempFilters((f) => ({ ...f, priceRange: value }))
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



                </Stack>
            </div>

            <div className={classes.filterBarFooter}>
                <Button onClick={applyFilters} fullWidth>
                    Apply Filters
                </Button>
            </div>
        </div>
    );
}
