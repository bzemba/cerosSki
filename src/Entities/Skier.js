import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
	speed = Constants.SKIER_STARTING_SPEED;
	state = Constants.SKIER_STATES.ALIVE;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

	setState(state){
		this.state = state;
	}

	getState(){
		return this.state;
	}

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    move() {
        switch(this.direction) {
			/*
				 Added case for moving left, without skier would not be able to move left off an obstacle, 
				 this also makes skier move left when not on an obstacle instead of stopping
			*/
			case Constants.SKIER_DIRECTIONS.LEFT:
                this.moveSkierLeft();
                break;
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
			/*
				 Added case for moving right, without skier would not be able to move right off an obstacle, 
				 this also makes skier move right when not on an obstacle instead of stopping
			*/
			case Constants.SKIER_DIRECTIONS.RIGHT:
				this.moveSkierRight();
				break;
			case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
				this.moveSkierRightDown();
				break;
			default:
				break;
        }
    }

    moveSkierLeft() {
		// Updated to use new SKIER_HORIZONTAL_SPEED constant
        this.x -= Constants.SKIER_HORIZONTAL_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
		this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
		// Updated to use new SKIER_HORIZONTAL_SPEED constant
        this.x += Constants.SKIER_HORIZONTAL_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
		else{
			// if we are not crashed we can increment the direction to turn left more, retaining this decrementer approach would allow us to have more than 2 assets 
			// and speeds for down hill left descent at different angles.
			this.direction != 0 && this.setDirection(this.direction - 1);
			// if we are crashed we want to move to full left horizontally to get out of obstacle, resolves bug mentioned in README
			this.direction == 0 && this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
			//this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
			// if we are not crashed we can increment the direction to turn right more, retaining this decrementer approach would allow us to have more than 2 assets 
			// and speeds for down hill right descent at different angles.
			this.direction != 0 && this.setDirection(this.direction + 1);
			// if we are crashed we want to move to full right horizontally to get out of obstacle, resolves bug mentioned in README that also exists for right turn at crashed state
			this.direction == 0 && this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
	}
	
	async jump(){
		if(this.direction === Constants.SKIER_DIRECTIONS.DOWN || this.direction === Constants.SKIER_DIRECTIONS.LEFT_DOWN || this.direction === Constants.SKIER_DIRECTIONS.RIGHT_DOWN){
			const jumpAssets = Object.keys(Constants.SKIER_JUMP_ASSET);
			for(let i = 0; i < jumpAssets.length; i++){
				await this.animateAsset(Constants.SKIER_JUMP_ASSET[jumpAssets[i]])
			}
			await this.animateAsset(Constants.SKIER_DIRECTION_ASSET[this.direction]);
		}
	}

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
		const asset = assetManager.getAsset(this.assetName);
		const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );
            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if(collision) {
			let skier = this;
			// This would be easier to verify if the skier is jumping if the jump assets where in an array with the strings as values
			let skierJumping = Object.keys(Constants.SKIER_JUMP_ASSET).some( (key) => {
				return (Constants.SKIER_JUMP_ASSET[key] == skier.assetName) ? true : false;
			});
			let collisionWithRock = Constants.ROCK_ASSETS.includes(collision.assetName);
			if(collision.assetName === Constants.JUMP_RAMP){
				this.jump()
			}else if(!(skierJumping && collisionWithRock)){
				this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
			}

			// Could possibly simply do the checks for collisions with rocks like this but it assumes all assetes for jumps and rocks start with the same convention
			// which is not a really good assumption to make
			/* if(collision.assetName === Constants.JUMP_RAMP){
				this.jump()
			}else if(!(this.assetName.startsWith('skierJump') && collision.assetName.startsWith('rock'))){
				this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
			} */
		}
		
    };
}