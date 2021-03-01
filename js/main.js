window.addEventListener("load", function() 
{ 
    var game = new Game;

    game.initialize();
});

function Game()
{
    // Variables
    var canvas,
        ctx,
        background,
        lapse,
        spaceShip,
        finalBoss,
        limitLeft = false,
        limitRight = true,
        arraySpaceShipShots,
        arrayEnemyShots,
        arrayEnemies,
        defaultSpaceShipWidth,
        defaultSpaceShipHeight,
        defaultSpaceShipShotWidth,
        defaultSpaceShipShotHeight,
        defaultEnemyWidth,
        defaultEnemyHeight,
        defaultFinalBossWidth,
        defaultFinalBossHeight,
        keyboard,
        screenLoaded = false,
        score = 0000,
        lives = 3,
        intro = document.getElementById("intro"),
        music = document.getElementById("music"),
        spaceshipProjectile = document.getElementById("spaceshipProjectile"),
        spaceshipHit = document.getElementById("spaceshipHit"),
        spaceshipDestroyed = document.getElementById("spaceshipDestroyed"),
        enemyProjectile = document.getElementById("enemyProjectile"),
        enemyDestroyed = document.getElementById("enemyDestroyed"),
        finalBossProjectile = document.getElementById("finalBossProjectile"),
        finalBossDestroyed = document.getElementById("finalBossDestroyed"),
        fanfare = document.getElementById("fanfare");

    // Mètodes públics
    this.initialize = function()
    {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');

        addKeyboardEvents();
        titleLogoInitialize();
        backgroundInitialize();
        spaceShipInitialize();
        enemiesInitialize();
        finalBossInitialize();

        lapse = window.setInterval(frameLoop, 1000/60);
    }


    // Mètodes privats
    function frameLoop()
    {
        if (!screenLoaded) {
            intro.play();
            drawBackground();
            drawTitleLogo();
            loadScreen();
        }

        if (keyboard[13]) {
            screenLoaded = true;
            intro.pause();
            music.play();
        } else if (keyboard[77]) {
            music.pause();
        }

        if (screenLoaded) {
            moveSpaceShip();
            moveShots();
            drawBackground();
            drawSpaceShip();
            drawSpaceShipShots();
            drawEnemies();
            drawEnemyShots();
            if (!checkEnemies()) {
                drawFinalBoss();
                moveFinalBoss();
            } 
            checkHit();
            checkEnemies();
            enemyFire();
            loadScore();
            loadLives();
        }

        if (finalBoss.life == 0) {
            loadVictory();
        }

        if (spaceShip.life == 0) {
            enemyProjectile.pause();
            drawBackground();
            loadScore();
            loadGameOver();
        }
    }

    function addKeyboardEvents()
    {
        keyboard = new Array();

        addEvent(document, "keydown", function(e) {
            keyboard[e.keyCode] = true;
        });
        addEvent(document, "keyup", function(e) {
            keyboard[e.keyCode] = false;
        });

        function addEvent(element, eventName, func)
        {
            if(element.addEventListener)
            {
                //Per navegadors (Chrome, Firefox, Opera etc.)
                element.addEventListener(eventName,func,false);
            }
            else if(element.attachEvent)
            {
                //Per Internet Explorer
                element.attachEvent(eventName,func);
            }
        }
    }

    function loadScreen()
    {
        let message = [I18n.print("load1"), I18n.print("load2"), I18n.print("load3"), I18n.print("load4"), I18n.print("load5"), I18n.print("load6"), I18n.print("load7"), I18n.print("load8"), I18n.print("load9"), I18n.print("load10"), I18n.print("load11"), I18n.print("load12"), I18n.print("load13"), I18n.print("load14"), I18n.print("load15")];
        let fontSize = canvas.width / 34;
        ctx.font =  fontSize + "px Jupiter Pro";
        ctx.fillStyle = "blue";
        ctx.textAlign = "right";
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(1, "cyan");
        
        ctx.fillStyle = gradient;
        ctx.fillText(message[0], 710, (canvas.height - 700));
        ctx.fillText(message[1], 760, (canvas.height - 660));
        ctx.fillText(message[2], 790, (canvas.height - 620));
        ctx.fillText(message[3], 720, (canvas.height - 580));

        ctx.fillText(message[4], 710, (canvas.height - 520));
        ctx.fillText(message[5], 740, (canvas.height - 480));

        ctx.fillText(message[6], 730, (canvas.height - 420));
        ctx.fillText(message[7], 760, (canvas.height - 380));
        ctx.fillText(message[8], 730, (canvas.height - 340));
        ctx.fillText(message[9], 680, (canvas.height - 300));

        ctx.fillText(message[10], 650, (canvas.height - 240));
        ctx.fillText(message[11], 655, (canvas.height - 200));

        ctx.fillText(message[12], 790, (canvas.height - 100));
        ctx.fillText(message[13], 790, (canvas.height - 60));
        ctx.fillText(message[14], 790, (canvas.height - 20));
    }

    function loadScore()
    {
        let message = [I18n.print("load16"), score];
        let fontSize = canvas.width / 30;
        ctx.font =  fontSize + "px Jupiter Pro";
        ctx.fillStyle = "blue";
        ctx.textAlign = "left";
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(1, "cyan");
        
        ctx.fillStyle = gradient;
        ctx.fillText(message[0], 20, (canvas.height - 50)); 
        ctx.fillText(message[1], 20, (canvas.height - 20)); 
    }

    function loadLives()
    {
        let message = [I18n.print("load17"), lives];
        let fontSize = canvas.width / 30;
        ctx.font =  fontSize + "px Jupiter Pro";
        ctx.fillStyle = "blue";
        ctx.textAlign = "right";
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(1, "cyan");
        
        ctx.fillStyle = gradient;
        ctx.fillText(message[0], 780, (canvas.height - 50)); 
        ctx.fillText(message[1], 780, (canvas.height - 20)); 
    }

    function loadVictory()
    {
        let message = [I18n.print("load18")];
        let fontSize = canvas.width / 10;
        ctx.font =  fontSize + "px Jupiter Pro";
        ctx.fillStyle = "blue";
        ctx.textAlign = "left";
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(1, "cyan");
        
        ctx.fillStyle = gradient;
        ctx.fillText(message[0], 220, (canvas.height - 500));
    }

    function loadGameOver()
    {
        let message = [I18n.print("load19")];
        let fontSize = canvas.width / 10;
        ctx.font =  fontSize + "px Jupiter Pro";
        ctx.fillStyle = "blue";
        ctx.textAlign = "left";
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(1, "cyan");
        
        ctx.fillStyle = gradient;
        ctx.fillText(message[0], 140, (canvas.height - 500));
    }

    function drawTitleLogo() {
        ctx.drawImage(titleLogo,-30,620);
    }

    function drawBackground()
    {
        ctx.drawImage(background,0,0);
    }

    function drawSpaceShip()
    {
        if (spaceShip.life <= 0)
            return;
        ctx.drawImage(spaceShip.image(),spaceShip.x,spaceShip.y);
    }

    function drawSpaceShipShots()
    {
        /*for (var i in arraySpaceShipShots)
        {
            var currentShot = arraySpaceShipShots[i];
            ctx.drawImage(currentShot.image,currentShot.x,currentShot.y);
        }*/
        arraySpaceShipShots.forEach(function(currentShot, i) {ctx.drawImage(currentShot.image,currentShot.x,currentShot.y);});
    }

    function drawEnemyShots()
    {
        arrayEnemyShots.forEach(function(currentShot, i) {ctx.drawImage(currentShot.image,currentShot.x,currentShot.y);});
    }

    function drawEnemies()
    {
        /*for (var i in arrayEnemies)
        {
            var currentEnemy = arrayEnemies[i];
            ctx.drawImage(currentEnemy.image,currentEnemy.x,currentEnemy.y);
        }*/
        arrayEnemies.forEach(function(currentEnemy, i) {ctx.drawImage(currentEnemy.image,currentEnemy.x,currentEnemy.y);});
    }

    function drawFinalBoss()
    {
        if (finalBoss.life <= 0)
            return;
        ctx.drawImage(finalBoss.image(),finalBoss.x,finalBoss.y);
    }

    function titleLogoInitialize()
    {
        titleLogo = new Image();
        titleLogo.src = "img/titleLogo.png";
    }

    function backgroundInitialize()
    {
        background = new Image();
        background.src = "img/background.png";
    }

    function spaceShipInitialize()
    {
        defaultSpaceShipWidth = 72;
        defaultSpaceShipHeight = 100;

        spaceShip = {
            width: defaultSpaceShipWidth,
            height: defaultSpaceShipHeight,
            x: (canvas.width/2) - (defaultSpaceShipWidth/2),
            y: canvas.height - defaultSpaceShipHeight - 10,
            image: function() {
                var img = new Image();
                img.src = "img/spaceship.png";
                return img;
            },
            life: 3
        }

        arraySpaceShipShots = new Array();
    }

    function enemiesInitialize()
    {
        arrayEnemies = new Array();

        for (var i=0;i<10;i++)
        {
            var currentEnemy = new Enemy();
            currentEnemy.x = 10 + (i*79);
            arrayEnemies.push(currentEnemy);
        }

        for (var i=0;i<10;i++)
        {
            var currentEnemy = new Enemy2();
            currentEnemy.x = 10 + (i*79);
            arrayEnemies.push(currentEnemy);
        }

        for (var i=0;i<10;i++)
        {
            var currentEnemy = new Enemy3();
            currentEnemy.x = 10 + (i*79);
            arrayEnemies.push(currentEnemy);
        }

        for (var i=0;i<10;i++)
        {
            var currentEnemy = new Enemy4();
            currentEnemy.x = 10 + (i*79);
            arrayEnemies.push(currentEnemy);
        }

        for (var i=0;i<10;i++)
        {
            var currentEnemy = new Enemy5();
            currentEnemy.x = 10 + (i*79);
            arrayEnemies.push(currentEnemy);
        }

        arrayEnemyShots = new Array();
    }

    function finalBossInitialize()
    {
        defaultFinalBossWidth = 500;
        defaultFinalBossHeight = 325;

        finalBoss = {
            width: defaultFinalBossWidth,
            height: defaultFinalBossHeight,
            x: (canvas.width/2) - (defaultFinalBossWidth/2),
            y: 20,
            image: function() {
                var img = new Image();

                if (finalBoss.life >= 21 && finalBoss.life <= 25) {
                    img.src = "img/finalBoss.png";
                } else if (finalBoss.life >= 16 && finalBoss.life <= 20) {
                    img.src = "img/finalBoss2.png";
                } else if (finalBoss.life >= 11 && finalBoss.life <= 15) {
                    img.src = "img/finalBoss3.png";
                } else if (finalBoss.life >= 1 && finalBoss.life <= 10) {
                    img.src = "img/finalBoss4.png";
                }
                
                return img;
            },
            life: 25
        }
    }

    /*
        La nau l'he construït com un objecte directament. En canvi el projectil, com que n'hi haurà molts,
        una bona idea és crear-lo com una classe i anar generant objectes d'aquesta mateixa.
    */
    function SpaceShipShot()
    {
        defaultSpaceShipShotWidth = 24;
        defaultSpaceShipShotHeight = 36;

        this.width = defaultSpaceShipShotWidth;
        this.height = defaultSpaceShipShotHeight;
        this.x = spaceShip.x + ((spaceShip.width/2)-(defaultSpaceShipShotWidth/2));  // volem que surti del centre
        this.y = spaceShip.y -10;
        this.image = new Image();
        this.image.src = "img/spaceshipProjectile.png";
        spaceshipProjectile.play();
    }

    function SpaceShipBomb()
    {
        defaultSpaceShipShotWidth = 100;
        defaultSpaceShipShotHeight = 165;

        this.width = defaultSpaceShipShotWidth;
        this.height = defaultSpaceShipShotHeight;
        this.x = spaceShip.x + ((spaceShip.width/2)-(defaultSpaceShipShotWidth/2));  // volem que surti del centre
        this.y = spaceShip.y -10;
        this.image = new Image();
        this.image.src = "img/spaceshipBomb.png";
        spaceshipBomb.play();
    }

    function EnemyShot(enemy)
    {
        defaultEnemyShotWidth = 20;
        defaultEnemyShotHeight = 33;

        this.width = defaultEnemyShotWidth;
        this.height = defaultEnemyShotHeight;
        this.x = enemy.x + ((enemy.width/2)-(defaultEnemyShotWidth/2));  // volem que surti del centre
        this.y = enemy.y + 30;
        this.image = new Image();
        this.image.src = "img/enemyProjectile.png";
        enemyProjectile.play();
    }

    function FinalBossShot(enemy)
    {
        defaultEnemyShotWidth = 100;
        defaultEnemyShotHeight = 165;

        this.width = defaultEnemyShotWidth;
        this.height = defaultEnemyShotHeight;
        this.x = enemy.x + ((enemy.width/2)-(defaultEnemyShotWidth/2));  // volem que surti del centre
        this.y = enemy.y + 30;
        this.image = new Image();
        this.image.src = "img/finalBossProjectile.png";
        finalBossProjectile.play();
    }

    function Enemy()
    {
        defaultEnemyWidth = 72;
        defaultEnemyHeight = 50;

        this.width = defaultEnemyWidth;
        this.height = defaultEnemyHeight;
        this.x = 0;
        this.y = 10;
        this.image = new Image();
        this.image.src = "img/enemy.png";
    }
    
    function Enemy2()
    {
        defaultEnemyWidth = 72;
        defaultEnemyHeight = 50;

        this.width = defaultEnemyWidth;
        this.height = defaultEnemyHeight;
        this.x = 0;
        this.y = 70;
        this.image = new Image();
        this.image.src = "img/enemy2.png";
    }

    function Enemy3()
    {
        defaultEnemyWidth = 72;
        defaultEnemyHeight = 50;

        this.width = defaultEnemyWidth;
        this.height = defaultEnemyHeight;
        this.x = 0;
        this.y = 130;
        this.image = new Image();
        this.image.src = "img/enemy.png";
    }

    function Enemy4()
    {
        defaultEnemyWidth = 72;
        defaultEnemyHeight = 50;

        this.width = defaultEnemyWidth;
        this.height = defaultEnemyHeight;
        this.x = 0;
        this.y = 190;
        this.image = new Image();
        this.image.src = "img/enemy2.png";
    }

    function Enemy5()
    {
        defaultEnemyWidth = 72;
        defaultEnemyHeight = 50;

        this.width = defaultEnemyWidth;
        this.height = defaultEnemyHeight;
        this.x = 0;
        this.y = 250;
        this.image = new Image();
        this.image.src = "img/enemy.png";
    }

    function moveSpaceShip()
    {
        if (keyboard[37]) {
            spaceShip.x -= 10;
            if (spaceShip.x <= 0) spaceShip.x = 0;
        }

        if (keyboard[39]) {
            spaceShip.x += 10;
            if (spaceShip.x >= (800 - spaceShip.width)) spaceShip.x = (800 - spaceShip.width);
        }

        if (keyboard[32]) {
            if (!keyboard.fire) {
                fire();
                keyboard.fire = true;
            }
        } else if (keyboard[66]) {
            if (!keyboard.fireBomb) {
                fireBomb();
                keyboard.fireBomb = true;
            }
        }
        
        else
            keyboard.fire = false;
    }

    function moveFinalBoss()
    {
        if (!limitLeft) {
            finalBoss.x -= 2;

            if (finalBoss.x <= 0) {
                finalBoss.x = 0;
                limitLeft = true;
                limitRight = false;
            }
        }

        if (!limitRight) {
            finalBoss.x += 2;

            if (finalBoss.x >= (800 - finalBoss.width)) {
                finalBoss.x = (800 - finalBoss.width);
                limitRight = true;
                limitLeft = false;
            }
        }
    }

    /* 
        Posem projectils al array de projectils arraySpaceShipShots[] per anar-los 
        posteriorment dibuixant per pantalla.
    */
    function fire()
    {
        var currentShot = new SpaceShipShot();
        arraySpaceShipShots.push(currentShot);
    }

    function fireBomb()
    {
        var currentShot = new SpaceShipBomb();
        arraySpaceShipShots.push(currentShot);
    }

    function enemyFire()
    {
        if (checkEnemies())
        {
            arrayEnemies.forEach(function(currentEnemy, i) {
                // Això és la IA dels enemics
                if (Math.floor(Math.random() * 1000) == 0)
                {
                    var currentShot = new EnemyShot(currentEnemy);
                    arrayEnemyShots.push(currentShot);
                }
            });
        }
        else 
        {
            if(finalBoss.life <= 0)
                return;
            // IA del Final Boss
            if (Math.floor(Math.random() * 40) == 0)
            {
                var currentShot = new EnemyShot(finalBoss);
                arrayEnemyShots.push(currentShot);
            }

            if (Math.floor(Math.random() * 120) == 0)
            {
                var currentShot = new FinalBossShot(finalBoss);
                arrayEnemyShots.push(currentShot);
            }
        }
    }

    function moveShots()
    {
        /*********** CONTROL DEL FOC ALIAT *************/
        for (var i in arraySpaceShipShots)
        {
            var currentShot = arraySpaceShipShots[i];
            currentShot.y -= 2;
        }

        /*
            Aquesta funció de filter() serveix per esborrar elements de l'array quan han sobrepassat el canvas,
            és a dir, quan la coordenada y < 0
        */
        arraySpaceShipShots = arraySpaceShipShots.filter(function(shot) {
            return shot.y > 0;
        });

        /*********** CONTROL DEL FOC HOSTIL *************/
        for (var i in arrayEnemyShots)
        {
            var currentShot = arrayEnemyShots[i];
            currentShot.y += 2;
        }

        arrayEnemyShots = arrayEnemyShots.filter(function(shot) {
            return shot.y > 0;
        });
    }

    function hit(a,b)
    {
        var hit = false;
        //Col·lisions horitzontals
        if (b.x + b.width >= a.x && b.x < a.x + a.width)
        {
            //Col·lisions verticals
            if (b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
                
        }
        //Col·lisió de a amb b
        if (b.x <= a.x && b.x + b.width >= a.x + a.width)
        {
            if (b.y <= a.y && b.y + b.height >= a.y + a.height)
                hit = true;
        }
        //Col·lisió de b amb a
        if (a.x <= b.x && a.x + a.width >= b.x + b.width)
        {
            if (a.y <= b.y && a.y + a.height >= b.y + b.height)
                hit = true;
        }

        return hit;
    }

    function checkHit()
    {
        // Aquesta funció verifica si dos elements han col·lisionat.
        for(var i in arraySpaceShipShots)
        {
            var currentShot = arraySpaceShipShots[i];
            for(var j in arrayEnemies)
            {
                var currentEnemy = arrayEnemies[j];
                if (hit(currentShot, currentEnemy))
                {
                    console.log("BOOM!");
                    arrayEnemies.splice(arrayEnemies.indexOf(currentEnemy),1);
                    arraySpaceShipShots.splice(arraySpaceShipShots.indexOf(currentShot), 1);
                    score += 20;
                    enemyDestroyed.play();
                }
            }

            if (!checkEnemies() && finalBoss.life > 0)
            {
                if (hit(currentShot, finalBoss))
                {
                    finalBoss.life--;
                    arraySpaceShipShots.splice(arraySpaceShipShots.indexOf(currentShot),1);
                    console.log(finalBoss.life);
                    
                    if (finalBoss.life == 0) {
                        spaceShip.life = 1000;
                        finalBossDestroyed.play();
                        score += 1000;
                        music.pause();
                        gameOver.pause();
                        fanfare.play();
                    }
                }
            } 
        }

        // Verifiquem col·lisions amb la nau
        if(spaceShip.life > 0)
        {
            for(var i in arrayEnemyShots) {
                var currentShot = arrayEnemyShots[i];

                if(hit(currentShot,spaceShip)) {
                    arrayEnemyShots.splice(arrayEnemyShots.indexOf(currentShot), 1);
                    spaceShip.life--;
                    lives--;

                    if (lives < 0) {
                        lives = 0;
                    }

                    spaceshipHit.play();

                    if (spaceShip.life == 0) {
                        spaceshipDestroyed.play();
                        music.pause();
                        gameOver.play();
                    }
                }
            }
        }
    }

    function checkEnemies()
    {
        if (arrayEnemies.length <= 0)
            return false;
        return true;
    }
}