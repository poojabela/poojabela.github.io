import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { profile } from "../../constant";
import { formatDate, getPosts, readingMinutes } from "../../lib/posts";

const require = createRequire(import.meta.url);
const fontPath = (family, weight) =>
  require.resolve(
    `@fontsource/${family}/files/${family}-latin-${weight}-normal.woff`,
  );

const paper = "#f8f4ea";
const ink = "#2a2723";
const pencil = "#6f685e";
const highlighter = "#ffe066";
const charWidth = (fontSize) => fontSize * 0.6;

const el = (type, style, children) => ({ type, props: { style, children } });

const svgImage = (svg, width, height, style = {}) => ({
  type: "img",
  props: {
    src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
    width,
    height,
    style,
  },
});

const squiggle = (width, color) =>
  svgImage(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="16" viewBox="0 0 ${width} 16"><path d="M2 9 ${Array.from({ length: Math.ceil(width / 24) }, (_, i) => `q 6 -8 12 0 t 12 0`).join(" ")}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/></svg>`,
    width,
    16,
  );

const scribbleCircle = (width, height, color) =>
  svgImage(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><path d="M${width * 0.55} 4 C ${width - 4} 4, ${width - 2} ${height - 6}, ${width * 0.5} ${height - 3} S 3 ${height * 0.6}, ${width * 0.12} ${height * 0.3} S ${width * 0.4} 1, ${width * 0.62} 7" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/></svg>`,
    width,
    height,
    { position: "absolute", left: -14, top: -10 },
  );

const arrow = svgImage(
  `<svg xmlns="http://www.w3.org/2000/svg" width="102" height="72" viewBox="0 0 34 24"><path d="M3 20c6-12 16-15 27-11M24 4l6 5-7 4" fill="none" stroke="${pencil}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  102,
  72,
  { transform: "scaleX(-1) rotate(12deg)" },
);

const highlighted = (text, style) =>
  el("div", { display: "flex", position: "relative" }, [
    el("div", {
      position: "absolute",
      left: -8,
      right: -10,
      top: "28%",
      bottom: "8%",
      background: highlighter,
      opacity: 0.85,
      transform: "rotate(-1.5deg)",
      borderRadius: 6,
    }),
    el("div", { display: "flex", ...style }, text),
  ]);

const notebook = (children) =>
  el(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      position: "relative",
      background: paper,
      color: ink,
      fontFamily: "Caveat",
    },
    [
      ...Array.from({ length: 15 }, (_, i) =>
        el("div", {
          position: "absolute",
          left: 0,
          right: 0,
          top: 42 * (i + 1),
          height: 2,
          background: "rgba(70, 110, 190, 0.12)",
        }),
      ),
      el("div", {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 96,
        width: 3,
        background: "rgba(226, 98, 98, 0.45)",
      }),
      el(
        "div",
        {
          position: "absolute",
          top: 64,
          bottom: 56,
          left: 140,
          right: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
        children,
      ),
    ],
  );

const eyebrow = (text) =>
  el("div", { display: "flex", fontSize: 48, color: pencil, transform: "rotate(-2deg)" }, text);

function homeCard() {
  const typeSize = 34;
  const role = "software engineer";
  return notebook([
    eyebrow("hey there, i'm"),
    el("div", { display: "flex", alignItems: "center", gap: 48 }, [
      el("div", { display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize: 168, fontWeight: 700, lineHeight: 1 }, [
        highlighted("Pooja", {}),
        el("div", { display: "flex" }, "Belaramani"),
      ]),
      el("div", { display: "flex", alignItems: "center", marginTop: -120, transform: "rotate(6deg)" }, [
        arrow,
        el("div", { display: "flex", fontSize: 44, color: pencil }, "that's me!"),
      ]),
    ]),
    el("div", { display: "flex", alignItems: "flex-start", fontFamily: "Courier Prime", fontSize: typeSize }, [
      el("div", { display: "flex", flexDirection: "column" }, [
        el("div", { display: "flex" }, role),
        squiggle(Math.round(role.length * charWidth(typeSize)), "#ff5c93"),
      ]),
      el("div", { display: "flex", whiteSpace: "pre" }, " at "),
      el("div", { display: "flex", position: "relative" }, [
        scribbleCircle(Math.round(5 * charWidth(typeSize)) + 28, typeSize + 22, "#2f5bea"),
        el("div", { display: "flex" }, profile.company),
      ]),
    ]),
  ]);
}

function postCard({ title, date, minutes }) {
  const words = title.split(" ");
  const last = words.pop();
  const fontSize = title.length > 40 ? 92 : 112;
  return notebook([
    eyebrow("from pooja's notebook"),
    el("div", { display: "flex", flexWrap: "wrap", maxWidth: 820, columnGap: 28, fontSize, fontWeight: 700, lineHeight: 1.05 }, [
      ...words.map((word) => el("div", { display: "flex" }, word)),
      highlighted(last, {}),
    ]),
    el("div", { display: "flex", justifyContent: "space-between", alignItems: "flex-end" }, [
      el("div", { display: "flex", fontFamily: "Courier Prime", fontSize: 30, color: pencil }, `${date} · ${minutes} min read`),
      el("div", { display: "flex", fontSize: 40, color: pencil }, "poojabelaramani.com"),
    ]),
    el(
      "div",
      {
        position: "absolute",
        top: -24,
        right: 0,
        width: 220,
        height: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff1a1",
        transform: "rotate(4deg)",
        boxShadow: "0 14px 22px -12px rgba(0, 0, 0, 0.35)",
        fontSize: 52,
        fontWeight: 700,
      },
      [
        el("div", {
          position: "absolute",
          top: -14,
          left: 66,
          width: 88,
          height: 28,
          background: "rgba(255, 255, 255, 0.7)",
          transform: "rotate(-3deg)",
        }),
        el("div", { display: "flex" }, "read me!"),
      ],
    ),
  ]);
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return [
    { params: { slug: "index" }, props: { kind: "home" } },
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: {
        kind: "post",
        title: post.data.title,
        date: formatDate(post.data.date),
        minutes: readingMinutes(post.body),
      },
    })),
  ];
}

export async function GET({ props }) {
  const [regular, bold, type] = await Promise.all([
    readFile(fontPath("caveat", 400)),
    readFile(fontPath("caveat", 700)),
    readFile(fontPath("courier-prime", 400)),
  ]);

  const svg = await satori(props.kind === "home" ? homeCard() : postCard(props), {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Caveat", data: regular, weight: 400 },
      { name: "Caveat", data: bold, weight: 700 },
      { name: "Courier Prime", data: type, weight: 400 },
    ],
  });

  const png = new Resvg(svg).render().asPng();
  return new Response(png, { headers: { "Content-Type": "image/png" } });
}
