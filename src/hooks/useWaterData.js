// src/hooks/useWaterData.js
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const useWaterData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const collectionRef = collection(db, "WaterQualityData");
        
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const waterData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(waterData);
            setLoading(false);
        }, (error) => {
            setError(error);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return { data, loading, error };
};

export default useWaterData;