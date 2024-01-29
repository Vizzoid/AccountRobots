
// constants
/**
 * Description The pixel width and height of every tile in drawing on the board
 *
 * @type {number}
 */
const tileWidth = 100;
/**
 * Description The intentionally unchanged array that takes the robot's size to its color
 *
 * @type {Array<string>}
 */
const robotToColor = ["black", "red", "green", "blue", "purple"];
/**
 * Description The canvas element
 *
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("gameCanvas");
/**
 * Description The 2d rendering context used for drawing the raw shapes and displays on
 * screen throughout the script 
 *
 * @type {CanvasRenderingContext2D}
 */
const context = canvas.getContext("2d");


/**
 * Description Used for the placement of robots on the client's side, responsible for drawing
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
     * Removes all robots off the board -- setting every value in this array to '0', 
     * indicating a robot with 0 size (treated as if no robot at all)
     */
    reset() {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = 0;
        }
    }

    /**
     * Description returns the robot size at the inputted (x, y) coordinates.
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
        return this.array[(4 - y) * 5 + x];
    }

    /**
     * Description returns the robot color at the inputted (x, y) coordinates. 
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
     * Description adds the robot of the inputted size to a random location on the board that 
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

        this.array[indices[index]] = size;
    }
    
    /**
     * Description draws the board and robots on the canvas with the context with the color 
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
 * Description the board instance used throughout the game
 *
 * @type {Board}
 */
const board = new Board();

// util
/**
 * Description math utility class that returns a random integer number between the given
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
 * Description math utility class that returns a random integer number between the 0 and end
 * inclusive.
 *
 * @param {number} end integer number greator or equal to 0
 * @returns {number} random integer number between 0 and end inclusive
 */
function randomIntZero(end) {
    return randomInt(0, end);
}

/**
 * Description the function that draws and updates the game called on every canvas cycle
 */
function cycle() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.randomRobot(randomInt(1, 4));
    draw();
}

/**
 * Description draws on the canvas
 */
function draw() {
    board.draw();
}

// init
draw();
setInterval(cycle, 1000); // 1000 ms