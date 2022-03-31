/**
 *  @author
 *  @date 2022.03.
 *
 *
 */
let font
let instructions


let vehicles = []


function preload() {
    font = loadFont('data/consola.ttf')
}


function setup() {
    let cnv = createCanvas(600, 300)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        [1,2,3,4,5] → no function
        z → freeze sketch</pre>`)

    createCanvas(600, 300);
    colorMode(HSB, 360, 100, 100, 100);
    fill(210, 50, 100)
    stroke(210, 50, 100)
    let points = font.textToPoints('Train', 10, height/2, 130,
                                    {sampleFactor: 0.3})
    for (let i = 0; i < points.length; i++){
        vehicles.push(new Vehicle(points[i].x, points[i].y, color(map(points[i].x, 0, width, 0, 360), 100, 100)))
    }
}


function addHappyBirthdayLiya() {
    let v = []

    let points = font.textToPoints('Happy birthday Liya!', 10, height/2, 30,
        {sampleFactor: 0.3})
    let secondLine = font.textToPoints('2:22pm 2022.02.02', 10, 3*height/5, 30,
        {sampleFactor: 0.3})
    for (let i = 0; i < points.length; i++){
        vehicles.push(new Vehicle(points[i].x, points[i].y, color(map(points[i].x, 0, width, 0, 360), 100, 100)))
    } for (let i = 0; i < secondLine.length; i++){
        vehicles.push(new Vehicle(secondLine[i].x, secondLine[i].y, color(map(secondLine[i].x, 0, width, 0, 360), 100, 100)))
    }

    return v
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


function keyPressed() {
    /* stop sketch */
    if (key === 'z') {
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }
}