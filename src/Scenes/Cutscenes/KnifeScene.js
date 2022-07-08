import Phaser from 'phaser';

var platforms;
var player;
var cursors;
var knife;
var knifeDrawSound;
var whispersBg;

var noMove = false;
var smile = false;

export default class KnifeScene extends Phaser.Scene{
    constructor(){
        super('Knife')
    }
      
    create(){

        this.model = this.sys.game.globals.model;

        this.add.image(0,0,'watchingYou').setOrigin(0)
        this.add.image(1000,0,'watchingYou').setOrigin(0)
        this.add.image(2000,0,'watchingYou').setOrigin(0)

        knifeDrawSound = this.sound.add('knifeDraw');

        whispersBg = this.sound.add('whispersbg',{loop:true})
        whispersBg.play();

        platforms = this.physics.add.staticGroup();
        platforms.create(0, 568, 'bloodplatform').setScale(2).setOrigin(0).refreshBody()
        platforms.create(800, 568, 'bloodplatform').setScale(2).setOrigin(0).refreshBody()
        platforms.create(1600, 568, 'bloodplatform').setScale(2).setOrigin(0).refreshBody()
        platforms.create(2400, 568, 'bloodplatform').setScale(2).setOrigin(0).refreshBody()

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
            frames:[{key:'dude', frame:9}],
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
        this.cameras.main.setBounds(0,0,3000,600)
        //code for world bounds
        this.physics.world.setBounds(0,0,3000,600)

        //keyboard controls 
        cursors = this.input.keyboard.createCursorKeys()

        knife = this.physics.add.sprite(2800,480,'knife')
        this.physics.add.collider(knife, platforms)
        this.physics.add.overlap(player,knife,pickUpKnife,null,this);

        function pickUpKnife(playerObj,knifeObj){
            knifeObj.disableBody(true, true);
            knifeDrawSound.play();
            this.physics.pause();
            noMove=true;

            this.time.delayedCall(3000,()=>{
                smile=true;
                whispersBg.destroy();
                this.time.delayedCall(2000,()=>{
                    this.scene.start('Complete')
                })
            })
        }

        
    }

    update(){
        if(cursors.left.isDown && !noMove){
            player.setVelocityX(-160);
            player.anims.play('left',true)

        }else if(cursors.right.isDown && !noMove){
            player.setVelocityX(160);
            player.anims.play('right',true)

        }else{
            player.setVelocityX(0);
            if(smile){
                player.anims.play('smile');
            }else{
                player.anims.play('turn');
            }
        }

        if(cursors.up.isDown && player.body.touching.down && !noMove){
            player.setVelocityY(-100)
        }
    }

}