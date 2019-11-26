import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { Rhino } from "../Entities/Rhino";

export class Game {
	gameWindow = null;
	gameOver = false; // new boolean property to determine if game is over or not

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
		this.skier = new Skier(0, 0);
		this.rhinos = []; // new game property to hold a collection of rhinos
        this.obstacleManager = new ObstacleManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
		this.obstacleManager.placeInitialObstacles();
	}
	
    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
		if(this.gameOver) // check to see if game is over, if so return to end animation
			return;
		
		this.checkIfReadyToUnleashRhino(); // new method to determine if we can unleash a rhino, or 2, or 3....
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();
		

        requestAnimationFrame(this.run.bind(this));
	}

    updateGameWindow() {
		// if skier is still alive we can let him continue to ski on
		if(this.skier.getState() === Constants.SKIER_STATES.ALIVE)
			this.skier.move();
		// if skier is anything but alive we will let the rhinos continue to hunt him
		if(this.skier.getState() <= Constants.SKIER_STATES.ALIVE){
			this.rhinos.forEach( (val) => {
				val.huntTarget(this.skier,this.assetManager);
			});
		}
		
		const previousGameWindow = this.gameWindow;
		this.calculateGameWindow();
		
		// Added null check for previousGameWindow to resolve bug when reloading the page
		if(previousGameWindow != null){
			this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
		}

		this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
		// if the skier is still alive we should draw him, otherwise he is dead and he is depicted in the rhino assets
		if(this.skier.getState() === Constants.SKIER_STATES.ALIVE)
			this.skier.draw(this.canvas, this.assetManager);

		// If we have any rhinos we should draw them
		this.rhinos.forEach( (val) => {
			val.draw(this.canvas,this.assetManager);
		});
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
				this.skier.turnDown();
                event.preventDefault();
				break;
			case Constants.KEYS.SPACE: // Added case for jump functionality, triggered from pressing space
				this.skier.jump();
				event.preventDefault();
				break;
			case Constants.KEYS.ENTER: // If the game is over, user can press enter to reset the game
				if(this.gameOver)
					this.resetGame();
				event.preventDefault();
				break;
        }
	}
	
	// Resets the game once the skier has been eaten
	resetGame(){
		this.skier = new Skier(0,0);
		this.gameOver = false;
		this.rhinos = [];
		this.run();
	}

	checkIfReadyToUnleashRhino(){
		// every time the skier travles the base configured distance times the configured multiplier a new rhino will be unleashed
		let nextRhinoThreshold = (Constants.SKIER_DISTANCE_TO_UNLEASH_RHINO * Constants.NEXT_RHINO_DISTANCE_MULTIPLIER) * (this.rhinos.length + 1);
		// Skier has traveled the minumum distance to unleash a rhino from the right, if a timer is desired for unleashing a rhino this would
		// be the place to do  it by adding an or clause he and a constant for the elapsed time to unleash a rhino
		if(this.skier.y > Constants.SKIER_DISTANCE_TO_UNLEASH_RHINO && this.rhinos.length < 1){
			this.unleashRhino(this.skier.getPosition().x + (this.canvas.width / 2),0);
		/* Skier has traveled the multiplier distance from when we unleashed the first rhino, time to start sending in more
		rhinos from alternate sides. The skier will no longer be able to escape the inevitable fate of being eaten! Unfortunately for the rhinos
		that show up late they will never get a chance to eat him, only the first rhino from the left or right ever will */
		}else if(this.skier.y > nextRhinoThreshold && this.rhinos.length < Constants.RHINO_COUNT){
			// determine if the last rhino was traveling left or right and do the opposite
			if (this.rhinos[this.rhinos.length-1].getTravelDirection() == 'left'){
				this.unleashRhino(this.skier.getPosition().x - (this.canvas.width / 2),0);
			}else{
				this.unleashRhino(this.skier.getPosition().x + (this.canvas.width / 2),0);
			}
		}
	}

	/* unleashRhino(x,y) 
		* x, y positions of initial placement of rhino
		* creates a new rhino entity and attaches event handlers to the game for each new rhino for when the target is caught and killed
		* Number of rhinos configured with Constants.RHINO_COUNT
	*/
	unleashRhino(x,y){
		if(this.rhinos.length <= Constants.RHINO_COUNT){
			let game = this;
			let rhino = new Rhino(x, y, this.skier);
			this.rhinos.push(rhino);
			rhino.eventTarget.addEventListener("targetCaught", (e) =>{
				game.skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
				game.skier.setState(Constants.SKIER_STATES.CAUGHT);
			});
			rhino.eventTarget.addEventListener("targetKilled", (e) => {
				game.skier.setState(Constants.SKIER_STATES.DEAD);
				game.gameOver = true;
				alert("You can never escape! Press enter to restart.");
			});
			return rhino;
		}
	}
}
