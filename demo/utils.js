import * as THREE from '../node_modules/three/build/three.module.js'

function loadShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

function initShaders(gl, vsSource, fsSource) {
  // 创建程序对象
  const program = gl.createProgram()
  // 建立着色对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
  // 把顶点着色器对象装进程序对象中
  gl.attachShader(program, vertexShader)
  // 把片元着色器对象装进程序对象中
  gl.attachShader(program, fragmentShader)
  // 链接程序对象
  gl.linkProgram(program)
  // 启动程序对象
  gl.useProgram(program)
  // 将程序对象挂载到上下文
  gl.program = program
  return true
}

function getMousePosInWebgl({ clientX, clientY }, canvas) {
  const { left, top } = canvas.getBoundingClientRect()
  const [cssX, cssY] = [clientX - left, clientY - top]
  const [x, y] = [(cssX / canvas.width) * 2 - 1, -((cssY / canvas.height) * 2 - 1)]
  return {
    x,
    y
  }
}

function createBuffer(gl, attr, config) {
  gl.enableVertexAttribArray(attr)
  const { size = 2, type = gl.FLOAT, normalize = false, stride = 0, offset = 0 } = config
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.vertexAttribPointer(attr, size, type, normalize, stride, offset)
  return buffer
}

function randomColor() {
  const { r, g, b } = new THREE.Color(Math.random() * 0xffffff)
  return { r, g, b, a: 1 }
}

export { loadShader, initShaders, getMousePosInWebgl, createBuffer, randomColor }
