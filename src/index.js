import Phaser from 'phaser';
import Model from './Model';
import config from './Config/config';

import LevelOneScene from './Scenes/GameLevels/LevelOneScene';
import LevelTwoScene from './Scenes/GameLevels/LevelTwoScene';
import LevelThreeScene from './Scenes/GameLevels/LevelThreeScene';

import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import GameOverScene from './Scenes/GameOverScene';
import CompleteScene from './Scenes/CompleteScene';

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

    this.scene.add('LevelOne', LevelOneScene);
    this.scene.add('LevelTwo', LevelTwoScene)
    this.scene.add('LevelThree', LevelThreeScene)

    this.scene.start('Boot');
  }
}
window.game = new Game();
