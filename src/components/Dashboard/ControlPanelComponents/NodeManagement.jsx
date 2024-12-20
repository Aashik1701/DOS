import { useState } from 'react';
import PropTypes from 'prop-types';
import './NodeManagement.css';

const NodeManagement = ({ nodes, setNodes }) => {
    const [newNode, setNewNode] = useState({ id: '', name: '', latitude: '', longitude: '', type: '' });
    const [editingNode, setEditingNode] = useState(null);

    const handleAddNode = () => {
        if (editingNode) {
            setNodes(nodes.map(node => node.id === editingNode.id ? newNode : node));
            setEditingNode(null);
        } else {
            setNodes([...nodes, { ...newNode }]);
        }
        setNewNode({ id: '', name: '', latitude: '', longitude: '', type: '' });
    };

    const handleEditNode = (node) => {
        setNewNode(node);
        setEditingNode(node);
    };

    const handleDeleteNode = (id) => {
        setNodes(nodes.filter(node => node.id !== id));
    };

    return (
        <section className="node-management">
            <h2>Node Management</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddNode(); }}>
                <input
                    type="text"
                    placeholder="Monitoring Location ID"
                    value={newNode.id}
                    onChange={(e) => setNewNode({ ...newNode, id: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={newNode.name}
                    onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Latitude"
                    value={newNode.latitude}
                    onChange={(e) => setNewNode({ ...newNode, latitude: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    value={newNode.longitude}
                    onChange={(e) => setNewNode({ ...newNode, longitude: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Type of Water Body"
                    value={newNode.type}
                    onChange={(e) => setNewNode({ ...newNode, type: e.target.value })}
                    required
                />
                <button type="submit">{editingNode ? 'Save Changes' : 'Add Node'}</button>
            </form>
            <ul>
                {nodes.map(node => (
                    <li key={node.id}>
                        {node.name} (ID: {node.id})
                        <button onClick={() => handleEditNode(node)}>Edit</button>
                        <button onClick={() => handleDeleteNode(node.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

NodeManagement.propTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            latitude: PropTypes.string.isRequired,
            longitude: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    ).isRequired,
    setNodes: PropTypes.func.isRequired,
};

export default NodeManagement;