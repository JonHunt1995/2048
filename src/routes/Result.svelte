<script lang="ts">
    import type { Game }  from "./board";
    let { game }: {game: Game} = $props();
</script>

<dialog open class="result-dialog">
    <div class="result">
        <h2>Game Over!</h2>
        <p>Score: {game.score}</p>
        <p>Highest: {game.highest}</p>
        <p>Turns: {game.turn}</p>
    </div>
</dialog>

   <style>
        .result-dialog {
            border: none;
            border-radius: 8px;
            padding: 2rem;
            background: rgba(238, 228, 218, 0.95);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            text-align: center;
        }
    </style>