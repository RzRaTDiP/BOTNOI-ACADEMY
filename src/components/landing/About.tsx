import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ROTATING_TEXTS = [
  "Learn from real business challenges and work on real tasks.",
  "Receive close guidance, training, and support from experienced mentors.",
  "100% Work From Home",
  "Flexible, Convenient and modern"
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-blue/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Title */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-soft-pink rounded-full text-primary text-sm font-medium mb-6"
          >
            About Us
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8">
            What is <span className="text-navy-light">BOTNOI Academy</span>?
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-16 leading-relaxed"
          >
            “BOTNOI Academy is a learning playground” that gives students the opportunity to step outside the classroom and gain real-world work experience through internships.
          </motion.p>

          {/* CTA Button with Rotating Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="group gradient-cta text-primary hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-full px-4 md:px-8 py-4 md:py-6 text-sm md:text-lg font-semibold w-full max-w-3xl mx-auto h-auto min-h-[100px] md:min-h-[64px]"
              onClick={() => navigate("/internship")}
            >
              <div className="flex items-center justify-center w-full gap-2 md:gap-4">
                <div className="flex-1 flex justify-center items-center h-[80px] md:h-[40px] overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-full text-center px-1 md:px-4 leading-relaxed md:leading-normal flex items-center justify-center h-full"
                    >
                      {ROTATING_TEXTS[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <ArrowRight className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
          </motion.div>

          {/* Footer Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-semibold text-primary pt-8 max-w-2xl mx-auto"
          >
            A space that helps you discover your potential and confidently step into the professional world
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
