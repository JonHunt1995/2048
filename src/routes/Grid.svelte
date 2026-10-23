<script lang=ts>
	import { flip } from 'svelte/animate';
	let {game} = $props();
	let colors_to_nums: Record<number, string> = {
		0: '#cdc1b4',
		2: '#eee4da', 
		4: '#ede0c8', 
		8: '#f2b179', 
		16: '#f59563', 
		32: '#f67c5f', 
		64: '#f65e3b', 
		128: '#edcf72', 
		256: '#edcc61', 
		512: '#edc850', 
		1024: '#edc53f', 
		2048: '#edc22e'
	}
</script>
<div class="grid">
{#each game.board as {id, val} (id)}
	<div 
		class="cell"
		animate:flip={{duration: 200 }}
		style="background: {colors_to_nums[val]}; color: black"
		>{val ? val : ''}</div>
{/each}
</div>

<style>
	.grid {
	  display: grid;
		background: #cdc1b4;
		aspect-ratio: 1;
		width: 80vmin;
	  grid-template-columns: repeat(4, 1fr); 
	  gap: 2px;
	  justify-content: center;
	  margin: auto;
	  div {
		  aspect-ratio: 1;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  border-radius: 5px;
		  font: 2rem sans-serif;
		}
}
</style>