import { formatAuthors } from "@/lib/utils";
import SVG from "@/components/svg";
import { Article } from "@/lib/interfaces";

const cardWidth: string = "1080px";
const cardHeight: string = "1920px";

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
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: "160px 40px",
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
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: "84px",
    lineHeight: "1",
    letterSpacing: "-1px",
    fontWeight: "400",
    textAlign: "center",
    marginBottom: "20px",
  },
  authors: {
    color: "black",
    fontSize: "40px",
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "OpenSans",
    letterSpacing: "-1px",
  },
};

interface PortraitQuote {
  issue: string;
  article: Article;
}

export default function PortraitQuote({ issue, article }: PortraitQuote) {
  return (
    <div style={css.card}>
      <div style={css.text}>
        <div style={css.logo}>
          <SVG name="logoQ" width={68} color="black" />
          <div style={css.line} />
          <div style={css.issue}>{issue}</div>
        </div>
        <div style={css.details}>
          <h1 style={css.title}>{article.quote}</h1>
          <div style={css.authors}>{formatAuthors(article.autorCollection.items)}</div>
        </div>
      </div>
    </div>
  );
}
