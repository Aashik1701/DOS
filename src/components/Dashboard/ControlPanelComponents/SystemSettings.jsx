import { useState } from 'react';
import './SystemSettings.css';

const SystemSettings = () => {
    const [measurementUnit, setMeasurementUnit] = useState('Metric');
    const [backupStatus, setBackupStatus] = useState('');
    const [restoreStatus, setRestoreStatus] = useState('');

    const handleBackup = () => {
        // Simulate backup functionality
        setBackupStatus('Backup successful!');
        setTimeout(() => setBackupStatus(''), 3000); // Clear message after 3 seconds
    };

    const handleRestore = () => {
        // Simulate restore functionality
        setRestoreStatus('Restore successful!');
        setTimeout(() => setRestoreStatus(''), 3000); // Clear message after 3 seconds
    };

    return (
        <section className="system-settings">
            <h2>System Settings</h2>
            <div className="settings-section">
                <h3>Measurement Units</h3>
                <label>
                    Select Default Measurement Unit:
                    <select value={measurementUnit} onChange={(e) => setMeasurementUnit(e.target.value)}>
                        <option value="Metric">Metric</option>
                        <option value="Imperial">Imperial</option>
                    </select>
                </label>
            </div>
            <div className="backup-restore-section">
                <h3>Backup and Restore</h3>
                <button onClick={handleBackup}>Backup Data</button>
                {backupStatus && <p className="status-message">{backupStatus}</p>}
                <button onClick={handleRestore}>Restore Data</button>
                {restoreStatus && <p className="status-message">{restoreStatus}</p>}
            </div>
        </section>
    );
};

export default SystemSettings;