import './Conform.css'
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import map from '../../Image/Map.png';
const Conform = () => {
    const [data, setData] = useContext(UserContext);
    const [userData, setUserData] = useState({
        PickForm: '',
        Pickto: '',
        successfull: '',
    })
    console.log(userData);
    const handleInputText = (e) => {
        if (e.target.name === "PickForm" || e.target.name === "PickTo") {
            const allData = {...userData};
            allData[e.target.name] = e.target.value;
            setUserData(allData);
        }

    };
    const handleButton = (e) => {
        if(userData.PickForm && userData.Pickto){
            // const allData = {...userData};
            // allData.successfull = true;
            console.log("successfull")
        }
        e.preventDefault();
    }
    
    return (
        <div>
            <hr />
            <div className="main">
                <div className="leftSite">
                    <form>
                        <p>Pick Form</p>
                        <input type="text" name="PickForm" onBlur={handleInputText} id="" />
                        <br />
                        <p>Pick to</p>
                        <input type="text" name="PickTo" onBlur={handleInputText} id="" />
                        <br />
                        <br />
                        {/* <input type="button" onClick={handleButton} value="Search" id="btn" /> */}
                        <button onClick={handleButton}>Search</button>
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