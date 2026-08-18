import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { faqs } from "@/lib/defaults";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              FAQ
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-balance">
              Frequently asked.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <ul className="border-t border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left hover:text-primary transition-colors"
                  >
                    <span className="text-lg md:text-xl font-medium">{f.q}</span>
                    <span className={`text-2xl transition-transform ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-muted-foreground max-w-2xl">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
