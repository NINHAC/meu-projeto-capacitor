import { dicionario } from '$lib/dicionario.js';

export async function load({ params }) {
	const nome = params.nome.toLowerCase();
	const resultado = dicionario.find((p) => p.palavra.toLowerCase() === nome);

	return {
		data: resultado || { palavra: 'Palavra não encontrada', definicoes: [] }
	};
}