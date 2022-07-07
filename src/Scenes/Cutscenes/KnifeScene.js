import Phaser from 'phaser';

var platforms;
var player;
var cursors;
var knife;
var scoreText;
var jumpSound;
var knifeDrawSound;

var smile = false;

export default class KnifeScene extends Phaser.Scene{
    constructor(){
        super('Knife')
    }
      
    create(){

        this.model = this.sys.game.globals.model;

        jumpSound = this.sound.add('jump')
        knifeDrawSound = this.sound.add('knifeDraw');

        scoreText = this.add.text(16,16, 'Score: ' + this.model.score, {fontSize:'32px', fill:'#000'}).setScrollFactor(0);

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(3).refreshBody();

        player = this.physics.add.sprite(100,450,'dude')
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)
        this.physics.add.collider(player, platforms)

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
            key:'smile',
            frames:[{key:'dudeSmile', frame:0}],
            frameRate:20
        })

        this.anims.create({
            key:'right',
            frames:this.anims.generateFrameNumbers('dude',{start:5,end:8}),
            frameRate:10,
            repeat:-1
        })

        //code for camera
        this.cameras.main.startFollow(player,true)
        this.cameras.main.setBounds(0,0,800,600)
        //code for world bounds
        this.physics.world.setBounds(0,0,800,600)

        //keyboard controls 
        cursors = this.input.keyboard.createCursorKeys()

        knife = this.physics.add.sprite(400,480,'knife')
        this.physics.add.collider(knife, platforms)
        this.physics.add.overlap(player,knife,pickUpKnife,null,this);

        function pickUpKnife(playerObj,knifeObj){
            knifeObj.disableBody(true, true);
            knifeDrawSound.play();
            this.physics.pause();
            player.anims.play('turn')
            smile=true;
            this.time.delayedCall(3000,()=>{
                player.anims.play('smile')
                this.time.delayedCall(2000,()=>{
                    this.scene.start('Complete')
                })
            })
        }

        
    }

    update(){
        if(cursors.left.isDown && !smile){
            player.setVelocityX(-160);
            player.anims.play('left',true)

        }else if(cursors.right.isDown && !smile){
            player.setVelocityX(160);
            player.anims.play('right',true)

        }else{
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if(cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-50)
            jumpSound.play()
        }
    }

}