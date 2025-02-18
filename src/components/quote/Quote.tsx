import { Blockquote } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export function Quote() {
  const icon = <IconInfoCircle />;
  return (
    <Blockquote color="black" cite="– Karen Davison" icon={icon} mt="xl">
        <span style={{ fontStyle: 'italic', fontWeight: 'bold' ,color: '#FFCC00' }}>
      "Saving one animal won’t change the world, but for that one animal, the world will change forever."
      </span>
    </Blockquote>
  );
}