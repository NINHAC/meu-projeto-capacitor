<script>
  import { onMount } from "svelte";

  let task = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
  let filter = "all";

  function addTask() {
    if (task.trim()) {
      tasks = [...tasks, { id: Date.now(), text: task, completed: false }];
      task = "";
      saveTasks();
    }
  }

  function toggleCompletion(id) {
    tasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
  }

  function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
  }

  function filteredTasks() {
    return filter === "completed" ? tasks.filter(task => task.completed) :
           filter === "pending" ? tasks.filter(task => !task.completed) :
           tasks;
  }
</script>

<style>
  body {
    background-color: #121212;
    color: #ffffff;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  main {
    background: linear-gradient(145deg, #1f4068, #162447);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 5px 5px 15px #0d1117, -5px -5px 15px #162447;
    width: 350px;
    text-align: center;
  }

  h1 {
    margin-bottom: 20px;
    color: #00bfff;
  }

  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1b1b2f;
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    transition: 0.3s;
  }

  .task:hover {
    background-color: #0f3460;
  }

  .completed {
    text-decoration: line-through;
    color: #e43f5a;
  }

  input {
    width: 70%;
    padding: 8px;
    margin: 10px 0;
    border-radius: 5px;
    border: none;
    background: #1b1b2f;
    color: #ffffff;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    background: #162447;
    color: white;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  button:hover {
    transform: scale(1.1);
    background-color: #1f4068;
  }

  .filter-buttons button {
    margin: 0 5px;
    padding: 8px 12px;
    background-color: #0f3460;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .filter-buttons button.active {
    background-color: #00bfff;
    color: black;
  }

  .filter-buttons button:hover {
    background-color: #1f4068;
  }
</style>

<main>
  <h1>Lista de Tarefas</h1>
  <div class="filter-buttons">
    <button 
      on:click={() => filter = 'all'} 
      class={filter === 'all' ? 'active' : ''}
    >
      Todas
    </button>
    <button 
      on:click={() => filter = 'pending'} 
      class={filter === 'pending' ? 'active' : ''}
    >
      Pendentes
    </button>
    <button 
      on:click={() => filter = 'completed'} 
      class={filter === 'completed' ? 'active' : ''}
    >
      Concluídas
    </button>
  </div>
  <div>
    <input
      type="text"
      placeholder="Digite uma tarefa"
      bind:value={task}
      on:keydown={(e) => e.key === "Enter" && addTask()}
    />
    <button on:click={addTask}>Adicionar</button>
  </div>
  <ul>
    {#each filteredTasks() as task (task.id)}
      <li class="task">
        <span
          class={task.completed ? "completed" : ""}
          on:click={() => toggleCompletion(task.id)}
        >
          {task.text}
        </span>
        <button on:click={() => removeTask(task.id)}>Remover</button>
      </li>
    {/each}
  </ul>
</main>
