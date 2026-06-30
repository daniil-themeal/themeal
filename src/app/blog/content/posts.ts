import type { BlogListMeta, BlogPost } from '../types/blog.types';

export const blogListMeta: BlogListMeta = {
  title: 'Blog | TheMeal',
  description:
    'Insights on nutrition, meal planning, and the food delivery business in the UAE. Tips for eating well with a busy schedule.',
  pageTitle: 'TheMeal Blog',
  pageLead:
    'Practical guides on healthy eating, meal prep, and how modern food businesses are changing the way UAE residents eat.',
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: 'healthy-meal-prep-uae',
    title: 'Healthy Meal Prep Trends in the UAE: What Busy Residents Are Choosing in 2026',
    excerpt:
      'From macro-balanced lunch boxes to chilled ready-to-eat plans — how UAE residents are rethinking meal prep without spending Sunday in the kitchen.',
    category: 'Nutrition',
    imageUrl:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Colorful healthy meal prep bowls with vegetables and grains',
    publishedAt: '2026-06-15',
    intro:
      'Meal prep used to mean stacking identical containers in the fridge every Sunday. In the UAE, that model is shifting fast.\n\nResidents across Dubai, Abu Dhabi, and Sharjah are looking for balanced nutrition without the time cost of shopping, cooking, and cleaning every day. Ready-to-eat meal plans and chilled delivery services are filling that gap — especially for professionals who want structure without sacrificing variety.',
    sections: [
      {
        title: 'Why traditional meal prep is losing ground',
        blocks: [
          {
            type: 'paragraph',
            text: 'Batch cooking works when your schedule is predictable. In a market where commutes, meetings, and social plans change weekly, rigid prep often leads to wasted food and menu fatigue.',
          },
          {
            type: 'quote',
            text: 'I stopped meal prepping when I realised I was throwing away half my Sunday batch by Wednesday. A chilled plan fixed that overnight.',
            cite: 'Dubai marketing manager, TheMeal subscriber',
          },
          {
            type: 'paragraph',
            text: 'Heat-and-eat options from professional kitchens offer portion control and nutritional consistency that home prep struggles to match — especially when recipes are designed by chefs and reviewed by nutrition teams.',
          },
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80',
            alt: 'Fresh salad bowl with avocado, grains, and vegetables',
            caption: 'Balanced bowls with visible macros are replacing identical stacked containers.',
          },
        ],
      },
      {
        title: 'What “healthy” means for UAE customers',
        blocks: [
          {
            type: 'paragraph',
            text: 'Protein-forward lunches, controlled sodium, and visible macro information are now baseline expectations — not premium add-ons.',
          },
          {
            type: 'paragraph',
            text: 'Many customers also filter menus by ingredients: excluding red meat or seafood, choosing lighter dinner options, or sticking to weekday-only delivery schedules that match office routines.',
          },
          {
            type: 'quote',
            text: 'Healthy here doesn’t mean restrictive. It means I know what I’m eating, I can skip red meat, and I don’t have to think about it at 1 p.m.',
            cite: 'Abu Dhabi finance professional',
          },
          {
            type: 'paragraph',
            text: 'Key takeaway: flexibility beats perfection. Plans that adapt to real life — pause weeks, swap days, or adjust portions — see higher long-term retention than strict diet programs.',
          },
        ],
      },
      {
        title: 'The role of chilled delivery',
        blocks: [
          {
            type: 'paragraph',
            text: 'Chilled — not frozen — meals preserve texture and flavor while staying safe for several days in the refrigerator. That window matters when deliveries arrive twice a week rather than daily.',
          },
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop&q=80',
            alt: 'Chef plating fresh meals in a professional kitchen',
            caption: 'Professional kitchens batch for subscribers — not for anonymous app orders.',
          },
          {
            type: 'paragraph',
            text: 'For food businesses, cold-chain logistics and clear labeling (ingredients, allergens, best-before dates) are as important as the recipes themselves.',
          },
        ],
      },
      {
        title: 'Looking ahead',
        blocks: [
          {
            type: 'paragraph',
            text: 'Expect more personalization: AI-assisted menu suggestions, seasonal local produce, and tighter integration between wellness apps and meal subscriptions.',
          },
          {
            type: 'quote',
            text: 'The next wave isn’t more diets — it’s meals that fit your calendar without you managing them.',
            cite: 'UAE food-tech analyst',
          },
          {
            type: 'paragraph',
            text: 'Whether you cook at home or subscribe to a plan, the goal is the same — reliable nutrition that fits your calendar, not the other way around.',
          },
        ],
      },
    ],
  },
  {
    slug: 'food-delivery-sustainability',
    title: 'How Food Delivery Businesses Are Cutting Waste Without Cutting Quality',
    excerpt:
      'Portion forecasting, chilled logistics, and smarter packaging — practical steps meal delivery brands use to reduce food waste in the UAE.',
    category: 'Food business',
    imageUrl:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Fresh vegetables and sustainable food packaging on a kitchen counter',
    publishedAt: '2026-06-08',
    intro:
      'Food waste is one of the hidden costs of the delivery boom. Overproduction, last-mile spoilage, and oversized portions all add up — for margins and for the environment.\n\nSubscription meal companies operate differently from on-demand restaurants: they know roughly how many meals to produce each week. That predictability is a lever for sustainability when used well.',
    sections: [
      {
        title: 'Forecasting beats guessing',
        blocks: [
          {
            type: 'paragraph',
            text: 'Weekly subscription models let kitchens plan production around active subscribers, menu rotations, and historical skip rates.',
          },
          {
            type: 'quote',
            text: 'When customers pause instead of ghosting an order, we produce exactly what we need. That alone cut our surplus by double digits.',
            cite: 'Operations lead, UAE meal subscription brand',
          },
          {
            type: 'paragraph',
            text: 'When customers can pause or reschedule deliveries, operations teams get clearer signals than one-off orders that spike unpredictably on apps.',
          },
        ],
      },
      {
        title: 'Chilled supply chains reduce spoilage',
        blocks: [
          {
            type: 'paragraph',
            text: 'Frozen meals last longer in storage but often lose quality when reheated. Chilled meals have a shorter shelf life but typically arrive fresher and generate less freezer energy use.',
          },
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1200&auto=format&fit=crop&q=80',
            alt: 'Insulated delivery bag with chilled meal containers',
            caption: 'Twice-weekly chilled routes keep vans full and fridges efficient.',
          },
          {
            type: 'paragraph',
            text: 'Routing deliveries in fixed windows — for example, twice weekly — keeps vans efficient and reduces failed drop-offs that lead to discarded meals.',
          },
        ],
      },
      {
        title: 'Packaging that matches the product',
        blocks: [
          {
            type: 'paragraph',
            text: 'Recyclable trays, right-sized boxes, and insulation that matches UAE summer heat are non-negotiable for premium brands.',
          },
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1602607203588-d6d0eda790e3?w=1200&auto=format&fit=crop&q=80',
            alt: 'Eco-friendly meal packaging and recyclable containers',
            caption: 'Right-sized packaging means fewer remakes from damaged deliveries.',
          },
          {
            type: 'quote',
            text: 'Customers never see the waste we avoid — but they feel it in consistent quality and fewer soggy arrivals in summer.',
            cite: 'Head of logistics, Dubai-based kitchen',
          },
          {
            type: 'paragraph',
            text: 'Smarter packaging also means fewer damaged meals and fewer remakes — a direct waste reduction that customers never see but finance teams always feel.',
          },
        ],
      },
      {
        title: 'What customers can do',
        blocks: [
          {
            type: 'paragraph',
            text: 'Refrigerate meals promptly, respect use-by dates, and use pause features instead of letting unused deliveries arrive.',
          },
          {
            type: 'paragraph',
            text: 'Businesses that communicate storage tips and portion intent build trust — and waste less — when customers know how meals are meant to be eaten.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ready-to-eat-meals-busy-lifestyle',
    title: 'Why Ready-to-Eat Meal Plans Work for Busy Professionals in Dubai',
    excerpt:
      'Time, decision fatigue, and delivery reliability — three reasons ready-to-eat subscriptions are becoming a default for Dubai’s working week.',
    category: 'Lifestyle',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Modern restaurant dining setting representing busy professional lifestyle',
    publishedAt: '2026-05-28',
    intro:
      'Dubai runs on long hours and long commutes. When lunch is another decision on an already full day, default options win — usually delivery apps, office canteens, or skipping meals altogether.\n\nReady-to-eat meal plans flip that default. Meals arrive on a schedule you set; you heat, eat, and move on. For many professionals, that reliability is worth more than hunting for a “healthy option” every afternoon.',
    sections: [
      {
        title: 'Time is the real currency',
        blocks: [
          {
            type: 'paragraph',
            text: 'Shopping, cooking, and washing up can easily consume ten or more hours a week. Subscription meals buy that time back — often for less than daily restaurant delivery.',
          },
          {
            type: 'quote',
            text: 'Ten hours back every week is worth more to me than any loyalty points on a delivery app.',
            cite: 'Sharjah-based product designer',
          },
          {
            type: 'paragraph',
            text: 'Plans priced per month with clear per-day costs also simplify budgeting compared to unpredictable app orders.',
          },
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&auto=format&fit=crop&q=80',
            alt: 'Professionals sharing a lunch break at the office',
            caption: 'Structured lunch beats another 20-minute scroll through delivery apps.',
          },
        ],
      },
      {
        title: 'Decision fatigue is real',
        blocks: [
          {
            type: 'paragraph',
            text: 'Choosing what to eat three times a day adds cognitive load. Pre-selected menus with optional exclusions (no red meat, no seafood) reduce choices without removing control.',
          },
          {
            type: 'quote',
            text: 'I didn’t need more options — I needed fewer decisions before my afternoon meetings.',
            cite: 'Dubai consultant, weekday plan subscriber',
          },
          {
            type: 'paragraph',
            text: 'Teams that eat well consistently report fewer afternoon energy crashes — less about “superfoods” and more about regular, balanced portions.',
          },
        ],
      },
      {
        title: 'Built for the UAE rhythm',
        blocks: [
          {
            type: 'paragraph',
            text: 'Weekday-only or full-week formats match different household routines. Family plans let couples or roommates share delivery costs without cooking separate meals.',
          },
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1614018453562-77f6180ce036?w=1200&auto=format&fit=crop&q=80',
            alt: 'Ready-to-eat meal containers delivered to a home doorstep',
            caption: 'Scheduled drops twice a week — no per-order delivery fees.',
          },
          {
            type: 'paragraph',
            text: 'Free scheduled delivery — rather than paying per order — removes friction and makes meal plans feel like infrastructure, not a treat.',
          },
        ],
      },
      {
        title: 'Is it right for you?',
        blocks: [
          {
            type: 'paragraph',
            text: 'If you value variety, portion control, and time more than cooking as a hobby, a ready-to-eat plan is worth trying for a month.',
          },
          {
            type: 'quote',
            text: 'Try it for four weeks — not four days. Your routine needs a full work cycle to judge it.',
            cite: 'Nutrition coach, Dubai',
          },
          {
            type: 'paragraph',
            text: 'Look for transparent ingredients, allergen labels, and flexible pause policies. The best plans adapt when travel, Ramadan schedules, or work projects disrupt your routine.',
          },
        ],
      },
    ],
  },
] as const;

export function getAllPosts(): readonly BlogPost[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
