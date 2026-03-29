<script lang="ts">
import { cn } from "$lib/utils";
import { Canvas } from "@threlte/core";
import Scene from "./Scene.svelte";

interface Props {
  class?: string;
  quantity?: number;
}

let { class: className = "", quantity = 120 }: Props = $props();
let canvasSize = $state({ w: 0, h: 0 });
</script>

<svelte:window bind:innerWidth={canvasSize.w} bind:innerHeight={canvasSize.h} />

<div class={cn("fixed inset-0 w-full h-full z-[-1] no-print print:hidden animate-fade-in pointer-events-none", className)} aria-hidden="true">
  {#if canvasSize.w > 0}
    <Canvas>
      <Scene h1="" h2="" bind:canvasSize={canvasSize} {quantity} />
    </Canvas>
  {/if}
</div>
