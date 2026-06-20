"use client";

import { useState, useEffect } from "react";
import { useTravelStore } from "@/store/travelStore";
import { FlightDeal, OutboundPackage, VisaService, PackageItineraryItem } from "@/types";
import { Plus, Edit2, Trash2, ShieldAlert, Key, Copy, Download, RefreshCw, X, Check, Save, Plane, HelpCircle, Layers } from "lucide-react";

type ActiveTab = "flights" | "packages" | "visas";

export default function AdminPage() {
  const {
    flightDeals, addFlightDeal, updateFlightDeal, deleteFlightDeal,
    outboundPackages, addOutboundPackage, updateOutboundPackage, deleteOutboundPackage,
    visaServices, addVisaService, updateVisaService, deleteVisaService,
    resetToDefault
  } = useTravelStore();

  // Sandbox Protection State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Navigation state
  const [activeTab, setActiveTab] = useState<ActiveTab>("flights");

  // Modal editors state
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<string>("");

  // Copy success notification
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<string>("");

  // Form Fields State (Flights)
  const [airline, setAirline] = useState("");
  const [route, setRoute] = useState("");
  const [flightType, setFlightType] = useState<"Domestic" | "International">("International");
  const [startingPrice, setStartingPrice] = useState(15000);
  const [baggageAllowance, setBaggageAllowance] = useState("30kg + 7kg cabin");

  // Form Fields State (Packages)
  const [pkgTitle, setPkgTitle] = useState("");
  const [pkgSlug, setPkgSlug] = useState("");
  const [pkgPrice, setPkgPrice] = useState(80000);
  const [pkgDuration, setPkgDuration] = useState("5 Days");
  const [fixedDeparturesInput, setFixedDeparturesInput] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");
  const [inclusionsInput, setInclusionsInput] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [itinerary, setItinerary] = useState<PackageItineraryItem[]>([]);

  // Form Fields State (Visas)
  const [visaCountry, setVisaCountry] = useState("");
  const [visaSlug, setVisaSlug] = useState("");
  const [visaTypesInput, setVisaTypesInput] = useState("");
  const [processingTime, setProcessingTime] = useState("3-5 Days");
  const [requiredDocsInput, setRequiredDocsInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");

  // Check auth on load
  useEffect(() => {
    const session = sessionStorage.getItem("tripland_admin_session");
    if (session === "unlocked") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY || "tripland2026";
    if (passcode === adminKey) {
      setIsAuthenticated(true);
      sessionStorage.setItem("tripland_admin_session", "unlocked");
      setAuthError("");
    } else {
      setAuthError("Invalid Security Key. Please check the access code.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("tripland_admin_session");
  };

  // Open editor handlers
  const handleOpenAdd = () => {
    setEditMode("add");
    setSelectedId("");
    
    if (activeTab === "flights") {
      setAirline("");
      setRoute("");
      setFlightType("International");
      setStartingPrice(18000);
      setBaggageAllowance("30kg + 7kg cabin");
    } else if (activeTab === "packages") {
      setPkgTitle("");
      setPkgSlug("");
      setPkgPrice(95000);
      setPkgDuration("5 Nights / 6 Days");
      setFixedDeparturesInput("2026-09-15, 2026-10-10");
      setHighlightsInput("Sightseeing tour, Bullet train, Mt. Fuji views");
      setInclusionsInput("Flight Tickets, Visa Fee, Hotels, Daily Meals");
      setHeroImage("https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200");
      setItinerary([
        { day: 1, title: "Arrival Welcome", description: "Airport pickup and hotel transfer." },
        { day: 2, title: "Sightseeing Program", description: "Guided tour of ancient palaces." }
      ]);
    } else if (activeTab === "visas") {
      setVisaCountry("");
      setVisaSlug("");
      setVisaTypesInput("Tourist 30 Days Single Entry");
      setProcessingTime("3 - 5 Working Days");
      setRequiredDocsInput("Passport scan bio page, Photo white background");
      setFeaturesInput("Online submission, VFS booking slot check");
    }
    
    setShowModal(true);
  };

  const handleOpenEdit = (type: ActiveTab, item: any) => {
    setEditMode("edit");
    setSelectedId(item.id);
    
    if (type === "flights") {
      const flight = item as FlightDeal;
      setAirline(flight.airline);
      setRoute(flight.route);
      setFlightType(flight.type);
      setStartingPrice(flight.startingPrice);
      setBaggageAllowance(flight.baggageAllowance);
    } else if (type === "packages") {
      const pkg = item as OutboundPackage;
      setPkgTitle(pkg.title);
      setPkgSlug(pkg.slug);
      setPkgPrice(pkg.price);
      setPkgDuration(pkg.duration);
      setFixedDeparturesInput(pkg.fixedDepartureDates.join(", "));
      setHighlightsInput(pkg.highlights.join(", "));
      setInclusionsInput(pkg.inclusions.join(", "));
      setHeroImage(pkg.heroImage);
      setItinerary(pkg.itinerary || []);
    } else if (type === "visas") {
      const visa = item as VisaService;
      setVisaCountry(visa.country);
      setVisaSlug(visa.slug);
      setVisaTypesInput(visa.visaTypes.join(", "));
      setProcessingTime(visa.processingTime);
      setRequiredDocsInput(visa.requiredDocuments.join(", "));
      setFeaturesInput(visa.features.join(", "));
    }
    
    setShowModal(true);
  };

  // Itinerary builder handlers
  const handleAddDay = () => {
    const nextDay = itinerary.length + 1;
    setItinerary([...itinerary, { day: nextDay, title: `Day ${nextDay} Activity`, description: "Activity details..." }]);
  };

  const handleRemoveDay = (index: number) => {
    const updated = itinerary.filter((_, i) => i !== index).map((item, idx) => ({
      ...item,
      day: idx + 1
    }));
    setItinerary(updated);
  };

  const handleUpdateDayField = (index: number, field: keyof PackageItineraryItem, val: string | number) => {
    const updated = itinerary.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: val };
      }
      return item;
    });
    setItinerary(updated);
  };

  // Save handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "flights") {
      const deal: FlightDeal = {
        id: editMode === "edit" ? selectedId : `flight-${Date.now()}`,
        airline,
        route,
        type: flightType,
        startingPrice: Number(startingPrice),
        baggageAllowance,
        isFeatured: true
      };
      
      if (editMode === "edit") {
        updateFlightDeal(deal);
      } else {
        addFlightDeal(deal);
      }
    } else if (activeTab === "packages") {
      const highlights = highlightsInput.split(",").map(h => h.trim()).filter(Boolean);
      const inclusions = inclusionsInput.split(",").map(i => i.trim()).filter(Boolean);
      const fixedDepartureDates = fixedDeparturesInput.split(",").map(d => d.trim()).filter(Boolean);
      
      const pkg: OutboundPackage = {
        id: editMode === "edit" ? selectedId : `pkg-${Date.now()}`,
        title: pkgTitle,
        slug: pkgSlug || pkgTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        price: Number(pkgPrice),
        duration: pkgDuration,
        fixedDepartureDates,
        highlights,
        inclusions,
        isFeatured: true,
        heroImage,
        itinerary
      };
      
      if (editMode === "edit") {
        updateOutboundPackage(pkg);
      } else {
        addOutboundPackage(pkg);
      }
    } else if (activeTab === "visas") {
      const visaTypes = visaTypesInput.split(",").map(t => t.trim()).filter(Boolean);
      const requiredDocuments = requiredDocsInput.split(",").map(d => d.trim()).filter(Boolean);
      const features = featuresInput.split(",").map(f => f.trim()).filter(Boolean);
      
      const visa: VisaService = {
        id: editMode === "edit" ? selectedId : `visa-${Date.now()}`,
        country: visaCountry,
        slug: visaSlug || visaCountry.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        visaTypes,
        processingTime,
        requiredDocuments,
        features
      };
      
      if (editMode === "edit") {
        updateVisaService(visa);
      } else {
        addVisaService(visa);
      }
    }

    setShowModal(false);
  };

  const handleDeleteItem = (type: ActiveTab, id: string) => {
    if (confirm("Are you sure you want to delete this record from the database sandbox?")) {
      if (type === "flights") deleteFlightDeal(id);
      if (type === "packages") deleteOutboundPackage(id);
      if (type === "visas") deleteVisaService(id);
    }
  };

  const handleCopyJSON = (type: string, data: any) => {
    const jsonStr = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopiedType(type);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
        setCopiedType("");
      }, 2000);
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 pt-28">
        <div className="max-w-sm w-full bg-slate-800 border border-slate-700 rounded p-8 shadow-2xl relative text-center">
          <div className="w-12 h-12 rounded bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center text-brand-gold mx-auto mb-6">
            <Key className="w-5 h-5" strokeWidth={1.5} />
          </div>

          <h1 className="font-heading text-xl font-black text-white uppercase tracking-wider mb-2">
            Portal Database
          </h1>
          <p className="text-xs text-slate-400 mb-8 max-w-xs mx-auto font-light leading-relaxed">
            Provide the secret administrative access passcode to unlock the LocalStorage database sandbox.
          </p>

          <form onSubmit={handleUnlock} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="ENTER SECURITY KEY"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded text-xs text-center text-white focus:outline-none focus:border-brand-blue tracking-widest uppercase font-bold"
              />
            </div>
            {authError && <p className="text-[10px] text-brand-red font-semibold">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-xs font-bold uppercase tracking-widest shadow transition-colors cursor-pointer"
            >
              Authenticate Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 min-h-screen font-sans">
      
      {/* Subheader Title */}
      <div className="bg-slate-900 text-white py-12 px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                Sandbox Mode (LocalStorage Sandbox Data)
              </span>
            </div>
            <h1 className="font-heading text-3xl font-black mt-1 uppercase tracking-wide text-white">
              Database Console
            </h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={resetToDefault}
              className="flex items-center gap-1 px-4 py-2 border border-slate-700 hover:border-brand-red hover:text-brand-red text-[10px] font-bold uppercase tracking-wider rounded text-slate-400 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-750 text-[10px] font-bold uppercase tracking-wider rounded text-white transition-colors cursor-pointer"
            >
              Exit Console
            </button>
          </div>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
        {/* Left Column - Managers */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab buttons */}
          <div className="flex bg-white border border-slate-200 p-1 rounded gap-1">
            <button
              onClick={() => setActiveTab("flights")}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                activeTab === "flights" ? "bg-brand-blue text-white shadow" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Flight Deals
            </button>
            <button
              onClick={() => setActiveTab("packages")}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                activeTab === "packages" ? "bg-brand-blue text-white shadow" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Outbound Packages
            </button>
            <button
              onClick={() => setActiveTab("visas")}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                activeTab === "visas" ? "bg-brand-blue text-white shadow" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Visa Services
            </button>
          </div>

          {/* Database Grid list */}
          <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-heading text-base font-black text-slate-900 uppercase">
                {activeTab === "flights" && "Air Ticket Deals Catalog"}
                {activeTab === "packages" && "International Packages Catalog"}
                {activeTab === "visas" && "Visa Documentation Catalog"}
              </h3>
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-1 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white bg-brand-red hover:bg-brand-red/90 rounded shadow transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {/* List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                
                {/* FLIGHTS LIST */}
                {activeTab === "flights" && (
                  <>
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="pb-3 w-1/3">Route / Airline</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Baggage Limit</th>
                        <th className="pb-3">Starting Fare</th>
                        <th className="pb-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {flightDeals.map((deal) => (
                        <tr key={deal.id} className="text-slate-650">
                          <td className="py-4">
                            <span className="font-bold text-slate-900 uppercase block">{deal.route}</span>
                            <span className="text-[10px] text-slate-400 uppercase mt-0.5">{deal.airline}</span>
                          </td>
                          <td className="py-4 text-[10px] uppercase font-bold">{deal.type}</td>
                          <td className="py-4">{deal.baggageAllowance}</td>
                          <td className="py-4 font-bold text-brand-blue">Rs. {deal.startingPrice.toLocaleString()}</td>
                          <td className="py-4 text-center">
                            <div className="flex justify-center gap-1.5">
                              <button onClick={() => handleOpenEdit("flights", deal)} className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-brand-blue cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteItem("flights", deal.id)} className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-brand-red cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}

                {/* PACKAGES LIST */}
                {activeTab === "packages" && (
                  <>
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="pb-3 w-1/2">Package Title</th>
                        <th className="pb-3">Duration</th>
                        <th className="pb-3">Package Price</th>
                        <th className="pb-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {outboundPackages.map((pkg) => (
                        <tr key={pkg.id} className="text-slate-650">
                          <td className="py-4">
                            <span className="font-bold text-slate-900 uppercase block leading-snug">{pkg.title}</span>
                            <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{pkg.slug}</span>
                          </td>
                          <td className="py-4">{pkg.duration}</td>
                          <td className="py-4 font-bold text-brand-red">Rs. {pkg.price.toLocaleString()}</td>
                          <td className="py-4 text-center">
                            <div className="flex justify-center gap-1.5">
                              <button onClick={() => handleOpenEdit("packages", pkg)} className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-brand-blue cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteItem("packages", pkg.id)} className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-brand-red cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}

                {/* VISAS LIST */}
                {activeTab === "visas" && (
                  <>
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="pb-3 w-1/2">Country</th>
                        <th className="pb-3">Processing Duration</th>
                        <th className="pb-3">Docs Required</th>
                        <th className="pb-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {visaServices.map((visa) => (
                        <tr key={visa.id} className="text-slate-650">
                          <td className="py-4">
                            <span className="font-bold text-slate-900 uppercase block">{visa.country}</span>
                            <span className="text-[10px] text-slate-450 block font-mono mt-0.5">{visa.slug}</span>
                          </td>
                          <td className="py-4">{visa.processingTime}</td>
                          <td className="py-4">{visa.requiredDocuments.length} items</td>
                          <td className="py-4 text-center">
                            <div className="flex justify-center gap-1.5">
                              <button onClick={() => handleOpenEdit("visas", visa)} className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-brand-blue cursor-pointer" title="Edit"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteItem("visas", visa.id)} className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-brand-red cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}

              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Exporters */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-slate-350 p-6 rounded border border-slate-800 shadow-sm space-y-6">
            <div className="flex items-start gap-2.5 bg-slate-800 p-4 rounded text-[11px] leading-relaxed border border-slate-700">
              <ShieldAlert className="w-5 h-5 text-brand-gold flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider mb-0.5">Commit Config JSON</h4>
                <p className="font-light">
                  LocalStorage persistence updates the browser state. To commit revisions permanently in the repository code, copy the JSON below and replace the files inside `data/` folder.
                </p>
              </div>
            </div>

            {/* Flight deals JSON exporter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-450">
                <span>flightDeals.json database</span>
                <button
                  onClick={() => handleCopyJSON("flights", flightDeals)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-all cursor-pointer"
                >
                  {copySuccess && copiedType === "flights" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copySuccess && copiedType === "flights" ? "Copied" : "Copy"}
                </button>
              </div>
              <textarea
                readOnly
                value={JSON.stringify(flightDeals, null, 2)}
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded p-3 font-mono text-[9px] text-slate-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Packages JSON exporter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-455">
                <span>outboundPackages.json database</span>
                <button
                  onClick={() => handleCopyJSON("packages", outboundPackages)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-all cursor-pointer"
                >
                  {copySuccess && copiedType === "packages" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copySuccess && copiedType === "packages" ? "Copied" : "Copy"}
                </button>
              </div>
              <textarea
                readOnly
                value={JSON.stringify(outboundPackages, null, 2)}
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded p-3 font-mono text-[9px] text-slate-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Visas JSON exporter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-455">
                <span>visaServices.json database</span>
                <button
                  onClick={() => handleCopyJSON("visas", visaServices)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-all cursor-pointer"
                >
                  {copySuccess && copiedType === "visas" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copySuccess && copiedType === "visas" ? "Copied" : "Copy"}
                </button>
              </div>
              <textarea
                readOnly
                value={JSON.stringify(visaServices, null, 2)}
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded p-3 font-mono text-[9px] text-slate-500 focus:outline-none"
              ></textarea>
            </div>

          </div>
        </div>
      </div>

      {/* Editor Modal Drawer */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded max-w-2xl w-full p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <h3 className="font-heading text-xl font-black mb-6 text-slate-900 uppercase tracking-wide">
              {editMode === "edit" ? "Modify Sandbox Database Item" : "Create New Sandbox Record"}
            </h3>

            <form onSubmit={handleSave} className="space-y-5 text-xs text-left">
              
              {/* FLIGHTS EDITOR */}
              {activeTab === "flights" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Airline Company</label>
                    <input
                      type="text"
                      required
                      value={airline}
                      onChange={(e) => setAirline(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Flight Route</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g. KTM to DXB"
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Flight Type</label>
                    <select
                      value={flightType}
                      onChange={(e) => setFlightType(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded bg-white focus:outline-none focus:border-brand-blue"
                    >
                      <option value="International">International</option>
                      <option value="Domestic">Domestic</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Baggage Limit Allowance</label>
                    <input
                      type="text"
                      required
                      value={baggageAllowance}
                      onChange={(e) => setBaggageAllowance(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Starting Price (NPR)</label>
                    <input
                      type="number"
                      required
                      value={startingPrice}
                      onChange={(e) => setStartingPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>
              )}

              {/* OUTBOUND PACKAGES EDITOR */}
              {activeTab === "packages" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Package Title</label>
                    <input
                      type="text"
                      required
                      value={pkgTitle}
                      onChange={(e) => setPkgTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Pricing Fare (NPR)</label>
                    <input
                      type="number"
                      required
                      value={pkgPrice}
                      onChange={(e) => setPkgPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Duration</label>
                    <input
                      type="text"
                      required
                      value={pkgDuration}
                      onChange={(e) => setPkgDuration(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Slug URL (Optional)</label>
                    <input
                      type="text"
                      value={pkgSlug}
                      onChange={(e) => setPkgSlug(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Hero Image URL</label>
                    <input
                      type="text"
                      required
                      value={heroImage}
                      onChange={(e) => setHeroImage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Fixed Departures (Comma separated)</label>
                    <input
                      type="text"
                      required
                      value={fixedDeparturesInput}
                      onChange={(e) => setFixedDeparturesInput(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Highlights (Comma separated)</label>
                    <textarea
                      rows={2}
                      value={highlightsInput}
                      onChange={(e) => setHighlightsInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    ></textarea>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Inclusions List (Comma separated)</label>
                    <textarea
                      rows={2}
                      value={inclusionsInput}
                      onChange={(e) => setInclusionsInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    ></textarea>
                  </div>

                  {/* Days itinerary dynamic builder */}
                  <div className="col-span-2 border-t border-slate-100 pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-heading text-xs font-bold uppercase text-slate-900">
                        Day-by-Day Tour Itinerary
                      </span>
                      <button
                        type="button"
                        onClick={handleAddDay}
                        className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded cursor-pointer"
                      >
                        + Add Day
                      </button>
                    </div>

                    <div className="space-y-4">
                      {itinerary.map((item, index) => (
                        <div key={index} className="border border-slate-200 rounded p-4 space-y-3 bg-slate-50/50">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                            <span className="font-heading font-extrabold text-xs text-brand-blue">Day {item.day}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveDay(index)}
                              className="text-[10px] uppercase font-bold text-brand-red cursor-pointer"
                            >
                              Delete Day
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="text-[9px] font-bold uppercase text-slate-450 block mb-0.5">Day Title</label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => handleUpdateDayField(index, "title", e.target.value)}
                                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold uppercase text-slate-450 block mb-0.5">Day Description</label>
                              <textarea
                                rows={2}
                                value={item.description}
                                onChange={(e) => handleUpdateDayField(index, "description", e.target.value)}
                                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-xs"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* VISA SERVICES EDITOR */}
              {activeTab === "visas" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Country Name</label>
                    <input
                      type="text"
                      required
                      value={visaCountry}
                      onChange={(e) => setVisaCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Processing Duration</label>
                    <input
                      type="text"
                      required
                      value={processingTime}
                      onChange={(e) => setProcessingTime(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Visa Slug URL (Optional)</label>
                    <input
                      type="text"
                      value={visaSlug}
                      onChange={(e) => setVisaSlug(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Available Visa Types (Comma separated)</label>
                    <input
                      type="text"
                      required
                      value={visaTypesInput}
                      onChange={(e) => setVisaTypesInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Required Documents Checklists (Comma separated)</label>
                    <textarea
                      rows={3}
                      value={requiredDocsInput}
                      onChange={(e) => setRequiredDocsInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    ></textarea>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">VFS / Processing Features (Comma separated)</label>
                    <textarea
                      rows={2}
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-brand-blue"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-xs font-bold tracking-widest uppercase shadow transition-colors cursor-pointer mt-4"
              >
                <Save className="w-4 h-4 inline mr-1.5" />
                Commit Sandbox Revisions
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
