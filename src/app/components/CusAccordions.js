import React, { Component } from "react";

class CusAccordions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.accordianOpen === true,
    };
  }
  setExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  handle = (id, value) => {
    console.log(id, value);
    this.props.setData({ id: id, value: value });
  };
  render() {
    return (
      <article className="question">
        <header>
          <h4 onClick={() => this.setExpanded()} className="question-title">
            {this.props.title}
          </h4>
          <button className="cusbtn" onClick={() => this.setExpanded()}>
            {this.state.expanded ? (
              <i
                className="mdi mdi-chevron-up"
                style={{ fontSize: "24px", color: "#27ae60" }}
              />
            ) : (
              <i
                className="mdi mdi-chevron-down"
                style={{ fontSize: "24px", color: "#27ae60" }}
              />
            )}
          </button>
        </header>
        {/* {this.state.expanded && <p>{this.props.info}</p>} */}
        {this.state.expanded
          ? this.props.component !== undefined
            ? React.createElement(this.props.component, {
                handle: this.handle,
                fromaccordian: true,
                titleToShow: false,
                passprops: this.props.passPropData,
                from:
                  this.props.from !== undefined && this.props.from !== null
                    ? this.props.from
                    : null,
              })
            : "No data Found"
          : ""}
      </article>
    );
  }
}

export default CusAccordions;
