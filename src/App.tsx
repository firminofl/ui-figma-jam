import ReactFlow, {
    addEdge,
    Background,
    Connection,
    ConnectionMode,
    Controls,
    Node,
    useEdgesState,
    useNodesState
} from 'reactflow';

import * as Toolbar from '@radix-ui/react-toolbar';

import {zinc} from 'tailwindcss/colors';
import 'reactflow/dist/style.css';
import './App.css';
import {Square} from "./components/nodes/Square";
import {useCallback} from "react";
import DefaultEdge from "./components/edges/DefaultEdge";

const NODE_TYPES = {
    square: Square
};

const EDGE_TYPES = {
    default: DefaultEdge
}
const INITIAL_NODES = [
    {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
            x: 200,
            y: 200
        },
        data: {}
    },
    {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
            x: 500,
            y: 200
        },
        data: {}
    }
] satisfies Node[];

function App() {

    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

    const onConnect = useCallback((connection: Connection) => {
        return setEdges(edges => addEdge(connection, edges))
    }, [])

    function addSquareNode() {
        setNodes((previous: Node[]) => {
            const newNode: Node = {
                id: crypto.randomUUID(),
                type: 'square',
                position: {
                    x: 550,
                    y: 250
                },
                data: {}
            };

            return [...previous, newNode]
        })
    }

    return (
        <div className="w-screen h-screen">
            <ReactFlow
                nodeTypes={NODE_TYPES}
                edgeTypes={EDGE_TYPES}
                nodes={nodes}
                connectionMode={ConnectionMode.Loose}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                defaultEdgeOptions={{
                    type: 'default'
                }}
            >
                <Background
                    gap={12}
                    size={2}
                    color={zinc[200]}
                />
                <Controls/>
            </ReactFlow>

            <Toolbar.Root
                className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
                <Toolbar.Button
                    onClick={addSquareNode}
                    className='w-32 h-32 rounded mt-6 bg-violet-500 transition-transform hover:-translate-y-2'
                />
            </Toolbar.Root>
        </div>
    )
}

export default App
