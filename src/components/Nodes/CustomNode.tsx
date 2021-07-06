import React, { memo } from 'react';

import Handle from '../../components/Handle';
import { NodeProps, Position } from '../../types';

const CustomNode = ({
  data,
  isConnectable,
  id 
}: NodeProps) => (
  <>
    <Handle type="target" position={Position.Top} isConnectable={isConnectable}/>
    {data.label} 
    <br/>
    {'<'} {data.value} 
    <Handle
        type="source"
        position={Position.Bottom}
        id={id + '_a'}
        style={{ left: '30%'}}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={id + "_b"}
        style={{ left: '70%'}}
      />
  </>
);

CustomNode.displayName = 'CustomNode';

export default memo(CustomNode);
