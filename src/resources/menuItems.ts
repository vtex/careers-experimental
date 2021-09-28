const BASE_URL = "https://careers.vtex.com"

export const MENU_ITEMS = [
  {
    id: 1,
    text: 'About Us',
    link: '',
    subItems: [
      {
        id: 1,
        submenuText: 'Our History',
        submenuLink: `${BASE_URL}/about-us/our-history/`
      },
      {
        id: 2,
        submenuText: 'Culture & Diversity',
        submenuLink: `${BASE_URL}/about-us/culture-diversity/`
      },
    ],
  },
  {
    id: 2,
    text: 'How We Hire',
    link: `${BASE_URL}/how-we-hire/`,
    subItems: []
  },
  {
    id: 3,
    text: 'Why Join Us',
    link: `${BASE_URL}/why-join-us/`,
    subItems: []
  },
  {
    id: 4,
    text: 'Areas of work',
    link: `${BASE_URL}/areas-of-work/`,
    subItems: []
  },
  {
    id: 5,
    text: 'Locations',
    link: `${BASE_URL}/locations/`,
    subItems: []
  },
  {
    id: 6,
    text: 'Events',
    link: `${BASE_URL}/events/`,
    subItems: []
  },
  {
    id: 7,
    text: 'Early Careers',
    link: `${BASE_URL}/early-careers/`,
    subItems: []
  }
];
