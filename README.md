# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**
  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
***Resolved in Skier.js turnLeft method line 89***
	
* **Write unit tests:**
  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
***New jest test file Skier.test.js and test Skier Turn Left after Crash written***
  
* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
	***Updated so that skier jumps when space key is pressed and when jump obstacle is hit***
	***		jump method added to Skier.js**
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
		***Added new constant for rock assets, skier collision logic updated to stop crashing when collision with a rock while jumping***
    * Trees can NOT be jumped over
		***Crashes still occur when hitting trees even while jumping***
  * Anything else you'd like to add to the skier's jumping ability, go for it!
		***animateAsset method added to Entity.js, used to animate skier jump and rhino eat, speed at which animation occors controlled via Constants.ANIMATION_DELAY_MS**
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
	***Created new Rhino enitiy subclass, rhino will appear after a set distance has been traveled by the skier : Constants.SKIER_DISTANCE_TO_UNLEASH_RHINO***
  * If the rhino catches the skier, it's game over and the rhino should eat the skier.
	***-Animation for Rhino to eat skier added to new Rino class *** 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.

		* I completed all listed requirements for resolving a bug, adding new features to the skier and adding a new type of entity.
		* Press space to make the skier jump, the skier will also jump when collisions with ramps occur
		* Resolved an additional bug by adding null check for previousGameWindow in Game.js line 60. Reproduction steps for this bug
		was to just continue to refresh the page and every now and then you will get an error message in the console and the game will
		not load.
		* After completing the required coding challenges I decided to send in another rhino from the left so that the when this
		occurs it is only a matter of time before the skier is caught since you will not be able to ski away from rhinos coming in at
		both directions. I thought this would be a good feature to add to the game to showcase good object oriented design. If I had more
		time I would probably just keep it to 1 rhino but have the rhino not always get the y position of the target. Instead I would
		have the rhino start off not only to the right but above the skier and the rhino would only get closer to the skier as far as y
		position goes only when the skier is crashed. X positioning of the rhino would stay the way it is now, which right now he can
		handle changing directions if he runs past the skier. You can see this if you comment out line 57 in Rhino.js and uncomment the
		if code block below it. ***
		* I added comments throughout the code so please go through the source code and take a look at those for further details.
		* Included is the coverage of all unit tests, it is in a folder called coverage. You can open the index.html file in the
		lcov-report folder to view the reports. If I had more time I would work towards achieving 100% coverage on all code, for this
		excercise I chose to just achive 100% coverage for the new class I created, Rhino.js.
		* Reset game functionality was also added as well as just an alert message once you have been caught. 
		Press enter to reset the game when the game is over***
		
		* New Rhino Entity Class with the following methods (See Rhino.js for detailed descriptions)
		 	huntTarget
		 	moveCloserToTarget
		 	killTarget
		 	checkForCollisionWithTarget
		 	getTravelDirection
		
		animateAsset method added to Entity.js, used to animate skier jump and rhino eat, speed at which animation occurs
		controlled via Constants.ANIMATION_DELAY_MS
		
		New Constants:
		* SKIER_HORIZONTAL_SPEED : Speed that the skier travels at when traveling horizontally
		* SKIER_DISTANCE_TO_UNLEASH_RHINO: The distance the skier has to travel when the first rhino is unleashed
		* NEXT_RHINO_DISTANCE_MULTIPLIER: The multiplier for how often to release another rhino
		* RHINO_COUNT: Number of rhinos to create
		* ANIMATION_DELAY_MS: The time delay between each image change for animations
		* RHINO_CHASE_SPEED: Speed at which rhino entities travel after the skier
		* RHINO_STEP_SPEED: How fast the stepping animation for the rhino occurs
		
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
	* I have deployed an instance of this to firebase at https://zemba-ceros-ski.web.app/ for you to play without running this locally
	* I have zipped up the source and distrubuted as well placing the code on github here: https://github.com/bzemba/cerosSki 

  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!
