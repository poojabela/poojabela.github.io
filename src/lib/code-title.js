export function codeTitle() {
  return {
    name: "code-title",
    root(root) {
      const title = this.options.meta?.__raw?.match(/title="([^"]+)"/)?.[1];
      const pre = root.children[0];
      root.children = [
        {
          type: "element",
          tagName: "figure",
          properties: { className: ["code-block"] },
          children: [
            {
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [
                {
                  type: "element",
                  tagName: "span",
                  properties: {},
                  children: [{ type: "text", value: title ?? this.options.lang }],
                },
                {
                  type: "element",
                  tagName: "button",
                  properties: { type: "button", "data-copy-code": "" },
                  children: [{ type: "text", value: "copy" }],
                },
              ],
            },
            pre,
          ],
        },
      ];
    },
  };
}
