import React from "react";

export class SpeedUpButton extends React.Component {
    render() {
        return (
            <button className="button button-small" onClick={() => {this.props.onClick()}}>
                Speed Up
            </button>
        )
    }
}

export class SlowDownButton extends React.Component {
    render() {
        return (
            <button className="button button-small" onClick={() => {this.props.onClick()}}>
                Slow Down
            </button>
        )
    }
}

export class ResetButton extends React.Component {
    render() {
        return (
            <button className="button button-small" onClick={() => {this.props.onClick()}}>
                Reset Values
            </button>
        )
    }
}

export class QuickSortButton extends React.Component {
    render() {
        return (
            <button className="button" onClick={() => {this.props.onClick()}}>
                Quick Sort
            </button>
        )
    }
}

export class BubbleSortButton extends React.Component {
    render() {
        return (
            <button className="button" onClick={() => {this.props.onClick()}}>
                Bubble Sort
            </button>
        )
    }
}
