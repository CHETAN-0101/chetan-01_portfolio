import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// ─── Neural network background geometry ──────────────────────────────────────

function buildNeural(nodeCount = 80, spread = 14, edgeThreshold = 3.2) {
  const nodes = Array.from({ length: nodeCount }, () => new THREE.Vector3(
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread * 0.65,
    (Math.random() - 0.5) * spread * 0.4,
  ))

  const edgePoints = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < edgeThreshold) {
        edgePoints.push(nodes[i].clone(), nodes[j].clone())
      }
    }
  }

  const nodePositions = new Float32Array(nodes.flatMap(n => [n.x, n.y, n.z]))
  const edgePositionsArr = new Float32Array(edgePoints.flatMap(p => [p.x, p.y, p.z]))

  return { nodePositions, edgePositionsArr, nodeCount: nodes.length, edgeCount: edgePoints.length / 2 }
}

// ─── 2D Geometry helpers ───────────────────────────────────────────────────

function makeRingGeo(radius, seg = 64) {
  const pts = []
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
  }
  return new THREE.BufferGeometry().setFromPoints(pts)
}

function makeHexGeo(r = 1, tilt = 0) {
  const pts = []
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6 + tilt
    pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0))
  }
  return new THREE.BufferGeometry().setFromPoints(pts)
}

// ─── Role slider data ─────────────────────────────────────────────────────────
const ROLES = ['MACHINE LEARNING', 'APP DEVELOPER', 'CYBER SECURITY', 'UI / UX DESIGNER', 'FULL STACK DEV']

// ─── Stats card ───────────────────────────────────────────────────────────────
const StatsCard = () => {
  const [roleIdx, setRoleIdx] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length)
        setFadeIn(true)
      }, 350)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <Html center position={[0, 0, 1]} style={{ pointerEvents: 'none', width: '340px' }} zIndexRange={[0, 0]}>
      <div style={{
        background: 'rgba(4, 12, 4, 0.72)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        border: '1px solid rgba(0,255,136,0.12)',
        borderRadius: 20,
        padding: '28px 32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        boxShadow: '0 0 60px rgba(0,255,136,0.08), inset 0 0 30px rgba(0,255,136,0.03)',
      }}>
        <h1 style={{
          fontSize: 34,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
          textAlign: 'center',
        }}>
          Chetan <span style={{ color: '#00ff88' }}>Jadhav</span>
        </h1>

        <p style={{
          fontSize: 12,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '0.28em',
          color: '#00ff88',
          marginTop: 10,
          marginBottom: 20,
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.35s ease',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          {ROLES[roleIdx]}
        </p>

        <div style={{ width: '100%', height: 1, background: 'rgba(0,255,136,0.1)', marginBottom: 20 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '100%', gap: '0 16px' }}>
          {[
            { num: '15+', label: 'Projects' },
            { num: '8x', label: 'Hackathons' },
            { num: '3+', label: 'Yrs Coding' },
          ].map(({ num, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: '#00ff88', fontFamily: 'sans-serif', lineHeight: 1 }}>{num}</span>
              <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Html>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

const HeroScene = () => {
  const { nodePositions, edgePositionsArr } = useMemo(() => buildNeural(90, 15, 3.4), [])

  const nodeBuf = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    return geo
  }, [nodePositions])

  const edgeBuf = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(edgePositionsArr, 3))
    return geo
  }, [edgePositionsArr])

  // 2D Geometry for "outside the card": Icosahedron and Asteroid Cage
  const icosaGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(4.2, 0)
    return new THREE.EdgesGeometry(geo)
  }, [])

  const asteroidGeo = useMemo(() => {
    // Low-poly sphere with randomized vertices to look like an asteroid
    const geo = new THREE.DodecahedronGeometry(5.8, 0)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      const s = 1 + (Math.random() - 0.5) * 0.4
      pos.setXYZ(i, x * s, y * s, z * s)
    }
    return new THREE.EdgesGeometry(geo)
  }, [])

  const groupRef = useRef()
  const geometryRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.06) * 0.12
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.05
    }
    if (geometryRef.current) {
      // Rotation for the outer wireframes
      geometryRef.current.rotation.y = t * 0.08
      geometryRef.current.rotation.z = Math.sin(t * 0.1) * 0.15

      // Floating pulse
      geometryRef.current.scale.setScalar(1 + Math.sin(t * 0.3) * 0.02)
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 8, 8]} intensity={1.2} color="#00ff88" />
      <pointLight position={[-6, -5, 4]} intensity={0.8} color="#004433" />

      {/* Neural network constellation */}
      <group ref={groupRef}>
        <lineSegments geometry={edgeBuf}>
          <lineBasicMaterial color="#00ff88" transparent opacity={0.12} />
        </lineSegments>
        <points geometry={nodeBuf}>
          <pointsMaterial
            color="#00ff88"
            size={0.07}
            sizeAttenuation
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </points>
      </group>

      {/* 2D Wireframe Shapes outside the card */}
      <group ref={geometryRef}>
        {/* 2D Icosahedron Wireframe */}
        <lineSegments geometry={icosaGeo}>
          <lineBasicMaterial color="#00ff88" transparent opacity={0.35} />
        </lineSegments>
        {/* 2D Asteroid Wireframe (cage) */}
        <lineSegments geometry={asteroidGeo}>
          <lineBasicMaterial color="#a855f7" transparent opacity={0.25} />
        </lineSegments>
      </group>

      {/* Identity card centered */}
      <StatsCard />
    </>
  )
}

export default HeroScene
