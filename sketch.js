/**
 *  @author
 *  @date 2022.03.
 *
 *
 */
let consolas
let bpdots
let instructions


let vehicles = []


function preload() {
    consolas = loadFont('data/consola.ttf')
    bpdots = loadFont('data/bpdots.otf')
}


function setup() {
    let cnv = createCanvas(600, 300)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        [1,2,3] → switch scenes
        z → freeze sketch</pre>`)

    createCanvas(600, 300);
    colorMode(HSB, 360, 100, 100, 100);
    fill(210, 50, 100)
    stroke(210, 50, 100)
    let points = consolas.textToPoints('Start! Press 1, 2, or 3', 10, height/2, 40,
                                    {sampleFactor: 0.3})
    for (let i = 0; i < points.length; i++){
        vehicles.push(new Vehicle(points[i].x, points[i].y, color(map(points[i].x, 10, width-80, 0, 360), 100, 100)))
    }
}


/** returns text point locations for "happy twosday! 2.22.22 2:22pm", centered
 *  313 points
 */
function addTwosDay() {
    let pts = bpdots.textToPoints('happy twosday!', 100, 100, 48, {
        sampleFactor: 0.01, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    })

    pts = pts.concat(bpdots.textToPoints('2.22.22 2:22pm', 90, 175, 48, {
        sampleFactor: 0.06, // increase for more points
    }))

    return pts
}


/** returns text point locations for "Liya", centered
 *  313 points
 */
function addBigLiya() {
    return consolas.textToPoints('Liya', 50, 200, 224, {
        sampleFactor: 0.2, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    })
}


/** returns text point locations for "happy birthday, Liya!" centered
 *  237 points
 */
function addGiantTwo() {
    return consolas.textToPoints('2', 200, 280, 384, {
        sampleFactor: 0.2, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    })
}


function draw() {
    background(234, 34, 24)

    for (let i = 0; i < vehicles.length; i++){
        let vh = vehicles[i]
        vh.show()
        vh.update()
        vh.behaviors()
        vh.edges()
    }

    displayDebugCorner()
}


/** 🧹 shows debugging info using text() 🧹 */
function displayDebugCorner() {
    const LEFT_MARGIN = 10
    const DEBUG_Y_OFFSET = height - 10 /* floor of debug corner */
    const LINE_SPACING = 2
    const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING
    fill(0, 0, 100, 100) /* white */
    noStroke()

    text(`frameCount: ${frameCount}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET - LINE_HEIGHT)
    text(`frameRate: ${frameRate().toFixed(1)}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET)
}


function changeText(newPoints, startX, endX) {
    let vehicleTemp = vehicles

    // if we have to remove vehicles, we still add new ones but they are the
    // exact same as the old ones with a different home
    if (vehicleTemp.length >= newPoints.length) {
        vehicles = []
        for (let i = 0; i < newPoints.length; i++) {
            let v = vehicleTemp[i]
            v.target = new p5.Vector(newPoints[i].x, newPoints[i].y)
            vehicles.push(v)
        }
    }
    // if we have to add points, we keep the vehicles with different home
    // points, and then we iterate again through the rest of the new points
    else {
        for (let i = 0; i < vehicles.length; i++) {
            vehicles[i] = vehicleTemp[i]
            vehicles[i].target = new p5.Vector(newPoints[i].x, newPoints[i].y)
        } for (let i = vehicles.length; i < newPoints.length; i++) {
            vehicles.push(new Vehicle(newPoints[i].x, newPoints[i].y, color(map(newPoints[i].x, startX, endX, 0, 360), 100, 100)))
        }
    }

    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i]
        v.c = color(map(v.target.x, startX, endX, 0, 360), 100, 100)
    }
}


function keyPressed() {
    /* stop sketch */
    if (key === 'z') {
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }
    /* switch scenes */
    if (key === '1') {
        let points = addBigLiya()
        changeText(points, 100, width - 80)
    } if (key === '2') {
        let points = addGiantTwo()
        changeText(points, width/2-80, width/2+100)
    } if (key === '3') {
        let points = addTwosDay()
        changeText(points, 100, width-100)
    }
}