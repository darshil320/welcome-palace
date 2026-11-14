// ─── Chandni Chowk Chaat & Catering — full menu ──────────────────────────────
// Source: Chandni_Chowk_Royal_Menu_HD_Professional.pdf (pages 2–3).

export type MenuGroup = {
  title: string;
  items: readonly string[];
};

export type MenuSection = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  groups: readonly MenuGroup[];
  signatures: readonly string[];
};

export const chaatMenu: MenuSection = {
  id: "chaat-menu",
  eyebrow: "The Street-Food Heritage of Purani Delhi",
  title: "The Chaat Menu",
  subtitle: "Timeless classics, hot favourites and signature creations",
  groups: [
    {
      title: "Pani Puri & Golgappa",
      items: [
        "Classic Pani Puri",
        "Five-Flavour Pani Puri",
        "Jaljeera Pani Puri",
        "Rajasthani Pani Puri",
        "Stuffed Golgappa",
        "Cheese Pani Puri",
        "Dahi Puri",
        "Delhi Wali Dahi Puri",
      ],
    },
    {
      title: "Sev Puri, Bhel & Papdi",
      items: [
        "Sev Puri",
        "Sukha Puri",
        "Bhel Puri",
        "Jhal Muri",
        "Masala Puri",
        "Chinese Bhel",
        "Roasted Bhel",
        "Papdi Chaat",
        "Dahi Papdi Chaat",
        "Dilli Ki Papdi Chaat",
      ],
    },
    {
      title: "Tikki & Hot Chaat",
      items: [
        "Aloo Tikki Chaat",
        "Chole Tikki",
        "Ragda Pattice",
        "Samosa Chaat",
        "Kachori Chaat",
        "Dahi Aloo Tikki",
        "Ragda Puri",
        "Mini Chole Bhature Chaat",
        "Crispy Corn Chaat",
      ],
    },
    {
      title: "Purani Dilli Specials",
      items: [
        "Royal Raj Kachori",
        "Dahi Bhalla",
        "Palak Patta Chaat",
        "Tokri Chaat",
        "Banarasi Tamatar Chaat",
        "Anardana Aloo Chaat",
        "Khasta Kachori Chaat",
        "Dilli-Style Aloo Chaat",
      ],
    },
    {
      title: "Delhi Street-Food Favourites",
      items: [
        "Dilli Patila Matar Kulcha",
        "Matar Kulcha Chaat",
        "Pao Bhaji",
        "Moong Dal Chilla",
        "Paneer Moong Dal Chilla",
        "Stuffed Masala Chilla",
        "Chole Kulcha",
        "Amritsari Chole Kulche",
      ],
    },
    {
      title: "Premium & Fusion Chaat",
      items: [
        "Cheese Corn Chaat",
        "Tandoori Paneer Tikka Chaat",
        "Crispy Palak Chaat",
        "Mexican Bhel",
        "Avocado Sev Puri",
        "Quinoa Chaat",
        "Dahi Ke Kebab Chaat",
        "Cheese Dahi Puri",
      ],
    },
    {
      title: "Healthy & Speciality Chaat",
      items: [
        "Fruit Chaat",
        "Sprouts Chaat",
        "Moong Dal Chaat",
        "Khakhra Chaat",
        "Beetroot Tikki Chaat",
        "Roasted Makhana Chaat",
        "Chana Jor Garam Chaat",
        "Seasonal Special Chaat",
      ],
    },
    {
      title: "More Chatpata Classics",
      items: [
        "Papdi Ragda Chaat",
        "Chole Samosa Chaat",
        "Aloo Chana Chaat",
        "Dahi Wali Aloo Chaat",
        "Masala Corn Chaat",
        "Tandoori Aloo Chaat",
        "Dahi Puri with Pomegranate",
        "Chef’s Special Chaat",
      ],
    },
  ],
  signatures: ["Royal Raj Kachori", "Creamy Dahi Bhalla", "Crispy Aloo Tikki", "Authentic Dilli Chaat"],
};

export const specialityStalls: MenuSection = {
  id: "speciality-stalls",
  eyebrow: "Live Counters · Freshly Prepared",
  title: "Our Speciality Stalls",
  subtitle: "A royal spread of live cooking counters for unforgettable celebrations",
  groups: [
    {
      title: "North Indian & Punjabi",
      items: [
        "Amritsari Chole Kulche",
        "Chur Chur Naan",
        "Dal Makhani with Pudina Paratha",
        "Makki Di Roti & Sarson Da Saag",
        "Paratha Counter: Aloo, Pudina, Mix, Paneer, Gobi, Cheese, Lachha, Methi, Onion & Plain",
        "Dilli Patila Matar Kulcha",
        "Pao Bhaji",
        "Moong Dal Chilla",
        "Paneer-Stuffed Chilla",
      ],
    },
    {
      title: "Kulcha & Tawa Chaap Counter",
      items: [
        "Tawa Chaap served with Kulcha",
        "Masala Tawa Chaap with Kulcha",
        "Achari Tawa Chaap with Kulcha",
        "Amritsari Kulcha",
        "Paneer Kulcha",
        "Butter Kulcha",
        "Chole Kulcha",
      ],
    },
    {
      title: "Barbecue & Tandoor",
      items: [
        "Paneer Tikka",
        "Tandoori Mushroom",
        "Tandoori Veg Platter",
        "Hariyali Paneer Tikka",
        "Stuffed Tandoori Aloo",
        "Tandoori Baby Corn",
        "Tandoori Broccoli",
        "Smoky Veg Seekh",
        "Grilled Pineapple",
        "Assorted BBQ Platter",
      ],
    },
    {
      title: "Italian Stall",
      items: [
        "Pasta: Red / White / Pink Sauce",
        "Arrabbiata Pasta",
        "Alfredo Pasta",
        "Garlic Bread",
        "Bruschetta",
        "Wood-Fire Style Pizza",
        "Margherita Pizza",
        "Farm House Pizza",
        "Mexican Pizza",
        "Exotic Veg Pizza",
      ],
    },
    {
      title: "Mexican Stall",
      items: [
        "Mexican Tacos with Veg Filling",
        "Veg Quesadillas",
        "Nachos Supreme with Salsa & Cheese",
        "Mexican Bhel",
        "Bean & Cheese Burritos",
        "Mexican Rice Bowl",
        "Salsa & Guacamole Counter",
        "Jalapeño Cheese Poppers",
      ],
    },
    {
      title: "Chinese & Thai Stall",
      items: [
        "Crispy Honey Chilli Potato",
        "Veg Spring Roll",
        "Chilli Mushroom",
        "Triple Schezwan Combo",
        "Thai Paneer / Tofu",
        "Exotic Thai Vegetables",
        "Lemongrass Soup",
        "Thai Chilli Basil Stir-Fry",
        "Steamed Jasmine Rice",
      ],
    },
  ],
  signatures: ["Pure Vegetarian", "Live Counters", "Experienced Team", "Premium Presentation"],
};

export const cateringMenus: readonly MenuSection[] = [chaatMenu, specialityStalls];
