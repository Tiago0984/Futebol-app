// Não deixa uma conexão sem resposta prender o carregamento da tela.
export async function buscarComPrazo(endereco: string, opcoes: RequestInit = {}) {
  const controle = new AbortController();
  const cancelar = () => controle.abort();
  const sinalOriginal = opcoes.signal;
  if (sinalOriginal?.aborted) cancelar();
  sinalOriginal?.addEventListener("abort", cancelar, { once: true });
  const timer = setTimeout(cancelar, 15000);
  try {
    return await fetch(endereco, { ...opcoes, signal: controle.signal });
  } finally {
    clearTimeout(timer);
    sinalOriginal?.removeEventListener("abort", cancelar);
  }
}
