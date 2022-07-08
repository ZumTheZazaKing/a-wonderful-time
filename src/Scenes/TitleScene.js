import Phaser from 'phaser';

var playButton;
var title;
var titleColor;

export default class TitleScene extends Phaser.Scene {
    constructor () {
        super('Title');
    }

    create () {

        this.model = this.sys.game.globals.model;

        playButton = this.add.text(this.cameras.main.centerX,this.cameras.main.centerY,'Start',
        {font:'32px monospace', fill:'#fff'})
            .setOrigin(0.5)
            .setInteractive({useHandCursor:true})
            .on('pointerdown', function(pointer){
                switch(this.model.score){
                    case 0:
                        this.scene.start('LevelOne')
                        break;
                    case 720:
                        this.scene.start('LevelTwo')
                        break;
                    case 1440:
                        this.scene.start('LevelThree')
                        break;
                    case 2160:
                        this.scene.start('LevelFour')
                        break;
                    case 2880:
                        this.scene.start('FirstBoss')
                    default:
                        return;
                }
            }.bind(this))
            .on('pointerover',() => playButton.setStyle({fill:"#ff0000"}))
            .on('pointerout', () => playButton.setStyle({fill:"#fff"}))

        switch(this.model.score){
            case 0:
            case 720:
            case 1440:
            case 2160:
                title = "A Wonderful Time"
                titleColor = "#fff"
                break;
            
            case 2880:
                title = "A Wonderful Time :)"
                titleColor = "#fff"
                break;

            default:
                title = "A Wonderful Time"
                titleColor = "#fff"
        }

        title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 100,
            title,
            {font: '48px monospace',fill:titleColor}
        )
        .setOrigin(0.5)
    }
}
