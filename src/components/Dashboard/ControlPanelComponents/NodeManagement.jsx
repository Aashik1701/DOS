import { useState } from 'react';
import PropTypes from 'prop-types';

const NodeManagement = ({ nodes, setNodes }) => {
    const [newNode, setNewNode] = useState({ id: '', name: '', latitude: '', longitude: '', type: '' });

    const handleAddNode = () => {
        setNodes([...nodes, { ...newNode }]);
        setNewNode({ id: '', name: '', latitude: '', longitude: '', type: '' });
    };

    const handleDeleteNode = (id) => {
        setNodes(nodes.filter(node => node.id !== id));
    };

    return (
        <section>
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
                    type="text "
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
                <button type="submit">Add Node</button>
            </form>
            <ul>
                {nodes.map(node => (
                    <li key={node.id}>
                        {node.name} (ID: {node.id})
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