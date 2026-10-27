// Formatação dos dados pessoais, usada no perfil do atleta e do responsável

// "12345678909" ou "123.456.789-09" -> "123.456.789-09"
// Cadastros antigos podem vir sem pontos; fora de 11 dígitos, mostra como veio
export function formatarCpf(valor: string | null | undefined) {
  if (!valor) return "";
  const numeros = valor.replace(/\D/g, "");
  if (numeros.length !== 11) return valor;
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// "2013-06-15T00:00:00-03:00" -> "15/06/2013"
// Recorta o texto em vez de usar new Date(), para o fuso do aparelho não trocar o dia
export function formatarDataNascimento(iso: string | null | undefined) {
  const partes = iso?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!partes) return "";
  return `${partes[3]}/${partes[2]}/${partes[1]}`;
}

// Máscara de digitação do CPF: 123.456.789-09
export function mascaraCpf(texto: string) {
  const numeros = texto.replace(/\D/g, "").slice(0, 11);
  return numeros
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// Máscara de digitação da data: 14/05/2014
export function mascaraData(texto: string) {
  const numeros = texto.replace(/\D/g, "").slice(0, 8);
  return numeros
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

// "14/05/2014" -> "2014-05-14"; data inexistente (31/02) ou incompleta -> null
export function dataBrParaIso(texto: string) {
  const partes = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!partes) return null;
  const [, dia, mes, ano] = partes;
  // new Date corrige 31/02 para 03/03; se mudou, a data não existe
  const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
  if (
    data.getFullYear() !== Number(ano) ||
    data.getMonth() !== Number(mes) - 1 ||
    data.getDate() !== Number(dia)
  ) {
    return null;
  }
  return `${ano}-${mes}-${dia}`;
}

// Máscara de digitação: (11) 3456-7890 para fixo e (11) 98765-4321 para celular
export function formatarTelefone(texto: string) {
  const numeros = texto.replace(/\D/g, "").slice(0, 11);

  if (numeros.length > 10) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (numeros.length > 6) {
    return numeros.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
  }
  if (numeros.length > 2) {
    return numeros.replace(/(\d{2})(\d{1,4})/, "($1) $2");
  }
  if (numeros.length > 0) {
    return numeros.replace(/(\d{1,2})/, "($1");
  }
  return "";
}

// Telefone vindo da API: formata com a mesma máscara; null fica vazio e,
// com mais de 11 dígitos, mostra como veio para não cortar o número
export function exibirTelefone(valor: string | null | undefined) {
  if (!valor) return "";
  if (valor.replace(/\D/g, "").length > 11) return valor;
  return formatarTelefone(valor);
}

// Responsável do atleta, de data.responsaveis em GET /api/v1/atleta: "Carla Exemplo (Mãe)"
export type ResponsavelAtleta = {
  nome: string;
  grau_parentesco: string | null;
};

export function descreverResponsavel(responsavel: ResponsavelAtleta) {
  return responsavel.grau_parentesco
    ? `${responsavel.nome} (${responsavel.grau_parentesco})`
    : responsavel.nome;
}

// Resposta de erro da API: { success: false, message, errors? }
// errors (só no 422) traz uma lista de mensagens por campo; fica a primeira de cada
export function mensagensDeErro(json: {
  message?: string;
  errors?: Record<string, string[]>;
}) {
  const campos: Record<string, string> = {};
  for (const [campo, mensagens] of Object.entries(json.errors ?? {})) {
    if (mensagens.length > 0) campos[campo] = mensagens[0];
  }
  return {
    geral: json.message ?? "Não foi possível salvar os dados.",
    campos,
  };
}
