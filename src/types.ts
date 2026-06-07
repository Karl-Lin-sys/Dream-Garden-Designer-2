export interface GardenDesign {
  layoutText: string;
  plantingList: string[];
  moodDesc: string;
  imagePrompt: string;
  imageUrl?: string | null;
}

export interface DesignPreferences {
  style: string;
  climate: string;
  spaceSize: string;
  specificDesires: string;
}
