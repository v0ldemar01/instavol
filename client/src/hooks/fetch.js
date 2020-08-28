import {useState, useCallback} from 'react';
export const useFetch = () => {
    const [error, setError] = useState(null);
    const request = useCallback( async (url, method,  body ) => {
        const headers = {
            'Content-Type': 'application/json;charset=utf-8'
        }
        try {
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something was wrong');
            }
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }        
    }, []);   
    const clearError = useCallback(() => setError(null), []) 
    return {request, error};
}