import './ControlPanel.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faNetworkWired, 
    faCogs, 
    faExclamationTriangle, 
    faChartLine, 
    faUsers, 
    faSlidersH,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ activeSection, setActiveSection, isSidebarVisible }) => {
    return (
        <div className="sidebar" style={{ width: isSidebarVisible ? '100px' : '0px' }}>
            
            <ul>
                <li className={activeSection === 'Dashboard' ? 'active' : ''}
                    onClick={() => setActiveSection('Dashboard','WaterQualityMap')}>
                    <FontAwesomeIcon icon={faUsers} />
                    <span className="sidebar-text">Dashboard</span>
                </li>
                <li className={activeSection === 'Alerts' ? 'active' : ''}
                    onClick={() => setActiveSection('Alerts')}>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span className="sidebar-text">Alerts</span>
                </li>
                <li className={activeSection === 'Node Management' ? 'active' : ''}
                    onClick={() => setActiveSection('Node Management')}>
                    <FontAwesomeIcon icon={faNetworkWired} />
                    <span className="sidebar-text">Node Management</span>
                </li>
                <li className={activeSection === 'Sensor Configuration' ? 'active' : ''}
                    onClick={() => setActiveSection('Sensor Configuration')}>
                    <FontAwesomeIcon icon={faCogs} />
                    <span className="sidebar-text">Sensor Configuration</span>
                </li>
                <li className={activeSection === 'Data Visualization' ? 'active' : ''}
                    onClick={() => setActiveSection('Data Visualization')}>
                    <FontAwesomeIcon icon={faChartLine} />
                    <span className="sidebar-text">Data Visualization</span>
                </li>
                <li className={activeSection === 'System Settings' ? 'active' : ''}
                    onClick={() => setActiveSection('System Settings')}>
                    <FontAwesomeIcon icon={faSlidersH} />
                    <span className="sidebar-text">System Settings</span>
                </li>
            </ul>
        </div>
    );
};

Sidebar.propTypes = {
    activeSection: PropTypes.string.isRequired,
    setActiveSection: PropTypes.func.isRequired,
    isSidebarVisible: PropTypes.bool.isRequired,
    setIsSidebarVisible: PropTypes.func.isRequired,
};

export default Sidebar;