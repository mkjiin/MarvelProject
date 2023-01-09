import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelServices';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from '../../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {

    const {id} = useParams();

    const [data, setData] = useState();
    
    const {loading, error, getCharacter, clearError, getComic} = useMarvelService();

    useEffect(() => {
        onDataUpdate()
    }, [id])

    const onDataUpdate = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'hero':
                getCharacter(id).then(onDataLoaded)
        }
    };

    const onDataLoaded = (data) => {
        setData(data)
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null

    return (
        <>
            <AppBanner/>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SinglePage