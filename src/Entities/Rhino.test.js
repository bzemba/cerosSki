import "babel-polyfill";
import "jest-canvas-mock";
import { Rhino } from "./Rhino";
import { Skier } from "./Skier";
import { AssetManager } from "../Core/AssetManager";
import * as Constants from "../Constants";

describe('Rhino travel directions', () => {
	let rhinoLocX = 0;
	const skier = new Skier(0, 0);
	const rhino = new Rhino(rhinoLocX, 0);
	const assetManager = new AssetManager();

	test('Rhino travel left',() => {
		rhinoLocX = 100;
		rhino.x = rhinoLocX;
		rhino.moveCloserToTarget(skier);
		expect(rhino.x).toBe(rhinoLocX - Constants.RHINO_CHASE_SPEED);
		expect(rhino.getTravelDirection()).toBe('left');
	});

	test('Rhino travel right',() => {
		rhinoLocX = -100;
		rhino.x = rhinoLocX;
		rhino.moveCloserToTarget(skier);
		expect(rhino.x).toBe(rhinoLocX + Constants.RHINO_CHASE_SPEED);
		expect(rhino.getTravelDirection()).toBe('right');
	});
	
	test('Rhino step animation',() => {
		rhino.x = 100;
		
		rhino.stepCounter = Constants.RHINO_STEP_SPEED + 1;
		rhino.moveCloserToTarget(skier);
		expect(rhino.assetName).toBe(Constants.RHINO_RUN_LEFT2);

		rhino.stepCounter = Constants.RHINO_STEP_SPEED + 1;
		rhino.moveCloserToTarget(skier);
		expect(rhino.assetName).toBe(Constants.RHINO_RUN_LEFT);
	});

});
