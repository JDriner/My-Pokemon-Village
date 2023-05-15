// set coordinates for the map
class Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        rotation = 0
    }) {
        this.position = position
        this.image = new Image()
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.image.src = image.src

        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.rotation

    }
    draw() {
        c.save()
        c.translate(this.position.x + this.width / 2, this.position.y + this.height /2)
        c.rotate(this.rotation)
        c.translate(-this.position.x - this.width / 2, -this.position.y - this.height /2)
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height,

        )
        c.restore()
        if (!this.animate) return
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}

class Pokemon extends Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        rotation = 0,
        isEnemy = false,
        name,
        attacks
    }){
        super({
            position,
            velocity,
            image,
            frames,
            sprites,
            animate,
            rotation ,
        })
        this.health = 100
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
    }

    // if a pokemon faints
    faint() {
        document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted!'
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })
        audio.battle.stop()
        audio.victory.play()
    }

    //attack for a pokemon (wild pokemon)
    attack({ attack, recipient, renderedSprites }) {
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name + '...'

        
        let healthBar = "#enemyHealthBar"
        if (this.isEnemy) healthBar = "#playerHealthBar"
        
        let rotation = 1
        if (this.isEnemy) rotation = -2.2
        recipient.health -= attack.damage

        switch (attack.name) {
            case 'Fireball':
                //play  fireball's initial sound
                audio.initFireball.play()
                const fireballImage = new Image()
                fireballImage.src = './assets/fireball.png'
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                })
                
                renderedSprites.splice(1, 0, fireball)

                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // Enemy gets hit
                        audio.fireballHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })

                break
            case 'Tackle':
                const tl = gsap.timeline()

                let movementDistance = 20
                if (this.isEnemy) movementDistance *= -1

                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        // Enemy gets hit
                        audio.tackleHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
                break


                case 'Fireblast':
                    //play  fireball's initial sound
                audio.initFireball.play()
                const fireBlastImage = new Image()
                fireBlastImage.src = './assets/fireball.png'
                const fireblast = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireBlastImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                })
                
                renderedSprites.splice(1, 0, fireblast)

                gsap.to(fireblast.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // Enemy gets hit
                        audio.fireballHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
                break;

                case 'ThrowAxe':
                    //play  fireball's initial sound
                audio.initFireball.play()
                const axeImage = new Image()
                axeImage.src = './assets/axe_throw.png'
                const throwAxe = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: axeImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                })
                
                renderedSprites.splice(1, 0, throwAxe)

                gsap.to(throwAxe.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // Enemy gets hit
                        audio.fireballHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
                break;


                case 'PlantSpike':
                    //play  fireball's initial sound
                audio.initFireball.play()
                const plantSpikeImage = new Image()
                plantSpikeImage.src = './assets/Plant-Spike.png'
                const plantSpike = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: plantSpikeImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                })
                
                renderedSprites.splice(1, 0, plantSpike)

                gsap.to(plantSpike.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // Enemy gets hit
                        audio.explosion.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
                break;



                // if player chose to run!!!!
                case 'Run':
                    document.querySelector('#dialogueBox').innerHTML = 'Sorry, there is no turning back!!! (just kidding, this feature is still under development so you have no choice to fight XD)'
                break;
        }
    }
}



// -- set the boundaries/collisions with a class---
class Boundary {
    static width = 16   //12 * 400%
    static height = 16  //12 * 400%
    constructor({ position }) {
        this.position = position
        this.width = 16
        this.height = 16
    }
    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}