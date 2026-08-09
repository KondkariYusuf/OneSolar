"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  dotColor?: string
  lineColor?: string
}

interface SolarPanelSpec {
  center: [number, number]
  widthDeg: number
  heightDeg: number
}

const SOLAR_FARMS: SolarPanelSpec[] = [
  { center: [-115, 35], widthDeg: 6, heightDeg: 4.5 },
  { center: [-108, 32], widthDeg: 5, heightDeg: 3.8 },
  { center: [12, 27], widthDeg: 7, heightDeg: 5 },
  { center: [20, 24], widthDeg: 6, heightDeg: 4.2 },
  { center: [28, 28], widthDeg: 5.5, heightDeg: 4 },
  { center: [72, 27], widthDeg: 6.5, heightDeg: 4.8 },
  { center: [78, 23], widthDeg: 5.5, heightDeg: 4 },
  { center: [105, 41], widthDeg: 7, heightDeg: 5.2 },
  { center: [-69, -23], widthDeg: 5.5, heightDeg: 4 },
  { center: [-5, 38], widthDeg: 5, heightDeg: 3.5 },
  { center: [134, -25], widthDeg: 6.5, heightDeg: 4.8 },
  { center: [46, 24], widthDeg: 6, heightDeg: 4.2 },
]

const POWER_GRID_CONNECTIONS: [number, number][] = [
  [0, 2],
  [2, 11],
  [11, 5],
  [5, 7],
  [5, 10],
  [0, 8],
  [2, 9],
]

export default function RotatingEarth({
  width = 860,
  height = 860,
  className = "",
  dotColor = "#1C2E1E",
  lineColor = "#1C2E1E",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const containerWidth = width
    const containerHeight = height
    // Radius factor 2.15 ensures globe fits 100% inside canvas with padding
    const radius = Math.min(containerWidth, containerHeight) / 2.15

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr

    // Responsive 100% canvas sizing so wrapper div never clips canvas
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        if (!pointInPolygon(point, coordinates[0])) return false
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) return true
          }
        }
        return false
      }

      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.08

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
          }
        }
      }

      return dots
    }

    interface DotData {
      lng: number
      lat: number
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const isFrontFacing = (lng: number, lat: number) => {
      const rot = projection.rotate()
      const distance = d3.geoDistance([lng, lat], [-rot[0], -rot[1]])
      return distance < Math.PI / 2
    }

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.strokeStyle = lineColor
      context.lineWidth = 1.5 * scaleFactor
      context.globalAlpha = 0.25
      context.stroke()
      context.globalAlpha = 1

      if (landFeatures) {
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = lineColor
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 0.12
        context.stroke()
        context.globalAlpha = 1

        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = lineColor
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 0.35
        context.stroke()
        context.globalAlpha = 1

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight &&
            isFrontFacing(dot.lng, dot.lat)
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.3 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = dotColor
            context.globalAlpha = 0.7
            context.fill()
            context.globalAlpha = 1
          }
        })

        POWER_GRID_CONNECTIONS.forEach(([fromIdx, toIdx]) => {
          const farm1 = SOLAR_FARMS[fromIdx]
          const farm2 = SOLAR_FARMS[toIdx]
          const interpolator = d3.geoInterpolate(farm1.center, farm2.center)

          context.beginPath()
          let started = false
          for (let t = 0; t <= 1; t += 0.04) {
            const [lng, lat] = interpolator(t)
            const projected = projection([lng, lat])
            if (projected && isFrontFacing(lng, lat)) {
              if (!started) {
                context.moveTo(projected[0], projected[1])
                started = true
              } else {
                context.lineTo(projected[0], projected[1])
              }
            } else {
              started = false
            }
          }
          context.strokeStyle = "#F59E0B"
          context.lineWidth = 1.6 * scaleFactor
          context.globalAlpha = 0.6
          context.stroke()
          context.globalAlpha = 1
        })

        const pulseCycle = (Date.now() % 2500) / 2500
        POWER_GRID_CONNECTIONS.forEach(([fromIdx, toIdx]) => {
          const farm1 = SOLAR_FARMS[fromIdx]
          const farm2 = SOLAR_FARMS[toIdx]
          const interpolator = d3.geoInterpolate(farm1.center, farm2.center)
          const [lng, lat] = interpolator(pulseCycle)

          if (isFrontFacing(lng, lat)) {
            const projected = projection([lng, lat])
            if (projected) {
              context.beginPath()
              context.arc(projected[0], projected[1], 3.5 * scaleFactor, 0, 2 * Math.PI)
              context.fillStyle = "#FFD700"
              context.fill()
            }
          }
        })

        SOLAR_FARMS.forEach((farm) => {
          const [cLng, cLat] = farm.center
          if (!isFrontFacing(cLng, cLat)) return

          const halfW = farm.widthDeg / 2
          const halfH = farm.heightDeg / 2

          const c1: [number, number] = [cLng - halfW, cLat - halfH]
          const c2: [number, number] = [cLng + halfW, cLat - halfH]
          const c3: [number, number] = [cLng + halfW, cLat + halfH]
          const c4: [number, number] = [cLng - halfW, cLat + halfH]

          const p1 = projection(c1)
          const p2 = projection(c2)
          const p3 = projection(c3)
          const p4 = projection(c4)

          if (p1 && p2 && p3 && p4) {
            context.beginPath()
            context.moveTo(p1[0], p1[1])
            context.lineTo(p2[0], p2[1])
            context.lineTo(p3[0], p3[1])
            context.lineTo(p4[0], p4[1])
            context.closePath()

            context.fillStyle = "#091D34"
            context.globalAlpha = 0.88
            context.fill()

            context.strokeStyle = "#FFD700"
            context.lineWidth = 1.8 * scaleFactor
            context.globalAlpha = 0.95
            context.stroke()

            context.strokeStyle = "#F59E0B"
            context.lineWidth = 1 * scaleFactor
            context.globalAlpha = 0.75

            const cols = 3
            for (let c = 1; c < cols; c++) {
              const ratio = c / cols
              const topLng = c1[0] + (c2[0] - c1[0]) * ratio
              const topLat = c1[1] + (c2[1] - c1[1]) * ratio
              const botLng = c4[0] + (c3[0] - c4[0]) * ratio
              const botLat = c4[1] + (c3[1] - c4[1]) * ratio

              const pt = projection([topLng, topLat])
              const pb = projection([botLng, botLat])
              if (pt && pb) {
                context.beginPath()
                context.moveTo(pt[0], pt[1])
                context.lineTo(pb[0], pb[1])
                context.stroke()
              }
            }

            const rows = 2
            for (let r = 1; r < rows; r++) {
              const ratio = r / rows
              const leftLng = c1[0] + (c4[0] - c1[0]) * ratio
              const leftLat = c1[1] + (c4[1] - c1[1]) * ratio
              const rightLng = c2[0] + (c3[0] - c2[0]) * ratio
              const rightLat = c2[1] + (c3[1] - c2[1]) * ratio

              const pl = projection([leftLng, leftLat])
              const pr = projection([rightLng, rightLat])
              if (pl && pr) {
                context.beginPath()
                context.moveTo(pl[0], pl[1])
                context.lineTo(pr[0], pr[1])
                context.stroke()
              }
            }

            context.globalAlpha = 1
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!response.ok) throw new Error("Failed to load land data")

        landFeatures = await response.json()

        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 16)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat })
          })
        })

        render()
        setIsLoading(false)
      } catch {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    let targetRotX = 0
    let targetRotY = -15
    let currentRotX = 0
    let currentRotY = -15

    const handleMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth - 0.5
      const normY = e.clientY / window.innerHeight - 0.5
      targetRotX = normX * 180
      targetRotY = -normY * 75
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const normX = touch.clientX / window.innerWidth - 0.5
        const normY = touch.clientY / window.innerHeight - 0.5
        targetRotX = normX * 180
        targetRotY = -normY * 75
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    const rotate = () => {
      targetRotX += 0.25
      currentRotX += (targetRotX - currentRotX) * 0.05
      currentRotY += (targetRotY - currentRotY) * 0.05
      projection.rotate([currentRotX, currentRotY])
      render()
    }

    const rotationTimer = d3.timer(rotate)

    loadWorldData()

    return () => {
      rotationTimer.stop()
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [width, height, dotColor, lineColor])

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <p className="text-destructive font-semibold text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className={`relative flex items-center justify-center bg-transparent ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <span className="text-neutral-500 text-sm font-medium">Loading Globe...</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-transparent select-none pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
