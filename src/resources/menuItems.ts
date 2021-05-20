const BASE_URL = "https://careers.vtex.com"

export const MENU_ITEMS = [{
  text: 'About Us',
  link: '',
  subItems: [
    {
      submenuText: 'Our Business',
      submenuLink: `${BASE_URL}/about-us/our-business/`
    },
    {
      submenuText: 'Our Products',
      submenuLink: `${BASE_URL}/about-us/our-products/`
    },
    {
      submenuText: 'Our History',
      submenuLink: `${BASE_URL}/about-us/our-history/`
    },
    {
      submenuText: 'Our Culture',
      submenuLink: `${BASE_URL}/about-us/our-culture/`
    },
  ],
},
{
  text: 'How We Hire',
  link: `${BASE_URL}/how-we-hire/`,
  subItems: []
},
{
  text: 'Why Join Us',
  link: `${BASE_URL}/why-join-us/`,
  subItems: []
},
{
  text: 'Areas of work',
  link: `${BASE_URL}/areas-of-work/`,
  subItems: []
},
{
  text: 'Locations',
  link: `${BASE_URL}/locations/`,
  subItems: []
},
{
  text: 'Events',
  link: `${BASE_URL}/events/`,
  subItems: []
},
{
  text: 'Early Careers',
  link: `${BASE_URL}/early-careers/`,
  subItems: []
}]