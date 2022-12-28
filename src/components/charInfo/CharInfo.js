import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charInfo.scss';
import MarvelServices from '../../services/MarvelServices';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelServices();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false /** {char} можна написати скорочено */})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {
            return;
        };

        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = (char || loading || error ? null : <Skeleton/>)
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;


        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}



const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }


    const items = comics.slice(0, 10).map((el,i) => {
        return (
            <li className='char__comics-item'
            key={i}>
                {el.name}
            </li>
        )
    })
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description ? `${description.slice(0, 210)}...` : 'There is no description for this character' }
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Unfortunatly, no comics here'}
                {items}
            </ul>
        </>
    )
}


export default CharInfo;