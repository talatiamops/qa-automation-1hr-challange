/** Simple localStorage-backed Todo app (with one intentional bug) */
(function() {
  const input = document.getElementById('new-todo');
  const addBtn = document.getElementById('add-btn');
  const list = document.getElementById('todo-list');
  const filterButtons = document.querySelectorAll('[data-filter]');

  /** @type {{id:number,text:string,completed:boolean}[]} */
  let todos = JSON.parse(localStorage.getItem('todos') || '[]');
  let currentFilter = 'all';

  function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function addTodo(text) {
    const id = Date.now();
    todos.push({ id, text, completed: false });
    save();
    render();
  }

  function toggleTodo(id) {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    save();
    render();
  }

  function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    save();
    render();
  }

  function render() {
    let filtered = todos;
    if (currentFilter === 'active') {
      // BUG: should be t.completed === false (or !t.completed)
      filtered = todos.filter(t => t.completed === true);
    } else if (currentFilter === 'completed') {
      filtered = todos.filter(t => t.completed === true);
    }
    list.innerHTML = '';
    for (const t of filtered) {
      const li = document.createElement('li');
      li.setAttribute('data-testid', 'todo-item');
      li.dataset.id = String(t.id);

      const left = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'toggle';
      checkbox.setAttribute('data-testid', 'toggle-checkbox');
      checkbox.checked = t.completed;
      checkbox.addEventListener('change', () => toggleTodo(t.id));
      left.appendChild(checkbox);

      const span = document.createElement('span');
      span.className = 'text' + (t.completed ? ' completed' : '');
      span.textContent = t.text;
      span.setAttribute('data-testid', 'todo-text');
      left.appendChild(span);
      left.style.display = 'flex';
      left.style.alignItems = 'center';
      left.style.gap = '0.5rem';
      li.appendChild(left);

      const right = document.createElement('div');
      right.className = 'right';
      const badge = document.createElement('span');
      badge.className = 'pill';
      badge.setAttribute('data-testid', 'status-pill');
      badge.textContent = t.completed ? 'Done' : 'Active';
      right.appendChild(badge);

      const del = document.createElement('button');
      del.textContent = 'Delete';
      del.setAttribute('data-testid', 'delete-button');
      del.addEventListener('click', () => deleteTodo(t.id));
      right.appendChild(del);

      li.appendChild(right);
      list.appendChild(li);
    }
  }

  addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    // Simulate a tiny async delay to expose brittle tests that rely on sleeps.
    setTimeout(() => {
      addTodo(text);
      input.value = '';
    }, 120);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addBtn.click();
  });

  for (const btn of filterButtons) {
    btn.addEventListener('click', () => {
      currentFilter = btn.getAttribute('data-filter');
      render();
    });
  }

  // Clear storage between manual refreshes to keep the exercise deterministic.
  // (Comment this out if you want persistence across refreshes.)
  localStorage.removeItem('todos');
  todos = [];
  render();
})();
