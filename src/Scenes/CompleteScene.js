import Phaser from 'phaser';

export default class CompleteScene extends Phaser.Scene{
    constructor(){
        super('Complete')
    }

    toTitle(){
        this.scene.start('Title');
    }

    create(){
        this.model = this.sys.game.globals.model;
        
        switch(this.model.score){
            case 720:
                this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    "Wasn't that wonderful?",
                    {font:"48px monospace", fill:"#fff"}
                ).setOrigin(0.5)
                break;
            
            case 1440:
                this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    "Having fun?",
                    {font:"48px monospace", fill:"#fff"}
                ).setOrigin(0.5)
                break;

            case 2160:
                this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    "Why are you doing this?",
                    {font:"48px monospace", fill:"#fff"}
                ).setOrigin(0.5)
                break;
            case 2880:
                this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    "Go no further",
                    {font:"48px monospace", fill:"#fff"}
                ).setOrigin(0.5)
        }

        this.load.on('complete',function(){
            this.toTitle()
        }.bind(this))
        this.timedEvent = this.time.delayedCall(3000, this.toTitle, [], this);
        
    }
}