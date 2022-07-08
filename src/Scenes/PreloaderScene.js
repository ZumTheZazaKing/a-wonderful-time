import Phaser from 'phaser';
import dudeSrc from '../assets/images/dude.png';
import dudeSmileSrc from '../assets/images/dudeSmile.png'
import watcherHwSrc from '../assets/images/watcherhw.png'
import platformSrc from '../assets/images/platform2.png';
import bloodplatformSrc from '../assets/images/bloodplatform.png';
import bombSrc from '../assets/images/bomb.png';
import skySrc from '../assets/images/sky.png';
import graySkySrc from '../assets/images/graysky.png'
import grayPlatformSrc from '../assets/images/grayplatform.png';
import watchingYouSrc from '../assets/images/watchingYou.png';
import starSrc from '../assets/images/star.png';
import knifeSrc from '../assets/images/knife.png';
import firstBossShellSrc from '../assets/images/firstBossShell.png'

import niceBgSrc from '../assets/audio/nicebg.mp3';
import whispersBgSrc from '../assets/audio/whispersbg.mp3'
import jumpSoundSrc from '../assets/audio/jump.mp3'
import collectSoundSrc from '../assets/audio/collect.mp3';
import knifeDrawSrc from '../assets/audio/knifeDraw.mp3';
import minderTeleportSrc from '../assets/audio/minderTeleport.mp3';
import knifeSlashSrc from '../assets/audio/knifeSlash.mp3';

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
        this.load.audio('knifeDraw',[knifeDrawSrc])
        this.load.audio('whispersbg',[whispersBgSrc])
        this.load.audio('minderTeleport', [minderTeleportSrc]);
        this.load.audio('knifeSlash',[knifeSlashSrc])

        this.load.image('sky', skySrc);
        this.load.image('watchingYou', watchingYouSrc);
        this.load.image('graysky', graySkySrc)
        this.load.image('ground', platformSrc);
        this.load.image('bloodplatform', bloodplatformSrc);
        this.load.image('grayplatform', grayPlatformSrc);
        this.load.image('star', starSrc);
        this.load.image('bomb', bombSrc);
        this.load.image('knife',knifeSrc);
        this.load.image('firstBossShell', firstBossShellSrc)
        this.load.image('dudeSmile',dudeSmileSrc,{frameWidth:36, frameHeight:56});
        this.load.spritesheet('dude', dudeSrc, {frameWidth:36, frameHeight:56});
        this.load.spritesheet('watcherhw',watcherHwSrc,{frameWidth:56, frameHeight:24});
        
    }
}