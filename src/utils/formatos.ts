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
