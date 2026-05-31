// ============================================================
//  data.js – Camada de dados com localStorage
// ============================================================

const DB_KEY = 'biblioteca_ipd_v2';

const ASSUNTOS = [
  "ACONSELHAMENTO","ANTIGO TESTAMENTO","ANTROPOLOGIA","ANUÁRIO","APOLOGÉTICA",
  "APÓSTOLOS","APÓSTOLO PAULO","BATISMO","BATALHA ESPIRITUAL","BÍBLIAS",
  "BIOGRAFIA","CAPELANIA","CATECISMO","CÉLULAS","COLLOSSENSES","COMENTÁRIOS",
  "COMUNHÃO","COMUNICAÇÃO","CRIAÇÃO","CRISTIANISMO","CRISTOLOGIA","CULTURA",
  "CURA","DECÁLOGO","DEUS","DEVOCIONAL","DIABO","DICIONÁRIOS","DISCIPLINA",
  "DISCIPULADO","DONS ESPIRITUAIS","ECLESIOLOGIA","ENCICLOPÉDIAS",
  "ENSINO RELIGIOSO","ESCATOLOGIA","ESPÍRITO SANTO","ESPIRITUALIDADE","ÉTICA",
  "EUTANÁSIA","EVANGELHO","EVANGELIZAÇÃO","EVOLUCIONISMO","EXEGESE","FÉ",
  "FEMINILIDADE","FICÇÃO RELIGIOSA","GÊNESIS","GRAÇA","HERESIAS","HERMENÊUTICA",
  "HISTÓRIA DA IGREJA","HQ","IGREJA","INFANTIL","INTERPRETAÇÃO","ISAÍAS",
  "JESUS","JOÃO","JONAS","JUDAÍSMO","LASCÍVIA","LIDERANÇA","LOUVOR","MARCOS",
  "MASCULINIDADE","MATEUS","MATRIMÔNIO","MILAGRES","MINISTÉRIO","MISSÕES",
  "ORAÇÃO","PALAVRA DE DEUS","PARAÍSO","PATRIARCAS","PERÍODO INTERTESTAMENTÁRIO",
  "PREGAÇÃO","PRESBITERIANISMO","RELIGIÃO","ROMANOS","SALMOS","SEITAS",
  "SEXUALIDADE","SOFRIMENTO","SUICÍDIO","SUPERAÇÃO","TEOLOGIA","TEOLOGIA BÍBLICA",
  "TEOLOGIA REFORMADA","VIDA CRISTÃ","CULTO","PECADO","DOUTRINA",
  "CONFISSÃO DE FÉ","FILOSOFIA","RAZÃO"
];

function initDB() {
  if (!localStorage.getItem(DB_KEY)) {
    const seed = {
      livros: [
        { id: 1, titulo: "Institutas da Religião Cristã", autor: "João Calvino", assunto: "TEOLOGIA REFORMADA", ano: 1559, resumo: "A obra magna de Calvino, exposição sistemática da teologia reformada.", foto: "", status: "disponivel", emprestimos: 18, adicionadoEm: "2025-05-01" },
        { id: 2, titulo: "O Peregrino", autor: "John Bunyan", assunto: "FICÇÃO RELIGIOSA", ano: 1678, resumo: "Alegoria clássica da jornada cristã rumo à Cidade Celestial.", foto: "", status: "emprestado", emprestimos: 14, adicionadoEm: "2025-05-05" },
        { id: 3, titulo: "Cristianismo Puro e Simples", autor: "C.S. Lewis", assunto: "APOLOGÉTICA", ano: 1952, resumo: "Defesa racional e acessível do cristianismo histórico.", foto: "", status: "disponivel", emprestimos: 22, adicionadoEm: "2025-05-10" },
        { id: 4, titulo: "A Soberania de Deus", autor: "Arthur W. Pink", assunto: "TEOLOGIA", ano: 1918, resumo: "Estudo profundo sobre a soberania divina na Escritura.", foto: "", status: "disponivel", emprestimos: 9, adicionadoEm: "2025-05-15" },
        { id: 5, titulo: "A Cruz de Cristo", autor: "John Stott", assunto: "CRISTOLOGIA", ano: 1986, resumo: "Análise abrangente do significado da expiação.", foto: "", status: "disponivel", emprestimos: 11, adicionadoEm: "2025-05-18" },
        { id: 6, titulo: "Confissão de Fé de Westminster", autor: "Assembleia de Westminster", assunto: "CONFISSÃO DE FÉ", ano: 1647, resumo: "Padrão confessional da tradição reformada.", foto: "", status: "disponivel", emprestimos: 7, adicionadoEm: "2025-05-20" },
        { id: 7, titulo: "Boa Notícia Para Todos", autor: "John Stott", assunto: "MISSÕES", ano: 1975, resumo: "Manifesto sobre a missão integral da Igreja.", foto: "", status: "disponivel", emprestimos: 5, adicionadoEm: "2025-06-01" },
        { id: 8, titulo: "A Vida de Martinho Lutero", autor: "Roland Bainton", assunto: "BIOGRAFIA", ano: 1950, resumo: "Biografia clássica sobre o reformador alemão.", foto: "", status: "emprestado", emprestimos: 8, adicionadoEm: "2025-06-05" },
        { id: 9, titulo: "Comentário de Mateus", autor: "William Hendriksen", assunto: "COMENTÁRIOS", ano: 1973, resumo: "Exegese rigorosa do Evangelho de Mateus.", foto: "", status: "disponivel", emprestimos: 6, adicionadoEm: "2025-06-08" },
        { id: 10, titulo: "Teologia Sistemática", autor: "Wayne Grudem", assunto: "TEOLOGIA", ano: 1994, resumo: "Introdução abrangente à teologia bíblica sistematizada.", foto: "", status: "disponivel", emprestimos: 13, adicionadoEm: "2025-06-10" },
      ],
      emprestimos: [
        { id: 1, livroId: 2, nome: "João S.", cpfMascarado: "123.***.***-45", telefone: "(11) 99***-1234", dataEmprestimo: "2025-06-01", dataDevolucao: "2025-06-15", devolvido: false },
        { id: 2, livroId: 8, nome: "Maria L.", cpfMascarado: "456.***.***-78", telefone: "(11) 98***-5678", dataEmprestimo: "2025-06-05", dataDevolucao: "2025-06-19", devolvido: false },
      ],
      solicitacoes: [],
      comentarios: [
        { id: 1, livroId: 1, autor: "João", texto: "Leitura indispensável para quem deseja entender a teologia reformada.", data: "2025-05-20" },
        { id: 2, livroId: 3, autor: "Pedro", texto: "Muito edificante. Lewis tem um dom de tornar o complexo simples.", data: "2025-05-22" },
      ],
      assuntosCustom: [],
      nextId: { livros: 11, emprestimos: 3, solicitacoes: 1, comentarios: 3 }
    };
    localStorage.setItem(DB_KEY, JSON.stringify(seed));
  }
}

function getDB() { initDB(); return JSON.parse(localStorage.getItem(DB_KEY)); }
function saveDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); }

// === ASSUNTOS ===
function getAssuntos() {
  const db = getDB();
  const custom = db.assuntosCustom || [];
  return [...new Set([...ASSUNTOS, ...custom])].sort();
}
function addAssuntoCustom(nome) {
  const db = getDB();
  if (!db.assuntosCustom) db.assuntosCustom = [];
  const upper = nome.toUpperCase().trim();
  if (!db.assuntosCustom.includes(upper)) db.assuntosCustom.push(upper);
  saveDB(db);
}

// === LIVROS ===
function getLivros() { return getDB().livros; }
function getLivro(id) { return getDB().livros.find(l => l.id === Number(id)); }
function getNewBooks() { return [...getLivros()].sort((a,b) => new Date(b.adicionadoEm)-new Date(a.adicionadoEm)).slice(0,4); }
function getPopularBooks() { return [...getLivros()].sort((a,b) => b.emprestimos-a.emprestimos).slice(0,4); }

function addLivro(dados) {
  const db = getDB();
  const livro = { ...dados, id: db.nextId.livros++, emprestimos: 0, status: 'disponivel', adicionadoEm: new Date().toISOString().slice(0,10) };
  db.livros.push(livro);
  saveDB(db); return livro;
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
  saveDB(db); return e;
}
function registrarDevolucao(emprestimoId) {
  const db = getDB();
  const e = db.emprestimos.find(e => e.id === Number(emprestimoId));
  if (e) {
    e.devolvido = true; e.dataDevolvido = new Date().toISOString().slice(0,10);
    const liv = db.livros.find(l => l.id === e.livroId);
    if (liv) liv.status = 'disponivel';
    saveDB(db);
  }
}

// === SOLICITAÇÕES ===
function getSolicitacoes() { return getDB().solicitacoes; }
function addSolicitacao(dados) {
  const db = getDB();
  const s = { ...dados, id: db.nextId.solicitacoes++, status: 'pendente', data: new Date().toISOString().slice(0,10) };
  db.solicitacoes.push(s); saveDB(db); return s;
}
function aprovarSolicitacao(solId) {
  const db = getDB();
  const s = db.solicitacoes.find(x => x.id === Number(solId));
  if (!s) return;
  s.status = 'aprovada';
  const prazo = new Date(); prazo.setDate(prazo.getDate()+14);
  const e = { id: db.nextId.emprestimos++, livroId: s.livroId, nome: s.nome, cpfMascarado: mascaraCPF(s.cpf||''), telefone: s.telefone, dataEmprestimo: new Date().toISOString().slice(0,10), dataDevolucao: prazo.toISOString().slice(0,10), devolvido: false };
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
function getComentarios(livroId) { return getDB().comentarios.filter(c => c.livroId === Number(livroId)); }
function addComentario(dados) {
  const db = getDB();
  const c = { ...dados, id: db.nextId.comentarios++, data: new Date().toISOString().slice(0,10) };
  db.comentarios.push(c); saveDB(db); return c;
}

// === UTILS ===
function mascaraCPF(cpf) {
  const d = cpf.replace(/\D/g,'');
  if (d.length !== 11) return '***.***.***-**';
  return `${d.slice(0,3)}.***.***-${d.slice(9,11)}`;
}
function isAtrasado(emp) { if (emp.devolvido) return false; return new Date(emp.dataDevolucao) < new Date(); }
function getEstatisticas() {
  const db = getDB();
  const emps = db.emprestimos.filter(e => !e.devolvido);
  return {
    total: db.livros.length,
    disponiveis: db.livros.filter(l => l.status==='disponivel').length,
    emprestados: db.livros.filter(l => l.status==='emprestado').length,
    atrasados: emps.filter(isAtrasado).length,
    pendentes: db.solicitacoes.filter(s => s.status==='pendente').length
  };
}

// Converte link do Google Drive para link direto de imagem
function driveUrl(url) {
  if (!url) return '';
  const m = url.match(/\/d\/([\w-]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w400`;
  return url;
}
