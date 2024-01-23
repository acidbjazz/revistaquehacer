export interface Section {
  __typename: string;
  sys: { id: string };
  titulo: string;
}

export interface Issue {
  sys: { id: string };
  numero: number;
  fecha: string;
  titulo: string;
  sumilla?: string;
  portada: { url: string };
  creditosPortada: string;
  presentacion: string;
  indiceCollection: { items: (Section | Article)[] };
}

export interface Article {
  __typename: string;
  sys: { id: string };
  titulo: string;
  slug: string;
  subtitulo?: string;
  autorCollection: { items: Author[] };
  portada: { url: string };
  creditosPortada?: string;
  cuerpo: string;
  excerpt?: string;
  copy?: string;
  quote?: string;
  section?: string;
  next?: Article;
}

export interface Author {
  sys: { id: string };
  nombre: string;
  bio?: string;
}

export interface Data {
  ultimoNumero: number;
  issn: string;
  etapaDigital: string;
  etapaImpresa: string;
  pie: string;
}
