import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()

    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }

    let res = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (res.data.success) {
      const { session_url } = res.data
      window.location.replace(session_url)
    } else {
      alert("Error")
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name='firstname' onChange={onChangeHandler} value={data.firstname} placeholder='First Name' />
          <input required type="text" name='lastname' onChange={onChangeHandler} value={data.lastname} placeholder='Last Name' />
        </div>
        <input required type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input required type="text" onChange={onChangeHandler} name='street' value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input required type="text" onChange={onChangeHandler} name='city' value={data.city} placeholder='City' />
          <input required type="text" name='state' value={data.state} onChange={onChangeHandler} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required type="text" name='zipcode' value={data.zipcode} onChange={onChangeHandler} placeholder='Zip code' />
          <input required type="text" name='country' value={data.country} onChange={onChangeHandler} placeholder='Country' />
        </div>
        <input required type="text" name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
