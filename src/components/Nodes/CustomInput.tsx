import React, { memo } from 'react';

import Handle from '../Handle';
import { NodeProps, Position } from '../../types';

const CustomInput = ({
  data,
  id 
}: NodeProps) => (
  <>
    {data.label} 
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

CustomInput.displayName = 'CustomInput';

export default memo(CustomInput);
