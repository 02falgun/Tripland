export interface FlightDeal {
  id: string;
  airline: string;
  route: string;
  type: "Domestic" | "International";
  startingPrice: number;
  baggageAllowance: string;
  isFeatured: boolean;
}

export interface PackageItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface OutboundPackage {
  id: string;
  title: string;
  slug: string;
  price: number;
  duration: string;
  fixedDepartureDates: string[];
  highlights: string[];
  inclusions: string[];
  isFeatured: boolean;
  heroImage: string;
  itinerary: PackageItineraryItem[];
}

export interface VisaService {
  id: string;
  country: string;
  slug: string;
  visaTypes: string[];
  processingTime: string;
  requiredDocuments: string[];
  features: string[];
}

export interface SiteSettings {
  phoneNumbers: string[];
  address: string;
  contactEmail: string;
  whatsappNumber: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  location: string;
  spanType: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
  fullContent: string;
  tags: string[];
}
