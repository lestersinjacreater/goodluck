"use client"

import type React from "react"
import { useEffect, useRef } from "react"

const codeSnippets = [
  "class Graph {",
  "addVertex(v) {",
  "addEdge(v, w) {",
  "DFS(v, visited) {",
  "BFS(startVertex) {",
  "function dijkstra(graph, start) {",
  "const mst = prim(graph);",
  "drawNode(x, y, label) {",
  "drawEdge(x1, y1, x2, y2) {",
  "animate() {",
]

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class CodeParticle {
      x: number
      y: number
      size: number
      text: string
      speed: number
      opacity: number
      fadeIn: boolean

      constructor() {
        this.x = Math.random() * (canvas?.width || 0)
        this.y = Math.random() * (canvas?.height || 0)
        this.size = Math.random() * 12 + 8
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        this.speed = Math.random() * 0.5 + 0.1
        this.opacity = 0
        this.fadeIn = true
      }

      update() {
        this.y += this.speed
        if (canvas && this.y > canvas.height) {
          this.y = 0 - this.size
          this.x = Math.random() * canvas.width
          this.opacity = 0
          this.fadeIn = true
        }

        if (this.fadeIn) {
          this.opacity += 0.01
          if (this.opacity >= 0.7) this.fadeIn = false
        } else {
          this.opacity -= 0.01
          if (this.opacity <= 0.1) this.fadeIn = true
        }
      }

      draw() {
        if (!ctx) return
        ctx.font = `${this.size}px Courier, monospace`
        ctx.fillStyle = `rgba(0, 150, 255, ${this.opacity})`
        ctx.fillText(this.text, this.x, this.y)
      }
    }

    class GraphNode {
      x: number
      y: number
      radius: number
      color: string
      connections: GraphNode[]

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.radius = 5
        this.color = "rgba(255, 255, 255, 0.5)"
        this.connections = []
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      connect(node: GraphNode) {
        this.connections.push(node)
      }

      drawConnections() {
        if (!ctx) return
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 1
        this.connections.forEach((node) => {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)
          ctx.stroke()
        })
      }
    }

    const particles: CodeParticle[] = []
    const particleCount = 30
    const graphNodes: GraphNode[] = []
    const nodeCount = 20

    for (let i = 0; i < particleCount; i++) {
      particles.push(new CodeParticle())
    }

    for (let i = 0; i < nodeCount; i++) {
      const node = new GraphNode(Math.random() * canvas.width, Math.random() * canvas.height)
      graphNodes.push(node)
    }

    // Create some random connections
    graphNodes.forEach((node) => {
      const connectionCount = Math.floor(Math.random() * 3) + 1
      for (let i = 0; i < connectionCount; i++) {
        const targetNode = graphNodes[Math.floor(Math.random() * nodeCount)]
        if (targetNode !== node) {
          node.connect(targetNode)
        }
      }
    })

    function animate() {
      if (!ctx) return
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      // Draw graph
      graphNodes.forEach((node) => {
        node.drawConnections()
        node.draw()
      })

      // Draw code particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

export default AnimatedBackground

