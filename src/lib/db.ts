import { FlightDeal, OutboundPackage, VisaService, SiteSettings, GalleryItem, BlogArticle } from "@/types";
import flightsData from "../../data/flightDeals.json";
import packagesData from "../../data/outboundPackages.json";
import visasData from "../../data/visaServices.json";
import settingsData from "../../data/siteSettings.json";
import galleryData from "../../data/gallery.json";
import blogsData from "../../data/blogs.json";

export function getStaticFlightDeals(): FlightDeal[] {
  return flightsData as FlightDeal[];
}

export function getStaticOutboundPackages(): OutboundPackage[] {
  return packagesData as OutboundPackage[];
}

export function getStaticVisaServices(): VisaService[] {
  return visasData as VisaService[];
}

export function getStaticSettings(): SiteSettings {
  return settingsData as SiteSettings;
}

export function getStaticGallery(): GalleryItem[] {
  return galleryData as GalleryItem[];
}

export function getStaticBlogs(): BlogArticle[] {
  return blogsData as BlogArticle[];
}
