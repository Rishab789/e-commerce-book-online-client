import React from "react";
import orderBoard from "./../assets/order_board.png";

const Orders = () => {
  return (
    <div className="px-10">
      <div className="">
        <p className="px-10 pt-10 text-3xl font-bold">Orders!</p>
      </div>

      <div className="border border-black flex items-center justify-between px-2">
        <div>
          {/* icon */}

          <img src={orderBoard} width={50} />
        </div>
        <div>
          {/* order details */}
          <p>H-No 7/12 Hitech city</p>
          <p>Near to Wine Mart</p>
          <p>Hyderabad</p>
        </div>
        <div>
          {/* quantity */}
          <p>Qty:5</p>
        </div>
        <div>
          {/* price */}
          <p>Price:₹3000</p>
        </div>
        <div>
          {/* status */}
          <select className="border border-black focus:outline-none py-1">
            <option value="processing">Processing</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Orders;
