import { useState } from 'react';
import PropTypes from 'prop-types';

const SensorConfiguration = ({ sensors, setSensors }) => {
    const [newSensor, setNewSensor] = useState({ type: '', measurementUnit: '', calibration: '' });

    const handleAddSensor = () => {
        setSensors([...sensors, { ...newSensor }]);
        setNewSensor({ type: '', measurementUnit: '', calibration: '' });
    };

    const handleDeleteSensor = (index) => {
        setSensors(sensors.filter((_, i) => i !== index));
    };

    return (
        <section>
            <h2>Sensor Configuration</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddSensor(); }}>
                <input
                    type="text"
                    placeholder="Sensor Type"
                    value={newSensor.type}
                    onChange={(e) => setNewSensor({ ...newSensor, type: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Measurement Unit"
                    value={newSensor.measurementUnit}
                    onChange={(e) => setNewSensor({ ...newSensor, measurementUnit: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Calibration Settings"
                    value={newSensor.calibration}
                    onChange={(e) => setNewSensor({ ...newSensor, calibration: e.target.value })}
                    required
                />
                <button type="submit">Add Sensor</button>
            </form>
            <ul>
                {sensors.map((sensor, index) => (
                    <li key={index}>
                        {sensor.type} - {sensor.measurementUnit}
                        <button onClick={() => handleDeleteSensor(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </section>
    );
};
SensorConfiguration.propTypes = {
    sensors: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            measurementUnit: PropTypes.string.isRequired,
            calibration: PropTypes.string.isRequired,
        })
    ).isRequired,
    setSensors: PropTypes.func.isRequired,
};

export default SensorConfiguration;
