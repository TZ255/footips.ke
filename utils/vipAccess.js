import User from '../models/user.js';

const nowDate = () => new Date();

function isActivePaid(user) {
  const expiresAt = user?.payment?.expiresAt ? new Date(user.payment.expiresAt) : null;
  return Boolean(user?.isPaid && expiresAt && expiresAt > nowDate());
}

function refreshSession(req, userDoc) {
  if (!req?.session) return;
  req.session.user = {
    id: userDoc._id,
    uid: userDoc.uid,
    email: userDoc.email,
    name: userDoc.name,
    role: userDoc.role,
    isPaid: userDoc.isPaid,
    payment: userDoc.payment || {},
  };
}

export async function enforceVipAccess(currentUser, req) {
  if (!currentUser || !currentUser.id) {
    return { user: null, isActive: false, expired: false };
  }

  const userDoc = await User.findById(currentUser.id);
  if (!userDoc) return { user: null, isActive: false, expired: false };

  const isActive = isActivePaid(userDoc);

  if (!isActive && userDoc.isPaid) {
    userDoc.isPaid = false;
    userDoc.payment = {};
    await userDoc.save();
    refreshSession(req, userDoc);
    return { user: userDoc.toObject(), isActive: false, expired: true };
  }

  const sessionDiffers =
    Boolean(currentUser.isPaid) !== Boolean(userDoc.isPaid) ||
    (currentUser.payment?.expiresAt || null) !== (userDoc.payment?.expiresAt || null);
  if (sessionDiffers) {
    refreshSession(req, userDoc);
  }

  return { user: userDoc.toObject(), isActive, expired: false };
}
