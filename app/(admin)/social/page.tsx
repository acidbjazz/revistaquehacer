import styles from "@/styles/socialPage.module.scss";
import { getIssue, getData } from "@/lib/cms";
import { Article } from "@/lib/interfaces";
import ArticleRow from "@/components/social/row"; // Este es ahora el componente de cliente

// Ya no necesitamos 'edge' runtime. El runtime de Node por defecto es mejor para esto.
// export const runtime = "edge"; // <-- LÍNEA ELIMINADA

export default async function SocialPage() {
  // Obtiene los datos iniciales. La caché de `revalidate: 20` aquí está perfecta
  // porque solo se ejecuta una vez al cargar la página.
  const data = await getData();
  const issueNumber = data.ultimoNumero.toString();
  const issue = await getIssue(issueNumber);
  const contents = issue.indiceCollection.items;

  return (
    <section className={styles.articles}>
      {contents.map((item) => {
        if (item.__typename === "Articulo") {
          const itemArticle = item as Article;
          return <ArticleRow issue={issueNumber} article={itemArticle} key={item.sys.id} />;
        }
      })}
    </section>
  );
}
