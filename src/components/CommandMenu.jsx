import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { copyEmail, toggleTheme } from "../lib/actions";

export default function CommandMenu({ posts, books, links }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("command-menu:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("command-menu:open", onOpen);
    };
  }, []);

  const run = (action) => () => {
    setOpen(false);
    action();
  };
  const go = (href) => run(() => (window.location.href = href));
  const visit = (href) => run(() => window.open(href, "_blank", "noopener"));

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command menu">
      <Command.Input placeholder="what are you looking for?" />
      <Command.List>
        <Command.Empty>Nothing found.</Command.Empty>

        <Command.Group heading="Pages">
          <Item onSelect={go("/")} hint="g h">
            Home
          </Item>
          <Item onSelect={go("/writing")} hint="g w">
            Writing
          </Item>
          <Item onSelect={go("/books")} hint="g b">
            Books
          </Item>
        </Command.Group>

        <Command.Group heading="Actions">
          <Item onSelect={run(copyEmail)} hint="c">
            Copy email
          </Item>
          <Item onSelect={run(toggleTheme)} hint="t">
            Toggle theme
          </Item>
          <Item onSelect={go("/rss.xml")}>RSS feed</Item>
        </Command.Group>

        {posts.length > 0 && (
          <Command.Group heading="Writing">
            {posts.map((post) => (
              <Item key={post.slug} onSelect={go(`/writing/${post.slug}`)}>
                {post.title}
              </Item>
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Books">
          {books.map((book) => (
            <Item
              key={book.title}
              value={`${book.title} ${book.author}`}
              onSelect={go("/books")}
            >
              {book.title}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Elsewhere">
          {links
            .filter((link) => link.label !== "Email")
            .map((link) => (
              <Item key={link.href} onSelect={visit(link.href)} hint="↗">
                {link.label}
              </Item>
            ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

function Item({ children, hint, ...props }) {
  return (
    <Command.Item {...props}>
      <span className="truncate">{children}</span>
      {hint && <span className="shrink-0 text-xs text-pencil">{hint}</span>}
    </Command.Item>
  );
}
