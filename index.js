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
     * @param {number} x integer x coordinate
     * @param {number} y integer y coordinate
     * @returns {number} integer raw index of position in board.array
     */
    toRawIndex(x, y) {
        return (4 - y) * 5 + x;
    }

    /**
     * x and y integer tile positions on board from raw index
     * 
     * @param {number} index 
     * @generator
     * @yields {number} x and y integer tile positions on board
     */
    *fromRawIndex(index) {
        const x = index % 5;
        yield x;
        yield -((index - x) / 5 - 4);
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
     * does not have a robot already. Using [randomEmptyPos()]{@link Board#randomEmptyPos}
     * 
     * The inside of the Board class uses an array for the robots which is one dimensional.
     * This array has equal columns and rows. To make the visual code representation match 
     * the graphical display, the index is built by adding the y value, flipped, and 
     * multiplied by 5, adding the x value to return the accurate array index.
     *
     * @param {number} size the size of the robot to be added (1-4) inclusive
     */
    randomRobot(size) {
        this.setRobotRaw(this.randomEmptyPos(), size);
    }

    /**
     * Gives a random location on the board that does not have a robot already. This 
     * function works by going through every index of the board array and building an 
     * indices array of empty board locations with their raw index. If this indices array 
     * is empty, the internal board array is [reset()]{@link Board#reset} and the function 
     * will retry. Then, it will pull a random location in the indices array.
     * 
     * The inside of the Board class uses an array for the robots which is one dimensional.
     * This array has equal columns and rows. To make the visual code representation match 
     * the graphical display, the index is built by adding the y value, flipped, and 
     * multiplied by 5, adding the x value to return the accurate array index.
     * 
     * @returns {number} integer board index of random position without robot
     */
    randomEmptyPos() {
        const indices = [];
        // store only empty entries in indices
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] > 0) {
                continue;
            }
            indices.push(i);
        }

        // if there are no empty indices, reset and retry (recursively)
        if (indices.length < 1) {
            this.reset();
            return this.randomEmptyPos();
        }

        return indices[randomIntZero(indices.length - 1)];
    }

    /**
     * Returns generator of two values (in order) a pixel x and pixel y to represent the top 
     * left of the tile on screen at that tileX and tileY coordinates.
     *
     * @param {number} tileX integer x coordinate of tile in board
     * @param {number} tileY integer y coordinate of tile in board
     * @generator
     * @yields {number} two numbers for x and y, in order, for tile's pixel positions
     */
    *getPixelPos(tileX, tileY) {
        const wholeTile = tileWidth + tileSpacing;
        yield (tileX - 2) * wholeTile + 400 - tileWidth * 0.5;
        yield ((4 - tileY) - 2) * wholeTile + 400 - tileWidth * 0.5;
    }

    /**
     * Returns generator of two values (in order) a tile x and tile y to represent the tile
     * on screen at that pixelX and pixelY coordinates.
     *
     * @param {number} pixelX integer x pixel coordinate of board
     * @param {number} pixelY integer y pixel coordinate of board
     * @generator
     * @yields {number} two numbers for x and y, in order, for board's tile positions
     */
    *getTilePos(pixelX, pixelY) {
        const wholeTile = tileWidth + tileSpacing;
        const halfSpacing = tileSpacing * 0.5;
        yield (pixelX + tileWidth * 0.5 - 400 + halfSpacing) / wholeTile + 2;
        yield -((pixelY + tileWidth * 0.5 - 400 + halfSpacing) / wholeTile - 2) + 1;
    }
    
    /**
     * Draws the board and robots on the canvas with the context with the color 
     * of the robot at all tiles.
     */
    draw() {
        for (let x1 = 0; x1 < 5; x1++) {
            for (let y1 = 0; y1 < 5; y1++) {
                
                context.fillStyle = this.getColor(x1, y1);

                let pos = this.getPixelPos(x1, y1);
                context.fillRect(
                    pos.next().value, 
                    pos.next().value, 
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

    constructor() {
        const pos = board.randomEmptyPos();
        this.setPosition(pos);
        board.setRobotRaw(pos, randomSize());
    }

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
     * Returns true if the player is controlling a robot, false otherwise.
     *
     * @returns {boolean} if the player is controlling a robot.
     */
    hasPosition() {
        return this.position >= 0;
    }

    /**
     * Returns if the currently controlled robot can move into a new position. If no robot is
     * controlled, false, if new position is empty, true, or if the size of the robot in the
     * new position is equal to the size of the controlled robot, true. If the new position 
     * is more than 1 tile away, false.
     * 
     * @param {number} newX integer x coordinate the user's robot is trying to move into
     * @param {number} newY integer y coordinate the user's robot is trying to move into
     * @returns {boolean} if can move into new inputted position
     */
    canMove(newX, newY) {
        const newPosition = board.toRawIndex(newX, newY);
        return this.getAvailableMoves().includes(newPosition);
    }

    /**
     * Adds new position to array if the new position is valid. A new position is valid if
     * it is an index inside the board array (board.array.length > x > 0)
     * 
     * @param {number} array 
     * @param {number} newPosition 
     */
    addMoveIfPossible(array, newPosition) {
        if (newPosition < 0) return;
        if (newPosition >= board.array.length) return;

        const newRobot = board.getRobotRaw(newPosition);
        if (newRobot != 0 && 
            board.getRobotRaw(this.position) != newRobot) {
            return;
        }
        
        array.push(newPosition);
    }

    getAvailableMoves() {
        if (!this.hasPosition()) return Array();

        const robot = board.getRobotRaw(this.position);

        const availableMoves = Array();

        this.addMoveIfPossible(availableMoves, this.position - 5 - 1);
        this.addMoveIfPossible(availableMoves, this.position - 5);
        this.addMoveIfPossible(availableMoves, this.position - 5 + 1);
        this.addMoveIfPossible(availableMoves, this.position - 1);
        this.addMoveIfPossible(availableMoves, this.position + 1);
        this.addMoveIfPossible(availableMoves, this.position + 5 - 1);
        this.addMoveIfPossible(availableMoves, this.position + 5);
        this.addMoveIfPossible(availableMoves, this.position + 5 + 1);

        return availableMoves;
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
        let newSize = this.delete() + 1;
        const newPos = board.toRawIndex(newX, newY);
        if (newSize >= robotToColor.length) {
            newSize = 0;
            this.position = -1;
        }
        else {
            this.position = newPos;
        }
        board.setRobotRaw(newPos, newSize);
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
        this.position = -1;
    }

}

// constants
/**
 * The pixel width and height of every tile in drawing on the board
 */
const tileWidth = 100;
const tileSpacing = 20;
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
canvas.addEventListener('click', function(event) {
    const pos = board.getTilePos(event.offsetX, event.offsetY);
    let posX = Math.floor(pos.next().value);
    let posY = Math.floor(pos.next().value);
    
    // move current robot
    if (!interaction.canMove(posX, posY)) {
        return;
    }
    
    if (board.getRobot(posX, posY) > 0) {
        interaction.mix(posX, posY);
    }
    else {
        interaction.move(posX, posY);
    }
    
    if (interaction.position > -1) return;
    // new robot
    const newPos = board.randomEmptyPos();
    interaction.setPosition(newPos);
    board.setRobotRaw(newPos, randomSize());
});
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

function randomSize() {
    return randomInt(1, 4);
}

// cycle and draw
/**
 * The function that draws and updates the game called on every canvas cycle
 */
function cycle() {
    context.clearRect(0, 0, canvas.width, canvas.height);
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
setInterval(cycle, 0); // 1000 ms