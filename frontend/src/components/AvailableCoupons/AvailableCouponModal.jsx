import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { fetchAvailCoup } from "../../store/coupons";
import { addCoupon } from "../../store/userCoupons";
import { fetchCoupons } from "../../store/userCoupons";
import './AvailableCoupon.css'

const AvailableCoupons = ({ navigate }) => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const coupons = Object.values(useSelector(state => state.coupon));

  useEffect(() => {
    dispatch(fetchAvailCoup())
    dispatch(fetchCoupons())
  }, [dispatch])

  const handleAddCoupon = async (couponId, coupon) => {


      await dispatch(addCoupon(couponId, coupon))
      .then(closeModal())
      .then(navigate('/coupons/current'))


  }

  return (
    <div className="avail-coup-form">
      <div className="coupons-container">
        {coupons && coupons.map(coupon => (
          <div key={coupon.id} className="coupon-cards">
            {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <div className={`cutout cutout${i + 1} left`}></div>
              <div className={`cutout cutout${i + 1} right`}></div>
            </React.Fragment>
          ))}
            <img src="../../cut-pizza.png" />
            <span>{coupon.name}</span>
            <span>
              {coupon.description}
            </span>
            <button onClick={() => handleAddCoupon(coupon.id, coupon)}>add to your collection</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailableCoupons;
