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
                    "Searching...",
                    {font:"48px monospace", fill:"#fff"}
                ).setOrigin(0.5)
                break;
            
            case 1440:
                this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    "Still searching...",
                    {font:"48px monospace", fill:"#fff"}
                ).setOrigin(0.5)
                break;

            case 2160:
                this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    "Getting closer...",
                    {font:"48px monospace", fill:"#fff"}
                ).setOrigin(0.5)
                break;
            case 2880:
                this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    "Found it",
                    {font:"48px monospace", fill:"#fff"}
                ).setOrigin(0.5)
                break;
            case 3600:
                this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    ":)",
                    {font:"48px monospace", fill:"#ff0000"}
                ).setOrigin(0.5)
                break;
        }

        this.load.on('complete',function(){
            this.toTitle()
        }.bind(this))
        this.timedEvent = this.time.delayedCall(3000, this.toTitle, [], this);
        
    }
}