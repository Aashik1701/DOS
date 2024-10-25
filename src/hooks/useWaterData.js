// src/hooks/useWaterData.js
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const useWaterData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "WaterQualityData"));
                const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Fetched Data:", dataArray); // Log the fetched data
                setData(dataArray);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching data:", err); // Log any errors
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, loading, error };
};

export default useWaterData;