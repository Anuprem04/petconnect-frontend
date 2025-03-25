import { Blockquote } from '@mantine/core';
// import { IconInfoCircle } from '@tabler/icons-react';

export function Quote({ text }: { text: string }) {
  // const icon = <IconInfoCircle />;
  return (
    <Blockquote color="black" cite="– Karen Davison"  mt="xs">
        <span style={{ fontStyle: 'italic', fontWeight: 'bold' ,color: '#FFCC00' }}>{text}
      </span>
    </Blockquote>
  );
}