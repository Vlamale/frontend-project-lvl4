import React from 'react'
import { Image } from 'react-bootstrap'
import notFoundImg from '../img/notFoundImg.webp'

const PNotFound = () => {
    return (
        <div className="text-center">
            <Image src={notFoundImg}></Image>
            <h1 className="h4 text-muted">Страница не найдена</h1>
            <p className="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
        </div>
    )
}

export default PNotFound