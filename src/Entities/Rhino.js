import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";


export class Rhino extends Entity {
	assetName = Constants.RHINO_RUN_LEFT;
	eventTarget = null;
	stepCounter = 0;
	collisionWithTarget = false;
	prevX = null;

	constructor(x,y){
		super(x,y);
		this.eventTarget = new EventTarget();
		this.prevX = x;
	}

	/* 
		huntTarget( Entity, AssetManager ):
			* target entity object to hunt
			* assetManager for retrival of assets and determining sizes for collisions
			* moves the rhino closer to the target at the constant rhino speed
			* checks for a collision with skier to detrmine if its time to eat the skier or not
	*/
	huntTarget(target,assetManager){
		this.moveCloserToTarget(target);
		// check boolean collisionWithTarget so that once we have had a collision we dont continue to check for collision
		if(!this.collisionWithTarget && this.checkForCollisionWithTarget(target,assetManager)){
			/* Since we passed in the skier we are hunting we can update the state of the skier right here in this class, however
				that would not be the best approach bacuse the rhino should not contain any logic as to what happens to the entity
				that he caught. The rhino should only be responsible for notifying his creator that he did what he was tasked to do which 
				was to hunt and kill the entity(in this case a skier). This approach allows the rhino to be more flexible and hunt other entities,
				this would of course require more eating assets for the type of entity he is hunting
			*/
				// skier.setState(Constants.SKIER_STATES.CAUGHT);
				// skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
			// If we chose to do things event based we can trigger an event that we caught the entity
			// and let another object such as the game manage what happens when the entity is caught
			let event = new CustomEvent("targetCaught", { detail : this});
			this.eventTarget.dispatchEvent(event);
			// now that we have caught the skier its time to eat him
			this.killTarget();
		}
	}

	/* 
		moveCloserToTarget(Entity)
			* Toggles rhino running assets when the stepcounter reaches the constant RHINO_STEP_SPEED
			* Moves the rhino closer to the target regardless if the target is to the left or the right of the current position of the rhino
			the rhino will adapt and change direction if needed.
			* Moves rhino at Constants.RHINO_CHASE_SPEED
	*/
	moveCloserToTarget(target){
		const targetPosition = target.getPosition();
		
		this.y = targetPosition.y;
		/* 
		 instead of the above code that sets y to the target position could do some 
		 implementation as such so that the rhino only gains on the target when the target 
		 is crashed, would make the game more fun so that the rhino only closes in on you 
		 while you are crashed. If i had more time I would write some logic for this.
		if(target.assetName == Constants.SKIER_CRASH){
			this.y++;
		}else{
			this.y = targetPosition.y - 150;
		} */

		// wanted to use modulus here to swap assets for rhino but canvas x y cordinates like to go into decimals and his movement becomes inconsitent
		// in replace of that a simple stepCounter is used that alternates the asset for the rhino after this method has been called Constants.RHINO_STEP_SPEED number of times
		/* if(this.y.toFixed(0) % 7 == 0){
			this.assetName = this.assetName == Constants.RHINO_RUN_LEFT ? Constants.RHINO_RUN_LEFT2 : Constants.RHINO_RUN_LEFT;
		} */
		if(this.stepCounter > Constants.RHINO_STEP_SPEED){
			this.assetName = this.assetName == Constants.RHINO_RUN_LEFT ? Constants.RHINO_RUN_LEFT2 : Constants.RHINO_RUN_LEFT;
			this.stepCounter = 0;
		}
		this.stepCounter++;
		this.prevX = this.x;
		if(this.x < targetPosition.x){
			this.x += Constants.RHINO_CHASE_SPEED;
		}else{
			this.x -= Constants.RHINO_CHASE_SPEED;
		}
	}

	
	/* 
		checkForCollisionWithTarget( Entity, AssetManager ):
			* target entity object to hunt
			* assetManager for retrival of assets and determining sizes for collisions
			* this is similar to the method on the skier checkIfSkierHitObstacle and we could potentially write two new methods 
			and put them in the entity class so that all entities have the ability to check for collisions. One method would check for a collision
			with a single target(entity) and the other would take in a collection of entities to check for a collision which would just call the
			single target collision method ultimately. Then the entity class would be able to determine collisions with other obstacles and return 
			the collision entity if there was a collision. If that was setup that way then the skier and rhino would only have the logic for what happens 
			when a collision occurs and not the code for checking if there was a collssion.
	*/
	checkForCollisionWithTarget(target,assetManager){
		const asset = assetManager.getAsset(this.assetName);
		const rhinoBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
		);
		const targetAsset = assetManager.getAsset(target.getAssetName());
		const targetPosition = target.getPosition();
		const targetBounds = new Rect(
			targetPosition.x - targetAsset.width / 2,
			targetPosition.y - targetAsset.height / 2,
			targetPosition.x + targetAsset.width / 2,
			targetPosition.y
		);
		this.collisionWithTarget = intersectTwoRects(rhinoBounds, targetBounds);
		return this.collisionWithTarget;
	}

	/*  
		killTarget()
			* method to animate rhino with kill sequence of assets
			* triggers killTarget event with this attached to event in case you need to know anything about the rhino that killed the target
				for example I set this up to handle multiple rhinos, maybe you want to know the name of the rhino that killed your skier
	 */
	async killTarget(){
		const eatAssets = Object.keys(Constants.RHINO_EAT_ASSET);
		for(let i = 0; i < eatAssets.length; i++){
			await this.animateAsset(Constants.RHINO_EAT_ASSET[eatAssets[i]])
		}
		// trigger event allowing anyone who created a Rhino observe when he kills the target
		let event = new CustomEvent("targetKilled", { detail : this});
		this.eventTarget.dispatchEvent(event);
	}

	/* 
		getTravelDirection()
			* method to determine what direction the rhino is traveling
	*/
	getTravelDirection(){
		return (this.prevX > this.x) ? 'left' : 'right';
		
	}
}