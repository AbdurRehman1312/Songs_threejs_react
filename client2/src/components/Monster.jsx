/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 monster.gltf 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/monster.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.307, 0]} rotation={[Math.PI / 2, 0, 0]} scale={1.171}>
        <mesh geometry={nodes.Body.geometry} material={materials.lambert2} />
        <mesh geometry={nodes.Body_fur.geometry} material={materials.Material} />
        <mesh geometry={nodes.eyes.geometry} material={materials.lambert2} position={[0, 0, 1.113]} scale={0.038} />
        <mesh geometry={nodes.Teeth.geometry} material={materials.lambert2} position={[0, 0, 1.113]} scale={0.038} />
        <mesh geometry={nodes.Top_Hair.geometry} material={materials.lambert2} position={[0, 0, 1.113]} scale={0.038} />
      </group>
    </group>
  )
}

useGLTF.preload('/monster.gltf')
