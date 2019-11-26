import { Skier } from "./Skier";
import * as Constants from "../Constants";

test('Skier Turn Left after Crash',() => {
	let skier = new Skier(0, 0);
	skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
	skier.turnLeft();
	expect(skier.direction).toBe(1);
});
