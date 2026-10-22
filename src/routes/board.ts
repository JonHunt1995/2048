export type Cell = {
	id: number,
	val: number
}

export type Direction = {
	"Up",
	"Down",
	"Left",
	"Right"
}

export type Game = {
	board: Cell[],
	score: number,
	highest: number,
	turn: number
}

export const range = (start, stop, step=1) =>
  Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step,
  );

const compareArrays = (a, b) =>
  a.length === b.length &&
  a.every((element, index) => element.val === b[index].val && element.id === b[index].id);

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export const numsToCells = (nums: number[]): Cell[] => nums.map((num, i) => ({id: (i+1), val: num}))

export const mergePairs = (game: Game, indices: number[]): Game  => {
	let newBoard = JSON.parse(JSON.stringify(game.board));
	let score = game.score;

	for (let i = 0; i < indices.length - 1; i++) {
		const first = indices[i];
		const second = indices[i+1];
		if (newBoard[first].val == 0) continue;
		if (newBoard[first].val !== newBoard[second].val) continue;
		newBoard[first].val *= 2;
		newBoard[second].val = 0;
		score += newBoard[first].val;
	}
	return {
		board: newBoard,
		highest: game.highest,
		score: score
	}
} 

export const shiftRowOrCol = (
	game: Game, 
	indices: number[], 
	fn: (...nums: number) => number): Game => {
	let zeroIndices = indices.filter((idx) => game.board[idx].val === 0)
	if (zeroIndices.length === 0) return game;
	let zeroToSwap = fn(...zeroIndices);
	let newBoard = JSON.parse(JSON.stringify(game.board));

	for (const idx of indices) {
		if (newBoard[idx].val === 0) continue;
		let zeroIndices = indices.filter((idx) => newBoard[idx].val === 0);
		let zeroToSwap = fn(...zeroIndices);
		if (fn(idx, zeroToSwap) === idx) continue;
		[newBoard[idx], newBoard[zeroToSwap]] = [newBoard[zeroToSwap], newBoard[idx]];
	}
	return {
		score: game.score,
		board: newBoard,
		turn: game.turn,
		highest: game.highest
	}
};

const spawnNum = (game: Game): Game => {
	let newBoard = JSON.parse(JSON.stringify(game.board));
	let blanks = newBoard.filter((cell) => cell.val === 0);
	let idToSpawn = blanks[getRandomInt(0, blanks.length)].id;

	for (let i = 0; i < newBoard.length; i++) {
		if (newBoard[i].id === idToSpawn) {
			let spawned = Math.random() > 0.9 ? 4 : 2
			newBoard[i].val = spawned;
			//console.log(spawned);
		}
	}
	return {
		board: newBoard,
		highest: game.highest,
		score: game.score,
		turn: game.turn
	}
}; 

export const playTurn = (game: Game, vert=true, asc=true): Game => {
	const oldBoard = JSON.parse(JSON.stringify(game.board));
	const fn = asc ? Math.min : Math.max;
	let newGame = JSON.parse(JSON.stringify(game));
	let score = game.score;
	let turn = game.turn;
	let indices: number[] = []; 

	for (let i = 0; i < 4; i++) {
		if (vert) { 
			indices = range(i, 16, 4);
		} else {
			indices = range(i*4, i*4 + 4)
		}

		if (!asc) { 
			indices.reverse()
		}

		newGame = shiftRowOrCol(newGame, indices, fn);
		newGame = mergePairs(newGame, indices);
		newGame = shiftRowOrCol(newGame, indices, fn);
	}

	if (!compareArrays(oldBoard,newGame.board)) {
		newGame = spawnNum(newGame);
		turn++;
	}
	return {
		board: newGame.board,
		score: newGame.score,
		highest: newGame.board.reduce((acc, cell) => Math.max(acc, cell.val), 0),
		turn: turn
	}
}