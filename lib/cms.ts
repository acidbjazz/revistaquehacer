import { Article, Issue, Data, Section } from "./interfaces";

const API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
const API_AUTH = `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`;

async function graphqlClient(query: string): Promise<any> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_AUTH,
    },
    body: JSON.stringify({ query }),
  });
  return response.json();
}

export async function getData(): Promise<Data> {
  const query = `{
    datosCollection {
      items {
        ultimoNumero
        issn
        etapaDigital
        etapaImpresa
        pie
      }
    }
  }`;
  const { data } = await graphqlClient(query);
  return data.datosCollection.items[0];
}

export async function getIssues(): Promise<Issue[]> {
  const query = `{
    edicionCollection(order: numero_DESC, limit: 50) {
      items {
        numero
        fecha
        titulo
        sumilla
        portada { url }
      }
    }
  }`;
  const { data } = await graphqlClient(query);
  return data.edicionCollection.items;
}

export async function getIssue(numero: string): Promise<Issue> {
  const query = `{
    edicionCollection(where: {numero: ${numero}}) {
      items {
        fecha
        titulo
        sumilla
        portada { url }
        creditos
        presentacion
        indiceCollection(limit: 50) {
          items {
            __typename
            ... on Seccion {
              sys { id }
              titulo
            }
            ... on Articulo {
              sys { id }
              titulo
              slug
              portada { url }
            }
          }
        }
      }
    }
  }`;
  const { data } = await graphqlClient(query);
  const issue = data.edicionCollection.items[0];
  const contents = issue.indiceCollection.items;
  let section = "";
  contents.map((item: Section | Article | null) => {
    if (item) {
      if (item.__typename === "Seccion") {
        section = item.titulo;
      } else {
        item.section = section;
      }
    }
  });
  return issue;
}

// export async function getArticlesSlug(): Promise<Article[]> {
//   const query = `{
//     articuloCollection {
//       items {
//         slug
//       }
//     }
//   }`;
//   const { data } = await graphqlClient(query);
//   return data.articuloCollection.items;
// }

export async function getArticle(slug: string): Promise<Article> {
  const query = `{
    articuloCollection(where: {slug: "${slug}"}) {
      items {
        sys { id }
        titulo
        slug
        subtitulo
        autorCollection {
          items {
            nombre
            bio
          }
        }
        portada { url }
        creditosPortada
        cuerpo
      }
    }
  }`;
  const { data } = await graphqlClient(query);
  return data.articuloCollection.items[0];
}
