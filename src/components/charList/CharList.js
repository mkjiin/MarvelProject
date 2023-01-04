import useMarvelService from '../../services/MarvelServices';
import React, {useState, useEffect} from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, SetCharsEnded] = useState(false);


    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset)
            .then(onLoadedChars)    
    };

    

    const onLoadedChars = (newChars) => {

        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        SetCharsEnded(ended)
    }

    const rednerItem = (arr) => {
        const items = arr.map(el => {

            return (
                <li 
                className="char__item"
                key={el.id}
                // ref={this.myRef}
                tabIndex={0}
                onClick={() => {
                    props.onCharSelected(el.id);
                  }}>
                    <img src={el.thumbnail} alt={el.name} style={el.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit': 'initial'} : {'objectFit' : 'cover'}}/>
                    <div className="char__name">{el.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }       

    const items = rednerItem(chars)

    const spinner = loading && !newItemsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null
    
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {items}
            <button 
            className="button button__main button__long"
            disabled={newItemsLoading}
            style={{"display" : charsEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;

// const CharListItem = (props) => {
//     const {thumbnail, name} = props

//     return (
//         <li className="char__item">
//             <img src={thumbnail} alt={name}/>
//             <div className="char__name">{name}</div>
//         </li>
//     )
// }

// const {chars} = this.state
        
//         const elemets = chars.map(el => {
//             const {id, ...rest} = el
//             return (
//                 <CharListItem
//                 key={id}
//                 {...rest}
//                 />
//             )
//         })