import React, { useEffect, useState, DragEvent, MouseEvent } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  ElementId,
  FlowElement,
  Node,
} from 'react-flow-renderer';
import './updatenode.css';
import Sidebar from './Sidebar';
import './dnd.css';


const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

const TestSevenet = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(initialElements);
  const [nodeName, setNodeName] = useState<string>('');
  const [nodeId, setNodeId] = useState<string>('');

  
  
  useEffect(() => {
    setElements((els) =>
    
      els.map((el) => {
        console.log(nodeId)
        if (el.id === nodeId) {
          // it's important that you create a new object here in order to notify react flow about the change
          el.data = {
            ...el.data,
            label: nodeName,
          };
        }

        return el;
      })
    );
  }, [nodeName, setElements]);



  const onElementClick = (_: MouseEvent, element: FlowElement) => {setNodeId(element.id); setNodeName(element.data.label) };

  const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setElements((es) => es.concat(newNode));
    }
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementClick={onElementClick}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
          <div className="updatenode__controls">
            <label>label:</label>
            <input value={nodeName} onChange ={(evt) => setNodeName(evt.target.value)} />
          </div>   
          <Controls />   
        </ReactFlow>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}
export default TestSevenet;
