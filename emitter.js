
class Emitter {
    constructor(x, y, particles, texture) {
        this.particles = particles
        this.pos = new p5.Vector(x, y)
        this.particleTexture = texture
    }


    // emits particles
    emit(emitCapacity) {
        for (let i = 0; i < emitCapacity; i++) {
            this.particles.push(new Particle(this.pos.x, this.pos.y, this.particleTexture))
        }
    }


    // shows the emitter
    show() {
        fill(0, 0, 50)
        circle(this.pos.x, this.pos.y, 6)
    }


    // shows and updates our particles. basically does everything a normal
    // particle system with one emitter does with its current particles
    update() {
        for (let i = this.particles.length - 1; i > -1; i--) {
            let p = this.particles[i]
            p.update()
            p.show()
            p.edges()

            if (p.finished()) {
                // make sure to show the death animation!
                p.deathAnimation()
                this.particles.splice(i, 1)
            }
        }
    }
}
