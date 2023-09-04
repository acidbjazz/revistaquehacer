import { Article, Issue, Data, Section } from "./interfaces";

const API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
const API_AUTH = `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`;

async function graphqlClient(query: string): Promise<any> {
  const response = await fetch(API_URL, {
    next: { revalidate: 20 },
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
    datosCollection(limit: 1) {
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
    edicionCollection(where: {numero: ${numero}}, limit: 1) {
      items {
        fecha
        titulo
        sumilla
        portada { url }
        creditosPortada
        presentacion
        indiceCollection(limit: 60) {
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
  // console.log(contents);
  if (contents) {
    let section = "";
    contents.map((item: Section | Article) => {
      if (item) {
        if (item.__typename === "Seccion") {
          const itemSection = item as Section;
          section = itemSection.titulo;
        } else {
          const itemArticle = item as Article;
          itemArticle.section = section;
        }
      }
    });
  }
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
  console.log("get error:", slug);
  const query = `{
    articuloCollection(where: {slug: "${slug}"}, limit: 1) {
      items {
        sys { id }
        titulo
        slug
        subtitulo
        autorCollection(limit: 3) {
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

// export async function getArticleLocal(issue:string, slug:string): Promise<Article> {
//   const issueObject = await getIssue(issue);
//   //search slug in issueObject
//   const article:Article = issueObject.indiceCollection.items.find((item as Article) => item.slug === slug);
//   return article;

// }
