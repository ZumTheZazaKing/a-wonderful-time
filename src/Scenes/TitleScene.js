import Phaser from 'phaser';

var playButton;
var title;

export default class TitleScene extends Phaser.Scene {
    constructor () {
        super('Title');
    }

    create () {
        playButton = this.add.text(this.cameras.main.centerX,this.cameras.main.centerY,'Play',
        {font:'32px monospace', fill:'#fff'})
            .setOrigin(0.5)
            .setInteractive({useHandCursor:true})
            .on('pointerdown', function(pointer){
                this.scene.start('Game')
            }.bind(this))
            .on('pointerover',() => playButton.setStyle({fill:"#ff0000"}))
            .on('pointerout', () => playButton.setStyle({fill:"#fff"}))

        title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 100,
            "A Wonderful Time :)",
            {font: '48px monospace',fill:"#fff"}
        )
        .setOrigin(0.5)
    }
}
