// ============================================================
//  app.js – Helpers de UI
// ============================================================

function statusBadge(status) {
  return status === 'disponivel'
    ? '<span class="book-badge badge-available">Disponível</span>'
    : '<span class="book-badge badge-borrowed">Emprestado</span>';
}

function bookCoverHtml(livro, height) {
  const url = driveUrl(livro.foto);
  if (url) return `<img src="${url}" alt="Capa de ${livro.titulo}" loading="lazy" onerror="this.parentElement.innerHTML=placeholderHtml('${livro.titulo}')"/>`;
  return placeholderHtml(livro.titulo);
}

function placeholderHtml(titulo) {
  const inicial = (titulo || '?').charAt(0).toUpperCase();
  return `<div class="book-cover-placeholder"><span>${inicial}</span></div>`;
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
      <div class="book-cover">${bookCoverHtml(l)}</div>
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
  const [y,m,d] = str.split('-');
  return `${d}/${m}/${y}`;
}

// Preenche um <select> com os assuntos
function popularSelectAssuntos(selectId, valorAtual) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const lista = getAssuntos();
  sel.innerHTML = '<option value="">Selecione o assunto...</option>' +
    lista.map(a => `<option value="${a}" ${a===valorAtual?'selected':''}>${a}</option>`).join('') +
    '<option value="__novo__">+ Cadastrar novo assunto...</option>';
  sel.addEventListener('change', () => {
    if (sel.value === '__novo__') {
      const novo = prompt('Digite o novo assunto:');
      if (novo && novo.trim()) {
        addAssuntoCustom(novo.trim());
        popularSelectAssuntos(selectId, novo.trim().toUpperCase());
      } else {
        sel.value = valorAtual || '';
      }
    }
  });
}
