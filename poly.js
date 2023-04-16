const defArr = () => {
  return {
    gl: null,
    veritces: [],
    geoData: [],
    size: 2,
    attrName: 'a_Position',
    count: 0,
    types: ['POINTS']
  }
}

export class Poly {
  constructor(attr) {
    Object.assign(this, defArr(), attr)
    this.init()
  }

  init() {
    const { gl, size, attrName, vertices } = this
    if (!gl) return
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW),
      this.updateBuffer(gl)
    const a_Position = gl.getAttribLocation(gl.program, attrName)
    gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)
  }

  addVertice(...params) {
    this.vertices.push(...params)
    this.updateBuffer()
  }

  popVertice() {
    this.vertices.pop()
    this.updateCount()
  }

  setVertice(index, ...params) {
    this.vertices.splice(index, 0, ...params)
    this.updateBuffer()
  }

  updateBuffer() {
    const { gl, vertices } = this
    this.updateCount()
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  }

  updateCount() {
    this.count = this.vertices.length / this.size
  }

  updateVertices(params) {
    const { geoData } = this
    const vertices = []
    geoData.forEach((data) => {
      params.forEach((key) => {
        vertices.push(data[key])
      })
    })
  }

  draw(types = this.types) {
    const { gl, count } = this
    gl.clear(gl.COLOR_BUFFER_BIT)
    for (let type of types) {
      gl.drawArrays(gl[type], 0, count)
    }
  }
}
