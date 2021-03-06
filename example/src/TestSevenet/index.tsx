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

const initialElements: Elements = [
  { id: '1', type: 'customInput', data: { label: 'Imię', value: '90' }, position: { x: 550, y: 5 }, className: 'light' },
  { id: '2', type: 'custom', data: { label: 'Nazwisko', value: '70'  }, position: { x: 400, y: 100 }, className: 'light' },
  { id: '3', type: 'output', data: { label: 'Koniec' }, position: { x: 700, y: 100 }, className: 'light' },
  { id: '4', type: 'custom', data: { label: 'Numer karty', value: '50'  }, position: { x: 305, y: 200 }, className: 'light' },
  { id: '5', type: 'output', data: { label: 'Koniec' }, position: { x: 505, y: 200 }, className: 'light' },
  { id: '6', type: 'output', data: { label: 'Zgodność' }, position: { x: 200, y: 300 }, className: 'light' },
  { id: '7', type: 'output', data: { label: 'Możliwość' }, position: { x: 405, y: 300 }, className: 'light' },
  { id: 'e1-2', source: '1', target: '2', sourceHandle: '1_a', data: { label: 'ok', value: true } },
  { id: 'e1-3', source: '1', target: '3', sourceHandle: '1_b', data: { label: 'not ok', value: false } },
  { id: 'e2-4_a', source: '2', target: '4', sourceHandle: '2_a' },
  { id: 'e2-4_b', source: '2', target: '5', sourceHandle: '2_b' },
  { id: 'e4-6_a', source: '4', target: '6', sourceHandle: '4_a' },
  { id: 'e4-6_b', source: '4', target: '7', sourceHandle: '4_b' },
];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = (): ElementId => `n_${id++}`;

const TestSevenet = () => {
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
export default TestSevenet;
