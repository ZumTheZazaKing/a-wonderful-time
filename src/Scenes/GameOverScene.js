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
        let timer;
        let deathMsg;
        let style1 = {font:"36px monospace", fill:"#ff0000",}
        let style2 = {font:"64px monospace", fill:"#fff",}
        switch(this.model.score){
            case 2880:
                timer = 3000;
                let deathQuotes = [
                    'Entrance is forbidden.',
                    'You may not pass.',
                    'Your existence is a disease.',
                    'Your efforts are futile.',
                    'All this for what?'
                ]
                deathMsg = this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    deathQuotes[Math.floor(Math.random()*deathQuotes.length)],
                    style1
                ).setOrigin(0.5)
                break;

            default:
                timer = 1000;
                deathMsg = this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    ":)",
                    style2
                ).setOrigin(0.5)

        }

        this.load.on('complete',function(){
            this.toTitle()
        }.bind(this))
        this.timedEvent = this.time.delayedCall(timer, this.toTitle, [], this);
        
    }
}