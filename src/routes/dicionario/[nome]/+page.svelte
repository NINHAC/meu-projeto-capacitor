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

  <style>
    main {
        max-width: 700px;
        margin: 2rem auto;
        padding: 1rem;
        background-color: #fefefe;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    h1 {
        color: #2F4F4F;
        font-size: 2.2rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    h4 {
        color: #4682B4;
        font-size: 1.3rem;
        margin-top: 2rem;
        margin-bottom: 0.8rem;
    }

    p {
        color: #333;
        background-color: #f0f8ff;
        padding: 0.8rem;
        border-radius: 6px;
        margin-bottom: 1rem;
    }

    a {
        color: #006699;
        text-decoration: none;
        font-weight: 500;
    }

    a:hover {
        text-decoration: underline;
        color: #003f5c;
    }
</style>
