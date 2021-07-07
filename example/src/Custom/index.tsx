import React, { useEffect, useState, DragEvent, MouseEvent, FC } from 'react';
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
import './validation.css';

const initialElements: Elements = [];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = (): ElementId => `new_${id++}`;

const Custom = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(initialElements);
  const [nodeName, setNodeName] = useState<string>('');
  const [nodeValue, setNodeValue] = useState<string>('');
  const [nodeId, setNodeId] = useState<string>('');

  
  
  useEffect(() => {
    setElements((els) =>
    
      els.map((el) => {
        console.log(nodeId)
        if (el.id === nodeId) {
          el.data = {
            ...el.data,
            label: nodeName,
            value: nodeValue,
          };
        }

        return el;
      })
    );
  }, [nodeName, nodeValue, setElements]);



  const onElementClick = (_: MouseEvent, element: FlowElement) => {setNodeId(element.id); setNodeName(element.data.label); setNodeValue(element.data.value); };
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
        data: { label: `${type} node`, value: '100' },
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
              className="validationflow"
            >
            {console.log("Elementy ", elements)}
          <div className="updatenode__controls">
            <label>Change label:</label>
            <input value={nodeName} onChange ={(evt) => setNodeName(evt.target.value)} />
          </div>   
          <div className="updatenode__controls2">
            <label>Change value:</label>
            <input value={nodeValue} onChange ={(evt) => setNodeValue(evt.target.value)} />
          </div> 
          <Controls />   
        </ReactFlow>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}
export default Custom;
