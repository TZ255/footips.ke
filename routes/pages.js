import { Router } from 'express';
import { pageMeta } from '../utils/meta.js';
import { enforceVipAccess } from '../utils/vipAccess.js';
import { getMegaTips, getOver15Tips, getBttsTips, getHt15Tips, getVipTips } from '../utils/get-tips/index.js';
import { sendNormalSMS } from '../utils/sendSMS.js';

const router = Router();

router.get('/', async (req, res) => {
  const tips = await getMegaTips();
  res.render('pages/home', {
    activeId: 'home',
    meta: pageMeta({
      title: 'Football Tips Kenya | Free Tips za Leo, Acca & VIP',
      description:
        'Pata betting tips Kenya kila siku: acca tips, VIP picks, BTTS, Over 1.5 na HT/FT. Tips za leo kwa EPL, La Liga, Serie A, Bundesliga na FKF PL.',
      path: '/',
      image: '/images/social.png',
    }),
    tips,
  });
});

router.get('/over-15', async (req, res) => {
  const tips = await getOver15Tips();
  res.render('pages/over15', {
    activeId: 'over15',
    meta: pageMeta({
      title: 'Over 1.5 Tips Kenya | Mechi za Leo',
      description:
        'Over 1.5 goals tips za leo. Pata mechi zenye nafasi ya mabao 2+ kwa EPL, La Liga, Serie A na ligi za Kenya.',
      path: '/over-15/',
      image: '/images/social.png',
    }),
    tips,
  });
});

router.get('/both-teams-to-score', async (req, res) => {
  const tips = await getBttsTips();
  res.render('pages/btts', {
    activeId: 'btts',
    meta: pageMeta({
      title: 'BTTS Tips Kenya | GG/NG za Leo',
      description:
        'BTTS (GG/NG) tips za leo na kesho. Pata mechi zenye chances za teams zote kufunga kwa leagues tofauti.',
      path: '/both-teams-to-score/',
      image: '/images/social.png',
    }),
    tips,
  });
});

router.get('/under-over-15-first-half', async (req, res) => {
  const tips = await getHt15Tips();
  res.render('pages/ht15', {
    activeId: 'ht15',
    meta: pageMeta({
      title: 'Under/Over 1.5 HT | First Half Goals Kenya',
      description:
        'First half goals tips: Under/Over 1.5 HT. Pata predictions za mechi za leo na kesho kwa kipindi cha kwanza.',
      path: '/under-over-15-first-half/',
      image: '/images/social.png',
    }),
    tips,
  });
});

router.get('/vip', async (req, res) => {
  return res.redirect('/') //redirect to home for now
  const { user: freshUser, isActive, expired } = await enforceVipAccess(req.session?.user, req);
  const tips = isActive ? await getVipTips() : null;
  if (freshUser && req.session) req.session.user = freshUser;
  res.render('pages/vip', {
    activeId: 'vip',
    meta: pageMeta({
      title: 'VIP Tips | Football Tips Kenya',
      description: 'VIP tips za odds poa, zinapakiwa daily. Pata picks safi na analysis ya kina.',
      path: '/vip/',
      image: '/images/social.png',
    }),
    tips,
    user: freshUser,
    expired,
  });
});

router.get('/about', (req, res) => {
  res.render('pages/about', {
    activeId: 'about',
    meta: pageMeta({ title: 'Kuhusu Sisi | Football Tips Kenya', path: '/about' }),
  });
});

router.get('/services', (req, res) => {
  res.render('pages/services', {
    activeId: 'services',
    meta: pageMeta({ title: 'Huduma Zetu | Football Tips Kenya', path: '/services' }),
  });
});

router.get('/projects', (req, res) => {
  res.render('pages/projects', {
    activeId: 'projects',
    meta: pageMeta({ title: 'Miradi Yetu | Football Tips Kenya', path: '/projects' }),
  });
});

router.get('/api/testing', async (req, res) => {
  try {
    //await sendNormalSMS('+255757259678', 'This is a test message from UhakikaTips API.');
    return res.json({ success: true, message: 'API is working fine!' });
  } catch (error) {
    console.error('API testing error:', error);
    return res.status(500).json({ success: false, message: 'API testing failed', error: error.message });
  }
});

export default router;
