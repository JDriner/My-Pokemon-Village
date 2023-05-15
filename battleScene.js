
// ------------------ BATTLE COMPONENTS ------------------
const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'assets/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})

// set the pokemons
let draggle // enemy
let snowball    // hero
let renderedSprites
let battleAnimationId
let queue

//reinitialize battle scene after it closed
function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()

    draggle = new Pokemon(pokemons.Draggle)
    snowball = new Pokemon(pokemons.Snowball)
    renderedSprites = [draggle, snowball]
    queue = []

    snowball.attacks.forEach((attack) => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })

    // event listeners for our buttons (attack)
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            snowball.attack({
                attack: selectedAttack,
                recipient: draggle,
                renderedSprites
            })

            if (draggle.health <= 0) {
                queue.push(() => {
                    draggle.faint()
                })

                //fade back to black
                queue.push(() => {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                                duration: 0.5
                            })

                            battle.initiated = false
                            audio.map.play()
                        }
                    })
                })
            }

            // draggle or enemy attacks from here
            const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

            queue.push(() => {
                draggle.attack({
                    attack: randomAttack,
                    recipient: snowball,
                    renderedSprites
                })

                //If HERO FAINTS AFTER DRAGGLES ATTACK
                if (snowball.health <= 0) {
                    queue.push(() => {
                        snowball.faint()
                    })
                    //fade back to black
                    queue.push(() => {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () => {
                                cancelAnimationFrame(battleAnimationId)
                                animate()
                                document.querySelector('#userInterface').style.display = 'none'
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.5
                                })

                                battle.initiated = false
                                audio.map.play()
                            }
                        })
                    })
                }
            })
        })

        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector('.attack-type').innerHTML = selectedAttack.type
            document.querySelector('.attack-type').style.color = selectedAttack.color
        })
    })


}

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}

animate()
// initBattle()
// animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
})