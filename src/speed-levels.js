/**
 * Object representing speed level defined by step timeout in milliseconds. It is doubly-linked list node because it
 * knows one level slower and faster node.
 */
class SpeedLevel {

    constructor(stepTimeoutMs) {
        this.stepTimeout = stepTimeoutMs;
        this.faster = this;
        this.slower = this;
    }

    setFaster(fasterSpeedLevel) {
        this.faster = fasterSpeedLevel;
    }

    setSlower(slowerSpeedLevel) {
        this.slower = slowerSpeedLevel;
    }
}

/**
 * Creates `SpeedLevel` objects based on timeouts array input and joins them like doubly-linked list. But head and tail
 * does not refer to `null`s but to themselves. It also provide default node reference.
 */
class SpeedLevels {
    constructor(stepTimeouts, indexOfDefault) {
        this.createSpeedLevelsArray(stepTimeouts);
        this.joinSpeedLevels();
        this.default = this.speedLevels[indexOfDefault];
    }

    /**
     * Creates array of `SpeedLevel`s based on step timeouts.
     * @param stepTimeouts
     */
    createSpeedLevelsArray(stepTimeouts) {
        this.speedLevels = new Array(stepTimeouts.length);
        for (let i=0; i<stepTimeouts.length; i++) {
            this.speedLevels[i] = new SpeedLevel(stepTimeouts[i]);
        }
    }

    /**
     * Joins `SpeedLevel`s with their slower and faster node.
     */
    joinSpeedLevels() {
        for (let i=0; i<this.speedLevels.length; i++) {
            if (i > 0) {
                this.speedLevels[i].setSlower(this.speedLevels[i-1])
            }
            if (i < this.speedLevels.length-1) {
                this.speedLevels[i].setFaster(this.speedLevels[i+1])
            }
        }
    }
}

const stepTimeouts = [2000, 1000, 500, 200, 100, 50, 0];
const speedLevels = new SpeedLevels(stepTimeouts, 2);

// Exporting initial speed level
export default speedLevels.default;