const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Coupon, User, UserCoupon } = require("../../db/models");

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  try {
    const coupons = await UserCoupon.findAll({
      where: { userId: user.id},
      include: [
        { model: User },
        { model: Coupon }
      ]
    })

    if (!coupons || coupons.length === 0) {
      return res.status(404).json({ "message": "User Coupon not found" });
    }

    const couponList = coupons.map(coupon => coupon.toJSON());
    res.json({ UserCoupons: couponList })
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
})


router.get('/', requireAuth, async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    })
  }

  if (user.totalBooksRead < 5 ) {
    return res.status(403).json({
      "message": "Read more books!"
    })
  }

  if (user.totalBooksRead !== 5 && user.totalBooksRead < 10) {
    return res.status(403).json({
      "message": "Read more books!"
    })
  }

  try {

    const coupon = await Coupon.findOne({})

    if (!coupon || coupon.length === 0) {
      return res.status(404).json({ "message": "Coupon not found" });
    }

    res.json({ coupon })
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
})
module.exports = router
