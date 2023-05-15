const pokemons = {
    Emby: {

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
        name: 'Emby',
        attacks: [
            attacks.Tackle,
            attacks.Fireball,
            attacks.ThrowAxe,
            attacks.Run,
        ]
    },
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
    }
}