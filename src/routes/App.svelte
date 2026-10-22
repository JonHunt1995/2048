<script lang="ts">
	import Grid from './Grid.svelte';
	import {playTurn, Game} from './board';

	let game = $state<Game>(
		{board: 
	[
		{id: 1, val: 2},
		{id: 2, val: 2}, 
		{id: 3, val: 2},
		{id: 4, val: 2},
		{id: 5, val: 2},
		{id: 6, val: 2},
		{id: 7, val: 2},
		{id: 8, val: 2},
		{id: 9, val: 0},
		{id: 10, val: 0},
		{id: 11, val: 0},
		{id: 12, val: 0},
		{id: 13, val: 0},
		{id: 14, val: 0},
		{id: 15, val: 0},
		{id: 16, val: 0}
	],
	 score: 0,
	 highest: 2,
	 turn: 1
});

		function handleKeydown(event) {
		event.preventDefault();
		switch (event.code) {
			case 'ArrowLeft':
				game = playTurn(game, false, true);
				break;
			case 'ArrowUp':
				game = playTurn(game, true, true);
				break;
			case 'ArrowRight':
				game = playTurn(game, false, false);
				break;
			case 'ArrowDown':
				game = playTurn(game, true, false);
				break;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />
<section class="app">
	<h1>Score: {game.score} Highest: {game.highest} Turn: {game.turn}</h1>
	<Grid game={game}/>
</section>

<style>
	/* * {
		outline: 1px solid red;
	} */
	.app {
		height: 100dvh;
		width: 100dvw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
</style>

