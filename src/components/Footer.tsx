import { FacebookOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons'
import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer__header">Tương tác với chúng tôi</div>

        <div className="footer__content">
            <FacebookOutlined className='footer__content__item' />
            <YoutubeOutlined className='footer__content__item' />
            <TwitterOutlined className='footer__content__item' />
        </div>
    </div>
  )
}

export default Footer