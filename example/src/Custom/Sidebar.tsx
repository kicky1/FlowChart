import React, { DragEvent } from 'react';


const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
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
      <div className="react-flow__node-input" onDragStart={(event: DragEvent) => onDragStart(event, 'customInputNode')} draggable>
        Custom Input Node
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
