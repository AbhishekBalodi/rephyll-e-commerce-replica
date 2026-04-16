import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star } from "lucide-react";
import { DUMMY_REVIEWS, Review } from "@/data/reviews";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "rephyl_user_reviews";

const getStoredReviews = (): Review[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveReviews = (reviews: Review[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

const StarRating = ({ rating, interactive, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={interactive ? 24 : 16}
          className={`${
            star <= Math.floor(rating) ? "fill-primary text-primary" : star - 0.5 <= rating ? "fill-primary/50 text-primary" : "text-muted-foreground/30"
          } ${interactive ? "cursor-pointer hover:text-primary transition-colors" : ""}`}
          onClick={() => interactive && onRate?.(star)}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-card border border-border rounded-lg p-5 break-inside-avoid mb-4">
    <div className="flex items-center justify-between mb-3">
      <StarRating rating={review.rating} />
      <span className="text-xs text-muted-foreground">{review.date}</span>
    </div>
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
        <span className="text-xs font-semibold text-foreground">{review.name[0]}</span>
      </div>
      <span className="text-sm font-semibold text-foreground">{review.name}</span>
      {review.verified && (
        <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Verified</span>
      )}
    </div>
    <h4 className="text-sm font-bold text-foreground mb-2">{review.title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
  </div>
);

const TestimonialsPage = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const userReviews = getStoredReviews();
    return [...userReviews, ...DUMMY_REVIEWS];
  });
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !content.trim()) {
      toast({ title: "Error", description: "Please fill all fields.", variant: "destructive" });
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString("en-US"),
    };

    const userReviews = getStoredReviews();
    const updatedUserReviews = [newReview, ...userReviews];
    saveReviews(updatedUserReviews);

    setReviews([...updatedUserReviews, ...DUMMY_REVIEWS]);
    setName("");
    setRating(5);
    setTitle("");
    setContent("");
    setShowForm(false);
    toast({ title: "Thank you!", description: "Your review has been submitted." });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 pt-[104px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Customer Reviews
            </h1>
            <p className="text-muted-foreground">
              See what our customers are saying about rePhyl products
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {showForm && (
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12 max-w-2xl">
            <h3 className="text-lg font-bold text-foreground mb-6">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Rating</label>
                <StarRating rating={rating} interactive onRate={setRating} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Review Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your review a title"
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  maxLength={200}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Your Review</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your experience..."
                  rows={4}
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  maxLength={1000}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
