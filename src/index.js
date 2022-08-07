import Phaser from 'phaser';
import Model from './Model';
import config from './Config/config';

import LevelOneScene from './Scenes/GameLevels/LevelOneScene';
import LevelTwoScene from './Scenes/GameLevels/LevelTwoScene';
import LevelThreeScene from './Scenes/GameLevels/LevelThreeScene';
import LevelFourScene from './Scenes/GameLevels/LevelFourScene';
import FirstBossScene from './Scenes/BossLevels/FirstBossScene';

import KnifeScene from './Scenes/Cutscenes/KnifeScene'

import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import GameOverScene from './Scenes/GameOverScene';
import CompleteScene from './Scenes/CompleteScene';
import DemoScene from './Scenes/DemoScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model };
    this.globals.model.score = JSON.parse(localStorage.getItem('score')) || 0
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene)
    this.scene.add("GameOver", GameOverScene)
    this.scene.add('Complete',CompleteScene)
    this.scene.add("Demo",DemoScene)

    this.scene.add('LevelOne', LevelOneScene);
    this.scene.add('LevelTwo', LevelTwoScene)
    this.scene.add('LevelThree', LevelThreeScene);
    this.scene.add('LevelFour', LevelFourScene)
    this.scene.add('Knife', KnifeScene)
    this.scene.add('FirstBoss', FirstBossScene)

    this.scene.start('Boot');
  }
}
window.game = new Game();
