

class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=0372359462546775c76c6369c2508206';

    getResources = async (url) => {
        const res = await fetch(url);
    
        if(!res.ok) {
            throw new Error(`Cannot fetch ${url}, status : ${res.status}`)
        }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);     
        return res.data.results.map(this._transfromAllCharsData)
    }

    getCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);      
        return this._tranformCharacterData(res.data.results[0]); 
    }

    _tranformCharacterData = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            comics: char.comics.items,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }           
    }

    _transfromAllCharsData = (chars) => {
        return {
            name: chars.name,
            thumbnail: chars.thumbnail.path + '.' + chars.thumbnail.extension,
            id: chars.id
        }
    }
}

export default MarvelServices;

