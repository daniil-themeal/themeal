import type { BlogPostSection } from '../../blog/types/blog.types';

export type AboutPageContent = {
  title: string;
  description: string;
  eyebrow: string;
  pageTitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  intro: string;
  sections: readonly BlogPostSection[];
  stats: readonly { value: string; label: string }[];
};

export const aboutPageContent: AboutPageContent = {
  title: 'About Us | TheMeal',
  description:
    'TheMeal delivers fresh, ready-to-eat meal plans across the UAE. Learn how we cook, deliver, and help busy residents eat well without the daily grind.',
  eyebrow: 'Our story',
  pageTitle: 'About TheMeal',
  heroImageUrl:
    'https://images.unsplash.com/photo-1574484284002-952d78426901?w=1200&auto=format&fit=crop&q=80',
  heroImageAlt: 'Chef preparing fresh dishes in a professional kitchen',
  intro:
    'TheMeal is a UAE meal subscription service built for people who want balanced, ready-to-eat food without spending hours on groceries, cooking, and cleanup.\n\nWe are operated by YUMGOODS FZCO — a licensed company based in Dubai — and we deliver chilled meals across the UAE multiple times a week. Our goal is simple: remove the daily stress around food so you can focus on everything else.',
  sections: [
    {
      title: 'Why we started',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most residents in Dubai, Abu Dhabi, and Sharjah face the same loop: long commutes, unpredictable schedules, and the constant question of what to eat. Cooking every day is expensive in time. Delivery apps add up fast. Meal prep on Sunday often ends in wasted food by Wednesday.',
        },
        {
          type: 'quote',
          text: 'Tired of wasting time, money and energy on food? That is the problem we set out to solve.',
          cite: 'TheMeal founding team',
        },
        {
          type: 'paragraph',
          text: 'We built TheMeal around a straightforward promise: three steps, zero effort. We cook. We deliver. You eat. No shopping lists, no pans to scrub, no guessing whether dinner fits your goals.',
        },
      ],
    },
    {
      title: 'What we do differently',
      blocks: [
        {
          type: 'paragraph',
          text: 'Fresh: Meals are prepared the night before delivery and kept chilled — never frozen. A full cold chain runs from our kitchen to a refrigerated van to your door.',
        },
        {
          type: 'paragraph',
          text: 'Flexible: Customize your menu, exclude ingredients, pause your plan, or reschedule deliveries. You are not locked into a rigid diet program.',
        },
        {
          type: 'paragraph',
          text: 'Fair: We fine-tuned production and logistics so great food stays affordable — from just 14.9 AED per meal, with free delivery in convenient time slots.',
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&auto=format&fit=crop&q=80',
          alt: 'Colorful balanced meal prep bowls with vegetables, grains, and protein',
          caption: 'Every batch is cooked for subscribers — not anonymous app orders.',
        },
      ],
    },
    {
      title: 'Fresh from kitchen to fridge',
      blocks: [
        {
          type: 'paragraph',
          text: 'Quality starts before delivery. Our chefs prepare balanced daily sets from natural ingredients, designed to stay fresh for several days in your refrigerator.',
        },
        {
          type: 'paragraph',
          text: '- Prepared the night before delivery and chilled — never frozen.',
        },
        {
          type: 'paragraph',
          text: '- A full cold chain, from kitchen to refrigerated van to your door.',
        },
        {
          type: 'paragraph',
          text: '- Food-safe sealed packaging keeps meals fresh for 3–5 days.',
        },
        {
          type: 'paragraph',
          text: '- Just store in your fridge — it stays as fresh as the moment it was cooked.',
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1630544304137-ce0259275534?w=1200&auto=format&fit=crop&q=80',
          alt: 'Sealed meal prep containers stored in a refrigerator',
          caption: 'Sealed portions stay fresh in your fridge for several days after each delivery.',
        },
      ],
    },
    {
      title: 'Trusted across the UAE',
      blocks: [
        {
          type: 'quote',
          text: 'I can spend my quality time with my kids rather than spending time cooking and thinking about what to cook. TheMeal truly made my daily life healthier, lighter, and stress-free.',
          cite: 'Fatima, TheMeal subscriber',
        },
        {
          type: 'paragraph',
          text: 'Thousands of customers across the UAE rely on TheMeal for weekday lunches, family dinners, and office routines. Deliveries arrive on Wednesday and Sunday — you choose the time slot that fits your calendar.',
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80',
          alt: 'Dubai skyline at sunset',
          caption: 'Serving busy residents across Dubai, Abu Dhabi, Sharjah, and the wider UAE.',
        },
      ],
    },
    {
      title: 'Our values',
      blocks: [
        {
          type: 'paragraph',
          text: '- Quality ingredients and chef-prepared recipes you can trust every day.',
        },
        {
          type: 'paragraph',
          text: '- Transparent cold-chain logistics and clear labeling on every box.',
        },
        {
          type: 'paragraph',
          text: '- Honest pricing — no hidden fees, with secure online payment and Tabby installments.',
        },
        {
          type: 'paragraph',
          text: '- Pause anytime and real support via WhatsApp when plans change.',
        },
        {
          type: 'paragraph',
          text: '- Respect for your preferences: exclude red meat, seafood, or any ingredient that does not work for you.',
        },
      ],
    },
  ],
  stats: [
    { value: '10,000+', label: 'customers in the UAE' },
    { value: 'Wed & Sun', label: 'delivery days' },
    { value: 'From 14.9 AED', label: 'per meal' },
  ],
};
