import React, { useState } from "react";

const CusAccordion = ({ component: Component, title, info }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="question">
      <header>
        <h4 onClick={() => setExpanded(!expanded)} className="question-title">
          {title}
        </h4>
        <button className="cusbtn" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <i className="mdi mdi-minus" />
          ) : (
            <i className="mdi mdi-plus"></i>
          )}
        </button>
      </header>
      {expanded && <Component />}
    </article>
  );
};

export default CusAccordion;
