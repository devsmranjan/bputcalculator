import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import Body from './Body'

const SGPA = () => {
    const [dataFromAPI, setDataFromAPI] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDataFromAPI = async () => {
        var res = await fetch(
            'https://devsmranjan.github.io/BPUT/bput-btech.json'
        );
        var data = await res.json();

        setDataFromAPI(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    return (
        isLoading ? <Loading /> : <Body dataFromAPI={dataFromAPI} />
    );
};

export default SGPA;
