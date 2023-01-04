import useMarvelService from '../../services/MarvelServices';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = (props) => {

    const [comics, setComics] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(2);
    const [comicsEnded, SetComicsEnded] = useState(false);


    const {loading, error, getComicsList} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getComicsList(offset)
            .then(onLoadedComics)    
    };

    const onLoadedComics = (newComics) => {

        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 8);
        SetComicsEnded(ended)
    }

    const renderComics = (arr) => {
        
        const items = arr.map(el => {
            return (
                <li
                className='comics__item'
                key={el.id}
                onClick={() => props.onComicsSelected(el.id)}
                tabIndex={0}
                >
                    <Link to={`/comics/${el.id}`}>
                        <img src={el.thumbnail} alt={el.thumbnail} className="comics__item-img"/>
                        <div className="comics__item-name">{el.name}</div>
                        <div className="comics__item-price">{el.price === 0 ? 'Not avaliable' : el.price + '$'}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderComics(comics)

    const spinner = loading && !newItemsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {items}
            <button 
            className="button button__main button__long"
            disabled={newItemsLoading}
            style={{"display" : comicsEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;








