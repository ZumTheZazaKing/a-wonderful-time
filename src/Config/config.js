import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    autoCenter:true,
    pixelArt:true,
    physics:{
        default:"arcade",
        arcade:{
            gravity:{y: 300},
            debug: false
        }
    }
}
export default config;