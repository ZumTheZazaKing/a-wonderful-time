import Phaser from  'phaser';
import logoSrc from '../assets/logo.png'

export default class BootScene extends Phaser.Scene {
    constructor () {
        super('Boot');
    }
    preload () {
        this.load.image('logo',logoSrc)
    }
    create () {
        this.scene.start('Preloader')
    }
}
