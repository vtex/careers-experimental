import React from "react";
import { StaticImage } from "gatsby-plugin-image";

import useMedia from '../hooks/useMedia';
import { MENU_ITEMS } from '../resources/menuItems';

const Footer = ({}) => {
  const mobile = useMedia('(max-width: 400px)');

  const FacebookIcon = require('../svg/facebook.svg');
  const InstagramIcon = require('../svg/instagram.svg');
  const YouTubeIcon = require('../svg/youtube.svg');
  const LinkedInIcon = require('../svg/linkedin.svg')

  return (
    <footer className="bg-blue sm:flex sm:flex-col">
      <div className="flex p-10 justify-between lg:py-24 lg:px-48 sm:flex-col">
        <div className="flex flex-col">
          <StaticImage
            alt="Vtex"
            src="../images/vtex-footer.png"
            style={{maxWidth: 100}}
            className="mb-4"
          />
          <StaticImage
            alt="Accelerate Commerce Transformation"
            src="../images/group-footer.png"
            style={{maxWidth: 120}}
            className="sm:mb-10"
          />
        </div>
        <div className="text-white" style={{minWidth: 306}}>
          <ul className="flex flex-col flex-wrap sm:flex-nowrap lg:max-h-72">
          {MENU_ITEMS.map(({ text, link, subItems }) => (
            <li className="text-xl mb-4">
              <a
                href={link}
              >
                {text}
              </a>
              {(subItems.length > 0) && (
                <div className="text-base">
                  {subItems.map(({submenuText, submenuLink}) => (
                    <a href={submenuLink} className="text-gray block mb-4 mt-4">
                      {submenuText}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-lightBlue flex justify-between lg:px-48 py-6">
        <div className="flex justify-evenly w-40">
          <a href="https://www.facebook.com/vtexcommerce/" target="_blank">
            <FacebookIcon style={{ width: 20, height: 20}} />
          </a>
          <a href="https://www.instagram.com/vtexbrasil/" target="_blank">
            <InstagramIcon style={{ width: 20, height: 20}} />
          </a>
          <a href="https://www.youtube.com/user/VTEXTV" target="_blank">
            <YouTubeIcon style={{width: 20, height: 20}} />
          </a>
          <a href="https://br.linkedin.com/company/vtex" target="_blank">
            <LinkedInIcon style={{width: 20, height: 20}} />
          </a>
        </div>
        <p className="text-gray md:mr-4">
          <a href="https://vtex.com/us-en/terms-policies/">Terms and policies</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer;

