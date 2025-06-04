<script context="module">
  export function load() {
    return { title: 'Lista de Tarefas' };
  }
</script>

<script>
  import Header from '$lib/components/Header.svelte';
  import SideBar from '$lib/components/SideBar.svelte';
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import * as bootstrap from 'bootstrap';

  export let data;
</script>

<title>{data.title || 'Título Padrão'}</title>

<Header />

<div class="container-fluid py-5 mt-1 mb-4">
  <slot />
</div>

<footer class="navbar bg-body-tertiary fixed-bottom">
  <div class="container-fluid">Made with SvelteKit, CapacitorJS, Drizzle, Sql.js e Bootstrap</div>
</footer>

<SideBar />