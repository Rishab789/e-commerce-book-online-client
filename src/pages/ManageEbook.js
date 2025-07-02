import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const ManageEbook = () => {
  return (
    <div>
      <div className="">
        <p className="px-10 pt-10 text-3xl font-bold">Manage e-Books!</p>
        <div className="px-10">
          <table className="m-auto mt-10 w-full text-center ">
            <tr className="bg-slate-300">
              <th>No.</th>
              <th>eBook Name</th>
              <th>Author Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Edit or Manage</th>
            </tr>
            <tr>
              <td>1</td>
              <td>The Maid</td>
              <td>Nick Fury</td>
              <td>Fiction</td>
              <td>₹200.00</td>
              <td className="flex items-center justify-around">
                <Link to="/dashboard/upload">Edit</Link>
                <Button value="Delete" color="del-color" />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Goldern Era</td>
              <td>Jack Man</td>
              <td>Non-Fiction</td>
              <td>₹500.00</td>
              <td className="flex items-center justify-around">
                <Link to="/dashboard/upload">Edit</Link>
                <Button value="Delete" color="del-color" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEbook;
