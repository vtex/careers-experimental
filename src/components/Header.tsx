import React, { useState, useEffect, FC } from "react";
import { MENU_ITEMS } from '../resources/menuItems';
import useMedia from '../hooks/useMedia';

const Header: FC = ({}) => {
  const medium = useMedia('(max-width: 850px)');
  const [hamburguerMenu, setHamburguerMenu] = useState(false);
  const [submenu, setSubmenu] = useState(false);

  useEffect(() => {
    (async () => {
      setHamburguerMenu(false);
    })();
    (async () => {
      setSubmenu(false)
    })();
  }, []);

  const handleSubmenu = () => {
    setSubmenu(!submenu)
  }

  return (
    <div
      style={{fontWeight: 500}}
      className="flex justify-between bg-white py-2 px-2 items-center md:p-0 header"
    >
      <div className="text-rebel p-3">
        <img
          alt=""
          data-srcset="https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX.png 472w, https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX-300x107.png 300w"
          data-src="https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX.png"
          data-sizes="(max-width: 472px) 100vw, 472px"
          src="https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX.png"
          sizes="(max-width: 472px) 100vw, 472px"
          srcSet="https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX.png 472w, https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX-300x107.png 300w"
          style={{maxWidth: 120}}
        />
      </div>
        {medium && (
          <div
            className={`nav-medium ${hamburguerMenu && `open`}`}
            onClick={() => setHamburguerMenu(!hamburguerMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      <div className={`${(!hamburguerMenu && medium) ? `hidden` : `text-lg`} md:absolute md:top-16 md:w-screen md:h-4/5 md:bg-white`}>
        <ul className="lg:flex justify-around md:bg-white z-20 lg:mr-3.5">
          {MENU_ITEMS.map(({ text, link, subItems, id }) => (
            <li
              className="lg:mx-3 relative md:block md:border-b md:border-lightGray md:hover:bg-lightGray md:py-3"
              onMouseEnter={(subItems.length > 0 && !medium) ? handleSubmenu : (() => setSubmenu(false))}
              onClick={(subItems.length > 0 && medium) ? handleSubmenu : undefined}
              key={id}
            >
              <a
                href={link}
                className="text-gray-900 text-base hover:text-rebel md:pl-4"
              >
                {text}
              </a>
              {(subItems.length > 0 && submenu) && (
                <div 
                className="absolute bg-white p-5 min-w-max border border-lightGray shadow-md mt-12 animate-upwards lg:pr-16 lg:pl-8 md:animate-none md:static md:mt-2 md:shadow-none md:p-0"
                  onMouseEnter={(subItems.length > 0 && !medium) && (() => setSubmenu(true))}
                  onMouseLeave={(subItems.length > 0 && !medium) && (() => setSubmenu(false))}
                >
                  {subItems.map(({submenuText, submenuLink, id}) => (
                    <a
                      href={submenuLink}
                      className="text-gray-900 text-base hover:text-rebel block pY-6 lg:pb-2 md:border-b md:border-lightGray md:py-2 md:text-sm md:pl-4"
                      key={id}
                    >
                      {submenuText}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
          {medium && (
            <div>
              <button className="rounded-md bg-rebel text-sm uppercase text-white px-9 py-3 md:p-4 md:m-5">
                View All Jobs
              </button>
            </div>
          )}
        </ul>
      </div>
      {!medium && (
        <div>
          <button className="rounded-md bg-rebel text-sm uppercase text-white px-9 py-3">
            View All Jobs
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
