const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');

const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;

  try {
    const reviews = await Review.findAll({
      where: {
        userId: user.id
      }
    })

    res.status(200).json({reviews});
  } catch (error) {
    error.message = "Bad Request"
    error.status = 400
    next(error)
  }
})

router.put('/:reviewId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const reviewId = Number(req.params.reviewId)

  try {
    const { review, stars } = req.body;

    const editReview = await Review.findOne({
      where: {
        id: reviewId
      }
    })

    if (!editReview) {
      return res.status(404).json({
        message: "Review couldn't be found"
      })
    }

    if (!user) {
      return res.status(401).json({
        "message": "Authentication required"
      })
    }

    if (user.id !== editReview.userId) {
      return res.status(403).json({
        "message": "Forbidden"
      })
    }

    if (user) {
      editReview.set({ review, stars });

      await editReview.save();

      res.status(200).json(editReview);
    }

  } catch (error) {
    error.message = "Bad Request"
    error.status = 400
    next(error)
  }
})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const reviewId = req.params.reviewId

  try {
    const review = await Review.findOne({
      where: {
        id: reviewId
      }
    })
    if (!review) {
      return res.status(404).json({
        "message": "Review couldn't be found"
      })
    }
    if (!user) {
      return res.status(401).json({
        "message": "Authentication required"
      })
    }
    if (user.id !== review.userId) {
      return res.status(403).json({
        "message": "Forbidden"
      })
    }

    if (user) {

      await review.destroy(review)

      res.status(200).json({
        "message": "Successfully deleted"
      })
    }

  } catch (error) {
    error.message = "Bad Request"
    error.status = 400
    next(error)
  }
})

module.exports = router;
