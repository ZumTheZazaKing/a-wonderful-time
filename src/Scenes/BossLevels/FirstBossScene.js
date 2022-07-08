import Phaser from 'phaser';

var platforms;
var player;
var cursors;
var bombs;
var jumpSound;
var boss;
var bossTeleport;
var watchers;
var knifeSlash;

var shootAtPlayer;
var phase = 0;
var playerHit = false;

export default class FirstBossScene extends Phaser.Scene{
    constructor(){
        super('FirstBoss')
    }
      
    create(){

        this.model = this.sys.game.globals.model;

        jumpSound = this.sound.add('jump')
        bossTeleport = this.sound.add('minderTeleport')
        knifeSlash = this.sound.add('knifeSlash')

        this.add.image(0,0,'graysky').setOrigin(0,0)

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'grayplatform').setScale(2).refreshBody();
        platforms.create(this.cameras.main.centerX, 250, 'grayplatform')
        platforms.create(0,400,'grayplatform');
        platforms.create(800,400,'grayplatform')

        boss = this.physics.add.sprite(400, 350, 'firstBossShell');
        boss.body.setAllowGravity(false)
        boss.setCollideWorldBounds(true)

        player = this.physics.add.sprite(100,500,'dude')
        player.setCollideWorldBounds(true)
        this.physics.add.collider(player,platforms)

        let playerBossCollide = this.physics.add.collider(player, boss, hitBoss,null,this)

        function hitBoss(playerObj, bossObj){

            let x = (player.x < 400) ? 700 : 100
            let watcherX;
            let watcherY;

            playerHit = true;
            bossTeleport.play();
            knifeSlash.play();
            boss.setPosition(x,50)
            boss.setVelocityY(0)
            boss.setVelocityX(0)
            boss.setTint("0xff0000")
            player.setTint("0xff0000")
            bossHover.stop()
            phase += 1
            this.time.delayedCall(1000,()=>{
                playerHit = false;
                player.clearTint()
            })
            this.time.delayedCall(100,()=>{
                boss.clearTint()

            })

            switch(phase){
                case 1:
                    watcherX = 400;
                    watcherY = 200;
                    break;
                case 2:
                    watcherX = 0;
                    watcherY = 300;
                    break;

                case 3:
                    watcherX = 650;
                    watcherY = 300;
                    break;
                default:return
            }

            let watcher = watchers.create(watcherX,watcherY,'watcherhw').setVelocityX(200).setCollideWorldBounds(true).refreshBody();
            watcher.anims.play("watcherRight",true)
        }

        watchers = this.physics.add.group();

        this.physics.add.collider(player,watchers,dead,null,this)

        //code for camera
        this.cameras.main.startFollow(player,true)
        this.cameras.main.setBounds(0,0,800,600)
        //code for world bounds
        this.physics.world.setBounds(0,0,800,600)

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

        let bossHover = this.tweens.add({
            targets: boss,
            y:boss.y + 30,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            loop: -1
        });

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

        //keyboard controls 
        cursors = this.input.keyboard.createCursorKeys()

        bombs = this.physics.add.group()
        this.physics.add.collider(bombs,platforms);
        this.physics.add.collider(player,bombs,dead,null,this)
        function dead(player,bomb){
            this.physics.pause();
            player.setTint("0xff0000")
            player.anims.play('turn')
            this.model.score = 2880
            phase = 0;
            this.scene.start('GameOver')
            
        }
        
        setInterval(bossShoot, 2000)

        function bossShoot(){
            if(phase>0){
                console.log("Hello")
            }
        }

    }

    update(){
        if(cursors.left.isDown && !playerHit){
            player.setVelocityX(-160);
            player.anims.play('left',true)

        }else if(cursors.right.isDown && !playerHit){
            player.setVelocityX(160);
            player.anims.play('right',true)

        }else{
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if(cursors.up.isDown && player.body.touching.down && !playerHit){
            player.setVelocityY(-330)
            jumpSound.play()
        }
        this.physics.collide(watchers, platforms, this.patrolPlatform, null, this)
    }

    patrolPlatform(enemy, platform) {
        // if enemy moving to right and has started to move over right edge of platform
        if (enemy.body.velocity.x > 0 && enemy.x + enemy.width/2 > platform.x + platform.width / 2) {
            enemy.body.velocity.x *= -1; // reverse direction
            enemy.anims.play("watcherLeft",true)
 
        //or enemy moving to left and has started to move over left edge of platform
        }else if(enemy.body.velocity.x < 0 && enemy.x - enemy.width/2 < platform.x - platform.width /2){
            enemy.body.velocity.x *= -1; // reverse direction
            enemy.anims.play("watcherRight",true)

        }else if (enemy.x + enemy.width/2 === 800){
            enemy.body.velocity.x = -200; // reverse direction
            enemy.anims.play("watcherLeft",true)
 
        //or enemy moving to left and has started to move over left edge of platform
        }else if(enemy.x - enemy.width/2 === 0){
            enemy.body.velocity.x =  200; // reverse direction
            enemy.anims.play("watcherRight",true)
        }
    }

}