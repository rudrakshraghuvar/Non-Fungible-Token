import axios from "axios";
import React, { useState } from 'react';
import Navbar from './Navbar';
import Loader from './Loader';
import "../styles/style2.css";
import "../styles/add.css";

const Read = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [isloading, setisloading] = useState(true);
  const [details, setdetails] = useState({});

  const tokenDetail = async () => {
    try {
      setisloading(false);
      const res = await axios.get("read/token-details");
      if (Object.keys(res).length > 0) {
        setdetails({ ...res.data });
      }
      setisloading(true);
    } catch (error) {
      console.log(error);
      alert(`${error.response.data.message}`);
    }
  }

  const balanceof = async () => {
    const data = {
      address
    }
    try {
      setisloading(false);
      const res = await axios.post("read/balanceof", data);
      setBalance(res.data);
      setisloading(true);
    } catch (error) {
      console.log(error);
      alert(`${error.response.data.message}`);
    }
  };

  return (
    <div>
      {isloading ? (
        <>
          <Navbar />
          <div className="column">
            <div className="card">
              <h3> Token Details </h3>
              <p>Owner : {details.owner}</p>
              <p>Name : {details.name}</p>
              <p>Symbol : {details.symbol}</p>
              <p>Total Supply : {details.supply}</p>
              <button type="submit" onClick={tokenDetail}>
                Details
              </button>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h3> Balance Of </h3>
              <label>Address </label>
              <input
                type="text"
                id="name"
                placeholder="Enter the address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
                required
              />
              <p>Balance : {balance} </p>
              <button type="submit" onClick={balanceof}>
                Details
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  )
}

export default Read;