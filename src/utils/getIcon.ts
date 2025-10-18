// src/utils/getIcon.ts
import * as Icons from "react-icons/fi";
import type { IconType } from "react-icons";

export const getIcon = (iconName?: string): IconType | null => {
  if (!iconName) return null;
  return (Icons as Record<string, IconType>)[iconName] || null;
};
