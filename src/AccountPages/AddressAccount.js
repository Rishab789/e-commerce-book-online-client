import React from "react";
import Button from "../components/Button";

const AddressAccount = () => {
  return (
    <div>
      <p className="text-2xl border-b-2 mb-5">Billing Address</p>
      <div>
        <p>John Doe</p>
        <p>Hyderabad</p>
        <p>Landmark: Near Wine mart</p>
        <p>Pin: 769808</p>
        <p>Mob: 0700876985</p>
        <Button value="Edit Address" color="sign-color" />
      </div>
    </div>
  );
};

export default AddressAccount;
