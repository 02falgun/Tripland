import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FlightDeal, OutboundPackage, VisaService, SiteSettings } from "@/types";
import initialFlights from "../../data/flightDeals.json";
import initialPackages from "../../data/outboundPackages.json";
import initialVisas from "../../data/visaServices.json";
import initialSettings from "../../data/siteSettings.json";

interface TravelState {
  flightDeals: FlightDeal[];
  outboundPackages: OutboundPackage[];
  visaServices: VisaService[];
  siteSettings: SiteSettings;
  
  // Flights Mutations
  addFlightDeal: (deal: FlightDeal) => void;
  updateFlightDeal: (deal: FlightDeal) => void;
  deleteFlightDeal: (id: string) => void;
  
  // Packages Mutations
  addOutboundPackage: (pkg: OutboundPackage) => void;
  updateOutboundPackage: (pkg: OutboundPackage) => void;
  deleteOutboundPackage: (id: string) => void;
  
  // Visa Mutations
  addVisaService: (visa: VisaService) => void;
  updateVisaService: (visa: VisaService) => void;
  deleteVisaService: (id: string) => void;
  
  // Settings Mutations
  updateSiteSettings: (settings: SiteSettings) => void;
  
  resetToDefault: () => void;
}

export const useTravelStore = create<TravelState>()(
  persist(
    (set) => ({
      flightDeals: initialFlights as FlightDeal[],
      outboundPackages: initialPackages as OutboundPackage[],
      visaServices: initialVisas as VisaService[],
      siteSettings: initialSettings as SiteSettings,
      
      // Flights CRUD
      addFlightDeal: (deal) =>
        set((state) => ({ flightDeals: [deal, ...state.flightDeals] })),
      updateFlightDeal: (updatedDeal) =>
        set((state) => ({
          flightDeals: state.flightDeals.map((deal) =>
            deal.id === updatedDeal.id ? updatedDeal : deal
          ),
        })),
      deleteFlightDeal: (id) =>
        set((state) => ({
          flightDeals: state.flightDeals.filter((deal) => deal.id !== id),
        })),
        
      // Packages CRUD
      addOutboundPackage: (pkg) =>
        set((state) => ({ outboundPackages: [pkg, ...state.outboundPackages] })),
      updateOutboundPackage: (updatedPkg) =>
        set((state) => ({
          outboundPackages: state.outboundPackages.map((pkg) =>
            pkg.id === updatedPkg.id ? updatedPkg : pkg
          ),
        })),
      deleteOutboundPackage: (id) =>
        set((state) => ({
          outboundPackages: state.outboundPackages.filter((pkg) => pkg.id !== id),
        })),
        
      // Visa CRUD
      addVisaService: (visa) =>
        set((state) => ({ visaServices: [visa, ...state.visaServices] })),
      updateVisaService: (updatedVisa) =>
        set((state) => ({
          visaServices: state.visaServices.map((visa) =>
            visa.id === updatedVisa.id ? updatedVisa : visa
          ),
        })),
      deleteVisaService: (id) =>
        set((state) => ({
          visaServices: state.visaServices.filter((visa) => visa.id !== id),
        })),
        
      // Settings CRUD
      updateSiteSettings: (newSettings) =>
        set({ siteSettings: newSettings }),
        
      resetToDefault: () =>
        set({
          flightDeals: initialFlights as FlightDeal[],
          outboundPackages: initialPackages as OutboundPackage[],
          visaServices: initialVisas as VisaService[],
          siteSettings: initialSettings as SiteSettings,
        }),
    }),
    {
      name: "tripland-corporate-store",
    }
  )
);

export default useTravelStore;
