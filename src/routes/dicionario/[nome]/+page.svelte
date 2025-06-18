<script>
    
    let { data } = $props()
    
  </script>
  
  <h1><b>{data.data.palavra.toUpperCase()}</b></h1>
  
  {#if data.data.definicoes.length > 0}
    <h4>Definições</h4>
    {#each data.data.definicoes as definicao}
      <p>
        {#each definicao.split(' ') as palavra_part}
          <a href={'/dicionario/' + palavra_part.replace(/[.,!?]/g, '')}>{palavra_part}</a>{' '}
        {/each}
      </p>
    {/each}
  {/if}