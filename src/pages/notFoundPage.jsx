import React from 'react'
import { Image } from 'react-bootstrap'
import notFoundImg from '../img/notFoundImg.webp'
import { useTranslation } from 'react-i18next'
import routesPath from '../consts/routesPath.js'

const notFoundPage = () => {
    const { t } = useTranslation()

    return (
        <div className="text-center">
            <Image src={notFoundImg}></Image>
            <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
            <p className="text-muted">{t('notFoundPage.body.text')} <a href={routesPath.main}>{t('notFoundPage.body.link')}</a></p>
        </div>
    )
}

export default notFoundPage