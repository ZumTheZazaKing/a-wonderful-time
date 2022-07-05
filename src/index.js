import Phaser from 'phaser';
import dudeSrc from './assets/dude.png';
import platformSrc from './assets/platform.png';
import bombSrc from './assets/bomb.png';
import skySrc from './assets/sky.png';
import starSrc from './assets/star.png';

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;

class MyGame extends Phaser.Scene
{
    constructor(){
        super();
    }

    preload(){
        this.load.image('sky', skySrc);
        this.load.image('ground', platformSrc);
        this.load.image('star', starSrc);
        this.load.image('bomb', bombSrc);
        this.load.spritesheet('dude', dudeSrc, {frameWidth:32, frameHeight:48});
    }
      
    create(){
        this.add.image(0,0,'sky').setOrigin(0,0)
        scoreText = this.add.text(16,16, 'score: 0', {fontSize:'32px', fill:'#000'});

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100,450,'dude')
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)
        this.physics.add.collider(player,platforms)

        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('dude',{start:0,end:3}),
            frameRate:10,
            repeat:-1
        })

        this.anims.create({
            key:'turn',
            frames:[{key:'dude', frame:4}],
            frameRate:20
        })

        this.anims.create({
            key:'right',
            frames:this.anims.generateFrameNumbers('dude',{start:5,end:8}),
            frameRate:10,
            repeat:-1
        })

        cursors = this.input.keyboard.createCursorKeys()

        stars = this.physics.add.group({
            key:'star',
            repeat:11,
            setXY:{x:12,y:0,stepX:70},
        })
        stars.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.1,0.2))
            child.body.setGravityY(500)
        })
        this.physics.add.collider(stars,platforms)
        this.physics.add.overlap(player,stars,collectStar,null,this)
        function collectStar(player,star){
            star.disableBody(true, true)
            score += 10
            scoreText.setText("Score: " + score)
        }

    }

    update(){
        if(cursors.left.isDown){
            player.setVelocityX(-160);
            player.anims.play('left',true)

        }else if(cursors.right.isDown){
            player.setVelocityX(160);
            player.anims.play('right',true)

        }else{
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if(cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330)
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame,
    autoCenter:true,
    physics:{
        default:"arcade",
        arcade:{
            gravity:{y: 300},
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
