import React from "react";
import Button from "./../../../client/src/components/Button";

const OrderAccount = () => {
  return (
    <div className="overflow-auto">
      <p className="text-2xl border-b-2 mb-5">Orders</p>
      <div>
        <table className="w-full text-center">
          <tr>
            <td>Order</td>
            <td>Name</td>
            <td>Date</td>
            <td>Status</td>
            <td>Total</td>
            <td>Action</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Harry Potter</td>
            <td>Aug 22, 2018</td>
            <td>
              <p className="rounded-md bg-orange-400 text-white ">processing</p>{" "}
            </td>
            <td>₹3000/-</td>
            <td>
              <Button value="View" color="sign-color" className="w-16" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default OrderAccount;
