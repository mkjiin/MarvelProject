import MarvelServices from '../../services/MarvelServices';
import { Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
    state = {
        chars: [],
        loading: true
    }

    marvelService = new MarvelServices();

    componentDidMount() {
        this.updateChars()
    }

    onLoadedChars = (chars) => {
        this.setState({
            chars,
            loading: false
        })
    }


    updateChars() {
        this.marvelService
            .getAllCharacters()
            .then(this.onLoadedChars)
    }

    rednerItem(arr) {
        const items = arr.map(el => {
            return (
                <li 
                className="char__item"
                key={el.id}
                onClick={() => this.props.onCharSelected(el.id)}>
                    <img src={el.thumbnail} alt={el.name} />
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



    render() {
        const {chars, loading} = this.state;

        const items = this.rednerItem(chars)

        const content = loading ? <Spinner/> : items;
        
        return (
            <div className="char__list">
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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