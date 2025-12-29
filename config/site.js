import './env.js';

export const SITE = {
  name: 'Football Tips Kenya',
  description:
    'Football Tips Kenya ni home ya betting tips za Kenya. Pata free tips, acca picks, BTTS, Over 1.5 na VIP odds kila siku. Tips za leo, jana na kesho kwa EPL, La Liga, Serie A, Bundesliga na FKF PL.',
  url: process.env.SITE_URL,
  googleVerification: 'bre84rQ3JQJirLREUOE-3jYY0pU3uo8Gd8ddpOtJ4y8',
  defaultImage: '/images/social.png',
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home - Acca Tips', href: '/' },
  // { id: 'vip', label: 'VIP Tips', href: '/vip/' },
  { id: 'over15', label: 'Over 1.5 Tips', href: '/over-15/' },
  { id: 'btts', label: 'BTTS (GG/NG)', href: '/both-teams-to-score/' },
  {
    id: 'ht15',
    label: 'Under/Over 1.5 HT',
    href: '/under-over-15-first-half/',
  },
  { id: 'about', label: 'Kuhusu Sisi', href: '/about/' },
  { id: 'contact', label: 'Wasiliana Nasi', href: 'mailto:support@footballtips.ke' },
];

export const STATIC_PAGES = [
  '/',
  '/over-15/',
  '/both-teams-to-score/',
  '/under-over-15-first-half/',
  '/about/',
  '/services/',
  '/projects/',
];
