// classes

/**
 * Used for the placement of robots on the client's side, responsible for drawing
 * getting, and editing the robots on the board.
 * 
 * The inside of the Board class uses an array for the robots which is one dimensional.
 * This array has equal columns and rows. To make the visual code representation match 
 * the graphical display, the index is built by adding the y value, flipped, and 
 * multiplied by 5, adding the x value to return the accurate array index.
 *
 * @class Board
 * @typedef {Board}
 */
class Board {

    constructor() {
        this.array = [
            0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0];
    }
    
    /**
     * Converts the integer x and y coordinates to the single raw integer index to that same
     * position in the one-dimensional array.
     * 
     * The inside of the Board class uses an array for the robots which is one dimensional.
     * This array has equal columns and rows. To make the visual code representation match 
     * the graphical display, the index is built by adding the y value, flipped, and 
     * multiplied by 5, adding the x value to return the accurate array index.
     *
     * @param {*} x integer x coordinate
     * @param {*} y integer y coordinate
     * @returns {*} integer raw index of position in board.array
     */
    toRawIndex(x, y) {
        return (4 - y) * 5 + x;
    }

    /**
     * Removes all robots off the board -- setting every value in this array to '0', 
     * indicating a robot with 0 size (treated as if no robot at all)
     */
    reset() {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = 0;
        }
    }

    /**
     * Returns the robot size at the inputted raw index coordinates.
     * 
     * The inside of the Board class uses an array for the robots which is one dimensional.
     * This array has equal columns and rows. To make the visual code representation match 
     * the graphical display, the index is built by adding the y value, flipped, and 
     * multiplied by 5, adding the x value to return the accurate array index.
     *
     * @param {number} index integer value of raw index coordinate in board.array
     * @returns {number} the size of the robot at the raw index coordinate
     */
    getRobotRaw(index) {
        return this.array[index];
    }

    /**
     * Sets the robot size at that raw index position.
     * 
     * The inside of the Board class uses an array for the robots which is one dimensional.
     * This array has equal columns and rows. To make the visual code representation match 
     * the graphical display, the index is built by adding the y value, flipped, and 
     * multiplied by 5, adding the x value to return the accurate array index.
     *
     * @param {*} index integer raw index coordinate in board.array
     * @param {*} size integer new size of robot at that position
     */
    setRobotRaw(index, size) {
        this.array[index] = size;
    }

    /**
     * Returns the robot size at the inputted (x, y) coordinates.
     * 
     * The inside of the Board class uses an array for the robots which is one dimensional.
     * This array has equal columns and rows. To make the visual code representation match 
     * the graphical display, the index is built by adding the y value, flipped, and 
     * multiplied by 5, adding the x value to return the accurate array index.
     *
     * @param {number} x integer value of x coordinate
     * @param {number} y integer value of y coordinate
     * @returns {number} the size of the robot at the (x, y) coordinates
     */
    getRobot(x, y) {
        return this.getRobotRaw(this.toRawIndex(x, y));
    }

    /**
     * Sets the robot size at that x and y position.
     *
     * @param {*} x integer x coordinate
     * @param {*} y integer y coordinate
     * @param {*} size integer new size of robot at that position
     */
    setRobot(x, y, size) {
        this.setRobotRaw(this.toRawIndex(x, y), size);
    }

    /**
     * Returns the robot color at the inputted (x, y) coordinates. 
     * 
     * The inside of the Board class uses an array for the robots which is one dimensional.
     * This array has equal columns and rows. To make the visual code representation match 
     * the graphical display, the index is built by adding the y value, flipped, and 
     * multiplied by 5, adding the x value to return the accurate array index.
     *
     * @param {number} x integer value of x coordinate
     * @param {number} y integer value of y coordinate
     * @returns {string} the color of the robot at the (x, y) coordinates for graphical 
     *                   display
     */
    getColor(x, y) {
        return robotToColor[this.getRobot(x, y)];
    }

    /**
     * Adds the robot of the inputted size to a random location on the board that 
     * does not have a robot already. This function works by going through every index of the
     * board array and building an indices array of empty board locations with their raw 
     * index. If this indices array is empty, the internal board array is 
     * [reset()]{@link Board#reset}. Otherwise, this robot is added to a random location in
     * the indices array.
     * 
     * The inside of the Board class uses an array for the robots which is one dimensional.
     * This array has equal columns and rows. To make the visual code representation match 
     * the graphical display, the index is built by adding the y value, flipped, and 
     * multiplied by 5, adding the x value to return the accurate array index.
     *
     * @param {number} size the size of the robot to be added (1-4) inclusive
     */
    randomRobot(size) {
        const indices = [];
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] > 0) {
                continue;
            }
            indices.push(i);
        }
        if (indices.length < 1) {
            this.reset();
            return;
        }

        const index = randomIntZero(indices.length);

        this.setRobotRaw(indices[index], size);
    }
    
    /**
     * Draws the board and robots on the canvas with the context with the color 
     * of the robot at all tiles.
     */
    draw() {
        for (let x1 = 0; x1 < 5; x1++) {
            for (let y1 = 0; y1 < 5; y1++) {
                
                context.fillStyle = this.getColor(x1, y1);

                context.fillRect(
                    (x1 - 2) * 120 + 400 - tileWidth * 0.5, 
                    ((4 - y1) - 2) * 120 + 400 - tileWidth * 0.5, 
                    tileWidth, tileWidth);
            }
        }
    }

}

/**
 * The interaction handler for the player's input, handles the player's control over 
 * different robots and controls "mixing" multiple robots, where robots of equal sizes can be
 * combined into one robot on one tile with a size of one more.
 *
 * @class Interaction
 * @typedef {Interaction}
 */
class Interaction {

    /**
     * Sets the position, or the raw index of the location of the robot the player is
     * currently controlling and can move/mix.
     * 
     * @param {number} index 
     */
    setPosition(index) {
        this.position = index;
    }

    /**
     * Returns if the currently controlled robot can move into a new position. If no robot is
     * controlled, false, if new position is empty, true, or if the size of the robot in the
     * new position is equal to the size of the controlled robot, true.
     * 
     * @param {number} newX integer x coordinate the user's robot is trying to move into
     * @param {number} newY integer y coordinate the user's robot is trying to move into
     * @returns {boolean} if can move into new inputted position
     */
    canMove(newX, newY) {
        if (this.position < 0) return false;

        const newRobot = board.getRobot(newX, newY);
        return newRobot == 0 || 
            board.getRobotRaw(this.position) == newRobot;
    }

    /**
     * "Removes" the robot at the position, setting its size to 0 and removing this object's
     * position.
     * 
     * @returns {number} size of robot before it was deleted
     */
    delete() {
        const oldSize = board.getRobotRaw(this.position);
        board.setRobotRaw(this.position, 0);
        this.position = -1;
        return oldSize;
    }

    /**
     * "Mixes" the robot with the robot at the new position, deleting the controlled robot
     * and increasing the size of the robot at the new position by one. Uses 
     * {@link Interaction#delete()} to clear the old controlled robot.
     * 
     * @param {number} newX integer x coordinate the user's robot is trying to move into
     * @param {number} newY integer y coordinate the user's robot is trying to move into
     */
    mix(newX, newY) {
        board.setRobot(newX, newY, this.delete() + 1);
    }

    /**
     * Moves the controlled robot to the (ideally) empty inputted position, without changing
     * size. This is done by setting the size at the new position to the size of the 
     * controlled robot and setting the controlled robot's size to 0. Uses 
     * {@link Interaction#delete()} to clear the old controlled robot.
     * 
     * @param {number} newX integer x coordinate the user's robot is trying to move into
     * @param {number} newY integer y coordinate the user's robot is trying to move into
     */
    move(newX, newY) {
        board.setRobot(newX, newY, this.delete());
    }

}

// constants
/**
 * The pixel width and height of every tile in drawing on the board
 *
 * @type {number}
 */
const tileWidth = 100;
/**
 * The intentionally unchanged array that takes the robot's size to its color
 *
 * @type {Array<string>}
 */
const robotToColor = ["black", "red", "green", "blue", "purple"];
/**
 * The canvas element
 *
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("gameCanvas");
/**
 * The 2d rendering context used for drawing the raw shapes and displays on
 * screen throughout the script 
 *
 * @type {CanvasRenderingContext2D}
 */
const context = canvas.getContext("2d");

/**
 * The board instance used throughout the game
 *
 * @type {Board}
 */
const board = new Board();
/**
 * The interaction instance used throughout listening and handling the user's actions
 *
 * @type {Interaction}
 */
const interaction = new Interaction();

// util
/**
 * Math utility class that returns a random integer number between the given
 * start and end inclusive.
 *
 * @param {number} start integer number less than or equal to end
 * @param {number} end integer number greator or equal to start
 * @returns {number} random integer number between start and end inclusive
 */
function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

/**
 * Math utility class that returns a random integer number between the 0 and end
 * inclusive.
 *
 * @param {number} end integer number greator or equal to 0
 * @returns {number} random integer number between 0 and end inclusive
 */
function randomIntZero(end) {
    return randomInt(0, end);
}

// cycle and draw
/**
 * The function that draws and updates the game called on every canvas cycle
 */
function cycle() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.randomRobot(randomInt(1, 4));
    draw();
}

/**
 * Draws on the canvas
 */
function draw() {
    board.draw();
}

// init
draw();
setInterval(cycle, 1000); // 1000 ms