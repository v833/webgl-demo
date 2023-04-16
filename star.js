import { Compose, Track } from './compose.js'
import { Poly } from './poly.js'
import { Sky } from './sky.js'
import { initShaders } from './utils.js'

const gl = canvas.getContext('webgl')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const vsSource = vertexShader.innerText
const fsSource = fragmentShader.innerText

initShaders(gl, vsSource, fsSource)

const sky = new Sky()
const compose = new Compose()
let poly = null
let point = null

canvas.oncontextmenu = (e) => {
  return false
}

canvas.addEventListener('click', (e) => {})

function crtPoly(x, y) {
  let o1 = point ? point : { x, y, pointSize: random(), alpha: 1 }
  const o2 = { x, y, pointSize: random(), alpha: 1 }
  poly = new Poly({
    size: 4,
    attrName: 'a_Attr',
    geoData: [o1, o2],
    types: ['POINTS', 'LINE_STRIP']
  })
  sky.add(poly)
  crtTrack(o1)
  crtTrack(o2)
}

function random() {
  return Math.random() * 8 + 3
}

function crtTrack(obj) {
  const { pointSize } = obj
  const track = new Track(obj)
  track.start = new Date()
  track.timeLen = 2000
  track.loop = true
  track.keyMap = new Map([
    [
      'pointSize',
      [
        [500, pointSize],
        [1000, 0],
        [1500, pointSize]
      ]
    ],
    [
      'alpha',
      [
        [500, 1],
        [1000, 0],
        [1500, 1]
      ]
    ]
  ])
  compose.add(track)
}
