// ============================================================
//  data.js – Camada de dados com localStorage
// ============================================================

const DB_KEY = 'biblioteca_ipd';

function initDB() {
  if (!localStorage.getItem(DB_KEY)) {
    const seed = {
      livros: [
        { id: 1, titulo: "Institutas da Religião Cristã", autor: "João Calvino", categoria: "Teologia Sistemática", ano: 1559, resumo: "A obra magna de Calvino, exposição sistemática da teologia reformada.", icone: "📚", status: "disponivel", emprestimos: 18, adicionadoEm: "2025-05-01" },
        { id: 2, titulo: "O Peregrino", autor: "John Bunyan", categoria: "Literatura Cristã", ano: 1678, resumo: "Alegoria clássica da jornada cristã rumo à Cidade Celestial.", icone: "📖", status: "emprestado", emprestimos: 14, adicionadoEm: "2025-05-05" },
        { id: 3, titulo: "Cristianismo Puro e Simples", autor: "C.S. Lewis", categoria: "Apologética", ano: 1952, resumo: "Defesa racional e acessível do cristianismo histórico.", icone: "✝️", status: "disponivel", emprestimos: 22, adicionadoEm: "2025-05-10" },
        { id: 4, titulo: "A Soberania de Deus", autor: "Arthur W. Pink", categoria: "Teologia Sistemática", ano: 1918, resumo: "Estudo profundo sobre a soberania divina na Escritura.", icone: "👑", status: "disponivel", emprestimos: 9, adicionadoEm: "2025-05-15" },
        { id: 5, titulo: "A Cruz de Cristo", autor: "John Stott", categoria: "Teologia Sistemática", ano: 1986, resumo: "Análise abrangente do significado da expiação.", icone: "✝️", status: "disponivel", emprestimos: 11, adicionadoEm: "2025-05-18" },
        { id: 6, titulo: "Confissão de Fé de Westminster", autor: "Assembleia de Westminster", categoria: "Teologia Sistemática", ano: 1647, resumo: "Padrão confessional da tradição reformada.", icone: "📜", status: "disponivel", emprestimos: 7, adicionadoEm: "2025-05-20" },
        { id: 7, titulo: "Boa Notícia Para Todos", autor: "John Stott", categoria: "Missões", ano: 1975, resumo: "Manifesto sobre a missão integral da Igreja.", icone: "🌍", status: "disponivel", emprestimos: 5, adicionadoEm: "2025-06-01" },
        { id: 8, titulo: "A Vida de Martinho Lutero", autor: "Roland Bainton", categoria: "Biografias", ano: 1950, resumo: "Biografia clássica sobre o reformador alemão.", icone: "👤", status: "emprestado", emprestimos: 8, adicionadoEm: "2025-06-05" },
        { id: 9, titulo: "Comentário de Mateus", autor: "William Hendriksen", categoria: "Comentários Bíblicos", ano: 1973, resumo: "Exegese rigorosa do Evangelho de Mateus.", icone: "📖", status: "disponivel", emprestimos: 6, adicionadoEm: "2025-06-08" },
        { id: 10, titulo: "Teologia Sistemática", autor: "Wayne Grudem", categoria: "Teologia Sistemática", ano: 1994, resumo: "Introdução abrangente à teologia bíblica sistematizada.", icone: "📚", status: "disponivel", emprestimos: 13, adicionadoEm: "2025-06-10" },
      ],
      emprestimos: [
        { id: 1, livroId: 2, nome: "João S.", cpfMascarado: "123.***.***-45", telefone: "(83) 99***-1234", dataEmprestimo: "2025-06-01", dataDevolucao: "2025-06-15", devolvido: false },
        { id: 2, livroId: 8, nome: "Maria L.", cpfMascarado: "456.***.***-78", telefone: "(83) 98***-5678", dataEmprestimo: "2025-06-05", dataDevolucao: "2025-06-19", devolvido: false },
      ],
      solicitacoes: [],
      comentarios: [
        { id: 1, livroId: 1, autor: "João", texto: "Leitura indispensável para quem deseja entender a teologia reformada.", data: "2025-05-20" },
        { id: 2, livroId: 3, autor: "Pedro", texto: "Muito edificante. Lewis tem um dom de tornar o complexo simples.", data: "2025-05-22" },
        { id: 3, livroId: 2, autor: "Ana", texto: "Li três vezes. Uma das obras mais belas da literatura cristã.", data: "2025-06-01" },
      ],
      nextId: { livros: 11, emprestimos: 3, solicitacoes: 1, comentarios: 4 }
    };
    localStorage.setItem(DB_KEY, JSON.stringify(seed));
  }
}

function getDB() {
  initDB();
  return JSON.parse(localStorage.getItem(DB_KEY));
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// === LIVROS ===
function getLivros() { return getDB().livros; }

function getLivro(id) {
  return getDB().livros.find(l => l.id === Number(id));
}

function getNewBooks() {
  return [...getLivros()].sort((a, b) => new Date(b.adicionadoEm) - new Date(a.adicionadoEm)).slice(0, 4);
}

function getPopularBooks() {
  return [...getLivros()].sort((a, b) => b.emprestimos - a.emprestimos).slice(0, 4);
}

function addLivro(dados) {
  const db = getDB();
  const livro = { ...dados, id: db.nextId.livros++, emprestimos: 0, status: 'disponivel', adicionadoEm: new Date().toISOString().slice(0, 10), icone: '📚' };
  db.livros.push(livro);
  saveDB(db);
  return livro;
}

function updateLivro(id, dados) {
  const db = getDB();
  const idx = db.livros.findIndex(l => l.id === Number(id));
  if (idx >= 0) { db.livros[idx] = { ...db.livros[idx], ...dados }; saveDB(db); }
}

function deleteLivro(id) {
  const db = getDB();
  db.livros = db.livros.filter(l => l.id !== Number(id));
  saveDB(db);
}

// === EMPRÉSTIMOS ===
function getEmprestimos() { return getDB().emprestimos; }

function addEmprestimo(dados) {
  const db = getDB();
  const e = { ...dados, id: db.nextId.emprestimos++, devolvido: false };
  db.emprestimos.push(e);
  const idx = db.livros.findIndex(l => l.id === dados.livroId);
  if (idx >= 0) { db.livros[idx].status = 'emprestado'; db.livros[idx].emprestimos++; }
  saveDB(db);
  return e;
}

function registrarDevolucao(emprestimoId) {
  const db = getDB();
  const e = db.emprestimos.find(e => e.id === Number(emprestimoId));
  if (e) {
    e.devolvido = true;
    e.dataDevolvido = new Date().toISOString().slice(0, 10);
    const liv = db.livros.find(l => l.id === e.livroId);
    if (liv) liv.status = 'disponivel';
    saveDB(db);
  }
}

// === SOLICITAÇÕES ===
function getSolicitacoes() { return getDB().solicitacoes; }

function addSolicitacao(dados) {
  const db = getDB();
  const s = { ...dados, id: db.nextId.solicitacoes++, status: 'pendente', data: new Date().toISOString().slice(0, 10) };
  db.solicitacoes.push(s);
  saveDB(db);
  return s;
}

function aprovarSolicitacao(solId) {
  const db = getDB();
  const s = db.solicitacoes.find(x => x.id === Number(solId));
  if (!s) return;
  s.status = 'aprovada';
  // criar empréstimo automaticamente
  const prazo = new Date();
  prazo.setDate(prazo.getDate() + 14);
  const e = {
    id: db.nextId.emprestimos++,
    livroId: s.livroId,
    nome: s.nome,
    cpfMascarado: mascaraCPF(s.cpf || ''),
    telefone: s.telefone,
    dataEmprestimo: new Date().toISOString().slice(0, 10),
    dataDevolucao: prazo.toISOString().slice(0, 10),
    devolvido: false
  };
  db.emprestimos.push(e);
  const liv = db.livros.find(l => l.id === s.livroId);
  if (liv) { liv.status = 'emprestado'; liv.emprestimos++; }
  saveDB(db);
}

function rejeitarSolicitacao(solId) {
  const db = getDB();
  const s = db.solicitacoes.find(x => x.id === Number(solId));
  if (s) s.status = 'rejeitada';
  saveDB(db);
}

// === COMENTÁRIOS ===
function getComentarios(livroId) {
  return getDB().comentarios.filter(c => c.livroId === Number(livroId));
}

function addComentario(dados) {
  const db = getDB();
  const c = { ...dados, id: db.nextId.comentarios++, data: new Date().toISOString().slice(0, 10) };
  db.comentarios.push(c);
  saveDB(db);
  return c;
}

// === UTILS ===
function mascaraCPF(cpf) {
  const d = cpf.replace(/\D/g, '');
  if (d.length !== 11) return '***.***.***-**';
  return `${d.slice(0,3)}.***.***-${d.slice(9,11)}`;
}

function isAtrasado(emp) {
  if (emp.devolvido) return false;
  return new Date(emp.dataDevolucao) < new Date();
}

function getEstatisticas() {
  const db = getDB();
  const emps = db.emprestimos.filter(e => !e.devolvido);
  const atrasados = emps.filter(isAtrasado);
  return {
    total: db.livros.length,
    disponiveis: db.livros.filter(l => l.status === 'disponivel').length,
    emprestados: db.livros.filter(l => l.status === 'emprestado').length,
    atrasados: atrasados.length,
    pendentes: db.solicitacoes.filter(s => s.status === 'pendente').length
  };
}
