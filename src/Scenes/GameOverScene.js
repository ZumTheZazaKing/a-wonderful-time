import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    constructor(){
        super('GameOver')
    }

    toTitle(){
        this.scene.start('Title');
    }

    create(){
        this.model = this.sys.game.globals.model;
        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            ":)",
            {font:"64px monospace", fill:"#fff"}
        ).setOrigin(0.5)

        this.load.on('complete',function(){
            this.toTitle()
        }.bind(this))
        this.timedEvent = this.time.delayedCall(1000, this.toTitle, [], this);
        
    }
}