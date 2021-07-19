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
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

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

  const classes = useStyles();
  
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
          <FormControl className={classes.margin}>
              <InputLabel htmlFor="demo-customized-textbox">Change value</InputLabel>
              <BootstrapInput 
                id="demo-customized-textbox" 
                value={nodeValue} 
                onChange ={(evt) => setNodeValue(evt.target.value)}/>
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="demo-customized-select-native">Node</InputLabel> 
                <NativeSelect
                id="demo-customized-select-native"
                value={nodeName}
                onChange ={(evt) => setNodeName(evt.target.value)}
                input={<BootstrapInput />}
              >
                <option aria-label="None" value="" />
                <option value={'Imię'}>Imię</option>
                <option value={'Nazwisko'}>Nazwisko</option>
                <option value={'Nr karty'}>Nr karty</option>
              </NativeSelect>
            </FormControl>
          </div> 
          <Controls />   
        </ReactFlow>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}
export default Custom;
