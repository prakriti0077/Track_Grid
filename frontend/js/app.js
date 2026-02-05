const API_URL = '/api/tasks';

const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const refreshBtn = document.getElementById('refresh');
const searchInput = document.getElementById('search');
const emptyState = document.getElementById('empty');
const filterButtons = document.querySelectorAll('.chip');

const statTotal = document.getElementById('stat-total');
const statProgress = document.getElementById('stat-progress');
const statCompleted = document.getElementById('stat-completed');

const modal = document.getElementById('edit-modal');
const closeModalBtn = document.getElementById('close-modal');
const editForm = document.getElementById('edit-form');
const editTitle = document.getElementById('edit-title');
const editDescription = document.getElementById('edit-description');
const editStatus = document.getElementById('edit-status');

let tasks = [];
let activeFilter = 'all';
let editTaskId = null;

const openModal = () => {
  modal.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  editTaskId = null;
};

const setStats = () => {
  statTotal.textContent = tasks.length;
  statProgress.textContent = tasks.filter((t) => t.status === 'in_progress').length;
  statCompleted.textContent = tasks.filter((t) => t.status === 'completed').length;
};

const matchesFilter = (task) => {
  if (activeFilter === 'all') return true;
  return task.status === activeFilter;
};

const matchesSearch = (task) => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) return true;
  return (
    task.title.toLowerCase().includes(q) ||
    (task.description || '').toLowerCase().includes(q)
  );
};

const createTaskItem = (task) => {
  const li = document.createElement('li');
  li.className = 'task';

  const title = document.createElement('div');
  title.className = 'task__title';
  title.textContent = task.title;

  const meta = document.createElement('div');
  meta.className = 'task__meta';

  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = task.status.replace('_', ' ');

  const date = document.createElement('span');
  date.textContent = new Date(task.createdAt).toLocaleString();

  meta.append(badge, date);

  const desc = document.createElement('div');
  desc.textContent = task.description || 'No description.';

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'action-btn';
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => startEdit(task);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action-btn delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteTask(task._id);

  actions.append(editBtn, deleteBtn);

  li.append(title, meta, desc, actions);
  return li;
};

const renderTasks = () => {
  const visible = tasks.filter((task) => matchesFilter(task) && matchesSearch(task));
  taskList.innerHTML = '';

  if (visible.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  visible.forEach((task) => taskList.appendChild(createTaskItem(task)));
};

const fetchTasks = async () => {
  taskList.innerHTML = '<li>Loading...</li>';
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    tasks = data;
    setStats();
    renderTasks();
  } catch (err) {
    taskList.innerHTML = '<li>Failed to load tasks.</li>';
  }
};

const createTask = async (payload) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  await fetchTasks();
};

const startEdit = (task) => {
  editTaskId = task._id;
  editTitle.value = task.title;
  editDescription.value = task.description || '';
  editStatus.value = task.status;
  openModal();
};

const saveEdit = async (payload) => {
  await fetch(`${API_URL}/${editTaskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  await fetchTasks();
};

const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  await fetchTasks();
};

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('description').value.trim(),
    status: document.getElementById('status').value
  };

  if (!payload.title) return;
  await createTask(payload);
  taskForm.reset();
});

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!editTaskId) return;
  await saveEdit({
    title: editTitle.value.trim(),
    description: editDescription.value.trim(),
    status: editStatus.value
  });
  closeModal();
});

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderTasks();
  });
});

searchInput.addEventListener('input', renderTasks);
refreshBtn.addEventListener('click', fetchTasks);

fetchTasks();
