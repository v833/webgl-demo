import { initShaders, getMousePosInWebgl, createBuffer, randomColor } from './utils.js'

canvas.width = 600
canvas.height = 600
const gl = canvas.getContext('webgl')

const vsSource = vertexShader.innerText
const fsSource = fragmentShader.innerText

initShaders(gl, vsSource, fsSource)

gl.clearColor(0.0, 1.0, 0.0, 1.0)

//存储顶点信息的数组
const positions = []
//存储顶点索引的数组

const colors = []

const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
const a_Color = gl.getAttribLocation(gl.program, 'a_Color')
gl.enableVertexAttribArray(a_Position)
gl.enableVertexAttribArray(a_Color)

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 24, 0)
gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 24, 8)

canvas.addEventListener('click', (e) => {
  const { x, y } = getMousePosInWebgl(e, canvas)
  positions.push(x, y)
  const { r, g, b, a } = randomColor()
  positions.push(r, g, b, a)
  if (positions.length % 18 == 0) {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    render(gl)
  }
})

gl.clear(gl.COLOR_BUFFER_BIT)
// gl.drawArrays(gl.TRIANGLES, 0, 3)

function render(gl) {
  //用设置的清空画布颜色清空画布。
  gl.clear(gl.COLOR_BUFFER_BIT)
  if (positions.length <= 0) {
    return
  }
  //绘制图元设置为三角形。
  const primitiveType = gl.TRIANGLES
  //因为我们要绘制三个点，所以执行三次顶点绘制操作。
  gl.drawArrays(primitiveType, 0, positions.length / 6)
}
