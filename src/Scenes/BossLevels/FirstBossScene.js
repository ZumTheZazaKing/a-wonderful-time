import Phaser from 'phaser';

var platforms;
var player;
var cursors;
var bombs;
var jumpSound;
var boss;
var bossTheme1;
var bossTheme2
var bossTeleport;
var watchers;
var knifeSlash;
var minderBlast;

var henchmanShoot;
var henchman;

var progressBar;
var progressBox;
var bossName;

var lastStand;
var minderDeath;
var minderExplode;

var minderTeleportParticles;
var minderShootParticles;
var minderDeathRedParticles;
var minderDeathBlackParticles;

var shootAtPlayer;
var health = 10;
var playerHit = false;

export default class FirstBossScene extends Phaser.Scene{
    constructor(){
        super('FirstBoss')
    }
      
    create(){

        this.input.setDefaultCursor("none")

        this.model = this.sys.game.globals.model;

        jumpSound = this.sound.add('jump')
        bossTeleport = this.sound.add('minderTeleport')
        knifeSlash = this.sound.add('knifeSlash')
        minderBlast = this.sound.add('minderBlast')
        bossTheme1 = this.sound.add('minderTheme1',{loop:true})
        bossTheme2 = this.sound.add('minderTheme2')
        minderDeath = this.sound.add('minderDeath')
        minderExplode = this.sound.add('minderExplode')
        

        this.add.image(0,0,'graysky').setOrigin(0,0)

        platforms = this.physics.add.staticGroup();

        let ground = platforms.create(400, 568, 'grayplatform').setScale(2).refreshBody();
        let lastplatform = platforms.create(this.cameras.main.centerX, 250, 'grayplatform')
        let platform1 = platforms.create(0,400,'grayplatform');
        let platform2 = platforms.create(800,400,'grayplatform')

        boss = this.physics.add.sprite(400, 350, 'firstBossShell');
        boss.body.setAllowGravity(false)
        boss.setCollideWorldBounds(true)

        player = this.physics.add.sprite(100,500,'dude')
        player.setCollideWorldBounds(true)
        this.physics.add.collider(player,platforms)

        let playerBossCollide = this.physics.add.collider(player, boss, hitBoss,null,this)

        minderTeleportParticles = this.add.particles('minderTeleportParticle').createEmitter({
            x:-1000,
            y:-1000,
            speed: { min: 200, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.1, end: 0 },
            //active: false,
            lifespan: 600,
            gravityY:0
        });

        minderShootParticles = this.add.particles('minderShootParticle').createEmitter({
            x:-1000,
            y:-1000,
            speed: { min: 200, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.1, end: 0 },
            //active: false,
            lifespan: 300,
            gravityY:0
        });

        minderDeathRedParticles = this.add.particles('minderShootParticle').createEmitter({
            x:-2000,
            y:-2000,
            speed: { min: 800, max: 1200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.1, end: 0.3 },
            //active: false,
            lifespan:1000,
            gravityY:0
        });

        minderDeathBlackParticles = this.add.particles('minderTeleportParticle').createEmitter({
            x:-2000,
            y:-2000,
            speed: { min: 800, max: 1200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.1, end: 0.3 },
            //active: false,
            lifespan: 1000,
            gravityY:0
        });
        

        function hitBoss(playerObj, bossObj){

            health -= 1

            let bossX =  (player.x < 400) ? (health < 3 ? 550 : 700) : (health < 3 ? 250 : 100);
            let bossY = health <= 5 ? 200 : 50;
            let watcherX;
            let watcherY;
            let velocityX = 200;

            playerHit = true;
            bossTeleport.play();
            knifeSlash.play();
            
            boss.setPosition(bossX,bossY)
            boss.setVelocityY(0)
            boss.setVelocityX(0)
            boss.setTint("0xff0000")
            player.setTint("0xff0000")
            bossHover.stop()

            minderTeleportParticles.setPosition(bossX,bossY);
            minderTeleportParticles.explode(50)

            this.time.delayedCall(500,()=>{
                playerHit = false;
                player.clearTint()
            })
            this.time.delayedCall(100,()=>{
                boss.clearTint()

            })

            progressBar = this.add.graphics();
            progressBox = this.add.graphics();

            progressBox.fillStyle(0x000000, 0.8);
            progressBox.fillRect(100, 550,600,50);
            progressBar.fillStyle(0xff0000, 1);
            progressBar.fillRect(100, 550,health*60,50);
            bossName = this.add.text(
                400,575,'Mind Minder',{font:'36px monospace',fill:'#fff'}
            ).setOrigin(0.5)

            switch(health){
                case 9:
                    bossTheme1.play()
                    boss.setTexture('minder')
                    boss.body.setSize(64,64)
                    watcherX = 400;
                    watcherY = 200;
                    break;
                case 8:
                    watcherX = 0;
                    watcherY = 300;
                    break;

                case 7:
                    watcherX = 650;
                    watcherY = 300;
                    break;

                case 6:
                    watcherX = 400;
                    watcherY = 500;
                    break;

                case 5:
                    henchman = physicsObj.add.staticSprite(400,100,'minderHenchman')
                    ground.disableBody(true,true)
                    platform1.disableBody(true,true);
                    platform2.disableBody(true,true);
                    watchers.children.iterate(function(child){
                        child.disableBody(true,true)
                    })
                    lastplatform.setPosition(400,400).refreshBody()
                    return

                case 2:
                    bossTheme1.pause()
                    bossTheme2.play();
                    watchers.children.iterate(function(child){
                        child.disableBody(true,true)
                    })
                    henchman.disableBody(true,true)
                    return;

                case 0:
                    setTimeout(()=>playerHit=true,600)
                    physicsObj.world.removeCollider(playerBossCollide)
                    minderTeleportParticles.setPosition(bossObj.x, bossObj.y);
                    minderShootParticles.setPosition(bossObj.x, bossObj.y);
                    minderTeleportParticles.explode(200);
                    minderShootParticles.explode(150)
                    minderExplode.play()
                    bossTheme1.destroy()
                    bossTheme2.destroy()
                   
                    setTimeout(() => {
                        minderDeathRedParticles.setPosition(bossObj.x,bossObj.y)
                        minderDeathBlackParticles.setPosition(bossObj.x,bossObj.y)
                        this.cameras.main.shake(5000)
                        minderDeath.play()
                        minderExplode.destroy();
                        
                    },600)
                    clearInterval(shootAtPlayer)
                    setTimeout(() => {
                        this.model.score = 3600
                        localStorage.setItem('score',JSON.stringify(3600))
                        minderDeath.destroy()
                        this.scene.start('Complete')
                        this.input.setDefaultCursor('default')
                    },5000)
                    return;
                default:return
            }

            let watcher = watchers.create(watcherX,watcherY,'watcherhw').setVelocityX(velocityX).setCollideWorldBounds(true).refreshBody();
            watcher.anims.play("watcherRight",true)
        }

        watchers = this.physics.add.group();

        this.physics.add.collider(player,watchers,this.dead,null,this)

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
        this.physics.add.collider(player,bombs,this.dead,null,this)
        
        shootAtPlayer = setInterval(bossShoot, 1500)

        let physicsObj = this.physics;

        function bossShoot(){
            if(health<10){
                let bomb = bombs.create(boss.x, boss.y, 'bomb')
                bomb.body.setAllowGravity(false)
                physicsObj.moveToObject(bomb, player, 400)
                minderShootParticles.setPosition(boss.x,boss.y);
                minderShootParticles.explode(25)
                minderBlast.play()
                let removeBomb = setTimeout(()=>{
                    bomb.body.stop()
                    bomb.disableBody(true,true)
                    clearTimeout(removeBomb)
                },5000)
            }
        }

        lastStand = setInterval(()=>{
            if(health<=2 && health >0){
                    if(boss.x < 400 && player.x < 400){
                        minderTeleportParticles.setPosition(550,200);
                        minderTeleportParticles.explode(50)
                        bossTeleport.play();
                        boss.setPosition(550,200)
                    }else if(boss.x > 400 && player.x > 400){
                        minderTeleportParticles.setPosition(250,200);
                        minderTeleportParticles.explode(50)
                        bossTeleport.play();
                        boss.setPosition(250,200)
                    }
            }
        },1200)

        henchmanShoot = setInterval(() => {
            if(health <= 5 && health > 2){
                let bomb = bombs.create(400, 100, 'bomb')
                bomb.body.setAllowGravity(false)
                physicsObj.moveToObject(bomb, player, 400)
                minderShootParticles.setPosition(400,100);
                minderShootParticles.explode(25)
                minderBlast.play()
                let removeBomb = setTimeout(()=>{
                    bomb.body.stop()
                    bomb.disableBody(true,true)
                    clearTimeout(removeBomb)
                },5000)
            }
        },2000)

    }

    dead(){
        this.input.setDefaultCursor('default')
        this.physics.pause();
        player.setTint("0xff0000")
        player.anims.play('turn')
        this.model.score = 2880
        health = 10;
        clearInterval(shootAtPlayer)
        clearInterval(henchmanShoot)
        clearInterval(lastStand)
        if(health > 2){
            bossTheme1.destroy()
        }
        bossTheme2.destroy();
        this.scene.start('GameOver')
        
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

        if(player.y + player.height/2 === 600 && health > 0){
            this.dead()
        }

        this.physics.collide(watchers, platforms, this.patrolPlatform, null, this)

        if(health<10 && health > 0){
            Phaser.Actions.Rotate([boss],0.1)
        }

        if(health <= 5 && health > 2){
            Phaser.Actions.Rotate([henchman],0.1)
        }

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