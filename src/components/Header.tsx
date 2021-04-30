import React, { FC } from "react"

const MENU_ITEMS = [{
  text: 'About Us',
  link: '#'
},
{
  text: 'How We Hire',
  link: '#'
},
{
  text: 'Why Join Us',
  link: '#'
},
{
  text: 'Areas of work',
  link: '#'
},
{
  text: 'Locations',
  link: '#'
},
{
  text: 'Early Careers',
  link: '#'
}]

const Header: FC = ({}) => {
  return (
    <div className="flex justify-between bg-white py-2 px-2 items-center">
      <div className="text-rebel w-2/12 p-3">
        <img
          alt=""
          data-srcset="https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX.png 472w, https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX-300x107.png 300w"
          data-src="https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX.png"
          data-sizes="(max-width: 472px) 100vw, 472px"
          src="https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX.png"
          sizes="(max-width: 472px) 100vw, 472px"
          srcSet="https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX.png 472w, https://careers.vtex.com/wp-content/uploads/2020/09/Logo_VTEX-300x107.png 300w"
        />
      </div>
      <div className="text-lg">
        <ul className="flex justify-around">
          {MENU_ITEMS.map(({ text, link }) => (
            <li className="mx-2"><a href={link} className="text-gray-900 text-sm">{text}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <button className="rounded-md bg-rebel text-sm uppercase text-white px-4 py-3">
          View All Jobs
        </button>
      </div>
    </div>
  )
}

export default Header
