import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './UserCoupons.css'
import { fetchCoupons } from "../../store/coupons";

const UserCoupons = () => {

  const dispatch = useDispatch();

  const coupons = Object.values(useSelector(state => state.coupon))

  const [redeemedCoupons, setRedeemedCoupons] = useState([]);

  useEffect(() => {
    dispatch(fetchCoupons())
  }, [dispatch])

  const redeemCoupon = (couponId) => {
    setRedeemedCoupons([...redeemedCoupons, couponId])
  }

  return (

    <div className="coupons-container">
      <h1>your coupons</h1>
      {coupons && coupons.map(coupon => (
        <div className="coupon-cards"
          key={coupon.id}>
          <img src="../../red-pizza.png" />
          <span>{coupon.Coupon.name}</span>
          <span>{coupon.Coupon.description}</span>
          {coupon.Coupon.redeemedDate ? (
            <span style={{ color: "red" }}>
              redeemed
            </span>
          ) : (
            <button
              onClick={() => redeemCoupon(coupon.id)}
              disabled={redeemedCoupons.includes(coupon.id)}
            >
              Redeem
            </button>
          )}
          {redeemedCoupons.includes(coupon.id) && (
            <span className="coupon-code">Coupon Code: {coupon.Coupon.code}</span>
          )}
        </div>
      ))
      }
    </div>
  )
}

export default UserCoupons;