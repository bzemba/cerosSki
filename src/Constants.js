export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;
// Skier
export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMP_1 = 'skierJump1';
export const SKIER_JUMP_2 = 'skierJump2';
export const SKIER_JUMP_3 = 'skierJump3';
export const SKIER_JUMP_4 = 'skierJump4';
export const SKIER_JUMP_5 = 'skierJump5';
//States for the skier
export const SKIER_STATE_ALIVE = 'alive';
export const SKIER_STATE_CAUGHT = 'caught';
export const SKIER_STATE_DEAD = 'dead';
// Rhino
export const RHINO_DEFAULT = 'rhinoDefault';
export const RHINO_LIFT_EAT_1 = 'rhinoLiftEat1';
export const RHINO_LIFT_EAT_2 = 'rhinoLiftEat2';
export const RHINO_LIFT_EAT_3 = 'rhinoLiftEat3';
export const RHINO_LIFT_EAT_4 = 'rhinoLiftEat4';
export const RHINO_LIFT_MOUTH_OPEN = 'rhinoLiftMouthOpen';
export const RHINO_LIFT = 'rhinoLift';
export const RHINO_RUN_LEFT = 'rhinoRunLeft';
export const RHINO_RUN_LEFT2 = 'rhinoRunLeft2';
// Obstacles
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const JUMP_RAMP = 'jumpRamp';

export const SKIER_STARTING_SPEED = 10 ;
export const SKIER_HORIZONTAL_SPEED = 1; // Added horizontal speed for skiing left and right, which should be slower than normal down speed
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_DISTANCE_TO_UNLEASH_RHINO = 500; // The distance traveled (y position) by the skier when it is time to unleash the first rhino
export const RHINO_CHASE_SPEED = 2; // The speed at which rhino entities travel after the skier
export const RHINO_STEP_SPEED = 5; // How fast the stepping animation for the rhino occurs
export const NEXT_RHINO_DISTANCE_MULTIPLIER = 10; // This value is multiplied by SKIER_DISTANCE_TO_UNLEASH_RHINO to determine when to unleash another rhino 
export const RHINO_COUNT = 2; // The total number of rhinos to unleash in the game, there is really no need to do more than 2 since only the first rhino from the left or right can catch the skier first
export const ANIMATION_DELAY_MS = 200; // The delay in millisecond in which animations will occur for entities. Current animations are jump for skier and eat for rhino

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [SKIER_JUMP_1]: 'img/skier_jump_1.png',
    [SKIER_JUMP_2]: 'img/skier_jump_2.png',
    [SKIER_JUMP_3]: 'img/skier_jump_3.png',
    [SKIER_JUMP_4]: 'img/skier_jump_4.png',
	[SKIER_JUMP_5]: 'img/skier_jump_5.png',
	[RHINO_DEFAULT]: 'img/rhino_default.png',
	[RHINO_LIFT_EAT_1]: 'img/rhino_lift_eat_1.png',
	[RHINO_LIFT_EAT_2]: 'img/rhino_lift_eat_2.png',
	[RHINO_LIFT_EAT_3]: 'img/rhino_lift_eat_3.png',
	[RHINO_LIFT_EAT_4]: 'img/rhino_lift_eat_4.png',
	[RHINO_LIFT_MOUTH_OPEN]: 'img/rhino_lift_mouth_open.png',
	[RHINO_LIFT]: 'img/rhino_lift.png',
	[RHINO_RUN_LEFT]: 'img/rhino_run_left.png',
	[RHINO_RUN_LEFT2]: 'img/rhino_run_left_2.png',
    [TREE]:'img/tree_1.png',
    [TREE_CLUSTER] : 'img/tree_cluster.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK2] : 'img/rock_2.png',
    [JUMP_RAMP] : 'img/jump_ramp.png'
};

export const SKIER_STATES = {
	ALIVE : 0,
	CAUGHT : 1,
	DEAD : 2
}

export const SKIER_SATE_ASSET = {
    [SKIER_STATES.ALIVE] : SKIER_STATE_ALIVE,
    [SKIER_STATES.CAUGHT] : SKIER_STATE_CAUGHT,
    [SKIER_STATES.DEAD] : SKIER_STATE_DEAD
};

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const SKIER_JUMPS = {
    JUMP_1 : 0,
    JUMP_2 : 1,
    JUMP_3 : 2,
    JUMP_4 : 3,
    JUMP_5 : 4
};

export const SKIER_JUMP_ASSET = {
    [SKIER_JUMPS.JUMP_1] : SKIER_JUMP_1,
    [SKIER_JUMPS.JUMP_2] : SKIER_JUMP_2,
    [SKIER_JUMPS.JUMP_3] : SKIER_JUMP_3,
    [SKIER_JUMPS.JUMP_4] : SKIER_JUMP_4,
    [SKIER_JUMPS.JUMP_5] : SKIER_JUMP_5
};

export const ROCK_ASSETS = [ROCK1,ROCK2];

export const RHINO_EAT_ANIMATION = {
    RHINO_LIFT : 0,
    RHINO_LIFT_MOUTH_OPEN : 1,
    RHINO_LIFT_EAT_1 : 2,
    RHINO_LIFT_EAT_2 : 3,
    RHINO_LIFT_EAT_3 : 4,
    RHINO_LIFT_EAT_4 : 5,
    RHINO_DEFAULT : 6
};

export const RHINO_EAT_ASSET = {
    [RHINO_EAT_ANIMATION.RHINO_LIFT] : RHINO_LIFT,
    [RHINO_EAT_ANIMATION.RHINO_LIFT_MOUTH_OPEN] : RHINO_LIFT_MOUTH_OPEN,
    [RHINO_EAT_ANIMATION.RHINO_LIFT_EAT_1] : RHINO_LIFT_EAT_1,
    [RHINO_EAT_ANIMATION.RHINO_LIFT_EAT_2] : RHINO_LIFT_EAT_2,
    [RHINO_EAT_ANIMATION.RHINO_LIFT_EAT_3] : RHINO_LIFT_EAT_3,
    [RHINO_EAT_ANIMATION.RHINO_LIFT_EAT_4] : RHINO_LIFT_EAT_4,
    [RHINO_EAT_ANIMATION.RHINO_DEFAULT] : RHINO_DEFAULT,
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
	DOWN : 40,
	SPACE : 32,
	ENTER : 13
};