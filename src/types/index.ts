export interface FlightDeal {
  id: string;
  airline: string;
  route: string;
  type: "Domestic" | "International";
  startingPrice: string | number;
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
  price: string | number;
  duration: string;
  fixedDepartureDates: string[];
  highlights: string[];
  inclusions: string[];
  exclusions?: string[];
  visaChecklist?: string[];
  termsAndConditions?: string[];
  isFeatured: boolean;
  heroImage: string;
  itinerary: PackageItineraryItem[];
  region: "Asia" | "Europe";
  hotelCategory?: string;
  airline?: string;
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

export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  description: string;
}

export interface HolidayPackage {
  id: string;
  title: string;
  duration: string;
  location: string;
  image: string;
  price: string;
}

export interface HolidayPackages {
  inbound: HolidayPackage[];
  outbound: HolidayPackage[];
}

export interface AffiliateAirline {
  id: string;
  name: string;
  logo: string;
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
