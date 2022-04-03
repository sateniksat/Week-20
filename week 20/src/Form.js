import React, { useEffect, useState, useRef } from "react";
import Cookies from "universal-cookie";

function Form() {
  const [data, setdata] = useState({ fname: "", lname: "", email: "" });
  const [radio, setradio] = useState("1");
  const handleChangeInput = (e) => {
    e.preventDefault();
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  let fnameRef = useRef();
  let lnameRef = useRef();
  let emailRef = useRef();

  //   console.log(fnameRef,",",lnameRef,",",emailRef);

  useEffect(() => {
    let personalData = JSON.parse(localStorage.getItem("personalData"));
    console.log(personalData);
    if (personalData) {
      if (fnameRef.current) fnameRef.current.value = personalData?.fname;
      if (lnameRef.current) lnameRef.current.value = personalData?.lname;
      if (emailRef.current) emailRef.current.value = personalData?.email;
    }
  }, []);
  const cookies = new Cookies();
  const handleSave = (e) => {
    e.preventDefault();
    console.log(radio);
    switch (radio) {
      case "1":
        localStorage.setItem("personalData", JSON.stringify(data));
        break;
      case "2":
        sessionStorage.setItem("personalData", JSON.stringify(data));
        break;
      case "3":
        cookies.set("personalData", data, {
          path: "/",
          expires: 365 * 24 * 3600,
        });
        break;
      default:
        break;
    }
  };
  const handleradio = (e) => {
    // e.preventDefault();
    console.log(radio);

    setradio(e.target.value);
    console.log(radio);
  };
  const handleReset = (e) => {
    e.preventDefault();
    switch (radio) {
      case "1":
        localStorage.clear();
        break;
      case "2":
        sessionStorage.clear();
        break;
      case "3":
        cookies.remove("personalData");
        break;
      default:
        break;
    }
    if (fnameRef.current) fnameRef.current.value = "";
    if (lnameRef.current) lnameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
  };

  // const useImperativeHandle=()=>(ref, () => ({
  //     changeValue: (newValue) => {
  //       inputRef.current.value = newValue;
  //     }
  //   }));
  
  return (
    <>
      <form>
        <h2>Form</h2>
        <div>
          <label>Local Storage</label>
          <input
            type="radio"
            checked={radio==="1"}
            value="1"
            onChange={(e) => handleradio(e)}
            // name="storage"
          />
          <label>Session Storage</label>
          <input
            type="radio"
            checked={radio==="2"}
            value="2"
            onChange={(e) => handleradio(e)}
            // name="storage"
          />
          <label>Cookies</label>
          <input
            type="radio"
            checked={radio==="3"}
            value="3"
            onChange={(e) => handleradio(e)}
            // name="storage"
          />
        </div>
        <label>Frist Name</label>
        <input
          ref={fnameRef}
          type="text"
          name="fname"
          onChange={(e) => handleChangeInput(e)}
          required
          placeholder="Frist Name"
          //   value={personalData.fname}
        />
        <label>Last Name</label>
        <input
          ref={lnameRef}
          type="text"
          name="lname"
          onChange={(e) => handleChangeInput(e)}
          required
          placeholder="Last Name"
        />
        <label>Email</label>
        <input
          ref={emailRef}
          type="email"
          name="email"
          onChange={(e) => handleChangeInput(e)}
          required
          placeholder="email"
        />
        <button onClick={(e) => handleSave(e)}>Save</button>
        <button onClick={(e) => handleReset(e)}>Reset</button>
      </form>
    </>
  );
}

export default Form;
