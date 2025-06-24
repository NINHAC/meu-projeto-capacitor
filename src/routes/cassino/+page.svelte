<script lang="ts">
	let min = 1;
	let max = 100;
	let resultNumber: number | null = null;
	let resultItem: string | null = null;
	let itemHistory: string[] = [];
	let history: { number: number; item: string }[] = [];
	let noRepeat = true;

	const items = [
		'Carro',
		'Moto',
		'Viagem',
		'TV 4K',
		'iPhone',
		'Nada 😢',
		'R$1.000',
		'PlayStation 5'
	];

	let availableItems = [...items];

	const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');

	function sortear() {
		if (min >= max) {
			alert('O valor mínimo deve ser menor que o valor máximo.');
			return;
		}

		audio.play();

		resultNumber = Math.floor(Math.random() * (max - min + 1)) + min;

		let selectedItem: string;

		if (noRepeat) {
			if (availableItems.length === 0) {
				alert('Todos os prêmios já foram sorteados!');
				return;
			}
			const index = Math.floor(Math.random() * availableItems.length);
			selectedItem = availableItems.splice(index, 1)[0];
		} else {
			const index = Math.floor(Math.random() * items.length);
			selectedItem = items[index];
		}

		resultItem = selectedItem;
		history.unshift({ number: resultNumber, item: resultItem });

		if (history.length > 10) {
			history.pop();
		}
	}

	function resetar() {
		resultNumber = null;
		resultItem = null;
		history = [];
		availableItems = [...items];
	}

	function isSelected(item: string) {
		return item === resultItem;
	}
</script>

<div class="container">
	<h2>🎁 Sorteador de Prêmios</h2>

	<div>
		<label>Mínimo:</label>
		<input type="number" bind:value={min} min="0" />
		<label>Máximo:</label>
		<input type="number" bind:value={max} />
	</div>

	<div class="toggle">
		<input type="checkbox" bind:checked={noRepeat} id="repeticao" />
		<label for="repeticao">Evitar repetir prêmios</label>
	</div>

	<button on:click={sortear}>🎲 Sortear</button>
	<button on:click={resetar}>🔄 Resetar</button>

	<div class="roleta">
		{#each items as item}
			<div class="item-roleta {isSelected(item) ? 'selected' : ''}">
				{item}
			</div>
		{/each}
	</div>

	{#if resultNumber !== null}
		<div class="result">Número sorteado: {resultNumber}</div>
	{/if}

	{#if resultItem}
		<div class="result">Prêmio: {resultItem}</div>
	{/if}

	{#if history.length > 0}
		<div class="history">
			<h4>📜 Histórico de Sorteios:</h4>
			<ul>
				{#each history as entry, i}
					<li>{i + 1}. Número: {entry.number}, Prêmio: {entry.item}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 500px;
		margin: auto;
		padding: 1rem;
		text-align: center;
		font-family: sans-serif;
		background: #f5f5f5;
		border-radius: 10px;
		box-shadow: 0 0 10px #ccc;
	}

	input,
	button {
		padding: 0.5rem;
		margin: 0.5rem;
		font-size: 1rem;
	}

	.result {
		margin-top: 1rem;
		font-size: 1.4rem;
		font-weight: bold;
		color: #006400;
		transition: transform 0.3s ease;
		animation: pop 0.3s ease;
	}

	@keyframes pop {
		0% {
			transform: scale(0.5);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.history {
		text-align: left;
		margin-top: 1rem;
		background: #fff;
		padding: 1rem;
		border-radius: 8px;
		max-height: 200px;
		overflow-y: auto;
	}

	label {
		font-weight: bold;
	}

	.toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.roleta {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 1rem;
		gap: 1rem;
		background: #fff;
		padding: 1rem;
		border-radius: 12px;
		box-shadow: inset 0 0 5px #ccc;
	}

	.item-roleta {
		padding: 0.6rem 1rem;
		background: #eee;
		border-radius: 8px;
		font-weight: bold;
		transition: all 0.3s ease;
		border: 2px solid transparent;
	}

	.item-roleta.selected {
		background: #ffdf80;
		border-color: #ffa500;
		transform: scale(1.1);
		color: #000;
	}
</style>
