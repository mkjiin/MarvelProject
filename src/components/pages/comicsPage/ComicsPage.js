import { useState } from 'react'
import { Helmet } from 'react-helmet'

import AppBanner from '../../appBanner/AppBanner'
import ComicsList from '../../comicsList/ComicsList'

const ComicsPage = () => {
    
    const [selectedComics, setSelectedComics] = useState(null)

    const onComicsSelected = (id) => {
        setSelectedComics(id)
    }  

    return (
        <>
            <Helmet>
                <meta
                name="description"
                content="Marvel information portal"
                />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList onComicsSelected={onComicsSelected}/>
        </>
    )
}

export default ComicsPage