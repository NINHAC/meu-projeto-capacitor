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
<style>
    div {
        margin: 1rem 0;
    }

    input.form-control {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f9f9f9;
        color: #333;
    }

    input.form-control::placeholder {
        color: #888;
    }

    button.btn-primary {
        background-color: #4682B4;
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
    }

    button.btn-primary:hover {
        background-color: #5a9bd6;
    }

    ul, ol {
        padding-left: 1.5rem;
        list-style-type: none;
    }

    li {
        margin-bottom: 0.5rem;
    }

    a {
        color: #006699;
        text-decoration: none;
        transition: color 0.2s;
    }

    a:hover {
        color: #003f5c;
    }
</style>
