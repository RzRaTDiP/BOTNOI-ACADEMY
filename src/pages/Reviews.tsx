import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { INTERNSHIP_POSITIONS } from "./Internship";

// Type definition for a review
type Review = {
  id: number;
  name: string;
  university: string;
  text: string;
  image?: string;
};

// Mock data generator for reviews based on positions
const generateMockReviews = () => {
  const reviewsByTeam: { teamName: string; reviews: Review[] }[] = [];
  let reviewId = 1;

  INTERNSHIP_POSITIONS.forEach((position) => {
    const numReviews = Math.floor(Math.random() * 4) + 1; // 1 to 4 reviews per team
    const reviews: Review[] = [];

    for (let i = 0; i < numReviews; i++) {
      reviews.push({
        id: reviewId++,
        name: `Trainee ${["Somchai", "Somsak", "Somying", "Somporn"][i % 4]}`,
        university: "King Mongkut's University of Technology North Bangkok",
        text: "Lorem ipsum dolor sit amet consectetur. Interdum vestibulum ipsum faucibus nam pellentesque interdum semper lobortis.",
      });
    }

    reviewsByTeam.push({
      teamName: position.title,
      reviews,
    });
  });

  return reviewsByTeam;
};

const REVIEWS_DATA = generateMockReviews();

const ReviewCard = ({ review }: { review: Review }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-[#FFF0F0] p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center hover:shadow-md transition-shadow"
  >
    {/* Circular Image Placeholder */}
    <div className="flex-shrink-0">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 border-2 border-white shadow-sm"></div>
    </div>
    
    <div className="flex-1">
      <h4 className="font-bold text-lg text-primary">{review.name}</h4>
      <p className="text-xs text-muted-foreground italic mb-2">{review.university}</p>
      <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
    </div>
  </motion.div>
);

const Reviews = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-16"
        >
          Hear from Previous Trainees
        </motion.h1>

        <div className="space-y-16">
          {REVIEWS_DATA.map((section, index) => (
            <div key={index} className="space-y-8">
              {/* Team Pill Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <span className="px-6 py-2 rounded-full border-2 border-primary text-primary font-bold text-lg bg-white shadow-sm">
                  {section.teamName}
                </span>
              </motion.div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;
