// ============================================================
//  app.js – Helpers de UI compartilhados
// ============================================================

function statusBadge(status) {
  const map = {
    disponivel: '<span class="book-badge badge-available">🟢 Disponível</span>',
    emprestado:  '<span class="book-badge badge-borrowed">🔴 Emprestado</span>',
    reservado:   '<span class="book-badge badge-reserved">🟡 Reservado</span>',
  };
  return map[status] || '';
}

function renderBookGrid(containerId, livros) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!livros || !livros.length) {
    el.innerHTML = '<p style="color:var(--gray-text)">Nenhum livro encontrado.</p>';
    return;
  }
  el.innerHTML = livros.map(l => `
    <div class="book-card" onclick="abrirLivro(${l.id})">
      <div class="book-cover">${l.icone || '📚'}</div>
      <div class="book-info">
        <div class="book-title">${l.titulo}</div>
        <div class="book-author">${l.autor}</div>
        ${statusBadge(l.status)}
      </div>
    </div>
  `).join('');
}

function abrirLivro(id) {
  window.location.href = `${getBasePath()}pages/livro.html?id=${id}`;
}

function getBasePath() {
  // Detecta se estamos em /pages/ ou na raiz
  return window.location.pathname.includes('/pages/') ? '../' : '';
}

function showAlert(msg, tipo = 'success', containerId = 'alert-area') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="alert alert-${tipo}">${msg}</div>`;
  setTimeout(() => { el.innerHTML = ''; }, 3500);
}

function formatDate(str) {
  if (!str) return '—';
  const [y, m, d] = str.split('-');
  return `${d}/${m}/${y}`;
}
