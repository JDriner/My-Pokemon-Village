const pokemons = {
    Snowball: {
        position: {
            x: 280,
            y: 325
        },
        image: {
            src: 'assets/bunny-sprite.png'
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        isEnemy: false,
        name: 'Snowball',
        attacks: [
            attacks.Tackle,
            attacks.PlantSpike,
            attacks.Fireball,
            attacks.ThrowAxe,
            attacks.Run,
        ]
    },
    // enemiesssss
    Draggle: {
        position: {
            x: 800,
            y: 100
        },
        image: {
            src: 'assets/draggleSprite.png'
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        isEnemy: true,
        name: 'Draggle',
        attacks: [
            attacks.Tackle,
            attacks.Fireball,
            attacks.PlantSpike,
        ]
    },
        Emby: {

        position: {
            x: 800,
            y: 100
        },
        image: {
            src: 'assets/embySprite.png'
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        isEnemy: true,
        name: 'Emby',
        attacks: [
            attacks.Tackle,
            attacks.Fireball,
            attacks.ThrowAxe
        ]
    },
    Rhino: {
        position: {
            x: 800,
            y: 90
        },
        image: {
            src: 'assets/rhinoSprite.png'
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        isEnemy: true,
        name: 'Rhino',
        attacks: [
            attacks.Tackle,
            attacks.Fireball,
            attacks.ThrowAxe
        ]
    },
    Sneek: {
        position: {
            x: 800,
            y: 90
        },
        image: {
            src: 'assets/snakeSprite.png'
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        isEnemy: true,
        name: 'Sneek',
        attacks: [
            attacks.Tackle,
            attacks.Fireball,
            attacks.ThrowAxe
        ]
    },

    Slime: {
        position: {
            x: 800,
            y: 90
        },
        image: {
            src: 'assets/slimeSprite.png'
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        isEnemy: true,
        name: 'Slime',
        attacks: [
            attacks.Tackle,
            attacks.Fireball,
            attacks.ThrowAxe
        ]
    },
    Lizard: {
        position: {
            x: 800,
            y: 90
        },
        image: {
            src: 'assets/lizardSprite.png'
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        isEnemy: true,
        name: 'Lizard',
        attacks: [
            attacks.Tackle,
            attacks.Fireball,
            attacks.ThrowAxe
        ]
    },
}