export interface OptionsListItem {
  title: string;
  description?: string;
  images?: {}[];
}

export interface FiltersList {
  roof_materials: string[];
  wall_materials: string[];
  foundation_types: string[];
  roof_types: string[];
  heating_types: string[];
  level_types: string[];
  room_counts: string[];
  min_area?: string;
  max_area?: string;
  total_area?: number[];
}
