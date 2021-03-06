import React from 'react';


export const BAR_STATE = {
  default: "bar",
  swapping: "swapping",
  doNothing: "do-nothing",
  sorted: "sorted",
  pivot: "pivot",
};



export class Bar extends React.Component {

  render() {
    const styles = {
      height: this.props.value + "%",
    };

    return (
      <div className={this.getClasses()} style={styles}>
        {this.props.value}
      </div>
    );
  }

  getClasses() {
    let classes = BAR_STATE.default;

    if (this.props.sortingState !== BAR_STATE.default) {
      classes += " ";
      classes += this.props.sortingState;
    }

    if (this.props.pivotIndex === true) {
      classes += " ";
      classes += 'pivot-index';
    }

    return classes;
  }
}
