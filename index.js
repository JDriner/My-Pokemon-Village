const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
// console.log(gsap)

// canvas.width = 1355
// canvas.height = 595
canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 210) {
    collisionsMap.push(collisions.slice(i, 210 + i))
}


const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 210) {
    battleZonesMap.push(battleZonesData.slice(i, 210 + i))
}

const boundaries = []
// -- boundary positioning --
const offset = {
    x: -225,
    y: -250
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 21635)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))
    })
})

const battleZones = []
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 21635)
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))
    })
})

// load the map
const image = new Image()
image.src = './assets/smaller-map.png'

// load the foreground
const foregroundImage = new Image()
foregroundImage.src = './assets/smaller-map-foreground.png'

// load the player images
const playerDownImage = new Image()
playerDownImage.src = './assets/bunny-down.png'

const playerUpImage = new Image()
playerUpImage.src = './assets/bunny-up.png'

const playerLeftImage = new Image()
playerLeftImage.src = './assets/bunny-left.png'

const playerRightImage = new Image()
playerRightImage.src = './assets/bunny-right.png'

// player's Sprite
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 256 / 4 / 2,
        y: canvas.height / 2 - 64 / 4,
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 4
    },
    sprites: {
        down: playerDownImage,
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,

    }
})
// -- background positioning --
const background = new Sprite({
    position: {
        x: -225,
        y: -250
    },
    image: image
})
// -- foreground image
const foreground = new Sprite({
    position: {
        x: -225,
        y: -250
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries, foreground, ...battleZones]
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

const battle = {
    initiated: false
}
// ---------------- ANIMATION!!!!!!! ----------------
function animate() {
    const animationId = window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw() // call the function that draws the boundaries in the map
    })
    battleZones.forEach((battleZone) => {
        battleZone.draw()
    })

    player.draw()
    foreground.draw()

    let moving = true
    player.animate = false

    if (battle.initiated) return

    //activate a battle
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        // if player moves within the battlezone
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            const overlappingArea =  (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x)) * 
                                    (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y)) 
                                           
            if (rectangularCollision({rectangle1: player,rectangle2: battleZone}) &&
                // overlappingArea > (player.width * player.height) /4 && 
                Math.random() < 0.001
            ) {
                
                console.log("battle Activated!")
                // deactivate current animation loop and start battle animation instead
                window.cancelAnimationFrame(animationId)

                audio.map.stop()
                audio.initBattle.play()
                audio.battle.play()

                battle.initiated = true
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete(){
                        gsap.to('#overlappingDiv',{
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // activate a new animation loop
                                initBattle()
                                animateBattle()
                                gsap.to('#overlappingDiv',{
                                    opacity: 0,
                                    duration: 0.4,
                                })
                            }
                        })
                     
                    }
                })
                
                break
            }
        }
    }


    // moving the map, collision boundaries as the player clicks w,a,s,d
    // W
    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 5
                    }
                }
            })) {
                // there is collision
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 5
            })
    }
    // A
    else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x + 5,
                        y: boundary.position.y
                    }
                }
            })) {
                // there is collision
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 5
            })
    }
    // S
    else if (keys.s.pressed && lastKey === 's') {
        player.animate = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 5
                    }
                }
            })) {
                // there is collision
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= 5
            })
    }
    // D
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x - 5,
                        y: boundary.position.y
                    }
                }
            })) {
                // there is collision
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 5
            })
    }
}
// animate()




let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break

    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

    }
})



//--- click the screen to play sound
let clicked = false
addEventListener('click', () => {
    if (!clicked) {
        audio.map.play()
        clicked = true
    }
})