import React, { useState } from "react";

function Checking(props) {
  const [typeofonboarding, settypeofonboarding] = useState();
  let x = [];
  let objectValues = [];
  // const makeOptions = Object.keys(props.type).forEach(function (key) {
  //   var value = props.type[key];
  //   objectValues.push(value);
  //   //console.log("value", value);
  //   //settypeofonboarding({ name: key, value: value.value });
  //   if (value.value !== undefined && typeof value.value !== Object) {
  //     x.push(
  //       <option
  //         key={value.title + "" + value.value}
  //         title={value.title}
  //         value={value.value}
  //       >
  //         {value.title}
  //       </option>
  //     );
  //   } else {
  //   }
  // });

  // console.log("makeoptions", x);

  return (
    <div className="col-md-12">
      <div className="form-group col-md-8 d-inline-block">
        <label htmlFor="question">{props.question}</label>
        <select
          //title="Type of On-boarding"
          className="form-control"
          onChange={(e) => {
            settypeofonboarding({ name: "", value: e.target.value });
            props.setVal({ name: "", value: e.target.value });
          }}
          defaultValue={{ name: "", value: objectValues[0].value }}
        >
          {x}
        </select>
      </div>
      <div className="form-group col-md-4 d-inline-block">
        <label htmlFor="score">{props.score}</label>
        <input
          type="text"
          className="form-control"
          value={
            typeofonboarding !== undefined
              ? typeofonboarding.value
              : objectValues[0].value !== undefined
              ? objectValues[0].value
              : ""
          }
          name={typeofonboarding !== undefined ? typeofonboarding.title : ""}
        />
      </div>
    </div>
  );
}

export default Checking;
