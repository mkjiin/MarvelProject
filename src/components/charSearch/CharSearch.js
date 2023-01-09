import {Formik, Form, Field, ErrorMessage as FormikError} from 'formik';
import { useState } from 'react';
import * as Yup from 'yup'
import useMarvelService from '../../services/MarvelServices';
import { Link } from 'react-router-dom';
import  ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearch.scss';


const CharSearch = () => {

    const {checkCharacterName, clearError, error} = useMarvelService();

    const [hero, setHero] = useState(null);

    const onHeroLoaded = (hero) => {
        setHero(hero)
    }

    const updateHero = (name) => {
        checkCharacterName(name)
            .then(onHeroLoaded)
    }

    console.log(hero)

    // const errorSearch = error ? <div className='char__search-critical-error'> <ErrorMessage /></div> : null; В ПРИНЦИПІ НЕ ПОТРІБНА, АДЖЕ МАЄМО ВСЬОГО ДВІ ПОМИЛКИ - ПОМИЛКА ВАЛІДАЦІЇ (ВКАЗАНА В ФОРМІ) ТА ПОМИЛКА ПОШУКУ (ВКАЗАНА В 'result)

    const result = !hero ? null : hero.length > 0 ? 
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {hero[0].name} page!</div>
                        <Link to={`/characters/${hero[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className='char__search-form'>
            <Formik
            initialValues={{
                heroName: ''
            }}
            validationSchema = {Yup.object({
                heroName: Yup.string().required('This field is required')
            })}
            onSubmit = { ({heroName}) => {
                updateHero(heroName);
            }}
            >
                <Form>
                    <label htmlFor="" className='char__search-label'>Or find a character by name:</label>
                    <div className='char__search-wrapper'>
                        <Field
                            name='heroName' 
                            type='text' 
                            placeholder="Enter name"/>
                         <button 
                            type='submit' 
                            className="button button__main"
                            >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikError component="div" className="char__search-error" name="heroName" />
                </Form>
            </Formik>
            {result}
            {/* {errorSearch} */}
        </div>
    )
}


export default CharSearch