import { formatAuthors } from "@/lib/utils";
import SVG from "@/components/svg";
import { Article } from "@/lib/interfaces";

const cardWidth: string = "1080px";
const cardHeight: string = "1350px";

const css: any = {
  card: {
    display: "flex",
    flexDirection: "column" as "column",
    width: cardWidth,
    height: cardHeight,
    position: "relative",
    background: "white",
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
    background: "black",
  },
  issue: {
    fontSize: "48px",
    color: "black",
  },
  title: {
    color: "black",
    fontSize: "72px",
    lineHeight: "1",
    letterSpacing: "-1px",
    fontWeight: "400",
    marginBottom: "20px",
  },
  quote: {
    fontSize: "36px",
    fontFamily: "OpenSansLight",
    padding: "0 60px 0 0",
  },
  authors: {
    color: "black",
    fontSize: "36px",
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
      <div style={css.text}>
        <div style={css.logo}>
          <SVG name="logoQ" width={51} color="black" />
          <div style={css.line} />
          <div style={css.issue}>{issue}</div>
        </div>
        <div style={css.quote}>{article.quote}</div>
        <div style={css.authors}>{formatAuthors(article.autorCollection.items)}</div>
      </div>
    </div>
  );
}
