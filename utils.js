export function loadShader(gl, type, source) {
  // 创建着色器对象
  const shader = gl.createShader(type)
  // 设置着色器源码
  gl.shaderSource(shader, source)
  // 编译着色器
  gl.compileShader(shader)
  return shader
}

export function initShaders(gl, vsSource, fsSource) {
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

export function getMousePosInWebgl({ clientX, clientY }, canvas) {
  //鼠标在画布中的css位置
  const { left, top, width, height } = canvas.getBoundingClientRect()
  const [cssX, cssY] = [clientX - left, clientY - top]
  //解决坐标原点位置的差异
  const [halfWidth, halfHeight] = [width / 2, height / 2]
  const [xBaseCenter, yBaseCenter] = [cssX - halfWidth, cssY - halfHeight]
  // 解决y 方向的差异
  const yBaseCenterTop = -yBaseCenter
  //解决坐标基底的差异
  return {
    x: xBaseCenter / halfWidth,
    y: yBaseCenterTop / halfHeight
  }
}
