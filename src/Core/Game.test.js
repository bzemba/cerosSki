import "babel-polyfill";
import "jest-canvas-mock";
import { Game } from "./Game";
import * as Constants from "../Constants";

test('true equals true', () => {
    expect(true).toBe(true);
});

describe('Game tests', () => {
	var skiGame;

	/* 
		testSkierCollision
			skier direction added so that you can test collision with obstacles while skier is being animated since the direction
			of the skier does not always determine the asset being used for the skier
	*/
	function testSkierCollision(skierDirection, skierBeforeCollision, collisionObstacle, skierAfterCollision) {
		skiGame.skier.assetName = skierBeforeCollision;
		skiGame.skier.direction = skierDirection;
		skiGame.obstacleManager.obstacles[0].assetName = collisionObstacle;
		skiGame.skier.checkIfSkierHitObstacle(skiGame.obstacleManager, skiGame.assetManager);
		expect(skiGame.skier.assetName).toBe(skierAfterCollision);
	}

	beforeAll(() => {
		// Override onload functionality for images so that promises to load assets resolve in jest
		Object.defineProperty(Image.prototype, 'onload', {
            set: function (fn) {
                fn();
            }
		});
		skiGame = new Game();
		skiGame.load();
		skiGame.obstacleManager.placeRandomObstacle(0,0,0,0);
	});
	
	/*
	 The following tests that cover skier collisions with obstacles given a skier direction and the expected result asset for the skier
	 if I had more time it would be appropriate to store this data in a proper data strcuture an iterate through calling these tests
	 rather than coding out individaul calls to the testSkierCollision function. This data structure would probably just be a collection 
	 of objects that looked like the following. Once defined then we could just iterate through the array calling testSkierCollision for each
	 skierCollisions = [
		 {
			 skierDirection : Constants.SKIER_DIRECTIONS.DOWN,
			 skierBeforeCollision : Constants.SKIER_JUMP_5,
			 collisionAsset : Constants.TREE,
			 skierAfterCollision : Constants.SKIER_CRASH
		 }
	 ];

	 */
	test('Skier down collision with rocks', () => {
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_DOWN, Constants.ROCK1, Constants.SKIER_CRASH);
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_DOWN, Constants.ROCK2, Constants.SKIER_CRASH);
	});
	test('Skier jump collision with rocks', () => {
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_1, Constants.ROCK1, Constants.SKIER_JUMP_1);
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_2, Constants.ROCK1, Constants.SKIER_JUMP_2);
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_3, Constants.ROCK1, Constants.SKIER_JUMP_3);
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_4, Constants.ROCK1, Constants.SKIER_JUMP_4);
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_5, Constants.ROCK1, Constants.SKIER_JUMP_5);
		
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_1, Constants.ROCK2, Constants.SKIER_JUMP_1);
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_2, Constants.ROCK2, Constants.SKIER_JUMP_2);
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_3, Constants.ROCK2, Constants.SKIER_JUMP_3);
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_4, Constants.ROCK2, Constants.SKIER_JUMP_4);
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_5, Constants.ROCK2, Constants.SKIER_JUMP_5);

	});
	
	test('Skier down collision with ramp', () => {
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN, Constants.SKIER_DOWN, Constants.JUMP_RAMP, Constants.SKIER_JUMP_1);
	});
	
	test('Skier down collision with tree while jumping', () => {
		testSkierCollision(Constants.SKIER_DIRECTIONS.DOWN,Constants.SKIER_JUMP_1, Constants.TREE, Constants.SKIER_CRASH);
	});

	test('Rhino hunt skier', async () => {
		jest.useFakeTimers();
		window.alert = () => {};  // provide an empty implementation for window.alert
		const rhino = skiGame.unleashRhino(20,0);
		while(skiGame.skier.getState() == Constants.SKIER_STATES.ALIVE){
			rhino.huntTarget(skiGame.skier,skiGame.assetManager);
		}
		expect(skiGame.skier.getState()).toBe(Constants.SKIER_STATES.CAUGHT);
		while(skiGame.skier.getState() == Constants.SKIER_STATES.CAUGHT){
			await jest.runAllTimers();
		}
		expect(skiGame.skier.getState()).toBe(Constants.SKIER_STATES.DEAD);
	});
});
