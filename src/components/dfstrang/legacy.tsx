"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Gem, HardHat, Ruler } from "lucide-react";

const TEAM = [
  {
    name: "Simon Strang",
    role: "Director",
    image: "/images/team-simon-strang.jpg",
    bio: "Design-led leadership continuing the family legacy with uncompromised focus, vision and passion for the last 10 years.",
  },
  {
    name: "Dave Strang",
    role: "Founder & Director",
    image: "/images/team-dave-strang.jpg",
    bio: "Has been involved in every facet of the business since establishing DF Strang Buildings in 1984, instilling strong core values.",
  },
  {
    name: "Faisha Shaik",
    role: "Office Manager",
    image: "/images/team-faisha-shaik.jpg",
    bio: "Keeps the engine room running — coordinating projects, clients and the professional partner network.",
  },
  {
    name: "Pamela Naicker",
    role: "Accountant",
    image: "/images/team-pamela-naicker.jpg",
    bio: "Financial stewardship ensuring every development is delivered on budget, transparently.",
  },
];

const PILLARS = [
  {
    icon: HardHat,
    title: "Turnkey Delivery",
    text: "Residential, industrial and commercial developments delivered timeously, within budget and to the standard you expect.",
  },
  {
    icon: Compass,
    title: "Design-Led Vision",
    text: "With a degree in design, Simon can turn any vision into an exceptional design backed by world-class construction solutions.",
  },
  {
    icon: Gem,
    title: "Integrity First",
    text: "The highest standard of integrity, professionalism and service excellence — delivery that meets, and surpasses, expectations.",
  },
];

export function Legacy() {
  return (
    <section id="legacy" className="relative overflow-hidden bg-charcoal py-20 sm:py-28">
      <div className="absolute inset-0 architect-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 gold-line" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-gold">
              Our Legacy · Est. 1984
            </p>
            <span className="h-px w-10 gold-line" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-medium text-white sm:text-4xl lg:text-[2.75rem]">
            Strong Foundations. <span className="text-gradient-gold">Multi-Generational Vision.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
            Success comes from working together. From Dave Strang&apos;s pioneering
            foundations to Simon&apos;s design-led expansion — one family, one
            standard, four decades of landmarks.
          </p>
        </div>

        {/* Pillars */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-white/10 bg-deep-slate/60 p-6 backdrop-blur-sm"
            >
              <p.icon className="h-6 w-6 text-sand-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <div className="mt-16">
          <div className="mb-8 flex items-center gap-4">
            <Ruler className="h-5 w-5 text-sand-gold" aria-hidden="true" />
            <h3 className="font-display text-2xl font-medium text-white">
              Meet the Management Team
            </h3>
            <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden="true" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group overflow-hidden border border-white/10 bg-deep-slate/40 transition-colors hover:border-sand-gold/40"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at DF Strang Buildings`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal to-transparent" />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-lg font-semibold text-white">{member.name}</h4>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-sand-gold">
                    {member.role}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/55">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
