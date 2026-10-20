import Link from "next/link";

const isExternal = (href = "") => /^(https?:|mailto:|tel:)/.test(href);

const BTN_BASE =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm lg:text-base font-bold transition-colors";
const BTN_VARIANTS = {
  whatsapp: "bg-[#62d86a] text-white hover:bg-[#4fc858]",
  outline: "border border-light-100 bg-white text-ink hover:bg-light-200",
};

function ActionLink({ href, label, variant = "outline" }) {
  const cls = `${BTN_BASE} ${BTN_VARIANTS[variant] ?? BTN_VARIANTS.outline}`;
  if (!isExternal(href)) {
    return (
      <Link href={href} className={cls}>
        {label}
      </Link>
    );
  }
  const web = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-xs md:text-sm lg:text-base text-muted"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              )}
              {!last && <span aria-hidden="true"> / </span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Highlights({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {items.map((h) => (
        <div
          key={h.title}
          className="rounded-2xl border border-light-100 bg-white p-4"
        >
          <h2 className="font-heading text-lg lg:text-3xl font-extrabold text-primary">
            {h.title}
          </h2>
          <p className="mt-1 text-sm lg:text-base text-ink-50">{h.text}</p>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ sections }) {
  return (
    // lg: sticky => content ke saath fixed rehta hai, grid khatam hote hi upar chala jata hai
    <aside className="lg:sticky lg:top-[var(--policy-top)]">
      <nav
        aria-label="On this page"
        className="rounded-2xl border border-light-100 bg-white p-4"
      >
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">
          On this page
        </p>
        <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="block whitespace-nowrap rounded-lg px-2.5 py-1.5 text-base font-semibold text-ink-50 transition-colors hover:bg-brand-50 hover:text-primary lg:whitespace-normal"
              >
                {s.navLabel ?? s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

const NOTE_TONES = {
  info: "border-light-100 bg-brand-50 text-ink-50",
  warning: "border-red/20 bg-red/5 text-[#a32b24]",
};

function Note({ note }) {
  const { text, tone = "info" } =
    typeof note === "string" ? { text: note } : note;
  return (
    <p
      className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
        NOTE_TONES[tone] ?? NOTE_TONES.info
      }`}
    >
      {text}
    </p>
  );
}

function Section({ section, first }) {
  const { id, title, intro, text, items, outro, note, actions } = section;
  return (
    <section
      id={id}
      className={`scroll-mt-[calc(var(--policy-top)+0.5rem)] py-6 ${
        first ? "pt-0" : "border-t border-light-200"
      }`}
    >
      <h2 className="font-heading text-base font-extrabold text-ink sm:text-lg">
        {title}
      </h2>

      {intro && (
        <p className="mt-3 text-sm md:text-base lg:text-lg leading-6 text-ink-50">
          {intro}
        </p>
      )}

      {text && (
        <p className="mt-3 text-sm md:text-base lg:text-lg leading-6 text-ink-50">
          {text}
        </p>
      )}

      {items?.length > 0 && (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm md:text-base lg:text-lg leading-6 text-ink-50 marker:text-ink">
          {items.map((item, i) => {
            const it = typeof item === "string" ? { text: item } : item;
            return (
              <li key={i}>
                {it.label && (
                  <strong className="font-bold text-ink">{it.label} </strong>
                )}
                {it.text}
              </li>
            );
          })}
        </ul>
      )}

      {outro && <p className="mt-3 text-sm leading-6 text-ink-50">{outro}</p>}

      {note && <Note note={note} />}

      {actions?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {actions.map((a) => (
            <ActionLink key={a.label} {...a} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function PolicyPage({ data, stickyTop = "7rem" }) {
  const { title, subtitle, updated, breadcrumbs, highlights, sections } = data;

  return (
    <div
      className="bg-surface pb-12 pt-5 font-sans"
      style={{ "--policy-top": stickyTop }}
    >
      <div className="mx-auto w-11/12">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-4">
          <h1 className="font-heading text-3xl font-extrabold text-ink sm:text-4xl">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
          {updated && <p className="mt-1 text-sm text-muted">{updated}</p>}
        </header>

        <Highlights items={highlights} />

        <div className="mt-4 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          <Sidebar sections={sections} />

          <div className="rounded-2xl border border-light-100 bg-white p-5 sm:p-6">
            {sections.map((s, i) => (
              <Section key={s.id} section={s} first={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
