import React, { DragEvent } from 'react';
import ReactFlow, { Handle, Position } from 'react-flow-renderer';

const customNodeStyles = {
  background: '#9CA8B3',
  color: '#FFF',
  padding: 10,
};

const CustomNodeComponent = () => {
  return (
    <div style={customNodeStyles}>
      <Handle type="target"  position={Position.Left} style={{ borderRadius: 0 }} />
      <div>Custom node</div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: '30%', borderRadius: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ top: '70%', borderRadius: 0 }}
      />
    </div>
  );
};

const nodeTypes = {
  special: CustomNodeComponent,
};

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const onDragStart2 = (event: DragEvent, nodeTypes: string) => {
  event.dataTransfer.setData('application/reactflow', nodeTypes);
  event.dataTransfer.effectAllowed = 'move';
};


const Sidebar = () => {
  return (
    <aside>
      <div className="description">Wyszukaj interesujący ciebię komponent.</div>
      <input></input>
      <div className="react-flow__node-input" onDragStart={(event: DragEvent) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="react-flow__node-default" onDragStart={(event: DragEvent) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="react-flow__node-custom" onDragStart={(event: DragEvent) => onDragStart(event, 'custom')} draggable>
        Custom Node
      </div>
      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};

export default Sidebar;
