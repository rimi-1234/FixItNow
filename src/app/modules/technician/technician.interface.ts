export interface ITechnicianUpdateProfilePayload {
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  bio?: string;
  location?: string;
  imageUrl?: string | null;
}

export interface ITechnicianFilters {
  skill?: string;
  location?: string;
  minExperience?: number;
  minRating?: number;
  search?: string;
}
