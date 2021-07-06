import { ComponentType } from 'react';

import DefaultNode from '../../components/Nodes/DefaultNode';
import CustomNode from '../../components/Nodes/CustomNode';
import InputNode from '../../components/Nodes/InputNode';
import OutputNode from '../../components/Nodes/OutputNode';
import wrapNode from '../../components/Nodes/wrapNode';
import { NodeTypesType, NodeComponentProps } from '../../types';

export function createNodeTypes(nodeTypes: NodeTypesType): NodeTypesType {
  const standardTypes: NodeTypesType = {
    input: wrapNode((nodeTypes.input || InputNode) as ComponentType<
      NodeComponentProps
    >),
    default: wrapNode((nodeTypes.default || DefaultNode) as ComponentType<
      NodeComponentProps
    >),
    custom: wrapNode((nodeTypes.custom || CustomNode) as ComponentType<
    NodeComponentProps
  >),
    output: wrapNode((nodeTypes.output || OutputNode) as ComponentType<
      NodeComponentProps
    >),
  };

  const wrappedTypes = {} as NodeTypesType;
  const specialTypes: NodeTypesType = Object.keys(nodeTypes)
    .filter(k => !['input', 'default', 'custom', 'output'].includes(k))
    .reduce((res, key) => {
      res[key] = wrapNode((nodeTypes[key] || DefaultNode) as ComponentType<
        NodeComponentProps
      >);

      return res;
    }, wrappedTypes);

  return {
    ...standardTypes,
    ...specialTypes,
  };
}
