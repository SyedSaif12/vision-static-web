import Link from "next/link";
import { Search } from "lucide-react";

export default function BlogHero({ search = "", category = "" }) {
  return (
    <section className="border-b border-light-200 bg-gradient-to-b from-light to-white">
      <div className="mx-auto w-11/12 max-w-[1240px] pb-[46px] pt-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-[18px] flex flex-wrap items-center gap-2 text-[12.5px] text-muted"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden="true" className="opacity-50">
            &rsaquo;
          </span>
          <span aria-current="page">Blog</span>
        </nav>

        <p className="mb-[9px] font-heading text-[11.5px] font-bold uppercase tracking-[1.6px] text-primary">
          The WeGot Blog
        </p>
        <h1 className="max-w-[760px] font-heading text-[27px] font-extrabold leading-[1.08] tracking-[-1.2px] text-ink sm:text-[32px] md:text-[40px]">
          Buying guides, reviews, and tech tips{" "}
          <span className="text-primary">made for Pakistan.</span>
        </h1>
        <p className="mt-4 max-w-[640px] text-[17px] text-muted">
          Honest advice on laptops, phones, and appliances. What to buy, how to
          care for it, and how to spend smart, written by the WeGot team.
        </p>

        {/* GET form: JS ke bina bhi chalta hai, category bhi saath jati hai */}
        <form
          action="/blogs"
          method="get"
          role="search"
          className="mt-[22px] flex max-w-[520px] rounded-[13px] border-[1.5px] border-light-100 bg-white py-[5px] pl-4 pr-[5px] drop-shadow-[0_3px_10px_rgba(16,30,66,0.05)] focus-within:border-primary"
        >
          {category && <input type="hidden" name="category" value={category} />}
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search guides, reviews, brands..."
            aria-label="Search articles"
            className="min-w-0 flex-1 bg-transparent text-input text-ink outline-none placeholder:text-faint"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex h-[38px] w-[42px] flex-none items-center justify-center rounded-[9px] bg-primary text-white transition hover:bg-primary-100"
          >
            <Search size={19} strokeWidth={2.3} />
          </button>
        </form>
      </div>
    </section>
  );
}
