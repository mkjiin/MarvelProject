import { Helmet } from 'react-helmet'

import './singleCharPage.scss'

const SingleCharPage = ({data}) => {

    const {thumbnail, name, description} = data

    return (
        <div className='single-comic'>
            <Helmet>
                <meta
                name="description"
                content="Marvel information portal"
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
                <div className='single-comic__info'>
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
        </div>
    )

}

export default SingleCharPage

