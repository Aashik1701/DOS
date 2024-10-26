import  { useState } from 'react';
import Sidebar from './ControlPanelComponents/Sidebar';
import NodeManagement from './ControlPanelComponents/NodeManagement';
import SensorConfiguration from './ControlPanelComponents/SensorConfiguration';
import Alerts from './ControlPanelComponents/Alerts';
import DataVisualization from './ControlPanelComponents/DataVisualization';
//import UserManagement from './ControlPanelComponents/UserManagement';
import SystemSettings from './ControlPanelComponents/SystemSettings';
import Dashboard from './Dashboard';
import './ControlPanelComponents/ControlPanel.css';
const ControlPanel = () => {
    const [nodes, setNodes] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [alerts] = useState([]);
    const [activeSection, setActiveSection] = useState('Dashboard');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'Node Management':
                return <NodeManagement nodes={nodes} setNodes={setNodes} />;
            case 'Sensor Configuration':
                return <SensorConfiguration sensors={sensors} setSensors={setSensors} />;
            case 'Alerts':
                return <Alerts alerts={alerts} />;
            case 'Data Visualization':
                return <DataVisualization />;
            case 'Dashboard':
                return <Dashboard />;
            case 'System Settings':
                return <SystemSettings />;
            default:
                return null;
        }
    };

    return (
        <div className="control-panel">
            <Sidebar 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
                isSidebarVisible={isSidebarVisible} 
                setIsSidebarVisible={setIsSidebarVisible} 
            />
            <div className="main-content">
                <h1>Control Panel</h1>
                {renderSectionContent()}
            </div>
        </div>
    );
};

export default ControlPanel;