import Phaser from 'phaser';

let playButton;
let title;
let titleColor;

export default class DemoScene extends Phaser.Scene {
    constructor () {
        super('Demo');
    }

    create () {

        this.model = this.sys.game.globals.model;

        title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "Thanks for playing the demo!\n\nFull game coming soon\n\n:)",
            {font: '36px monospace',fill:"#fff",align:"center"}
        )
        .setOrigin(0.5)

        setTimeout(()=>{
            this.scene.start("Title");
        },5000)
    }
}
