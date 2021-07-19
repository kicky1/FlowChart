import React, { memo } from 'react';

import Handle from '../../components/Handle';
import { NodeProps, Position } from '../../types';

const ThreePortsNode = ({
  data,
  isConnectable,
  id 
}: NodeProps) => (
  <>
    <Handle type="target" position={Position.Top} isConnectable={isConnectable}/>
    Node 
    <br/>
    {'<'} {data.value} 
    <Handle
        type="source"
        position={Position.Bottom}
        id={id + '_a'}
        style={{ left: '25%'}}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={id + "_b"}
        style={{ left: '50%'}}
      />
            <Handle
        type="source"
        position={Position.Bottom}
        id={id + "_c"}
        style={{ left: '75%'}}
      />
  </>
);

ThreePortsNode.displayName = 'ThreePortsNode';

export default memo(ThreePortsNode);
