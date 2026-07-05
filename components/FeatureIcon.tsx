import {
  Bed,
  Wine,
  Sofa,
  Flame,
  Gift,
  Waves,
  Key,
  Armchair,
  Music,
  Users,
  UtensilsCrossed,
} from "lucide-react";

const iconMap = {
  bed: Bed,
  couch: Sofa,
  utensils: UtensilsCrossed,
  users: Users,
  bedPillow: Armchair,
  key: Key,
  gift: Gift,
  champagne: Wine,
  hotTub: Waves,
  fire: Flame,
  music: Music,
} as const;

export type FeatureIconName = keyof typeof iconMap;

export function FeatureIcon({ name, className = "" }: { name: FeatureIconName; className?: string }) {
  const Icon = iconMap[name];
  return <Icon className={className} />;
}
