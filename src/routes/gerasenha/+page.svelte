<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    let passwordLength = 8;
    let includeUppercase = false;
    let includeSymbols = false;
    let includeDigits = false;
    let multiplePasswords = false;
    let generatedPasswords = writable([]);
  
    const generatePassword = () => {
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const digits = "0123456789";
      const symbols = "!@#$%^&*()_+[]{}|;:',.<>?/";
      let characters = lowercase;
  
      if (includeUppercase) characters += uppercase;
      if (includeSymbols) characters += symbols;
      if (includeDigits) characters += digits;
  
      const createPassword = () =>
        Array.from({ length: passwordLength }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  
      if (multiplePasswords) {
        const newPasswords = Array.from({ length: 5 }, () => createPassword());
        generatedPasswords.set(newPasswords);
      } else {
        generatedPasswords.set([createPassword()]);
      }
    };
  
    const copyToClipboard = (password) => {
      navigator.clipboard.writeText(password).then(() => alert('Senha copiada!'));
    };
  
    const clearAll = () => {
      passwordLength = 8;
      includeUppercase = false;
      includeSymbols = false;
      includeDigits = false;
      multiplePasswords = false;
      generatedPasswords.set([]);
    };
  </script>
  
  <style>
    .app {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background: #f0f0f0;
      border-radius: 10px;
    }
    .controls, .passwords {
      margin-bottom: 20px;
    }
    button {
      background: black;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
      border-radius: 5px;
      margin-right: 5px;
    }
    button:hover {
      background: #333;
    }
    input[type="range"] {
      width: 100%;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    
    input[type="text"]:hover {
    background-color: #e0e0e0;
    border: 1px solid #333;
    transition: background-color 0.3s ease, border 0.3s ease;
}


  </style>
  
  <div class="app">
    <h2>Gerador de Senhas</h2>
  
    <div class="controls">
      <label for="passwordLength">Tamanho da senha: {passwordLength}</label>
      <input
        id="passwordLength"
        type="range"
        min="4"
        max="32"
        bind:value={passwordLength}
      />
  
      <label>
        <input type="checkbox" bind:checked={includeUppercase} />
        Incluir letras maiúsculas
      </label>
      <label>
        <input type="checkbox" bind:checked={includeSymbols} />
        Incluir símbolos
      </label>
      <label>
        <input type="checkbox" bind:checked={includeDigits} />
        Incluir dígitos
      </label>
      <label>
        <input type="checkbox" bind:checked={multiplePasswords} />
        Gerar múltiplas senhas
      </label>
  
      <button on:click={generatePassword}>Gerar senha</button>
      <button on:click={clearAll}>Limpar</button>
    </div>
  
    <div class="passwords">
      {#each $generatedPasswords as password}
        <div>
          <input type="text" readonly value={password} />
          <button on:click={() => copyToClipboard(password)}>Copiar</button>
        </div>
      {/each}
    </div>
  </div>
  
  
  