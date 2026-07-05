import type { LucideIcon } from "lucide-react";
import { UtensilsCrossed, Leaf, Truck } from "lucide-react";

export const cateringIntro = [
  {
    icon: UtensilsCrossed as LucideIcon,
    title: "Personal Chef",
    description:
      "Our in-house experts from Chandni Chowk cook live. Food made exactly to your family's choice and taste.",
  },
  {
    icon: Leaf as LucideIcon,
    title: "Pure Veg Feast",
    description: "From Tilak feasts to Mehandi snacks, enjoy the legendary pure veg flavors of Surat.",
  },
  {
    icon: Truck as LucideIcon,
    title: "Outside Catering",
    description: "Bring the Chandni Chowk taste to your own doorstep with our premium parcel service.",
  },
];

export type CateringItem = { label: string; count: number };

export type CateringPlan = {
  name: string;
  price: string;
  tagline: string;
  items: CateringItem[];
  luxury?: boolean;
  highlight?: string;
};

export const standardPlans: CateringPlan[] = [
  {
    name: "KAROL BAGH PLAN",
    price: "₹650",
    tagline: "Ideal for small functions",
    items: [
      { label: "Welcome Drink", count: 1 },
      { label: "Soup", count: 1 },
      { label: "Chaat/Stalls", count: 2 },
      { label: "Main Course", count: 2 },
      { label: "Dal", count: 1 },
      { label: "Rice", count: 1 },
      { label: "Farsan", count: 1 },
      { label: "Salad", count: 3 },
      { label: "Indian Bread", count: 2 },
      { label: "Papad & Pickle", count: 1 },
      { label: "Sweet (Regular)", count: 1 },
      { label: "Dessert", count: 1 },
    ],
  },
  {
    name: "RED FORT PLAN",
    price: "₹800",
    tagline: "Best for standard events",
    items: [
      { label: "Welcome Drink", count: 2 },
      { label: "Soup", count: 2 },
      { label: "Starter", count: 2 },
      { label: "Chaat/Stalls", count: 4 },
      { label: "Main Course", count: 3 },
      { label: "Dal", count: 1 },
      { label: "Rice", count: 1 },
      { label: "Salad", count: 3 },
      { label: "Indian Bread", count: 3 },
      { label: "Papad & Pickle", count: 1 },
      { label: "Sweet (Regular)", count: 2 },
      { label: "Dessert", count: 1 },
    ],
  },
  {
    name: "INDIA GATE PLAN",
    price: "₹950",
    tagline: "Premium balanced menu",
    items: [
      { label: "Welcome Drink", count: 2 },
      { label: "Soup", count: 2 },
      { label: "Starter", count: 3 },
      { label: "Chaat/Stalls", count: 6 },
      { label: "Special Counter", count: 1 },
      { label: "Main Course", count: 3 },
      { label: "Dal", count: 1 },
      { label: "Rice", count: 1 },
      { label: "Salad", count: 3 },
      { label: "Indian Bread", count: 3 },
      { label: "Papad & Pickle", count: 1 },
      { label: "Sweet (Regular)", count: 2 },
      { label: "Sweet (Premium)", count: 1 },
      { label: "Dessert", count: 1 },
    ],
  },
];

export const luxuryPlans: CateringPlan[] = [
  {
    name: "QUTUB MINAR PLAN",
    price: "₹1,250",
    tagline: "Premium wedding experience",
    luxury: true,
    items: [
      { label: "Welcome Drink", count: 4 },
      { label: "Soup", count: 2 },
      { label: "Starter", count: 3 },
      { label: "Chaat/Stalls", count: 8 },
      { label: "Special Counter", count: 2 },
      { label: "Main Course", count: 3 },
      { label: "Dal/Kadhi", count: 2 },
      { label: "Rice", count: 1 },
      { label: "Salad", count: 5 },
      { label: "Indian Bread", count: 3 },
      { label: "Papad & Pickle", count: 2 },
      { label: "Sweet (Reg)", count: 2 },
      { label: "Sweet (Prem)", count: 1 },
      { label: "Dessert", count: 2 },
    ],
  },
  {
    name: "PUNJABI BAGH PLAN",
    price: "₹1,550",
    tagline: "Luxury grand events",
    luxury: true,
    items: [
      { label: "Welcome Drink", count: 4 },
      { label: "Soup", count: 2 },
      { label: "Starter", count: 4 },
      { label: "Chaat/Stalls", count: 10 },
      { label: "Special Counter", count: 3 },
      { label: "Main Course", count: 4 },
      { label: "Dal/Kadhi", count: 2 },
      { label: "Rice", count: 2 },
      { label: "Salad", count: 6 },
      { label: "Indian Bread", count: 4 },
      { label: "Papad & Pickle", count: 4 },
      { label: "Sweet (Reg)", count: 2 },
      { label: "Sweet (Prem)", count: 1 },
      { label: "Dessert", count: 3 },
    ],
  },
  {
    name: "PAHARGANJ PLAN",
    price: "₹1,850",
    tagline: "Ultra luxury & royal weddings",
    luxury: true,
    highlight: "Fruit Counter (3 Indian + 3 Exotic)",
    items: [
      { label: "Welcome Drink", count: 7 },
      { label: "Soup", count: 3 },
      { label: "Starter", count: 5 },
      { label: "Chaat/Stalls", count: 12 },
      { label: "Special Counter", count: 3 },
      { label: "Main Course", count: 4 },
      { label: "Dal/Kadhi", count: 2 },
      { label: "Rice", count: 2 },
      { label: "Salad", count: 7 },
      { label: "Indian Bread", count: 4 },
      { label: "Papad & Pickle", count: 4 },
      { label: "Sweet (Reg)", count: 2 },
      { label: "Sweet (Prem)", count: 2 },
      { label: "Dessert", count: 2 },
    ],
  },
];

export const cateringPlanOptions = [
  { value: "Karol Bagh - ₹650/person", label: "Karol Bagh - ₹650/person" },
  { value: "Red Fort - ₹800/person", label: "Red Fort - ₹800/person" },
  { value: "India Gate - ₹950/person", label: "India Gate - ₹950/person" },
  { value: "Qutub Minar - ₹1,250/person", label: "Qutub Minar - ₹1,250/person" },
  { value: "Punjabi Bagh - ₹1,550/person", label: "Punjabi Bagh - ₹1,550/person" },
  { value: "Paharganj - ₹1,850/person", label: "Paharganj - ₹1,850/person" },
];
