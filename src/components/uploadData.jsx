// src/components/UploadData.jsx
import { useEffect } from 'react';
import { db } from '../firebase'; // Adjust the import based on your project structure
import { collection, setDoc, doc } from 'firebase/firestore';

const UploadData = () => {
    useEffect(() => {
        const uploadWaterQualityData = async () => {
            try {
                // Fetch the JSON file
                const response = await fetch('/greywaterdata.json');
                const waterQualityData = await response.json(); // Parse the JSON data

                const collectionRef = collection(db, "WaterQualityData");
                for (const item of waterQualityData) {
                    const docRef = doc(collectionRef, item.MonitoringLocationID); // Use MonitoringLocationID as the document ID
                    await setDoc(docRef, item); // Upload the data
                }
                console.log("Data uploaded successfully!");
            } catch (error) {
                console.error("Error uploading data:", error);
            }
        };

        uploadWaterQualityData();
    }, []);

    return <div>Uploading data...</div>;
};

export default UploadData;