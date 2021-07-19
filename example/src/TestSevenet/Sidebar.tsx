import React, { DragEvent } from 'react';
import ReactFlow, { Handle, Position } from 'react-flow-renderer';



const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};




const Sidebar = () => {
  return (
    <aside>
      <div className="react-flow__node-customInputNode" onDragStart={(event: DragEvent) => onDragStart(event, 'customInputNode')} draggable>
        Input Node
      </div>
      <div className="react-flow__node-default" onDragStart={(event: DragEvent) => onDragStart(event, 'default')} draggable>
        One Port Node
      </div>
      <div className="react-flow__node-custom" onDragStart={(event: DragEvent) => onDragStart(event, 'custom')} draggable>
        Two Ports Node
      </div>
      <div className="react-flow__node-threePorts" onDragStart={(event: DragEvent) => onDragStart(event, 'threePorts')} draggable>
        Three Ports Node
      </div>
      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};

export default Sidebar;
