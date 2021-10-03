import "./Conform.css";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import map from "../../Image/Map.png";
import { useParams } from "react-router";
const Conform = () => {
  const {option} = useParams();
  console.log(option);
  const [data, setData] = useContext(UserContext);
  const [valueData, setValueData] = useState(false);
  const [userData, setUserData] = useState({
    PickForm: "",
    PickTo: "",
  });
  console.log(valueData);
  // const valueData = false;
  const fackData = [
    "mirpur",
    "danmondi",
    "kolabagan",
    "kakrail",
    "kochukhat",
    "gulistan",
  ];
  const handleInputText = (e) => {
    if (e.target.name === "PickForm" || e.target.name === "PickTo") {
      const bajar = fackData.find((dt) => dt === e.target.value);
      const allData = { ...userData };
      allData[e.target.name] = bajar;
      setUserData(allData);
    }
    e.preventDefault();
  };
  const handleButton = (e) => {
    if (userData.PickForm && userData.PickTo) {
      // const userallData = { ...valueData };
      // userallData.success = true;

       setValueData(true);
    }
    e.preventDefault();
  };

  return (
    <div>
      <hr />
      <div className="main">
        <div className="leftSite">
          <form>
            { valueData
            ?<div style={{backgroundColor: "black", padding: "10px", borderRadius: "5px"}}>
                <div style={{backgroundColor: "tomato", padding: "5px", borderRadius: "5px"}}>
                  <h4>{userData.PickForm}</h4>
                  <h4>To</h4>
                  <h4>{userData.PickTo}</h4>
                </div>
                <div>
                    <h2>this is time title</h2>
                </div>
                <div>
                    <h2>this is test time</h2>
                </div>
            </div>
                : <div>
                    <p>Pick Form</p>
                      <input type="text" name="PickForm" onBlur={handleInputText} id="" />
                      <br />
                      <p>Pick to</p>
                      <input type="text" name="PickTo" onBlur={handleInputText} id="" />
                      <br />
                      <br />
                      <input type="button" value="Search" onClick={handleButton} id="btn"/>
                  </div> 
            }
            <br />
          </form>
        </div>
        <div className="rightSite">
          <img src={map} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Conform;
