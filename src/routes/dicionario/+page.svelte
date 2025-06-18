<script>
	import { dicionario } from '$lib/dicionario.js';
	import { goto } from '$app/navigation';

	let palavra = $state('');
	let filtradas = $state(dicionario);

	function buscar() {
		if (palavra == '') {
			filtradas = dicionario;
			return;
		}

		filtradas = [];
		for (const termo of dicionario) {
			if (termo.palavra.startsWith(palavra)) {
				filtradas.push(termo);
			}
		}
	}

	function aleatorio() {
		const indiceAleatorio = Math.floor(Math.random() * dicionario.length);
		palavra = dicionario[indiceAleatorio].palavra;
		goto(`/dicionario/${palavra}`);
	}
    
</script>

<div>
	<input
		class="form-control"
		placeholder="Digite uma palavra"
		oninput={buscar}
		bind:value={palavra}
	/>
</div>

<button type="button" onclick={aleatorio} class="btn btn-primary">Palavra aleatória do dia</button>

<div>
	<uL>
		<ol>
			{#each filtradas as termo}
				<li>
					<a href="/dicionario/{termo.palavra}">{termo.palavra}</a>
				</li>
			{/each}
		</ol>
	</uL>
</div>