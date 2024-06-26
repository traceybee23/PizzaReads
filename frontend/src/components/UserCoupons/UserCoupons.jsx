import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import './UserCoupons.css'
import { fetchCoupons, redeemCoupon } from "../../store/userCoupons";
import DeleteCouponButton from "../DeleteCouponModal/DeleteCouponButton";

const UserCoupons = () => {

  const dispatch = useDispatch();

  const coupons = Object.values(useSelector(state => state.userCoupon))

  const [redeemedCoupons, setRedeemedCoupons] = useState([]);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleRedeem = (couponId) => {

    setRedeemedCoupons([...redeemedCoupons, couponId])
    dispatch(redeemCoupon(couponId))
  }

  return (

    <div className="coupons-container">
      <h1 className="heading">your coupons</h1>
      <div className="warning-container">
        <span>please write down your coupon code once you redeem</span>
        <span> it will not be visible after leaving this page</span>
      </div>
      {!!coupons.length && coupons.map(coupon => (
        coupon.Coupon &&
        <div className="coupon-cards-u"
          key={coupon.id}>
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <div className={`cutout cutout${i + 1} left`}></div>
              <div className={`cutout cutout${i + 1} right`}></div>
            </React.Fragment>
          ))}
          <img src="../../cut-pizza.png" />
          <span>{coupon.Coupon.name}</span>
          <span>{coupon.Coupon.description}</span>
          {coupon.redeemedDate ? (
            <>
              <span style={{ color: "red" }}>
                redeemed
              </span>
              <div className="delete-coup">
                <DeleteCouponButton couponId={coupon.Coupon.id} />
              </div>
            </>
          ) : (
            <button
              onClick={() => handleRedeem(coupon.Coupon.id)}
              disabled={redeemedCoupons.includes(coupon.Coupon.id)}
            >
              Redeem
            </button>
          )}
          {redeemedCoupons.includes(coupon.Coupon.id) && (
            <span className="coupon-code">Coupon Code: {coupon.Coupon.code}</span>
          )}

        </div>
      ))
      }
      {!coupons.length && <div className="read-more">read books to earn coupons!</div>}
    </div>

  )
}

export default UserCoupons;
