import { Float32BufferAttribute, IcosahedronGeometry, Vector3 } from 'three'

class AsteroidGeometryI extends IcosahedronGeometry {
  public constructor(size = 1, numPoints = 50, roughness = 0.5) {
    super()

    // Массивы для вершин, нормалей, UV и индексов
    const vertices = []
    const normals = []
    const uvs = []
    const indices = []

    // Генерация случайных вершин
    for (let i = 0; i < numPoints; i++) {
      // Случайные координаты внутри сферы
      const r = size * (1 + Math.random() * roughness)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      // Вершины
      vertices.push(x, y, z)

      // Нормали (направлены от центра к вершинам)
      const normal = new Vector3(x, y, z).normalize()
      normals.push(normal.x, normal.y, normal.z)

      // UV координаты (проекция на сферу)
      const u = 0.5 + Math.atan2(z, x) / (2 * Math.PI)
      const v = 0.5 - Math.asin(y / r) / Math.PI
      uvs.push(u, v)
    }

    // Триангуляция точек (создание треугольников)
    for (let i = 0; i < numPoints - 2; i++) {
      indices.push(0, i + 1, i + 2)
    }

    // Присваиваем массивы к геометрии
    this.setIndex(indices)
    this.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    this.setAttribute('normal', new Float32BufferAttribute(normals, 3))
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
  }
}

export { AsteroidGeometryI }
