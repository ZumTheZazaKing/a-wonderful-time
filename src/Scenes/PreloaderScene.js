import Phaser from 'phaser';
import dudeSrc from '../assets/images/dude.png';
import platformSrc from '../assets/images/platform.png';
import bombSrc from '../assets/images/bomb.png';
import skySrc from '../assets/images/sky.png';
import starSrc from '../assets/images/star.png';
import niceBgSrc from '../assets/audio/nicebg.mp3';
import jumpSoundSrc from '../assets/audio/jump.mp3'
import collectSoundSrc from '../assets/audio/collect.mp3';

export default class PreloaderScene extends Phaser.Scene {
    constructor () {
        super('Preloader');
    }

    preload () {
        // add logo image
        //this.add.image(400, 200, 'logo');
        // display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
          x: width / 2,
          y: height / 2 - 50,
          text: 'Loading...',
          style: {
            font: '20px monospace',
            fill: '#ffffff'
          }
        });
        loadingText.setOrigin(0.5, 0.5);
        var percentText = this.make.text({
          x: width / 2,
          y: height / 2 - 5,
          text: '0%',
          style: {
            font: '18px monospace',
            fill: '#ffffff'
          }
        });
        percentText.setOrigin(0.5, 0.5);
        var assetText = this.make.text({
          x: width / 2,
          y: height / 2 + 50,
          text: '',
          style: {
            font: '18px monospace',
            fill: '#ffffff'
          }
        });
        assetText.setOrigin(0.5, 0.5);
        // update progress bar
        this.load.on('progress', function (value) {
          percentText.setText(parseInt(value * 100) + '%');
          progressBar.clear();
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect(250, 280, 300 * value, 30);
        });
        // update file progress text
        this.load.on('fileprogress', function (file) {
          assetText.setText('Loading asset: ' + file.key);
        });
        // remove progress bar when complete
        this.load.on('complete', function () {
          progressBar.destroy();
          progressBox.destroy();
          loadingText.destroy();
          percentText.destroy();
          assetText.destroy();
          this.scene.start('Title')
        }.bind(this));

        // load assets needed in our game
        this.load.audio('nicebg',[niceBgSrc])
        this.load.audio('jump',[jumpSoundSrc])
        this.load.audio('collect',[collectSoundSrc])
        this.load.image('sky', skySrc);
        this.load.image('ground', platformSrc);
        this.load.image('star', starSrc);
        this.load.image('bomb', bombSrc);
        this.load.spritesheet('dude', dudeSrc, {frameWidth:36, frameHeight:56});
        
    }
}