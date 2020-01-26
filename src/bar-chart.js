import React from "react";

import {Bar, BAR_STATE} from "./bar";
import {BubbleSortButton, QuickSortButton, SlowDownButton,
    SpeedUpButton, ResetButton} from "./buttons";
import speedLevel from "./speed-levels";


export class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            speedLevel: speedLevel,
            sorting: false,
            barValues: this.generateBarValues(this.props.count)
        };
    }

    randomNumber() {
        let min = 4;
        let max = 100;
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    generateBarValues(count) {
        let values = [];
        for (var i = count; i > 0; i--) {
            values.push({
                value: this.randomNumber(),
                sortingState: BAR_STATE.default,
                pivotIndex: false,
            })
        }

        return values;
    }

    resetBarValues() {
        if (this.state.sorting === true) {
            console.log('Noope!!! Nic take!');
            return;
        }
        this.setState({
            barValues: this.generateBarValues(this.props.count)
        })
    }

    renderBars() {
        let bars = [];

        for (var i = 0; i < this.state.barValues.length; i++) {
            bars.push(
                <Bar value={this.state.barValues[i].value}
                     sortingState={this.state.barValues[i].sortingState}
                     pivotIndex={this.state.barValues[i].pivotIndex}
                     key={i} />
            )
        }
        return bars
    }

    async quickSort() {
        let array = this.state.barValues.slice();

        async function lomutoPartition(array, start, end, component) {
            // Notice, pivotIndex is not index of pivotValue.
            let pivotValue = array[end].value;
            let pivotIndex = start;

            array[end].sortingState = BAR_STATE.pivot;
            component.setState({barValues: array});
            await sleep(component.state.speedLevel.stepTimeout);

            for(let i = start; i < end; i++) {
                array[pivotIndex].pivotIndex = true;
                if (array[i].value < pivotValue) {
                    if (i > pivotIndex) {
                        array[i].sortingState = BAR_STATE.swapping;
                        component.setState({barValues: array});
                        await sleep(component.state.speedLevel.stepTimeout);

                        swap(i, pivotIndex, array);
                        array[i].pivotIndex = false;

                        component.setState({barValues: array});
                        await sleep(component.state.speedLevel.stepTimeout);

                        array[pivotIndex].sortingState = BAR_STATE.default;
                        component.setState({barValues: array});
                    } else {
                        array[i].sortingState = BAR_STATE.doNothing;
                        component.setState({barValues: array});
                        await sleep(component.state.speedLevel.stepTimeout);
                        array[i].sortingState = BAR_STATE.default;
                        array[pivotIndex].pivotIndex = false;
                        component.setState({barValues: array});
                    }

                    pivotIndex++;

                } else {
                    array[i].sortingState = BAR_STATE.doNothing;
                    component.setState({barValues: array});
                    await sleep(component.state.speedLevel.stepTimeout);
                    array[pivotIndex].pivotIndex = false;
                    array[i].sortingState = BAR_STATE.default;
                    component.setState({barValues: array});
                }
            }
            array[end].sortingState = BAR_STATE.swapping;
            await sleep(component.state.speedLevel.stepTimeout);
            component.setState({barValues: array});

            swap(pivotIndex, end, array);
            await sleep(component.state.speedLevel.stepTimeout);
            component.setState({barValues: array});

            array[pivotIndex].sortingState = BAR_STATE.sorted;
            await sleep(component.state.speedLevel.stepTimeout);
            component.setState({barValues: array});

            return pivotIndex;
        }

        async function quickSort(array, start, end, component) {
            if (start === end) {
                array[start].sortingState = BAR_STATE.sorted;
                await sleep(component.state.speedLevel.stepTimeout);
                component.setState({barValues: array});
                return;
            } else if (start > end) {
                return
            }
            let index = await lomutoPartition(array, start, end, component);

            // await Promise.all([
            //   quickSort(array, start, index - 1, component),
            //   quickSort(array, index + 1, end, component)
            // ]);
            await quickSort(array, start, index - 1, component);
            await quickSort(array, index + 1, end, component);
        }

        await quickSort(array, 0, array.length - 1, this);
        this.setState({barValues: array});
    }

    async bubbleSort() {
        let array = this.state.barValues.slice();

        let counter;

        for (var j = array.length - 1; j >= 0;) {
            counter = 0;

            for (var i = 0; i < j; i++) {

                if (array[i].value > array[i+1].value) {
                    array[i].sortingState = array[i+1].sortingState = BAR_STATE.swapping;
                    this.setState({barValues: array});
                    await sleep(this.state.speedLevel.stepTimeout);

                    swap(i, i+1, array);
                    this.setState({barValues: array});
                    await sleep(this.state.speedLevel.stepTimeout);

                    counter = 0;

                } else {
                    array[i].sortingState = array[i+1].sortingState = BAR_STATE.doNothing;
                    this.setState({barValues: array});
                    await sleep(this.state.speedLevel.stepTimeout);

                    counter++;
                }

                array[i].sortingState = array[i+1].sortingState = BAR_STATE.default;
                this.setState({barValues: array});
            }

            let checkpoint = j - counter;

            for (j; j >= checkpoint; j--) {
                array[j].sortingState = BAR_STATE.sorted;
            }
            this.setState({barValues: array});
        }

        this.setState({sorting: false});
    }

    async speedUp() {
        let currentSpeedLevel = this.state.speedLevel;
        await this.setState({speedLevel: currentSpeedLevel.faster});
        console.log("Step timeout set to " + currentSpeedLevel.faster.stepTimeout + " ms")
    }

    async slowDown() {
        let currentSpeedLevel = this.state.speedLevel;
        await this.setState({speedLevel: currentSpeedLevel.slower});
        console.log("Step timeout set to " + currentSpeedLevel.slower.stepTimeout + " ms")
    }

    render() {
        return (
            [
                <div className="sorting-buttons">
                    <BubbleSortButton onClick={() => this.bubbleSort()}/>
                    <QuickSortButton onClick={() => this.quickSort()}/>
                </div>,

                <div className="barchart">
                    <div className="barchart-card">
                        <div className="bars">
                            {this.renderBars()}
                        </div>

                        <div className="control-buttons">
                            <ResetButton onClick={() => this.resetBarValues()}/>
                            <div>
                                <SpeedUpButton onClick={() => this.speedUp()}/>
                                <SlowDownButton onClick={() => this.slowDown()}/>
                            </div>
                        </div>

                    </div>
                </div>
            ]
        );
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(index1, index2, array) {
    let item1 = array[index1];
    array[index1] = array[index2];
    array[index2] = item1;
}
