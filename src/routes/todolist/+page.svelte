<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import ToDoList from '$lib/components/ToDoList.svelte';
	import * as bootstrap from 'bootstrap';

	let novaTarefa = $state('');
	let tarefas = $state([]);
	let tarefasPendentes = $derived(tarefas.filter((tarefa) => tarefa.status == 0));
	let tarefasConcluidas = $derived(tarefas.filter((tarefa) => tarefa.status == 1));
	let conteudoTarefaEditando = $state('');
	let tarefaEditando = $state();
	let tarefaExcluindo;
	let mensagemToast;
	let mostrarPendentes = true;
	let filtroBusca = '';
	let tarefasFiltradas = $derived(
		tarefas.filter(
			(t) =>
				t.conteudo.includes(filtroBusca) &&
				((t) => (mostrarPendentes ? t.status === 0 : t.status === 1))
		)
	);
	let totalTarefas = $derived(tarefas.length);
	let totalPendentes = $derived(tarefas.filter((t) => t.status === 0).length);
	let totalConcluidas = $derived(tarefas.filter((t) => t.status === 1).length);

	async function adicionarTarefa() {
		novaTarefa = novaTarefa.trim();
		if (!novaTarefa) {
			mensagemToast.show();
			return;
		}
		tarefas.push({ conteudo: novaTarefa, status: 0 });
		novaTarefa = '';
	}

	function editarTarefa(tarefa) {
		tarefaEditando = tarefa;
		conteudoTarefaEditando = tarefa.conteudo;
	}

	function confirmarEdicao() {
		if (!conteudoTarefaEditando.trim()) {
			mensagemToast.show();
			return;
		}
		tarefaEditando.conteudo = conteudoTarefaEditando;
		tarefaEditando = undefined;
	}

	function cancelarEdicao() {
		tarefaEditando = undefined;
	}

	function excluirTarefa(tarefa) {
		tarefaExcluindo = tarefa;
	}

	function confirmarExclusao() {
		tarefas = tarefas.filter((t) => t !== tarefaExcluindo);
		tarefaExcluindo = undefined;
	}

	function alterarStatus(tarefa, status) {
		tarefa.status = status;
	}

	function marcarTDSConcluidas() {
		tarefas.forEach((tarefa) => (tarefa.status = 0));
	}

	function alternarFiltro() {
		mostrarPendentes = !mostrarPendentes;
	}
	onMount(() => {
		mensagemToast = new bootstrap.Toast('#mensagemToast');
	});
</script>

{#each tarefas as tarefa (tarefa.id)}
	<div transition:fade></div>
{/each}

<div class="btn-group">
	<button class="btn btn-success" onclick={() => alterarStatus(tarefa, 1)}> Concluir</button>
	<button class="btn btn-warning" onclick={() => editarTarefa(tarefa)}> Editar</button>
	<button class="btn btn-danger" onclick={() => excluirTarefa(tarefa)}> Excluir</button>
</div>

<div class="fixed-top pt-5" style="z-index: 1020;">
	<form class="container-fluid input-group px-4 pt-3" onsubmit={adicionarTarefa}>
		<input class="form-control form-control-lg" placeholder="Nova tarefa" bind:value={novaTarefa} />
		<button type="submit" class="btn btn-primary input-group-text" aria-label="adicionar">
			<i class="bi bi-plus-lg"></i>
		</button>
	</form>
	<Toast msg={'Digite algo!'} />
</div>

<div class="container-fluid mt-5 pt-3">
	<ToDoList
		tarefas={tarefasPendentes}
		{tarefaEditando}
		bind:conteudoTarefaEditando
		{editarTarefa}
		{confirmarEdicao}
		{cancelarEdicao}
		{alterarStatus}
		{excluirTarefa}
	/>
	<hr />
	<ToDoList
		tarefas={tarefasConcluidas}
		{tarefaEditando}
		bind:conteudoTarefaEditando
		{editarTarefa}
		{confirmarEdicao}
		{cancelarEdicao}
		{alterarStatus}
		{excluirTarefa}
	/>
</div>

<Modal msg={'Deseja excluir a tarefa?'} acao={confirmarExclusao} />
