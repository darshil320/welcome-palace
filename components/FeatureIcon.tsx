import {
  FaBed,
  FaChampagneGlasses,
  FaCouch,
  FaFire,
  FaGift,
  FaHotTubPerson,
  FaKey,
  FaMattressPillow,
  FaMusic,
  FaUsers,
  FaUtensils,
} from "react-icons/fa6";

const iconMap = {
  bed: FaBed,
  couch: FaCouch,
  utensils: FaUtensils,
  users: FaUsers,
  bedPillow: FaMattressPillow,
  key: FaKey,
  gift: FaGift,
  champagne: FaChampagneGlasses,
  hotTub: FaHotTubPerson,
  fire: FaFire,
  music: FaMusic,
} as const;

export type FeatureIconName = keyof typeof iconMap;

export function FeatureIcon({ name, className = "" }: { name: FeatureIconName; className?: string }) {
  const Icon = iconMap[name];
  return <Icon className={className} />;
}
