// src/components/UploadData.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust the import based on your project structure
import { collection, setDoc, doc } from 'firebase/firestore';

const UploadData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const uploadWaterQualityData = async () => {
            try {
                const response = await fetch('/GWdataConverted.json');
                const jsonData = await response.json();
                const waterQualityData = jsonData["Sheet 1"];
                const collectionRef = collection(db, "WaterQualityData");

                for (const item of waterQualityData) {
                    if (item.Column2 === "MonitoringLocationID") continue; // Skip header

                    const docRef = doc(collectionRef, item.Column2);
                    await setDoc(docRef, {
                        MonitoringLocationID: item.Column2,
                        MonitoringLocationName: item.Column3,
                        MonitoringLocationLatitude: item.Column4,
                        MonitoringLocationLongitude: item.Column5,
                        Salinity: item.Column14 !== undefined ? item.Column14 : null,
                        Dissolved_Oxygen: item.Column17 !== undefined ? item.Column17 : null,
                        Total_Coliform: item.Column19 !== undefined ? item.Column19 : null,
                    });
                }
                setSuccess(true);
                console.log("Data uploaded successfully!");
            } catch (error) {
                setError(error);
                console.error("Error uploading data:", error);
            } finally {
                setLoading(false);
            }
        };

        uploadWaterQualityData();
    }, []);

    if (loading) return <div>Uploading data...</div>;
    if (error) return <div>Error uploading data: {error.message}</div>;
    if (success) return <div>Data uploaded successfully!</div>;

    return null; // Return null if no state is active
};

export default UploadData;