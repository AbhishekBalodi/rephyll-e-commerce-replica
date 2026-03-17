const BLOG_VIDEOS = [
  {
    src: "/videos/cleaning-1.mp4",
    title: "Quick Kitchen Cleaning Hacks",
    desc: "Watch how rePhyl products make kitchen cleaning effortless and chemical-free.",
  },
  {
    src: "/videos/cleaning-2.mp4",
    title: "Eco-Friendly Home Care Routine",
    desc: "A complete plant-based home cleaning routine that's safe for your family.",
  },
  {
    src: "/videos/cleaning-3.mp4",
    title: "Sparkling Floors in Minutes",
    desc: "See the magic of our floor cleaner — streak-free, fresh, and 100% biodegradable.",
  },
];

const BlogsSection = () => {
  return (
    <section className="bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-3">
          Cleaning Tips & Blogs
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Watch our eco-friendly cleaning tips and tricks
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_VIDEOS.map((video, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-border bg-card">
              <div className="aspect-[9/16] max-h-[420px] bg-muted">
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-foreground mb-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{video.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
