<script lang="ts">
import { onMount } from "svelte";
import { cn } from "$lib/utils";
import { toast } from "svelte-sonner";
import { Button } from "$lib/components/ui/button";

interface Props {
  class?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

let {
  class: className = "",
  quantity = 120,
  staticity = 50,
  ease = 20,
  refresh = true,
}: Props = $props();

let canvas: HTMLCanvasElement | null = $state(null);
let gl: WebGL2RenderingContext | null = $state(null);

// NEU: Ein State, der kontrolliert, ob das Gyroskop aktiv lauschen soll
let gyroEnabled = $state(false);
let showGyroButton = $state(false);

let mouse = { x: 0, y: 0 };

let canvasSize = { w: 0, h: 0 };

function handleMouseMove(event: MouseEvent) {
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();

  mouse.x = event.clientX - rect.left - rect.width / 2;
  mouse.y = event.clientY - rect.top - rect.height / 2;
}

function handleDeviceOrientation(event: DeviceOrientationEvent) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  let tiltX = Math.max(-45, Math.min(45, event.gamma || 0));
  let tiltY = Math.max(-45, Math.min(45, (event.beta || 0) - 45));
  mouse.x = (tiltX / 45) * (rect.width / 2);
  mouse.y = (tiltY / 45) * (rect.height / 2);
}

function requestGyro() {
  if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
    (DeviceOrientationEvent as any)
      .requestPermission()
      .then((state: string) => {
        if (state === "granted") {
          gyroEnabled = true; // Svelte aktiviert den Listener jetzt magisch!
        }
      })
      .catch(console.error);
  }
}

const vsSource = `#version 300 es
  in vec2 a_position;
  in vec4 a_color;
  in float a_size;

  uniform vec2 u_resolution;

  out vec4 v_color;

  void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 clipSpace = (zeroToOne * 2.0) - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);
    gl_PointSize = a_size;
    v_color = a_color;
  }
  `;

const fsSource = `#version 300 es
  precision mediump float;

  in vec4 v_color;
  out vec4 outColor;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5)) * 2.0;
    float alpha = 1.0 - smoothstep(0.8, 1.0, dist);

    if (dist > 1.0) discard;

    outColor = vec4(v_color.rgb, v_color.a * alpha);
  }
  `;

function handleResize() {
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;

  canvasSize.w = window.innerWidth;
  canvasSize.h = window.innerHeight;

  canvas.width = canvasSize.w * dpr;
  canvas.height = canvasSize.h * dpr;

  canvas.style.width = `${canvasSize.w}px`;
  canvas.style.height = `${canvasSize.h}px`;
}

onMount(() => {
  if (!canvas) return;

  if (
    typeof (DeviceOrientationEvent as any) !== "undefined" &&
    typeof (DeviceOrientationEvent as any).requestPermission === "function"
  ) {
    showGyroButton = true;
  } else if (window.DeviceOrientationEvent) {
    gyroEnabled = true; // Android
  }

  gl = canvas.getContext("webgl2", { alpha: true, antialias: true });

  if (!gl) {
    console.error("WebGL2 not supported");
    return;
  }

  handleResize();

  const vShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vShader, vsSource);
  gl.compileShader(vShader);
  const fShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fShader, fsSource);
  gl.compileShader(fShader);
  const program = gl.createProgram()!;
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);

  const posLoc = gl.getAttribLocation(program, "a_position");
  const colorLoc = gl.getAttribLocation(program, "a_color");
  const sizeLoc = gl.getAttribLocation(program, "a_size");
  const resLoc = gl.getUniformLocation(program, "u_resolution");

  const floatsPerParticle = 7;
  const particleData = new Float32Array(quantity * floatsPerParticle);

  const nord11 = [191 / 255, 97 / 255, 106 / 255];
  const nord14 = [163 / 255, 190 / 255, 140 / 255];

  const circles = Array.from({ length: quantity }, () => {
    const isRed = Math.random() > 0.5;
    return {
      x: Math.random() * (window.innerWidth || 1000),
      y: Math.random() * (window.innerHeight || 1000),
      translateX: 0,
      translateY: 0,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      magnetism: 0.1 + Math.random() * 4,
      size: Math.random() * 2 + 3,
      color: isRed ? nord11 : nord14,
      targetAlpha: Math.random() * 0.5 + 0.2,
    };
  });

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, particleData.byteLength, gl.DYNAMIC_DRAW);

  const stride = floatsPerParticle * 4;
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(colorLoc);
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, stride, 2 * 4);
  gl.enableVertexAttribArray(sizeLoc);
  gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, stride, 6 * 4);

  let animationFrameId: number;

  function render() {
    // Nur zeichnen, wenn das Canvas auch wirklich eine Größe hat
    if (canvasSize.w === 0 || canvasSize.h === 0) {
      animationFrameId = requestAnimationFrame(render);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      const p = circles[i];

      p.x += p.dx;
      p.y += p.dy;
      p.translateX +=
        ((mouse.x / staticity) * p.magnetism - p.translateX) / ease;
      p.translateY +=
        ((mouse.y / staticity) * p.magnetism - p.translateY) / ease;

      // Dynamischer Respawn anhand der echten Canvas-Größe
      if (p.x < -10 || p.x > canvasSize.w + 10) {
        p.x = p.x < 0 ? canvasSize.w + 10 : -10;
        p.translateX = 0;
      }
      if (p.y < -10 || p.y > canvasSize.h + 10) {
        p.y = p.y < 0 ? canvasSize.h + 10 : -10;
        p.translateY = 0;
      }

      const edgeX = Math.min(
        p.x + p.translateX,
        canvasSize.w - (p.x + p.translateX),
      );
      const edgeY = Math.min(
        p.y + p.translateY,
        canvasSize.h - (p.y + p.translateY),
      );
      const dist = Math.min(edgeX, edgeY);
      let drawAlpha = p.targetAlpha;
      if (dist < 50) {
        drawAlpha = p.targetAlpha * Math.max(0, dist / 50);
      }

      const idx = i * floatsPerParticle;
      particleData[idx + 0] = (p.x + p.translateX) * window.devicePixelRatio;
      particleData[idx + 1] = (p.y + p.translateY) * window.devicePixelRatio;
      particleData[idx + 2] = p.color[0];
      particleData[idx + 3] = p.color[1];
      particleData[idx + 4] = p.color[2];
      particleData[idx + 5] = drawAlpha;
      particleData[idx + 6] = p.size * 2.0 * window.devicePixelRatio;
    }

    gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
    gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, particleData);

    // NEU UND WICHTIG: Viewport-Größe an aktuelle physische Auflösung anpassen
    gl!.viewport(0, 0, canvas!.width, canvas!.height);

    gl!.clearColor(0, 0, 0, 0);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    gl!.useProgram(program);
    gl!.uniform2f(resLoc, canvas!.width, canvas!.height);
    gl!.enable(gl!.BLEND);
    gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA);
    gl!.drawArrays(gl!.POINTS, 0, quantity);

    animationFrameId = requestAnimationFrame(render);
  }
  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
    gl!.deleteProgram(program);
  };
});
</script>

<svelte:window
  onmousemove={handleMouseMove}
  ondeviceorientation={gyroEnabled ? handleDeviceOrientation : null}
  onresize={handleResize}
/>

<div class={cn("absolute inset-0 z-0", className)} aria-hidden="true">
  <canvas bind:this={canvas} class="w-full h-full block"></canvas>

  {#if showGyroButton}
    <Button.Root
      onclick={requestGyro}
      class={cn("absolute bottom-6 right-6 z-50 rounded-md px-5 py-3 text-sm font-semibold")}
    >
      Partikel-Sensor aktivieren
    </Button.Root>
  {/if}
</div>
