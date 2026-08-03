export interface IServicePayload {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string | null;
}

export interface IServiceUpdatePayload {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  imageUrl?: string | null;
}

export interface IServiceFilters {
  type?: string;
  categoryId?: string;
  location?: string;
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
