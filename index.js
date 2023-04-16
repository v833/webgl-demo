// import { Compose, Track } from './compose.js'
import * as THREE from './node_modules/three/build/three.module.js'
import { Poly } from './poly.js'
import { Sky } from './sky.js'
import { initShaders } from './utils.js'

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const gl = canvas.getContext('webgl')
gl.clearColor(0.0, 0.0, 0.0, 1.0)

const vsSource = vertexShader.innerText
const fsSource = fragmentShader.innerText

initShaders(gl, vsSource, fsSource)

canvas.addEventListener('click', (e) => {
  // e.button是一个表示鼠标按钮的数字，取值为0、1或2。
  if (e.button === 2) {
    popVertice()
  } else {
    const { clientX, clientY } = e
    const { left, top } = canvas.getBoundingClientRect()
    const [cssX, cssY] = [clientX - left, clientY - top]
    const [x, y] = [(cssX / canvas.width) * 2 - 1, -((cssY / canvas.height) * 2 - 1)]
    if (poly) {
      poly.addVertice(x, y)
    } else {
      crtPoly(x, y)
    }
    render()
  }
})

canvas.addEventListener('mousemove', (e) => {
  if (poly) {
    const { clientX, clientY } = e
    const { left, top } = canvas.getBoundingClientRect()
    const [cssX, cssY] = [clientX - left, clientY - top]
    const [x, y] = [(cssX / canvas.width) * 2 - 1, -((cssY / canvas.height) * 2 - 1)]
    poly.setVertice(poly.count - 1, x, y)
    render()
  }
})

function crtPoly(x, y) {
  poly = new Poly({
    vertices: [x, y, x, y],
    types: ['POINTS', 'LINE_STRIP']
  })
  sky.add(poly)
}

function popVertice() {
  poly.popVertice()
  poly = null
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT)
  sky.draw()
}

// const vertices = [0, 0.2]
// const vertexBuffer = gl.createBuffer()
// gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

// const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
// // const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
// // const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

// gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
// gl.enableVertexAttribArray(a_Position)

// // render()
// gl.clear(gl.COLOR_BUFFER_BIT)
// gl.drawArrays(gl.POINTS, 0, 1)

// setTimeout(() => {
//   vertices.push(-0.2, -0.1)
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
//   gl.clear(gl.COLOR_BUFFER_BIT)
//   gl.drawArrays(gl.POINTS, 0, 2)
// }, 1000)

// setTimeout(() => {
//   gl.clear(gl.COLOR_BUFFER_BIT)
//   gl.drawArrays(gl.POINTS, 0, 2)
//   gl.drawArrays(gl.LINES, 0, 2)
// }, 2000)
// canvas.addEventListener('click', (e) => {
//   const { clientX, clientY } = e
//   const { left, top } = canvas.getBoundingClientRect()
//   const [cssX, cssY] = [clientX - left, clientY - top]
//   // canvas坐标系转换为webgl坐标系
//   const [x, y] = [(cssX / canvas.width) * 2 - 1, -((cssY / canvas.height) * 2 - 1)]
//   const size = Math.random() * 20 + 1
//   const { r, g, b } = new THREE.Color(Math.random() * 0xffffff)
//   const obj = { x, y, size, color: [r, g, b] }
//   buffer.push(obj)

//   render()
// })

// function render() {
//   gl.clear(gl.COLOR_BUFFER_BIT)
//   if (buffer.length) {
//     buffer.forEach(({ x, y, size, color }) => {
//       // gl.vertexAttrib2f(a_Position, x, y)
//       // gl.vertexAttrib1f(a_PointSize, size)
//       // gl.uniform4f(u_FragColor, ...color, 1.0)
//       // gl.enable(gl.BLEND)
//       // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
//       gl.drawArrays(gl.POINTS, 0, 1)
//     })
//   }
// }
