import { Author } from "./interfaces";

export function formatAuthors(authors: Author[]): string {
  const names: string[] = [];
  authors.map((author) => {
    names.push(author.nombre);
  });
  return names.length > 2
    ? names
        .slice(0, -1)
        .concat(`y ${names.slice(-1)}`)
        .join(", ")
    : names.join(" y ");
}
