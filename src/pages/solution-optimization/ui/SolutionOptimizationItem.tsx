import { Flex, Typography } from 'antd';
import Draggable, { DraggableData } from 'react-draggable';

import { SolutionOptimizationType } from '../types.ts';
import { useXarrow } from 'react-xarrows';

type SolutionOptimizationItemProps = {
  solution: SolutionOptimizationType;
  positions: Record<string, { x: number; y: number }>;
  onDragHandle: (id: string, data: DraggableData) => void;
  onDragStopHandle: (event: MouseEvent) => void;
  onDragStartHandle: (sourceId: string) => void;
  isLast: boolean;
};

export const SolutionOptimizationItem = (
  props: SolutionOptimizationItemProps,
) => {
  const {
    solution: { id, isDisabled, name, image },
    isLast,
    positions,
    onDragHandle,
    onDragStopHandle,
    onDragStartHandle,
  } = props;

  const updateXarrow = useXarrow();

  return (
    <Flex
      vertical
      align="center"
      style={{
        borderBottom: isLast ? 'none' : '3px solid #2FBEAD',
        boxShadow: !isLast ? '0 4px 4px -2px rgba(0, 0, 0, 0.2)' : 'none',
      }}
      className={id}
    >
      <Draggable
        position={positions[id]}
        onDrag={(_, data) => {
          onDragHandle(id, data);
          updateXarrow();
        }}
        onStop={event => {
          onDragStopHandle(event as unknown as MouseEvent);
          updateXarrow();
        }}
        onStart={() => {
          updateXarrow();
          onDragStartHandle(id);
        }}
        disabled={isDisabled}
      >
        <div
          id={id}
          data-id={id}
          style={{
            cursor: !isDisabled ? 'grab' : 'default',
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              maxWidth: '18rem',
              maxHeight: '18rem',
            }}
          />
        </div>
      </Draggable>

      <Typography.Title level={3}>{name}</Typography.Title>
    </Flex>
  );
};
