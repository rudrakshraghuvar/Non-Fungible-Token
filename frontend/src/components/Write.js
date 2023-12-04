import axios from "axios";
import React, { useState } from 'react';
import Navbar from './Navbar';
import Loader from './Loader';
import "../styles/style2.css";

const Write = () => {
  const [to, setTo] = useState("");
  const [hash, setHash] = useState("");
  const [isloading, setisloading] = useState(true);

  const submitHandle = async () => {
    const data = {
      to
    }
    try {
      setisloading(false);
      const res = await axios.post("write/mint", data);
      setHash(res.data.txnHash);
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
              <h3> Mint a NFT</h3>
              <label>Address </label>
              <input
                type="text"
                id="name"
                placeholder="Enter the address"
                onChange={(e) => {
                  setTo(e.target.value);
                }}
                value={to}
                required
              />
              <p>Transaction Hash : <a
                href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer">
                {hash}
              </a>
              </p>
              <button type="submit" onClick={submitHandle}>
                Mint
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

export default Write;
