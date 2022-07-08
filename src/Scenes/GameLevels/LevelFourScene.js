import Phaser from 'phaser';

var platforms;
var player;
var cursors;
var stars;
var scoreText;
var nicebg;
var jumpSound;
var collectSound;
var watchers;
var bg;
var velocity = 0;


export default class LevelFourScene extends Phaser.Scene{
    constructor(){
        super('LevelFour')
    }
      
    create(){

        this.model = this.sys.game.globals.model;
        this.cameras.main.setBounds(0,0,1400,600)
        //code for world bounds
        this.physics.world.setBounds(0,0,1400,600)

        nicebg = this.sound.add('nicebg',{loop:true})
        nicebg.play();
        jumpSound = this.sound.add('jump')
        collectSound = this.sound.add('collect')

        bg = this.add.image(0,0,'sky')
        .setOrigin(0,0)
        .setScale(2)

        scoreText = this.add.text(16,16, 'Score: '+this.model.score, {font:'32px monospace', fill:'#000'}).setScrollFactor(0);

        platforms = this.physics.add.staticGroup();
        platforms.create(700, 468, 'ground').setScale(4).refreshBody();
        platforms.create(700,150,'ground').setScale(4).refreshBody();

        player = this.physics.add.sprite(100,350,'dude')
        player.setCollideWorldBounds(true)
        this.physics.add.collider(player,platforms)

        function dead(player,killer){
            nicebg.destroy()
            this.physics.pause();
            player.setTint("0xff0000")
            player.anims.play('turn')
            this.model.score = 2160
            velocity = 0;
            this.scene.start('GameOver')
        }

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

        this.anims.create({
            key:'watcherLeft',
            frames: this.anims.generateFrameNumbers('watcherhw',{start:0, end:1}),
            frameRate:10,
            repeat:-1
        })

        this.anims.create({
            key:'watcherRight',
            frames: this.anims.generateFrameNumbers('watcherhw',{start:2, end:3}),
            frameRate:10,
            repeat:-1
        })

        //code for camera
        this.cameras.main.startFollow(player,true)
        

        //keyboard controls 
        cursors = this.input.keyboard.createCursorKeys()

        stars = this.physics.add.group({
            key:'star',
            repeat:11,
            setXY:{x:12,y:300,stepX:116,},
        })
        stars.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.1,0.2))
            child.body.setGravityY(500)
        })
        this.physics.add.collider(stars,platforms)
        this.physics.add.overlap(player,stars,collectStar,null,this)

        function collectStar(player,star){
            star.disableBody(true, true)
            collectSound.play()
            this.model.score += 10;
            scoreText.setText("Score: " + this.model.score)

            switch(this.model.score){
                case 2880:
                    nicebg.destroy()
                    this.scene.start('Knife')
                    localStorage.setItem('score',JSON.stringify(this.model.score))
                    break;
            }

            if(stars.countActive(true) === 0){
                stars.children.iterate(function(child){
                    child.enableBody(true,child.x,child.y,true,true)
                })

                let x = (player.x < 700) ? 1050 : 350;
                velocity += 50;

                var watcher = watchers.create(x,350,'watcherhw')
                watcher.setVelocityX(velocity)
                watcher.refreshBody()
                watcher.setCollideWorldBounds(true)
                if(watcher.body.velocity.x > 0){
                    watcher.anims.play("watcherRight")
                }else{
                    watcher.anims.play("watcherLeft")
                }
            }
        }

        watchers = this.physics.add.group();
        this.physics.add.collider(player,watchers,dead,null,this)

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
            jumpSound.play()
        }
        this.physics.collide(watchers, platforms, this.patrolPlatform, null, this)
    }

    patrolPlatform(enemy, platform) {
        console.log()
         //if enemy moving to right and has started to move over right edge of platform
        if (enemy.x + enemy.width/2 === 1400){
            enemy.body.velocity.x = velocity * -1; // reverse direction
            enemy.anims.play("watcherLeft",true)
 
        //or enemy moving to left and has started to move over left edge of platform
        }else if(enemy.x - enemy.width/2 === 0){
            enemy.body.velocity.x = -velocity * -1; // reverse direction
            enemy.anims.play("watcherRight",true)
        }
    }

}