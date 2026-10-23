<script lang="ts">
	import Result from './Result.svelte';
	import Grid from './Grid.svelte';

	import {playTurn, canMove, range, numsToCells, spawnNum,type Game} from './board';

	function initGame(): Game {
		let game: Game = {
			board: numsToCells(range(0,16)),
		score: 0,
		highest: 2,
		turn: 1
		}

		for (let i = 0; i < 2; i++) {
		game = spawnNum(game);
		}

		return game;
	}

	let game = $state<Game>(initGame());
	let ongoing = $derived<boolean>(canMove(game));

	function handleKeydown(event: KeyboardEvent) {
		switch (event.code) {
			case 'ArrowLeft':
				event.preventDefault();
				game = playTurn(game, false, true);
				break;
			case 'ArrowUp':
				event.preventDefault();
				game = playTurn(game, true, true);
				break;
			case 'ArrowRight':
				event.preventDefault();
				game = playTurn(game, false, false);
				break;
			case 'ArrowDown':
				event.preventDefault();
				game = playTurn(game, true, false);
				break;
		}
	}

	let touchStartX = 0;
    let touchStartY = 0;

    function handleTouchStart(event: TouchEvent) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }

    function handleTouchEnd(event: TouchEvent) {
        const dx = event.changedTouches[0].clientX - touchStartX;
        const dy = event.changedTouches[0].clientY - touchStartY;
        const threshold = 30;

        if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                game = playTurn(game, false, false); // Right
            } else {
                game = playTurn(game, false, true);  // Left
            }
        } else {
            if (dy > 0) {
                game = playTurn(game, true, false);  // Down
            } else {
                game = playTurn(game, true, true);   // Up
            }
        }
    }
</script>

<svelte:window 
onkeydown={handleKeydown}
ontouchstart={handleTouchStart}
ontouchend={handleTouchEnd}
 />
{#if !ongoing}
	<Result game={game}/>
{/if}
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

