import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import "./styles.css";

export default function CustomMultiSelect(props) {
  //console.log(props.feature);

  const [selected, setSelected] = useState(
    props.feature !== undefined && props.feature !== null ? props.feature : [1]
  );

  useEffect(() => {
    console.log("Selcted", selected);
    props.parentCall(selected);
    console.log("Selected 2", selected);
  }, [selected]);
  return (
    <div>
      {/* <h1></h1>
      <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={props.options}
        selected={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
  );
}
