import * as Constants from "../Constants";

export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    draw(canvas, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
	}
	
	
	/* 
		animateAsset(newAssetName)
			* newAssetName ASSET from Constants to change the entity to
			* chain a bunch of calls to this method to animate an entity
	*/
	animateAsset(newAssetName){
		return new Promise((resolve) => {
			this.assetName = newAssetName;
			setTimeout(() => {
				resolve();
			}, Constants.ANIMATION_DELAY_MS)
		});
	}
}