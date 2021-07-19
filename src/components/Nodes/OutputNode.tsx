import React, { memo } from 'react';

import Handle from '../../components/Handle';
import { NodeProps, Position } from '../../types';

const OutputNode = ({ isConnectable, targetPosition = Position.Top }: NodeProps) => (
  <>
    <Handle type="target" position={targetPosition} isConnectable={isConnectable} />
    Output
  </>
);

OutputNode.displayName = 'OutputNode';

export default memo(OutputNode);
