import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
   
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=0372359462546775c76c6369c2508206';
    const _baseOffset = 210;
    const _baseComicsOffset = 2;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);     
        return res.data.results.map(_transfromAllCharsData)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);      
        return _tranformCharacterData(res.data.results[0]); 
    }

    const getComicsList = async (offset = _baseComicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformAllComicsData)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformSingleComicData(res.data.results[0])
    }

    const _tranformCharacterData = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            comics: char.comics.items,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }              
    }

    const _transfromAllCharsData = (chars) => {
        return {
            name: chars.name,
            thumbnail: chars.thumbnail.path + '.' + chars.thumbnail.extension,
            id: chars.id
        }
    }

    const _transformAllComicsData = (comics) => {
        return {
            name: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price,
            id: comics.id
        }
    }

    const _transformSingleComicData = (comics) => {
        return {
            name: comics.title,
            description: comics.description || 'There is no description here',
            pages: comics.pageCount ? comics.pageCount + ' pages' : 'No information about pages',
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? comics.prices[0].price + '$' : 'No information about price',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
        }
    }



    return {loading, error, getCharacter, getAllCharacters, clearError, getComicsList, getComic}
}

export default useMarvelService;

