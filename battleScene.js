
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
let enemy // enemy
let snowball    // hero
let renderedSprites
let battleAnimationId
let queue

function getRandomPokemon(pokemons) {
    const keys = Object.keys(pokemons);
    var randomNumber = Math.floor(Math.random() * keys.length);
    // console.log(randomNumber)
    if (randomNumber == 0) {
        return getRandomPokemon(pokemons);
    } else {
        return keys[randomNumber];
    }
}

//reinitialize battle scene after it closed
function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()

    const randomPokemon = getRandomPokemon(pokemons)
    // console.log(randomPokemon)
    enemy = new Pokemon(pokemons[randomPokemon])
    snowball = new Pokemon(pokemons.Snowball)
    renderedSprites = [enemy, snowball]
    queue = []

    document.querySelector('#hero-name').innerHTML = 'Snowball'
    document.querySelector('#enemy-name').innerHTML = randomPokemon

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
                recipient: enemy,
                renderedSprites
            })

            if (enemy.health <= 0) {
                queue.push(() => {
                    enemy.faint()
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
            const randomAttack = enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)]

            queue.push(() => {
                enemy.attack({
                    attack: randomAttack,
                    recipient: snowball,
                    renderedSprites
                })

                //If HERO FAINTS AFTER ENEMY ATTACK
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