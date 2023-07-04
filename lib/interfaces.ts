export interface Issue {
  sys: { id: string };
  numero: number;
  fecha: string;
  titulo: string;
  sumilla: string;
  portada: { url: string };
  colorPrimario: string;
  colorSecundario: string;
  creditos: string;
  presentacion: string;
  indiceCollection: any;
}

export interface Article {
  sys: { id: string };
  titulo: string;
  slug: string;
  subtitulo?: string;
  autorCollection: { items: Author[] };
  portada: { url: string };
  creditosPortada: string;
  cuerpo: string;
}

export interface Author {
  nombre: string;
  bio: string;
}

export interface Data {
  ultimoNumero: number;
  issn: string;
  etapaDigital: string;
  etapaImpresa: string;
  pie: string;
}
