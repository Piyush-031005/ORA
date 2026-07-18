import * as THREE from 'three';

export const LIGHTING = {
  ambient: { intensity: 0.3, color: '#ffffff' },
  main: { intensity: 3.0, color: '#ffffff', position: [5, 8, 5] as [number, number, number] },
  fill: { intensity: 1.2, color: '#27187D', position: [-5, 2, -3] as [number, number, number] },
  rim: { intensity: 2.0, color: '#00D4FF', position: [0, -3, -5] as [number, number, number] },
  point: { intensity: 1.5, color: '#C8F0E8', position: [0, 5, 0] as [number, number, number] },
};

export const CAMERA = {
  fov: 45,
  near: 0.1,
  far: 1000,
  position: [0, 0, 4] as [number, number, number],
};

export const MATERIAL_PRESETS = {
  tooth: {
    metalness: 0.1,
    roughness: 0.2,
    envMapIntensity: 1.5,
    color: '#F7F7FF',
  },
  enamel: {
    metalness: 0.15,
    roughness: 0.1,
    envMapIntensity: 2,
    color: '#E8E8F5',
    transparent: true,
    opacity: 0.92,
  },
  gum: {
    metalness: 0,
    roughness: 0.8,
    color: '#C48A8A',
  },
};

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export function easeInOutExpo(x: number): number {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

export function getMouseNDC(
  clientX: number,
  clientY: number,
  width: number,
  height: number
): { x: number; y: number } {
  return {
    x: (clientX / width) * 2 - 1,
    y: -(clientY / height) * 2 + 1,
  };
}
