import "./Login.css";
import React, { useContext, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { Button } from "@material-ui/core";
const app = initializeApp(firebaseConfig);
const Login = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [checkbox, setCheckbox] = useState(false);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleLoginSite = (e) => {
    history.push(`/conform/bus`);
  };
  const [data, setData] = useContext(UserContext);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const information = result.user;
        console.log(information);
        setData(information);
        history.replace(from);
        handleLoginSite(information.displayName);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  const handleBlur = (e) => {
    let valueValid = true;
    if (e.target.name === "Email") {
      valueValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "Password") {
      const passwordValid = e.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(e.target.value);
      valueValid = passwordValid && passwordNumber;
    }
    if (valueValid || e.target.name === "name") {
      const userValue = { ...user };
      userValue[e.target.name] = e.target.value;
      setUser(userValue);
    }
  };
  const handleSubmit = (e) => {
    console.log("input button click");
    if (checkbox && user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const information = userCredential.user;
          console.log(information);
          upDateUserName(user.name);
          setData(information);
          history.replace(from);
          handleLoginSite(information.displayName);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
    if (!checkbox && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const information = userCredential.user;
          console.log(information);
          setData(information);
          history.replace(from);
          handleLoginSite(information.displayName);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
    e.preventDefault();
  };
  const upDateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((res) => {
        console.log("update user name");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div">
      <form onClick={handleSubmit} className="form">
        {
        checkbox? <h4>Login</h4> : <h4>Create an account</h4>
        }
         {/* {
           checkbox  <input type="text" onBlur={handleBlur} name="name" id="" placeholder="Enter You Name" />
         } */}
        <br />
        <br />
        <input type="text" name="email" onBlur={handleBlur}  required  placeholder="Your email" id="" />
        <br />
        <br />
        <input type="password" name="password"  onBlur={handleBlur} required  placeholder="Password"  id="" />
        <br />
        <br />
        <input type="button" value="submit" />
        <br />
        <br />
       {" "}
        <a href="" onClick={() => setCheckbox(!checkbox)}>
          {
            checkbox?<a href="">Create an account</a>: <p>Already have an accout? <b>Login</b></p>
          }
        </a>
      </form>
      <div>
        <span onClick={handleGoogleSignIn} style={{ padding: "5px 5px 5px 0px", background: "white", borderRadius: "10px", }}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABYlBMVEX///9Bdd/u7u5Yw2r/Yxrt7e3/2izvOAAApmzy8vL8/Pz4+PhAhfTy8e41bt719fWwwej2Sw1BfOgvsmu7zPL/XxkAp2hRwmz/WgBlmPPt7/T/chxvxmL/VwD/1iv62Sw8edfvKwBPwWMMoHs9d9r/2Rv15aUta90MoHz3/v/0wK3v7OH93ET/8bry9v3V79mH0pPvHwDusaT7hFX9by/ybVHzd17+4Wb/+Nj/5nj/88fL3PwufvT/54KDrff820///O6asebf4+ym2K7L69Dr+O3T5daY1KH+7uj03NXyz8T1s5n3qIr4n379lXTueGbui3bul4TuppX5jWP7eknuTSruYkjwQBbu4d7vWjj/xK7/bSvurZ/tvbL+6OD/1sbw69hxleT/cxP24YmMqer15Jr/99Feh+NvyH13meOhtubU3fW/58Vyx6Iqr3uSzbSMzbBLtYh8z4my2MiO0ZhyxpW7vflNAAAPK0lEQVR4nO3d/V/TSBoA8DQlhWlN695Cr5fbntuuyLW6KIKo675ISwstyDtaddXjdBeUV8H7/2/y1ibpJJmXJyG6zk/2MwXm68xknjyZJJJklKwiG8X8hIx/K7kvokr6Kvzsq74KP/+quIRIQwjVrE+FAv6A4hJmjZJTzGJ+QuaHgnAV/qu1Wk1d7nTrK6tP1nDZnp9fX1/f2NjcetV5vZyrSQXcIpC/5VcluWoL5gdkfhKr0v8Llzv11e2duZHSoHxTsctMZXT36fpWt6N/VY6qGVnJ7GCzQVLO7G9rACn8VZomvX6xZtImRpzlm1FX0anPnm++6tWMzgRuhlEFLpQRUjors6VyqTRCKB6h7ZwZXb/bs39FwoW9+trLsqfjwoSW8vlmN5d04fKL7RFy34UKDeXM7kY3K+XkZAprUn02hBcmNLry2Ua3gOCFhZxekPUl44P1E3RVCHXWwnkUQgO5u9VDiKcZhCoTLNkHV/OTtaTk6Kuy9Z0yBY9OaCDXO1JBZm0GqaovNPvS+pLppw0m0PLKy7LvoYVLqE/Je68UxNKMyKI21HsyQtd9TEIdufu7jC5dqPXWaGYflxAbn/2O0KUKcf9RTj8+ITaO3s1GIVT8f95ZlVthGZ9cwtHRmedd/hbqQsRdCvU5Zh+HEPfjfKfG30zSiq/4r6eDKtSZ9Q/NYIV47dhQEXML7SqCkCa8llfZDjBCQv2Q80pia6GosMszQAWEeDrOL8cozK5SL/BgQnxUfRWb8PUObweKCLFxPccjdCYdJCvjYX+JXPWC6wgDIMSzsVujaaG7yozErRyHkrOidPO7xKrZsoBPTIhn42YtvIXuKhNMHzF0uA8xIEL7gBNd1PZiRGSEAghxON6JUvhEsAMBhNhYj064LTYFgYR4MkYkXBZZJCCFozP1AoOQNquvvRY9xsAJR3dVebiFgll9qSN8jAEUznQl8Kx+B6QDoYSVzeEWCkZtb6CASRXCAYGEd4GFgEAY4WgPVAg3B6GElY0au9A/MY5AgRDCylPYrP4y0DIBJqw8hc3qL8+BAsWFlXtZ2Lh0FnSMApxb6EBI4RowUFRYeZolMfiFKwBnE5BCfQ6CCO3EOORCCCGs3FM8LQxovC0MSoh3wH2Cmah7KmxWXwY5IYQT6gcZ2Kw++FFGTFi5N9RCwajtDfhRRkhoAEGFy1H4+IWV+UAGj3A7ijHKLTQXei6hX2L8RSRjlPvqmr1MUF13cFeRs/pyL5oe5BRW7tVynhaKZvURdDiKy4Sxv9TYb1lhBM6D71TQ6qBjFNvKI3Oza09WV1ZWtjY3Ntaf7o7OUDsr81n4vRiQunJpdrXe6SnyYJ83kpVep775VN8nTNWD0MJpgOsTFq+0s/Jaksy9hoQGdTd3w7rSWiZghQ/+9U+I016dtxzWoFpn63kQEh9kBIWkrP79SXHiRPnlagdpUujWehmh7sYzP2NlXsmB79XXfprMZESJ5Z0X+H+Rcms9XrO2donGynpW9G4CUkxzK5MRJJbm6owhCFLujg4bjTlIFbgEVA0JtRuTGTFiaaSONOYGIbTlNZoHGXChnLEKJ3Gi9ERBXA1CvQ0XsbJOz2AQ2l3ISyzvdBF3g1D3ecULBBeq1zIZAWJ5VUYCDZKkjZn+EC2ACu3EuKMLOYill92a5xeaf5U+CV97ZczGysw6imiv/q1MhptYmu1polvrZaRsPd/dne/y3DJAquoLzf966cfJDDex/ARRxhnBVajA81O0UdtvmQwvsbQCcfMAeJVbqD2Y9AqpiaW6X3idKOHDYSElsfSmdokMauFNApCOWHrDkmmPs8qV1Z/+gyikIJbqNfZ8ezzFveLfIgLDifpBhinTHmeVU/gnuQtDiaVVffAD3S4IXuUU/uIrDCSWtiFviIxS+PiaLzCIODGXAAad8Cf/Lgwiljro8hkBVfbZfvAgDSCWVzj2z8dZNcjq3wwapL7E0iySmTPtcVaZYONeyeBB6kvsJCFwCahyCN+GCglEY6G4fAaVUPZb7gOJc8lgUAn/E96Fw8SycUJx+QwaoTt9QUmc2Jlm/6uSahbXhyxolUtoZ/W1+3RCF7HcNfbM02bac9L0o/Hx8atmGTeK6wNM1XhDlQlZfYkS6CROzEosmXap8euVn/NxlL3G4FpAP6YhnN2HEstvjKFAG2dMX/n5ypW/pWIo+dSh2m+GJRxKQVEQJ3bYIql/XLkSkxAbh+LSsJCNRCytSCzCRz/HKfygeoU0q6GX2GMS/hqnMLXvFT5mAhrE0jbbBSZjkMYmTCluocxwoLGJeKlgybRnYxYeWs2wV3yWA41F/C9bpl2NV5g/tJphCynCbk+ZfMgWScUt/GDHNJaQNqJxCH9MtvCdRzh0vSJc+DjRwtSeWxiYhCKXa4zxftzCfY+QfZD+wphpj1t4fVpyZvXpTg5dwhsaW3Y9F7Mw1XBm9SlyNEPCnzTGTHvMwvyhc8WnPf11Cm+y5jDjFj5SnUKfi04B5ZaadOFVl5B9wf+NzEiQ8INLyHTupJfJh1rShQuqI6tPvLodLPxFY820xy18pzqz+vcZgZnJt9OMmfa418P8u6wzq88u/IMYuCQopjEC00FMwy688cULf/wq/CqMTWjtzmcW3mDdP38JQmdWn+NYqpFT9/4b8i9nPbSy+tSXZQbCt4mPad65ojaemCbpwoW/TFz6Vzm3+PLPDznP8ZOc1c/rlxAHWX2OPM2fjPvnY18PG5Izq898YcYIvRMd06TsbKJZQPKlyRJe9wi/+Jz3l3/dAuTaU6Ky+oNrT2bqm2PJn3w4neSsPl4OXXv1NfZrwNe+S3RW31gOha7jX/uuuignOaZpyC4h816Ma9/9vXonyXsxrgvup8HAdDp9k0kY736avSEh0/mTCaweSSzCePdELfSFdvzIcqgxgen0gS2kyurHu69tXLWbYe/VZ7gKbAPT+FhDn9VX5EZsexNTqSltaK++Ri3sA9Ppc4aYBq/5Gtf+Uj6i7XLsgqaNahzAdLXNIuTcI/yew5d/lx0WUp4EO4F4JmpsQqMwbubm6cH81WEh5V59N1CficxCtir1A88wnWrw3m/hAeJOjFrY4OnC1L5MeAIPTfA9BExXmwj8HbuuawHveLoQr4akJ/D430HqD8SlJYG+3NZdJR1yHUqnDgl79SnO84nA6nmkdxLu8wD1DMbQTnaK+w+JQD12y0YnXODqQv3slygMTin6APuLYhTCwymuLsw/4rkP2BeIS0R9WJjm8plpNqIwaJgGAat3IrqXe48vYjNSNENCIwnvfzQNAhpLhsz0VByqKr6FQhce+j6BR/Nb9IOB1pkizANzBlUf+CahcXrv9wQev0tQYUA9egOPaa7yAs3LakzPNgkHYuJtYOE4LxDHpLK/kHi1mwaoExnewRReNc45B3F5rwYJCUlFOqA+FwGfMcQ9RPWILUgoD28dogXaR1SIZ+moC/xAfFrh/oWe5+oP5b7pgZi4VCiw7d8nlgJ6LwDMX/W0wfvMPfUWN1Bf+rMAz9KZ3uefg3ipkL2/0CN0JzPYgJiYvi0c0zxKiQDzH3IhQtdzE1mBurHp/YVMQkk6/uF7AWDqevi7ERydyAHExIO2wLMv2yfF4r8FiHi1Z3h+KRdQNy7xPr9UOS6OjY0Vf7jOT6R5rr7dibxAfTYeadZ8p39gjozQ6ZhZ+Im4C6meq39LDGgYFxWWhL/+4WKsONYncg7U/cAn8AxWYf1cXwioGw+OFPrHniDl9KTv4ydOPSL8LZJQuj8pCjT6sYmPORRChNrHY04fLzG/R/pbROEDAKBhPD9qhQlz7dMTr49zLpq3b1MJC0tVAKCBrB40b+Nf6CfEvOIwj49o7i+hfTcCENBEVu80F9sKXmqtyy84WMSHofbF2ceiD49voGbJwn5W35lOl4+gOtFGVtMH55+Wms2j09Ozs+Pjj3hkBuhMItvSP3WV/Ax/n6fWS3dAiQNo9Vs86UJoXAM1v2cvsJ7LBH7vCmpFIDTKt3Q6duI0/VPnzS/BjlM+IcNcnBpneK6+9aUoximrkJqYf0//1Pn+l1qRABmF1MRpDqG0GEknMgrp5uLUobfx/s/VN79kfMh+ioLIKqQh5hck/8sE/RWflGk/SIIwfKDm98yXybsbb7vIMY0VFkQxFdmFoUv/9YZKaHxw1GZ/KYKpyCEMGah56+lzXEKpCU7kEQYS8UoYmEQPEUrgRxsuYcBcnFqgfbqn60uOTPs5MJFP6EvUl/rgywSBb8vVi3oAS+QU+hDz+6HPAQp6W675X9MGBXILyXNxv+G9SZDpbblW58OuGdxCIrGhBjeeSqjAnknxCwkDtaGGNZ5KmJVuAxIFhENLf0OlaDyVEJIoIvQM1EPm5+oHJOHhiEJCF7HB/Fz9oCQ8akMRxYSOudhQhd6W61409b5vp2GMgkKLmDeXCfZ3BQUl4VswRFGhQczvNdThFooKpRZIdCMsxMTUe1kltVBUCJOcEheOFU+F35br+/MA1zMA+vCC7c0BxKy+JzHer5KOLl940pZE35YbtH9ebotORtHV4qOCAltIndU3Fk1CVSErOBkFV/wz9vcSMQqRnu8XMQrFpSftrByDUGzZEDm3OK4JvtGKfvuLQIKK/wx47IKhhaJCif+Aw53FwB0oJGTcWi/LTc7ZyJlrG7vIcm7+N8E8W+tbfAdVvnzp2eCWbPoWSuFZ/ZCqRZ6hypPV/9gS2FYtIpRyTfbzDfZrTye3+VsoKszKyhLrdGS9Qjp2mhVpoahQkTVlia0f2a7jn5wiBPZWMueXFP+fH6rS2kxGBiH2yQj2bbmcpdBimI/UwuLHCwSx9T88q09RJSPl6IByQtIJi8XjtlxgbAZvVp+yCumDlQJJISzi4alvTgW6oRFKiE+spMU74chQYfHkuI0gb9mEExqnHUdhyGChzuM6gYhNiMvNo09BSH8hHpxnbd7wOqBqkP2WWLbWB1Th39tunhs7LmmF+k7M49O23bqo3pZrxKuUW+tDq3KoffTpID3M9Ar1XaYnxxctPW0U8dtyjWJ+ArobFGlKe7H56fzA3FlatfaXWp2m99vJx+Ozi7ZSQLLo3/KvilJoV9Va7fZRs7n0CZc7/zs2ytnpRbvVqgVsAf+chGYVQo593kawEd3fuhzhZVX9BYRMWf3PsYoxq/8ZVsHHNEmr+j/tUFRD7+4fOgAAAABJRU5ErkJggg=="
            alt=""
            style={{
              width: "30px",
              height: "20px",
              borderRadius: "5px",
              padding: "5px 10px 0px 0px",
            }}
          />{" "}
          Continue With Google
        </span>
      </div>
    </div>
  );
};

export default Login;
