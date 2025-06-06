import { formatAuthors } from "@/lib/utils";
import SVG from "@/components/svg";
import { Article } from "@/lib/interfaces";

const cardWidth: string = "1080px";
const cardHeight: string = "1080px";

const css: any = {
  card: {
    display: "flex",
    flexDirection: "column" as "column",
    width: cardWidth,
    height: cardHeight,
    position: "relative",
  },
  img: {
    objectFit: "cover",
    width: cardWidth,
    height: cardHeight,
    position: "absolute",
  },
  veil: {
    width: cardWidth,
    height: cardHeight,
    position: "absolute",
    background:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.75) 100%)",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: "60px",
  },
  logo: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  line: {
    width: "80px",
    height: "2px",
    background: "white",
  },
  issue: {
    fontSize: "48px",
    color: "white",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    // alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: "72px",
    lineHeight: "1",
    letterSpacing: "-1px",
    fontWeight: "400",
    // textAlign: "center",
    marginBottom: "20px",
  },
  authors: {
    color: "white",
    fontSize: "40px",
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "OpenSans",
    letterSpacing: "-1px",
  },
};

interface Square {
  issue: string;
  article: Article;
}

export default function Square({ issue, article }: Square) {
  return (
    <div style={css.card}>
      <img style={css.img} src={article.portada.url} />
      <div style={css.veil} />
      <div style={css.text}>
        <div style={css.logo}>
          <SVG name="logoQ" width={51} color="white" />
          <div style={css.line} />
          <div style={css.issue}>{issue}</div>
        </div>
        <div style={css.details}>
          <h1 style={css.title}>{article.titulo}</h1>
          <div style={css.authors}>{formatAuthors(article.autorCollection.items)}</div>
        </div>
      </div>
    </div>
  );
}
