import { customersReviews } from './customersReviews';

export const mealContentEn = {
  "dir": "ltr",
  "label": "EN",
  "nav": {
    "menu": "Menu",
    "how": "How it works",
    "delivery": "Delivery",
    "qa": "Q&A",
    "designSystem": "Design system",
    "signin": "Sign in",
    "order": "View menu"
  },
  "siteNav": {
    "openMenu": "Open menu",
    "menuTitle": "Menu",
    "account": "Account",
    "personalCabinet": "Personal account",
    "navigation": "Navigation",
    "reviews": "Reviews",
    "legal": "Legal",
    "support": "Support",
    "followUs": "Follow us",
    "signOut": "Log out",
    "continueVerification": "Continue verification",
    "whatsapp": "WhatsApp",
    "telegram": "Telegram",
    "email": "Email",
    "blog": "Blog"
  },
  "hero": {
    "badge": "Fresh, ready-to-eat meals · UAE",
    "title": "Tasty ready-to-eat meals for a month",
    "only": "Only",
    "perMonth": "/month",
    "was": "1596",
    "now": "999",
    "cur": "AED",
    "sub": "No shopping, no cooking, no washing up. Balanced meals, chilled and delivered to your door multiple times a week.",
    "cta": "View menu & order",
    "ctaSub": "from 39.9 AED / day",
    "stats": [
      {
        "v": "Customize",
        "l": "menu"
      },
      {
        "v": "Pause",
        "l": "anytime"
      },
      {
        "v": "Free",
        "l": "delivery"
      }
    ]
  },
  "compare": {
    "eyebrow": "Why theMeal",
    "title": "Tired of wasting time, money and energy on food?",
    "problemsTitle": "The daily grind",
    "solutionsTitle": "With theMeal",
    "problems": [
      { "text": "Cooking every day", "icon": "/main-landing/assets/compare/spiral-eyes.png" },
      { "text": "High groceries & take-away bills", "icon": "/main-landing/assets/compare/money-wings.png" },
      { "text": "“Healthy eating” is confusing", "icon": "/main-landing/assets/compare/exploding-head.png" },
      { "text": "Eating too much fast food", "icon": "/main-landing/assets/compare/french-fries.png" }
    ],
    "solutions": [
      { "text": "No cooking — just heat & eat", "icon": "/main-landing/assets/compare/savoring-food.png" },
      { "text": "Balanced, ready-to-eat meals", "icon": "/main-landing/assets/compare/balanced-meal.png" },
      { "text": "Fridge always stocked", "icon": "/main-landing/assets/compare/fridge.png" },
      { "text": "Zero “what’s for dinner?” stress", "icon": "/main-landing/assets/compare/lotus.png" }
    ],
    "best": "The best value in UAE — from just 14.9 AED per meal",
    "perMeal": "per meal",
    "costTitle": "Cost per meal",
    "compare": [
      {
        "k": "Supermarket",
        "v": "AED 15–40"
      },
      {
        "k": "Delivery apps",
        "v": "AED 20–60"
      },
      {
        "k": "Other plans",
        "v": "AED 30–60"
      },
      {
        "k": "theMeal",
        "v": "From AED 14.9",
        "hot": true
      }
    ],
    "bestShort": "The best value in UAE"
  },
  "how": {
    "eyebrow": "How it works",
    "title": "Three steps. Zero effort.",
    "steps": [
      {
        "n": "01",
        "t": "We cook",
        "d": "Chefs prepare tasty, nutritious meals fresh — never frozen."
      },
      {
        "n": "02",
        "t": "We deliver",
        "d": "Free delivery in 3-hour slots, multiple times a week, anywhere in the UAE."
      },
      {
        "n": "03",
        "t": "You eat",
        "d": "Just heat and enjoy. No prep, no cleanup."
      }
    ]
  },
  "menu": {
    "eyebrow": "Sample menu",
    "title": "What you’ll eat every day",
    "trusted": "Trusted by 10,000+ customers in the UAE",
    "cta": "Choose my plan",
    "ctaSub": "from 39.9 AED/day",
    "note": "Menu doesn’t repeat for weeks · choose meals, calories & plan length · exclude ingredients",
    "days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "slots": [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Soup"
    ],
    "meals": {
      "Mon": [
        "Spinach breakfast quiche",
        "Grilled shrimp, basmati rice, peas & carrots",
        "Grandma’s meatballs, roasted potato & veggies",
        "Chicken soup"
      ],
      "Tue": [
        "French omelette, sesame beetroot & grilled tomatoes",
        "Beef shawarma bowl with veggie mix & farro",
        "Bolognese pasta",
        "Tomato soup"
      ],
      "Wed": [
        "Egg paratha roll",
        "Homemade beef cutlet, roasted potato & veggies",
        "Fish cutlets, grilled marrow, tartar & couscous",
        "Mushroom soup"
      ],
      "Thu": [
        "Spicy chicken wings, roasted potato & dip",
        "Orange chicken with fried rice",
        "Stuffed capsicum, roasted potato & vegetables",
        "Broccoli soup"
      ],
      "Fri": [
        "Chicken & zucchini pancakes with yogurt",
        "Grilled shrimp, potato wedges & broccoli",
        "Grilled beef kofta, onion pilaf & veggies",
        "Minestrone soup"
      ],
      "Sat": [
        "Kung Pao chicken with asian noodles",
        "Chicken Stroganoff, potato wedges & corn",
        "Chicken cutlet, mushroom buckwheat & veggies",
        "Pumpkin soup"
      ],
      "Sun": [
        "Evergreen frittata with toast",
        "Baked lemon white fish, rice & vegetables",
        "Chicken biryani",
        "Lentil soup"
      ]
    }
  },
  "customers": {
    "eyebrow": "Loved across the UAE",
    "title": "What our customers say",
    "items": customersReviews.map((review) => ({
      id: review.id,
      kind: review.kind,
      q: review.text,
      n: review.name,
      c: review.subtitle ?? "",
      r: review.rating ?? 5,
      platform: review.platform,
      imageUrl: review.imageUrl,
      videoUrl: review.videoUrl,
      avatarUrl: review.avatarUrl,
      socialLink: review.socialLink,
    })),
  },
  "fresh": {
    "eyebrow": "Always fresh",
    "title": "Fresh from our kitchen to\u00A0your fridge",
    "items": [
      "Prepared the night before delivery and chilled — never frozen.",
      "A full cold chain, from kitchen to refrigerated van to your door.",
      "Food-safe sealed packaging keeps meals fresh for 3–5 days.",
      "Just store in your fridge — it stays as fresh as the moment it was cooked."
    ],
    "badge": "0–4°C cold chain"
  },
  "gallery": {
    "eyebrow": "Inside the kitchen",
    "title": "Where it all happens"
  },
  "benefits": {
    "eyebrow": "The honest math",
    "title": "Compare your real spend",
    "bottom": "See how much time and money food actually costs you.",
    "cta": "Take the 2-minute test",
    "cards": [
      {
        "k": "home",
        "t": "Cook at home",
        "s": "At least 2 hours a day",
        "total": "AED 900–1200",
        "per": "/mo",
        "items": [
          [
            "Buy groceries",
            "~15 h/mo"
          ],
          [
            "Cook",
            "~60 h/mo"
          ],
          [
            "Wash dishes",
            "~60 h/mo"
          ]
        ]
      },
      {
        "k": "out",
        "t": "Eat out",
        "s": "Spend a lot of money",
        "total": "AED 2500–4000",
        "per": "/mo",
        "items": [
          [
            "Average meal out",
            "50–70 AED"
          ],
          [
            "Often unhealthy",
            "Hidden health cost"
          ],
          [
            "Average day",
            "~150 AED"
          ]
        ]
      },
      {
        "k": "meal",
        "t": "Eat with theMeal",
        "s": "Save time and money",
        "total": "AED 999",
        "per": "/mo",
        "items": [
          [
            "Affordable",
            "from 39.9 AED/day"
          ],
          [
            "Convenient",
            "Where & when you need"
          ],
          [
            "Healthy",
            "Quality natural food"
          ]
        ]
      }
    ],
    "onlyL": "only",
    "avgL": "avg cost",
    "bestL": "★ best value"
  },
  "delivery": {
    "eyebrow": "Free delivery",
    "title": "Free delivery across the UAE",
    "anyTime": "Any time",
    "anyTimeD": "Slots 03:00–22:00, you pick the window",
    "twice": "Multiple times a week",
    "twiceD": "Monday, Thursday & Saturday",
    "anyPlace": "Any place",
    "anyPlaceD": "All emirates covered",
    "cta": "Make an order"
  },
  "faq": {
    "eyebrow": "Q&A",
    "title": "Any questions?",
    "tabs": [
      "About our Meal Plans",
      "Products and Storage",
      "Payment and Delivery"
    ],
    "groups": [
      [
        [
          "What is \"TheMeal\"?",
          "TheMeal delivers fresh, ready-to-eat meals to your home in Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, Ras Al Khaimah, Umm Al Quwain, Fujairah, Al Ghadeer. You always have tasty, ready-to-eat food without shopping or cooking."
        ],
        [
          "What does the meal plan include?",
          "Our meal plans include food for a month, delivered every Wednesday and Sunday at the time that is convenient for you. Every box contains fresh meals for the next 2–4 days. No need to worry about grocery shopping or cooking."
        ],
        [
          "Do you offer a trial order?",
          "Yes. You can try TheMeal with a one-week plan before choosing a longer option. It has 2 deliveries for 5–7 days of meals. You will be able to try our meals and decide on your meal plan for the month."
        ],
        [
          "Can I customise my order?",
          "No, the menu is fixed. It's balanced, varied, and meals repeat no more than once every two weeks. While we currently don't offer customization options, we take great care in planning our menu to ensure the meals are both nutritionally balanced and varied. We are constantly developing new dishes and menu lines."
        ],
        [
          "How to pause the plan?",
          "It's easy to pause your plan. Just inform our account manager via any messenger. You can reschedule or pause your delivery by contacting us at least 3 days before your next planned delivery date. Depending on your plan, you have 1 to 2 weeks of free pause. Ask your manager about paid options for longer periods."
        ],
        [
          "Do you have low-or high-carb food?",
          "We offer balanced daily meal sets made from natural ingredients. 2 meals per day: about 800 calories. 3 meals per day: about 1300 calories. 4 meals per day: about 1450 calories. Each plan provides all essential nutrients to support a healthy diet. You can use our meal plan as a basis for your diet when losing weight."
        ],
        [
          "Can I see food details and a full menu?",
          "Sure! It's in the \"Menu Sample\" section. We are constantly improving our ready-to-eat meals, so the menu is regularly updated and changed."
        ]
      ],
      [
        [
          "How do I store meals?",
          "Simply keep the meals in the fridge at 2–4°C. We deliver fresh food twice a week, so you always have a new supply on hand and enough space in the refrigerator."
        ],
        [
          "Do you deliver fresh or frozen food?",
          "We deliver fresh, chilled meals prepared the night before delivery — never frozen — according to UAE food safety standards."
        ],
        [
          "How do you maintain the freshness of the food?",
          "We cook with quality ingredients, seal meals in food-safe packaging with potassium sorbate — a widely used, approved preservative — and keep them chilled all the way to your doorstep. All you need to do — put food in the refrigerator as soon as you receive it."
        ],
        [
          "Why is this necessary?",
          "Potassium sorbate is an internationally approved food preservative (E202) that inhibits mould and bacteria growth, keeping meals fresh and safe. Combined with our cold chain, it allows us to maintain a shelf life of up to 5 days while preserving the taste and nutritional value of your food."
        ]
      ],
      [
        [
          "When and how often do you deliver?",
          "We deliver only on Wednesdays and Sundays. We deliver within 2–3-hour slots only between 03:00–22:00. Check the time slots for your Emirate. Every box contains fresh meals for the next 2–4 days."
        ],
        [
          "How does delivery work?",
          "During daytime and evening deliveries the courier will text you 15–30 minutes before delivery. If you have the \"Leave at the door\" option enabled, you will be notified by SMS upon delivery. Put food in the refrigerator as soon as you receive it."
        ],
        [
          "Where do you deliver?",
          "We deliver in Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, Ras Al Khaimah, Umm Al Quwain, Fujairah, Al Ghadeer. We do not currently deliver to other Emirates because we want to ensure that you always receive fresh food on time."
        ],
        [
          "Do you have any promos or discounts?",
          "We have fine-tuned all business processes and set up production so that we can deliver great food at low prices. For this reason, we currently don't offer special promotions or discounts. You can check all current special offers with our manager — he will be happy to tell you about all available discounts and advantageous options."
        ],
        [
          "Can I trust you, and what payment methods are available?",
          "Yes. TheMeal is a licensed company in the UAE. Payments are made securely online by bank card, and we never see your card details. You can also pay in interest-free installments with Tabby. You can read more about our company on our website in the sections Privacy Policy and Terms & conditions."
        ]
      ]
    ]
  },
  "final": {
    "pre": "Order a month’s worth of food",
    "hi": "for\u00A0AED\u00A0999",
    "sub": "Customize your menu · Free delivery · Pause anytime",
    "cta": "Make an order"
  },
  "footer": {
    "price": "Price",
    "qa": "Q&A",
    "delivery": "Delivery",
    "privacy": "Privacy Policy",
    "terms": "Terms & conditions",
    "blog": "Blog",
    "legal": "YUMGOODS-FZCO · CIF DSO-FZCO-21291 · License 22986 · IFZA Business Park, DDP, PO Box 342001, Dubai, UAE",
    "tagline": "Fresh, ready-to-eat meals delivered across the UAE."
  },
  "blog": {
    "readArticle": "Read article",
    "backToBlog": "Back to blog",
    "notFoundDescription": "The blog article you are looking for does not exist or may have been moved.",
    "shareLabel": "Share this article",
    "copyLink": "Copy link",
    "linkCopied": "Link copied",
    "shareWhatsApp": "Share on WhatsApp",
    "shareFacebook": "Share on Facebook",
    "shareTelegram": "Share on Telegram",
    "shareNative": "Share"
  },
  "checkout": {
    "title": "Build your plan",
    "steps": [
      "Plan",
      "You",
      "Delivery",
      "Payment"
    ],
    "mealsPerDay": "Meals per day",
    "planLength": "Plan length",
    "kcal": "Calories / day",
    "week": "1 week",
    "month": "1 month",
    "summary": "Order summary",
    "total": "Total",
    "perDay": "per day",
    "name": "Full name",
    "phone": "Phone",
    "email": "Email",
    "addr": "Delivery address",
    "area": "Emirate",
    "slot": "Preferred slot",
    "pay": "Pay securely",
    "placed": "Order placed!",
    "placedSub": "We’ll text you to confirm your first delivery.",
    "done": "Back to site",
    "next": "Continue",
    "back": "Back",
    "free": "Free"
  },
  "lead": {
    "eyebrow": "Personal offer",
    "title": "Like what you see? Let's match you a plan",
    "sub": "We'll WhatsApp you a plan that fits your routine and answer anything. No spam, no commitment.",
    "cc": "+971",
    "ph": "50 123 4567",
    "cta": "Match my plan",
    "hint": "We’ll send a verification code via SMS.",
    "done": "Done! Check your WhatsApp",
    "doneSub": "We’ve sent your menu and offer.",
    "continueCta": "Continue",
    "verifiedTitle": "You're all set",
    "verifiedSub": "We'll reach out on WhatsApp a bit later. In the meantime, take a look at the menu — your plan's already set up with your numbers.",
    "verifiedCta": "Explore the menu",
    "smsTitle": "Enter the code from SMS",
    "smsError": "Incorrect code. Try again.",
    "changeNumber": "Change number"
  }
} as const;
export type MealContentEn = typeof mealContentEn;
