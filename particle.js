

// A simple particle.
class Particle {
    constructor(x, y, texture) {
        this.pos = new p5.Vector(x, y)
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector(0, 0)
        this.texture = texture
        this.lifetime = 100
    }

    show() {
        tint(0, 0, 100, this.lifetime)
        noStroke()
        imageMode(CENTER)
        image(this.texture, this.pos.x, this.pos.y)
    }

    // updates the particle's position, velocity, and acceleration
    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc = new p5.Vector(0, 0)
        this.lifetime -= random(10)
    }

    // is our particle finished?
    finished() {
        return this.lifetime <= 0
    }

    // shows our particle's death animation
    deathAnimation() {
        // let hue = random(360)
        // stroke(hue, 100, 100)
        // fill(hue, 100, 100)
        // circle(this.pos.x, this.pos.y, 5)
    }

    // applies force f. F = m*a, but m = 1, so a = F.
    applyForce(f) {
        this.acc.add(f)
    }

    // applies edges
    edges() {
        if (this.pos.x < 32) {
            this.vel.x *= -1
        }
        if (this.pos.x > width - 32) {
            this.vel.x *= -1
        }
        if (this.pos.y > height - 32) {
            this.vel.y *= -1
        }
        if (this.pos.y < 32) {
            this.vel.y *= -1
        }
    }
}


