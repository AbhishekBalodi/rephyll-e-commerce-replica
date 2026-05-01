import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogDetail } from "@/hooks/useBlogDetail";
import { useBlogList } from "@/hooks/useBlogList";
import { useProductDetail } from "@/hooks/useProducts";
import { useWebsitePageByPath } from "@/hooks/useWebsitePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getProductImages } from "@/lib/productHelpers";
import { getCanonicalProductPath } from "@/lib/routeHelpers";
import { ArrowLeft, CalendarDays, Clock3, Leaf, Loader2, ShieldCheck } from "lucide-react";
import blogPetHero from "@/assets/blog-pet-hero.jpg";

const BLOG_FAQS = [
  {
    q: "Is this cleaning routine safe for pets?",
    a: "Yes, when you choose plant-based formulas and rinse high-contact zones properly, it remains safe for pets and family use.",
  },
  {
    q: "How often should I deep clean floors?",
    a: "For most homes, one deep clean per week and quick daily spot cleaning works well.",
  },
  {
    q: "Can I use one cleaner for all rooms?",
    a: "Use a multi-surface cleaner for everyday areas and dedicated formulas for toilets, kitchen grease, and dish cleaning.",
  },
  {
    q: "How do I avoid strong chemical smell in home?",
    a: "Pick low-residue plant-based cleaners, ventilate during cleaning, and avoid over-dosing products.",
  },
];

const BlogPost = () => {
  const { slug } = useParams();
  const { data: pageData } = useWebsitePageByPath(`/blog/${slug || ""}`);
  const { blog, loading, error } = useBlogDetail(slug);

  const { blogs: allBlogs } = useBlogList({
    page: 0,
    size: 100,
    sortBy: "id",
    direction: "DESC",
  });

  const recommendedProductSlug = useMemo(() => {
    const searchable = `${blog?.slug || ""} ${blog?.title || ""} ${blog?.metaKeywords || ""}`.toLowerCase();

    if (searchable.includes("toilet") || searchable.includes("bathroom") || searchable.includes("washroom")) {
      return "plant-powered-toilet-bathroom-cleaner";
    }
    if (searchable.includes("dish")) {
      return "plant-powered-dishwash-liquid";
    }
    if (searchable.includes("kitchen") || searchable.includes("degreaser")) {
      return "plant-powered-kitchen-degreaser";
    }
    return "plant-powered-all-surface-cleaner";
  }, [blog?.metaKeywords, blog?.slug, blog?.title]);

  const { data: recommendedProduct } = useProductDetail(recommendedProductSlug);

  const getImageUrl = (relativePath: string): string => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "https://www.rephyl.com";
    return `${baseUrl}${relativePath}`;
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const heroImage = pageData?.metaImg
    ? getImageUrl(pageData.metaImg)
    : blog?.banner
      ? getImageUrl(blog.banner)
      : blogPetHero;

  const relatedBlogs = useMemo(
    () => allBlogs.filter((item) => item.slug !== slug).slice(0, 3),
    [allBlogs, slug]
  );

  const contentBlocks = useMemo(() => {
    if (!blog?.description) return [];

    return blog.description
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);
  }, [blog?.description]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          {error && <p className="text-destructive mb-4">{error.message}</p>}
          <Link to="/blogs" className="text-primary underline">
            Go back to blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-foreground">
      <Navbar />

      <main className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-[118px] pb-14">
        <div className="text-sm text-muted-foreground mb-5">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blogs" className="hover:text-foreground">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground/80">{blog.title}</span>
        </div>

        <section className="grid lg:grid-cols-2 gap-8 items-center mb-10">
          <div className="bg-transparent p-0 md:p-2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF5D7] text-[#064734] text-xs font-semibold mb-5 self-start">
              <Leaf size={13} />
              {blog.categoryName || "Pet Care & Cleaning"}
            </div>

            <h1 className="text-[40px] md:text-[56px] lg:text-[60px] leading-[1.05] font-bold text-[#0E1F17]">
              {blog.title}
            </h1>

            <p className="mt-5 text-[#4C5B54] text-[17px] md:text-[19px] leading-relaxed max-w-[62ch]">
              {blog.shortDescription}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#5D6B64]">
              <span className="font-medium text-[#243D32]">By {blog.author || "Rephyl Team"}</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} />{formatDate(blog.createdDate)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{blog.readingTime || 8} min read</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#E4EADF] bg-[#EFF3EA] h-[360px] md:h-[440px] lg:h-[480px]">
            <img src={heroImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8">
          <article className="space-y-6">
            <div className="rounded-2xl border border-[#E4EADF] bg-white p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EAF5D7] flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-[#064734]" />
                </div>
                <div>
                  <p className="font-semibold text-[#113326]">A clean home should be safe for every family member.</p>
                  <p className="text-sm text-[#5A6A62]">Choose plant-powered cleaning that is tough on dirt and gentle on your home.</p>
                </div>
              </div>
              <Link to="/shop" className="px-4 py-2 rounded-lg bg-[#064734] text-white text-sm font-semibold hover:bg-[#053a29]">
                Explore Rephyl Cleaners
              </Link>
            </div>

            <div className="rounded-2xl border border-[#E4EADF] bg-white p-6 md:p-7 space-y-5">
              {contentBlocks.length > 0 ? (
                contentBlocks.map((block, idx) => (
                  <p key={idx} className="text-[17px] leading-[1.95] text-[#1A362B]">
                    {block}
                  </p>
                ))
              ) : (
                <p className="text-[17px] leading-[1.95] text-[#1A362B]">{blog.description}</p>
              )}
            </div>

            <div className="rounded-2xl border border-[#E4EADF] bg-white p-6 md:p-7">
              <h2 className="text-2xl font-semibold text-[#0F2A1F] mb-4">How to Clean Homes With Pets Safely</h2>
              <div className="space-y-4 text-[#1A362B]">
                <div>
                  <p className="font-semibold">1. Choose the right cleaning products</p>
                  <p className="text-sm text-[#587066] mt-1">Use low-residue, plant-powered formulas for daily cleaning zones.</p>
                </div>
                <div>
                  <p className="font-semibold">2. Try simple DIY non-toxic recipes</p>
                  <p className="text-sm text-[#587066] mt-1">Use mild vinegar + water for glass and tiles; avoid mixing harsh chemicals.</p>
                </div>
                <div>
                  <p className="font-semibold">3. Build a daily pet prep routine</p>
                  <p className="text-sm text-[#587066] mt-1">Brush regularly, wipe paws after walks, and isolate muddy shoes at entry points.</p>
                </div>
              </div>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-[#E4EADF] bg-white p-5">
              <h3 className="text-xl font-semibold text-[#0F2A1F] mb-4">You may also like</h3>
              <div className="space-y-3">
                {relatedBlogs.map((item) => {
                  const cardImage = item.banner ? getImageUrl(item.banner) : "/placeholder.svg";
                  return (
                    <Link key={item.id} to={`/blog/${item.slug}`} className="flex gap-3 group">
                      <img src={cardImage} alt={item.title} className="w-[88px] h-[72px] rounded-lg object-cover shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-[#193428] group-hover:text-[#064734] line-clamp-2">{item.title}</p>
                        <p className="text-xs text-[#6B7E74] mt-1">{item.readingTime || 7} min read</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link to="/blogs" className="inline-flex mt-4 text-sm font-semibold text-[#064734] hover:underline">
                View all articles
              </Link>
            </div>

            <div className="rounded-2xl border border-[#E4EADF] bg-[#F1F7E7] p-5">
              <h3 className="text-xl font-semibold text-[#0F2A1F] mb-3">Our Recommendation</h3>
              <img
                src={recommendedProduct ? getProductImages(recommendedProduct)[0] : "/placeholder.svg"}
                alt={recommendedProduct?.name || "Rephyl recommendation"}
                className="w-full h-[220px] object-cover rounded-lg mb-3"
              />
              <p className="font-semibold text-[#193428]">{recommendedProduct?.name || "Rephyl Plant-Powered All Surface Cleaner"}</p>
              <ul className="mt-2 space-y-1 text-sm text-[#52695F]">
                {(recommendedProduct?.featureBadges?.slice(0, 3) || ["Enzyme powered cleaning", "Plant-based ingredients", "Safe for pets and kids"]).map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Link
                to={recommendedProduct ? getCanonicalProductPath(recommendedProduct) : "/surface-care/plant-powered-all-surface-cleaner"}
                className="inline-block mt-4 px-4 py-2 rounded-lg bg-[#064734] text-white text-sm font-semibold hover:bg-[#053a29]"
              >
                Shop Now
              </Link>
            </div>

            <div className="rounded-2xl border border-[#E4EADF] bg-white p-5">
              <h3 className="text-xl font-semibold text-[#0F2A1F] mb-3">FAQs</h3>
              <Accordion type="single" collapsible className="space-y-1">
                {BLOG_FAQS.map((faq, idx) => (
                  <AccordionItem key={idx} value={`blog-faq-${idx}`} className="border-b border-[#ECF1E8]">
                    <AccordionTrigger className="text-left text-sm text-[#193428]">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-[#5A6A62]">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Link to="/faqs" className="inline-flex mt-4 text-sm font-semibold text-[#064734] hover:underline">
                View all FAQs
              </Link>
            </div>
          </aside>
        </section>

        <div className="mt-10 rounded-2xl border border-[#E4EADF] bg-[#F1F7E7] p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold text-[#0F2A1F]">Your Pet Deserves a Safe Space, Not Just a Clean One</p>
            <p className="text-[#556A60] mt-1">Choose cleaner air, cleaner floors, and safer routines every day.</p>
          </div>
          <Link to="/shop" className="px-5 py-3 rounded-lg bg-[#064734] text-white font-semibold hover:bg-[#053a29]">
            Shop Rephyl Cleaners
          </Link>
        </div>

        <div className="mt-8">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
