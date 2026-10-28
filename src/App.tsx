import React, { useState } from 'react';
import {
  Sprout,
  Building2,
  Calendar,
  QrCode,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Truck,
  ShieldCheck,
  Scale,
  Landmark,
  FileCheck,
  TrendingUp,
  RefreshCw,
  Printer,
  X,
  MapPin,
  Award,
  CircleDollarSign,
  Smartphone,
  Maximize2,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';

type Language = 'en' | 'ta';
type ViewMode = 'phone' | 'fluid';

interface CropOption {
  id: string;
  nameEn: string;
  nameTa: string;
  defaultPrice: number;
  icon: string;
}

const CROPS: CropOption[] = [
  { id: 'tomato', nameEn: 'Tomato (நாட்டு தக்காளி)', nameTa: 'நாட்டு தக்காளி (Tomato)', defaultPrice: 19.5, icon: '🍅' },
  { id: 'onion', nameEn: 'Onion (பெரிய வெங்காயம்)', nameTa: 'வெங்காயம் (Big Onion)', defaultPrice: 24.0, icon: '🧅' },
  { id: 'shallots', nameEn: 'Shallots / Small Onion (சின்ன வெங்காயம்)', nameTa: 'சின்ன வெங்காயம் (Shallots)', defaultPrice: 42.0, icon: '🧅' },
  { id: 'potato', nameEn: 'Potato (உருளைக்கிழங்கு)', nameTa: 'உருளைக்கிழங்கு (Potato)', defaultPrice: 22.0, icon: '🥔' },
  { id: 'brinjal', nameEn: 'Brinjal / Eggplant (கத்தரிக்காய்)', nameTa: 'கத்தரிக்காய் (Brinjal)', defaultPrice: 26.0, icon: '🍆' },
  { id: 'carrot', nameEn: 'Ooty Carrot (ஊட்டி கேரட்)', nameTa: 'ஊட்டி கேரட் (Carrot)', defaultPrice: 35.0, icon: '🥕' },
];

const INSTITUTIONS = [
  { id: 'hostel_sample', nameEn: 'Sample Hostel Mess', nameTa: 'மாதிரி மாணவர் விடுதி மெஸ்', location: 'Madurai' },
  { id: 'anna_univ', nameEn: 'Anna University Hostel Kitchen', nameTa: 'அண்ணா பல்கலைக்கழக விடுதி சமையலறை', location: 'Chennai' },
  { id: 'coop_canteen', nameEn: 'Cooperative Employees Canteen', nameTa: 'கூட்டுறவு பணியாளர்கள் உணவகம்', location: 'Trichy' },
  { id: 'med_college', nameEn: 'Government Medical College Mess', nameTa: 'அரசு மருத்துவக் கல்லூரி மெஸ்', location: 'Madurai' },
  { id: 'tidel_canteen', nameEn: 'TIDEL Park Central Cafeteria', nameTa: 'டைடல் பார்க் மத்திய சிற்றுண்டிச்சாலை', location: 'Coimbatore' },
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showFarmModal, setShowFarmModal] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('phone');

  // Form State
  const [selectedCropId, setSelectedCropId] = useState<string>('tomato');
  const [quantityKg, setQuantityKg] = useState<number>(50);
  const [harvestDate, setHarvestDate] = useState<string>('2026-11-04');
  const [minPricePerKg, setMinPricePerKg] = useState<number>(19.5);

  // Step 2 Buyer State
  const [institutionalRate, setInstitutionalRate] = useState<number>(30);
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>('hostel_sample');
  const [weeklyQuantityKg, setWeeklyQuantityKg] = useState<number>(50);
  const [contractStartDate, setContractStartDate] = useState<string>('2026-11-06');

  const handleQuantityPreset = (val: number) => {
    setQuantityKg(val);
    setWeeklyQuantityKg(val);
  };

  const handleWeeklyQuantityPreset = (val: number) => {
    setWeeklyQuantityKg(val);
  };

  const handleCropChange = (cropId: string) => {
    setSelectedCropId(cropId);
    const crop = CROPS.find(c => c.id === cropId);
    if (crop) {
      setMinPricePerKg(crop.defaultPrice);
      const calculatedContractPrice = Math.round((crop.defaultPrice / 0.65) * 10) / 10;
      setInstitutionalRate(calculatedContractPrice);
    }
  };

  // Calculations
  const floorGross = Math.round(quantityKg * minPricePerKg);
  const totalContractValue = Math.round(weeklyQuantityKg * institutionalRate);
  
  // 65% - 20% - 15% split
  const farmerShare = Math.round(totalContractValue * 0.65);
  const logisticsShare = Math.round(totalContractValue * 0.20);
  const platformShare = totalContractValue - farmerShare - logisticsShare;

  const selectedCrop = CROPS.find(c => c.id === selectedCropId) || CROPS[0];
  const selectedBuyer = INSTITUTIONS.find(b => b.id === selectedBuyerId) || INSTITUTIONS[0];

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedCropId('tomato');
    setQuantityKg(50);
    setMinPricePerKg(19.5);
    setInstitutionalRate(30);
    setWeeklyQuantityKg(50);
  };

  // Translations
  const t = {
    en: {
      appName: 'Uzhavan Direct',
      appSubtitle: 'Direct Farmer Pre-Booking',
      demoBadge: 'Demo: sample data',
      stepIndicator: `Step ${currentStep}/4`,
      phoneFrameLabel: '9:16 Mobile View',
      responsiveLabel: 'Full Screen',
      steps: {
        1: 'Farmer Harvest Listing',
        2: 'Buyer Pre-Booking',
        3: 'Receipt & Reconciliation',
        4: 'Digital Credit Record',
      },
      stepShort: {
        1: 'Listing',
        2: 'Pre-book',
        3: 'Receipt',
        4: 'Status',
      },
      btnBack: 'Back',
      btnNext: 'Next',
      btnFinish: 'New Listing',
      step1: {
        heading: 'Step 1: Farmer Lists Harvest',
        subheading: 'Register upcoming farm produce before harvest to secure institutional pre-commitments.',
        farmerProfileBadge: 'Farmer: Murugan K. · Madurai',
        cropLabel: 'Select Crop for Harvest',
        quantityLabel: 'Harvest Quantity (kg)',
        quickButtons: 'Presets:',
        dateLabel: 'Expected Harvest Date',
        priceLabel: 'Minimum Floor Price / kg (₹)',
        floorGrossCardTitle: 'Live Floor Gross (₹)',
        floorGrossFormula: 'Quantity × Minimum Price',
        floorGrossNote: 'Protected baseline floor payout guaranteed before logistics and institutional markup.',
        guaranteeBadge: '100% Floor Price Guaranteed',
      },
      step2: {
        heading: 'Step 2: Buyer Pre-Books',
        subheading: 'Bulk institutional buyers lock contracts in advance, bypassing mandi intermediaries.',
        fixedPriceBanner: 'Institutional Fixed Contract Rate',
        fixedPriceTag: 'Contract guaranteed price',
        fixedPriceDesc: 'Fixed for the 6-week supply cycle. Eliminates daily market volatility for institutional kitchens.',
        buyerLabel: 'Select Buyer Institution',
        weeklyQtyLabel: 'Weekly Requirement (kg)',
        quickButtons: 'Presets:',
        contractStartLabel: 'Contract Start Date',
        contractNotice: 'Contract delivery every Friday directly to hostel mess kitchen',
        subtextNotice: 'Farm-fresh transit within 12 hours of harvest. Inspected and crate-packed at village center.',
        buyerAssurance: 'Verified ESG & Freshness',
      },
      step3: {
        heading: 'Step 3: Receipt & Reconciliation',
        subheading: 'Transparent, real-time escrow split ledger. Every rupee is audited before cargo dispatch.',
        summaryFarmer: 'Farmer Receives',
        summaryLogistics: 'Logistics & Village',
        summaryPlatform: 'Uzhavan Direct',
        reconciliationTitle: 'Financial Reconciliation',
        totalContractVal: 'Total Contract Value',
        farmerShareRow: 'Farmer Receives (65% share)',
        farmerShareDesc: 'Guaranteed minimum floor + quality bonus.',
        logisticsShareRow: 'Logistics & Village Agents (20%)',
        logisticsShareDesc: 'Aggregation, crates & cold transit.',
        platformShareRow: 'Uzhavan Direct Margin (15%)',
        platformShareDesc: 'Digital contracts & dispute escrow.',
        totalRecon: 'TOTAL RECONCILIATION',
        splitSplitBarLabel: '65% / 20% / 15% Split Bar',
        farmerFarmCardTitle: 'Farmer Farm Inspection',
        qrInstruction: 'Scan to see your farmer / Tap QR code to inspect farm',
        qrSubtext: 'Plot #14-B, Alanganallur, Madurai Dist.',
        tapToInspect: 'Tap QR for Geo-Inspection Data',
      },
      step4: {
        heading: 'Step 4: Status & Digital Credit',
        subheading: 'Farmer income ledger confirmed. Builds verified rural banking history.',
        incomeBannerTitle: 'Farmer income record updated',
        incomeBannerSub: 'Murugan K. · Alanganallur Village',
        creditBadge: 'Digital Credit',
        netPayoutTitle: 'Net Direct Farmer Payout',
        sharePill: '65% Share',
        payoutNote: 'Instant disbursement to farmer bank account upon delivery scan.',
        valuePropTitle: 'Digital Credit for Working Capital',
        valuePropText: 'Builds a digital income record for future credit. By transacting through institutional pre-contracts, smallholder farmers generate an audited digital cashflow history recognized by regional cooperative banks for zero-collateral working capital.',
        financialAuditTitle: 'Financial Audit Summary',
        auditInvoiced: 'Total Buyer Invoiced',
        auditLogistics: 'Logistics & Agent Share (20%)',
        auditPlatform: 'Uzhavan Direct Margin (15%)',
        bankPartnerTitle: 'Regional Banking Integration',
        bankPartnerName: 'TNSC Apex Cooperative Bank & NABARD',
        creditScoreLabel: 'Farmer Credit Reliability Index',
        creditRating: 'Grade A+ (Prime Agricultural Cashflow)',
        eligibleLoanTitle: 'Pre-Approved Zero-Collateral Credit',
        eligibleLoanAmt: '₹ 1,25,000 at 4% subsidized crop rate',
        printReceipt: 'Print Audit Slip',
      },
      modal: {
        title: 'Farm Inspection & Traceability Passport',
        farmerName: 'Farmer: Murugan Karuppiah',
        location: 'Alanganallur, Madurai, Tamil Nadu',
        coordinates: '9.9252° N, 78.1198° E (Geo-tagged)',
        soilStatus: 'Soil Health Card: Optimal (Nitrogen 280 kg/ha, Org Carbon 0.72%)',
        farmingType: 'Subhash Palekar Natural Farming (SPNF) / Pesticide-Free',
        fpo: 'Vaigai Smallholder Farmers Producer Co. Ltd.',
        verifiedBy: 'Inspected by Village Field Officer on Oct 25, 2026',
        close: 'Close Passport',
      }
    },
    ta: {
      appName: 'உழவன் டைரக்ட்',
      appSubtitle: 'விவசாயிகள் நேரடி முன்பதிவு தளம்',
      demoBadge: 'மாதிரி தரவு',
      stepIndicator: `படி ${currentStep}/4`,
      phoneFrameLabel: '9:16 மொபைல் பார்வை',
      responsiveLabel: 'முழுத்திரை',
      steps: {
        1: 'விவசாயி பயிர் பட்டியல்',
        2: 'வாங்குபவர் முன்பதிவு',
        3: 'ரசீது & கணக்கு விவரம்',
        4: 'டிஜிட்டல் கடன் நிலை',
      },
      stepShort: {
        1: 'பட்டியல்',
        2: 'முன்பதிவு',
        3: 'ரசீது',
        4: 'கடன் நிலை',
      },
      btnBack: 'பின்செல்',
      btnNext: 'அடுத்தது',
      btnFinish: 'புதிய பட்டியல்',
      step1: {
        heading: 'படி 1: விவசாயி அறுவடைப் பட்டியல்',
        subheading: 'முன்பதிவு பெற அறுவடைக்கு முந்தைய விளைபொருட்களைப் பதிவு செய்க.',
        farmerProfileBadge: 'விவசாயி: முருகன் கே. · மதுரை',
        cropLabel: 'பயிரைத் தேர்ந்தெடுக்கவும்',
        quantityLabel: 'விளைச்சல் அளவு (கிலோ)',
        quickButtons: 'அளவுகள்:',
        dateLabel: 'எதிர்பார்க்கப்படும் அறுவடை தேதி',
        priceLabel: 'குறைந்தபட்ச ஆதார விலை / கிலோ (₹)',
        floorGrossCardTitle: 'குறைந்தபட்ச வருவாய் (₹)',
        floorGrossFormula: 'அளவு × குறைந்தபட்ச விலை',
        floorGrossNote: 'விவசாயிக்கான பாதுகாக்கப்பட்ட குறைந்தபட்ச உத்தரவாதத் தொகை.',
        guaranteeBadge: '100% ஆதார விலை உத்தரவாதம்',
      },
      step2: {
        heading: 'படி 2: வாங்குபவர் முன்பதிவு',
        subheading: 'மண்டி இடைத்தரகர்கள் இன்றி கல்வி நிறுவனங்கள் நேரடியாக ஒப்பந்தம் செய்கின்றன.',
        fixedPriceBanner: 'நிறுவன நிலையான ஒப்பந்த விலை',
        fixedPriceTag: 'ஒப்பந்த உத்தரவாத விலை',
        fixedPriceDesc: '6 வார சுழற்சிக்கு நிலையானது. விலை ஏற்ற இறக்கங்களில் இருந்து பாதுகாப்பு.',
        buyerLabel: 'வாங்கும் நிறுவனத்தைத் தேர்வு செய்க',
        weeklyQtyLabel: 'வாராந்திர தேவை அளவு (கிலோ)',
        quickButtons: 'தேர்வுகள்:',
        contractStartLabel: 'முதல் விநியோகத் தொடக்கத் தேதி',
        contractNotice: 'ஒவ்வொரு வெள்ளிக்கிழமையும் நேரடியாக உணவு விடுதி சமையலறைக்கு டெலிவரி',
        subtextNotice: 'அறுவடையான 12 மணி நேரத்திற்குள் கிராம மையத்திலிருந்து பாதுகாப்பான விநியோகம்.',
        buyerAssurance: 'நற்பத மற்றும் தர சான்றிதழ்',
      },
      step3: {
        heading: 'படி 3: கணக்கு ரசீது & நிதிப் பகிர்வு',
        subheading: 'வெளிப்படையான நிதிப் பகிர்வு. ஒவ்வொரு ரூபாயும் தணிக்கை செய்யப்படுகிறது.',
        summaryFarmer: 'விவசாயி பெறுவது',
        summaryLogistics: 'போக்குவரத்து & மையம்',
        summaryPlatform: 'உழவன் தளம்',
        reconciliationTitle: 'நிதி சமரசம் & கணக்கு விவரம்',
        totalContractVal: 'மொத்த ஒப்பந்த மதிப்பு',
        farmerShareRow: 'விவசாயி பெறுவது (65% பங்கு)',
        farmerShareDesc: 'குறைந்தபட்ச ஆதார விலை + தரத்திற்கான ஊக்கத்தொகை.',
        logisticsShareRow: 'போக்குவரத்து & முகவர்கள் (20%)',
        logisticsShareDesc: 'சேகரிப்பு மையம், குளிர்சாதனப் போக்குவரத்து.',
        platformShareRow: 'உழவன் டைரக்ட் தளம் (15%)',
        platformShareDesc: 'டிஜிட்டல் ஒப்பந்தம், பாதுகாப்பு வைப்பு நிதி.',
        totalRecon: 'மொத்த சமரசத் தொகை',
        splitSplitBarLabel: '65% / 20% / 15% பகிர்வுப் பட்டை',
        farmerFarmCardTitle: 'விவசாயி பண்ணை ஆய்வு QR',
        qrInstruction: 'விவசாயி விவரங்களை அறிய ஸ்கேன் செய்க / பண்ணையை பார்வையிட QR குறியீட்டைத் தட்டவும்',
        qrSubtext: 'நில எண் #14-B, அலங்காநல்லூர் கிராமம், மதுரை மாவட்டம்.',
        tapToInspect: 'QR தட்டி பண்ணை விவரங்களை காண்க',
      },
      step4: {
        heading: 'படி 4: நிலை & டிஜிட்டல் கடன்',
        subheading: 'விவசாயி வருமானப் பதிவு புதுப்பிக்கப்பட்டது. வங்கிக் கடன் தகுதியை உருவாக்குகிறது.',
        incomeBannerTitle: 'விவசாயி வருமானப் பதிவு புதுப்பிக்கப்பட்டது',
        incomeBannerSub: 'முருகன் கே. · அலங்காநல்லூர் கிராமம்',
        creditBadge: 'டிஜிட்டல் கடன்',
        netPayoutTitle: 'விவசாயியின் நேரடி நிகர வரவு',
        sharePill: '65% பங்கு',
        payoutNote: 'டெலிவரி ஸ்கேன் முடிந்தவுடன் விவசாயியின் வங்கிக் கணக்கிற்கு உடனே செல்லும்.',
        valuePropTitle: 'டிஜிட்டல் வருமானப் பதிவு & பிணையில்லா கடன்',
        valuePropText: 'எதிர்காலக் கடன்களுக்கான டிஜிட்டல் வருமானப் பதிவை உருவாக்குகிறது. நிறுவன முன்பதிவு ஒப்பந்தங்கள் மூலம் பரிவர்த்தனை செய்வதன் மூலம், சிறு விவசாயிகள் பிராந்திய கூட்டுறவு வங்கிகளால் அங்கீகரிக்கப்பட்ட தணிக்கை செய்யப்பட்ட டிஜிட்டல் பணப்புழக்க வரலாற்றைப் பெறுகிறார்கள். இதனால் பிணையில்லா செயல்பாட்டு மூலதனம் எளிதாகக் கிடைக்கிறது.',
        financialAuditTitle: 'நிதி தணிக்கை சுருக்கம்',
        auditInvoiced: 'மொத்த வாங்குபவர் விலைப்பட்டியல்',
        auditLogistics: 'போக்குவரத்து & முகவர் பங்கு (20%)',
        auditPlatform: 'உழவன் டைரக்ட் கட்டணம் (15%)',
        bankPartnerTitle: 'பிராந்திய வங்கி ஒருங்கிணைப்பு',
        bankPartnerName: 'தமிழ்நாடு மாநில தலைமைக் கூட்டுறவு வங்கி & நபார்ட்',
        creditScoreLabel: 'விவசாயி கடன் நம்பகத்தன்மை குறியீடு',
        creditRating: 'கிரேடு A+ (சிறந்த விவசாயப் பணப்புழக்கம்)',
        eligibleLoanTitle: 'முன்-அங்கீகரிக்கப்பட்ட பிணையில்லா கடன்',
        eligibleLoanAmt: '4% மானிய வட்டி விகிதத்தில் ₹ 1,25,000 வரை கடன்',
        printReceipt: 'ரசீதை அச்சிடுக',
      },
      modal: {
        title: 'பண்ணை ஆய்வு & மூலக் கண்டறிதல் பாஸ்போர்ட்',
        farmerName: 'விவசாயி: முருகன் கருப்பையா',
        location: 'அலங்காநல்லூர், மதுரை, தமிழ்நாடு',
        coordinates: '9.9252° N, 78.1198° E (ஜிபிஎஸ் குறியீடு)',
        soilStatus: 'மண் பரிசோதனை: உகந்தது (நைட்ரஜன் 280 kg/ha, கரிமக் கார்பன் 0.72%)',
        farmingType: 'சுபாஷ் பாலேக்கர் இயற்கை வேளாண்மை / பூச்சிக்கொல்லி இல்லாதது',
        fpo: 'வைகை சிறு விவசாயிகள் உற்பத்தியாளர் நிறுவனம்',
        verifiedBy: 'கிராம கள அலுவலரால் அக் 25, 2026 அன்று ஆய்வு செய்யப்பட்டது',
        close: 'மூடுக',
      }
    }
  };

  const currentT = t[lang];

  return (
    <div className="min-h-screen bg-stone-900 text-stone-800 flex flex-col items-center justify-start sm:p-4 md:p-6 font-sans antialiased selection:bg-emerald-200">
      
      {/* Viewport Aspect Ratio Mode Switcher (Visible on desktop/tablet) */}
      <aside aria-label="Device view controls" className="w-full max-w-md mx-auto mb-3 px-3 hidden sm:flex items-center justify-between text-xs text-stone-300">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Uzhavan Direct · 9:16 Mobile View</span>
        </div>
        
        <div className="inline-flex rounded-lg p-0.5 bg-stone-800 border border-stone-700 shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('phone')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'phone'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>9:16 Phone</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('fluid')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'fluid'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{currentT.responsiveLabel}</span>
          </button>
        </div>
      </aside>

      {/* Main Container: 9:16 Phone Device Shell or Responsive View */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col ${
          viewMode === 'phone'
            ? 'sm:max-w-[420px] sm:aspect-[9/16] sm:min-h-[740px] sm:max-h-[920px] sm:rounded-[44px] sm:ring-[12px] sm:ring-stone-950 sm:shadow-2xl sm:shadow-black/70 sm:border-[4px] sm:border-stone-700/60 overflow-hidden'
            : 'max-w-4xl rounded-2xl shadow-xl'
        } bg-[#F7FEE7]`}
      >

        {/* Realistic Mobile Status Bar (Visible in phone mode or mobile screens) */}
        <div className="bg-[#166534] text-white/90 px-6 pt-3 pb-1.5 flex items-center justify-between text-[11px] font-semibold select-none shrink-0 border-b border-emerald-900/40">
          <span className="font-mono tracking-tight font-bold text-white">9:41</span>
          
          {/* Dynamic Island / Speaker Pill */}
          <div className="w-20 h-4 bg-black/40 rounded-full mx-auto hidden sm:flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-950/80 mr-2" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-900/80" />
          </div>

          <div className="flex items-center gap-2">
            <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
            <Battery className="w-4 h-4 stroke-[2.2]" />
          </div>
        </div>

        {/* App Top Header */}
        <header className="bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs px-3.5 py-2.5 shrink-0 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-2">
            {/* Logo & Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#166534] flex items-center justify-center text-white shadow-xs shrink-0">
                <Sprout className="w-5 h-5 text-emerald-300 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-bold text-sm text-[#166534] tracking-tight truncate">
                    {currentT.appName}
                  </h1>
                </div>
                <p className="text-[10px] text-stone-500 font-medium truncate">
                  {currentT.appSubtitle}
                </p>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-bold text-emerald-800 bg-[#F0FDF4] px-1.5 py-0.5 rounded-md border border-emerald-200">
                {currentStep}/4
              </span>
              <div className="inline-flex rounded-lg p-0.5 bg-stone-100 border border-stone-200 shadow-inner">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                    lang === 'en'
                      ? 'bg-[#166534] text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('ta')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                    lang === 'ta'
                      ? 'bg-[#166534] text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  தமிழ்
                </button>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 gap-1.5 pt-2">
            {[1, 2, 3, 4].map((step) => {
              const isActive = currentStep === step;
              const isPassed = currentStep > step;
              return (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`text-left pt-1 border-t-2 transition flex flex-col ${
                    isActive
                      ? 'border-[#166534]'
                      : isPassed
                      ? 'border-emerald-500'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-[#166534] text-white'
                          : isPassed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isPassed ? '✓' : step}
                    </span>
                    <span
                      className={`text-[10px] font-semibold truncate ${
                        isActive
                          ? 'text-[#166534]'
                          : isPassed
                          ? 'text-emerald-700'
                          : 'text-stone-400'
                      }`}
                    >
                      {currentT.stepShort[step as 1 | 2 | 3 | 4]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </header>

        {/* Scrollable Mobile Body Content (Fits 9:16 phone ergonomics) */}
        <main className="flex-1 overflow-y-auto p-3.5 space-y-3.5 scroll-smooth overscroll-contain">
          
          {/* STEP 1: Farmer Lists Harvest */}
          {currentStep === 1 && (
            <div className="space-y-3 animate-fadeIn">
              
              {/* Header Box */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-xs">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-emerald-200">
                    <Sprout className="w-3 h-3 text-emerald-700" />
                    {currentT.step1.guaranteeBadge}
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium truncate">
                    {currentT.step1.farmerProfileBadge}
                  </span>
                </div>
                <h2 className="text-base font-bold text-stone-900 leading-snug">
                  {currentT.step1.heading}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {currentT.step1.subheading}
                </p>
              </div>

              {/* Form Inputs */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-xs space-y-3.5">
                
                {/* Crop Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    {currentT.step1.cropLabel}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCropId}
                      onChange={(e) => handleCropChange(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 font-semibold text-xs focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition outline-hidden appearance-none pr-8 cursor-pointer"
                    >
                      {CROPS.map((crop) => (
                        <option key={crop.id} value={crop.id}>
                          {crop.icon} {lang === 'ta' ? crop.nameTa : crop.nameEn} (₹{crop.defaultPrice}/kg)
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-stone-500 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Quantity Input + 4 Quick Preset Buttons in 4-col Grid */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                      {currentT.step1.quantityLabel}
                    </label>
                    <span className="text-xs font-bold text-emerald-700">
                      {quantityKg} kg
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={quantityKg}
                      onChange={(e) => {
                        const val = Math.max(1, Number(e.target.value) || 0);
                        setQuantityKg(val);
                        setWeeklyQuantityKg(val);
                      }}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-bold text-base focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition outline-hidden"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-stone-400">
                      kg
                    </span>
                  </div>

                  {/* 4 Quick Preset Buttons for Phone */}
                  <div className="mt-2 grid grid-cols-4 gap-1.5">
                    {[25, 50, 100, 200].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleQuantityPreset(preset)}
                        className={`py-1 text-[11px] font-bold rounded-lg border text-center transition ${
                          quantityKg === preset
                            ? 'bg-[#166534] text-white border-[#166534] shadow-xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {preset} kg
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Minimum Floor Price (Compact 2 Columns) */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      {currentT.step1.dateLabel}
                    </label>
                    <input
                      type="date"
                      value={harvestDate}
                      onChange={(e) => setHarvestDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-1.5 text-stone-900 font-medium text-xs focus:ring-2 focus:ring-emerald-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-1 truncate">
                      {currentT.step1.priceLabel}
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1.5 text-xs font-bold text-stone-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        step="0.5"
                        min="1"
                        value={minPricePerKg}
                        onChange={(e) => setMinPricePerKg(Math.max(1, Number(e.target.value) || 0))}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-6 pr-2 py-1.5 text-stone-900 font-bold text-xs focus:ring-2 focus:ring-emerald-600 outline-hidden"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Dynamic Estimated Floor Gross Display Card */}
              <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#166534] text-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-emerald-200 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {currentT.step1.floorGrossCardTitle}
                  </span>
                  <CircleDollarSign className="w-4 h-4 text-emerald-300" />
                </div>

                <div className="flex items-baseline justify-between py-1">
                  <div className="text-3xl font-black tracking-tight text-white">
                    ₹ {floorGross.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-800/80 px-2 py-0.5 rounded-md text-emerald-100">
                    {quantityKg} kg × ₹{minPricePerKg.toFixed(1)}
                  </span>
                </div>

                <p className="text-[11px] text-emerald-100/90 leading-tight mt-1 pt-2 border-t border-emerald-800/60">
                  {currentT.step1.floorGrossNote}
                </p>
              </div>

            </div>
          )}

          {/* STEP 2: Buyer Pre-Books */}
          {currentStep === 2 && (
            <div className="space-y-3 animate-fadeIn">
              
              {/* Header Box */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-xs">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-emerald-200 mb-1">
                  <Building2 className="w-3 h-3 text-emerald-700" />
                  {currentT.step2.buyerAssurance}
                </span>
                <h2 className="text-base font-bold text-stone-900 leading-snug">
                  {currentT.step2.heading}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {currentT.step2.subheading}
                </p>
              </div>

              {/* Institutional Fixed Price Card Banner */}
              <div className="bg-gradient-to-r from-emerald-900 to-[#166534] text-white rounded-xl p-3.5 shadow-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                    {currentT.step2.fixedPriceTag}
                  </span>
                  <span className="text-[10px] text-emerald-300">
                    {lang === 'ta' ? 'அடிப்படை:' : 'Floor:'} ₹{minPricePerKg.toFixed(1)}/kg
                  </span>
                </div>
                <div className="text-xl font-black text-white">
                  ₹ {institutionalRate} {lang === 'ta' ? 'ஒரு கிலோவுக்கு' : 'per kg'}
                </div>
                <p className="text-[11px] text-emerald-100 leading-tight">
                  {currentT.step2.fixedPriceDesc}
                </p>
              </div>

              {/* Buyer Form */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-xs space-y-3">
                {/* Select Buyer Institution */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    {currentT.step2.buyerLabel}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBuyerId}
                      onChange={(e) => setSelectedBuyerId(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-semibold text-xs focus:ring-2 focus:ring-emerald-600 outline-hidden appearance-none pr-8 cursor-pointer"
                    >
                      {INSTITUTIONS.map((inst) => (
                        <option key={inst.id} value={inst.id}>
                          🏢 {lang === 'ta' ? inst.nameTa : inst.nameEn} ({inst.location})
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-stone-500 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Contract Start Date */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    {currentT.step2.contractStartLabel}
                  </label>
                  <input
                    type="date"
                    value={contractStartDate}
                    onChange={(e) => setContractStartDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-medium text-xs focus:ring-2 focus:ring-emerald-600 outline-hidden"
                  />
                </div>

                {/* Weekly Quantity Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                      {currentT.step2.weeklyQtyLabel}
                    </label>
                    <span className="text-xs font-bold text-emerald-800">
                      {weeklyQuantityKg} kg / {lang === 'ta' ? 'வாரம்' : 'week'}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={weeklyQuantityKg}
                      onChange={(e) => setWeeklyQuantityKg(Math.max(1, Number(e.target.value) || 0))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-bold text-base focus:ring-2 focus:ring-emerald-600 outline-hidden"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-stone-400">
                      kg
                    </span>
                  </div>

                  {/* Weekly Quick Presets */}
                  <div className="mt-2 grid grid-cols-4 gap-1.5">
                    {[25, 50, 75, 100].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleWeeklyQuantityPreset(preset)}
                        className={`py-1 text-[11px] font-bold rounded-lg border text-center transition ${
                          weeklyQuantityKg === preset
                            ? 'bg-[#166534] text-white border-[#166534] shadow-xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {preset} kg
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtext Notice */}
                <div className="bg-[#F0FDF4] border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      {currentT.step2.contractNotice}
                    </h4>
                    <p className="text-[10px] text-emerald-800 mt-0.5 leading-relaxed">
                      {currentT.step2.subtextNotice}
                    </p>
                  </div>
                </div>

                {/* Weekly Value Summary */}
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs text-stone-600 font-medium">
                    {lang === 'ta' ? 'வாராந்திர ஒப்பந்த மதிப்பு:' : 'Estimated Contract Value:'}
                  </span>
                  <span className="text-lg font-black text-[#166534]">
                    ₹ {totalContractValue.toLocaleString('en-IN')}
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: Receipt & Reconciliation Breakdown */}
          {currentStep === 3 && (
            <div className="space-y-3 animate-fadeIn">
              
              {/* Header Box */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-xs">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-emerald-200 mb-1">
                  <Scale className="w-3 h-3 text-emerald-700" />
                  {currentT.step3.splitSplitBarLabel}
                </span>
                <h2 className="text-base font-bold text-stone-900 leading-snug">
                  {currentT.step3.heading}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {currentT.step3.subheading}
                </p>
              </div>

              {/* 3 Summary Split Cards in Mobile Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-xl p-2.5 border-2 border-emerald-600 shadow-xs text-center">
                  <span className="text-[10px] font-bold text-emerald-800 block truncate">
                    {currentT.step3.summaryFarmer}
                  </span>
                  <div className="text-sm font-black text-[#166534] mt-0.5">
                    Rs {farmerShare}
                  </div>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full inline-block mt-0.5">
                    65%
                  </span>
                </div>

                <div className="bg-white rounded-xl p-2.5 border border-blue-200 shadow-xs text-center">
                  <span className="text-[10px] font-bold text-blue-900 block truncate">
                    {currentT.step3.summaryLogistics}
                  </span>
                  <div className="text-sm font-black text-blue-900 mt-0.5">
                    Rs {logisticsShare}
                  </div>
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded-full inline-block mt-0.5">
                    20%
                  </span>
                </div>

                <div className="bg-white rounded-xl p-2.5 border border-amber-200 shadow-xs text-center">
                  <span className="text-[10px] font-bold text-amber-900 block truncate">
                    {currentT.step3.summaryPlatform}
                  </span>
                  <div className="text-sm font-black text-amber-900 mt-0.5">
                    Rs {platformShare}
                  </div>
                  <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded-full inline-block mt-0.5">
                    15%
                  </span>
                </div>
              </div>

              {/* Detailed Financial Reconciliation Card */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-[#166534]" />
                    {currentT.step3.reconciliationTitle}
                  </h3>
                  <span className="text-[10px] font-mono font-medium text-stone-500">
                    UZ-2026-REC
                  </span>
                </div>

                {/* Proportional Split Bar */}
                <div>
                  <div className="w-full h-3 rounded-full overflow-hidden flex bg-stone-200 shadow-inner">
                    <div style={{ width: '65%' }} className="bg-[#166534]" title="Farmer (65%)" />
                    <div style={{ width: '20%' }} className="bg-blue-600" title="Logistics (20%)" />
                    <div style={{ width: '15%' }} className="bg-amber-500" title="Platform (15%)" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1 font-medium">
                    <span>Farmer: Rs {farmerShare} (65%)</span>
                    <span>Logistics: Rs {logisticsShare} (20%)</span>
                    <span>Platform: Rs {platformShare} (15%)</span>
                  </div>
                </div>

                {/* Itemized List */}
                <div className="space-y-2 text-xs pt-1">
                  <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                    <div>
                      <span className="font-bold text-stone-900 block">
                        {currentT.step3.totalContractVal}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {weeklyQuantityKg} kg × Rs {institutionalRate}/kg
                      </span>
                    </div>
                    <span className="font-black text-stone-900">
                      Rs {totalContractValue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-stone-100 bg-[#F0FDF4] px-2 rounded-lg">
                    <div>
                      <span className="font-bold text-emerald-950 block">
                        {currentT.step3.farmerShareRow}
                      </span>
                      <span className="text-[10px] text-emerald-800">
                        {currentT.step3.farmerShareDesc}
                      </span>
                    </div>
                    <span className="font-black text-[#166534]">
                      Rs {farmerShare}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-stone-100 bg-blue-50/60 px-2 rounded-lg">
                    <div>
                      <span className="font-bold text-blue-950 block">
                        {currentT.step3.logisticsShareRow}
                      </span>
                      <span className="text-[10px] text-blue-800">
                        {currentT.step3.logisticsShareDesc}
                      </span>
                    </div>
                    <span className="font-black text-blue-900">
                      Rs {logisticsShare}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 bg-amber-50/60 px-2 rounded-lg">
                    <div>
                      <span className="font-bold text-amber-950 block">
                        {currentT.step3.platformShareRow}
                      </span>
                      <span className="text-[10px] text-amber-800">
                        {currentT.step3.platformShareDesc}
                      </span>
                    </div>
                    <span className="font-black text-amber-900">
                      Rs {platformShare}
                    </span>
                  </div>

                  {/* Total Reconciliation Banner */}
                  <div className="flex items-center justify-between p-2.5 bg-stone-900 text-white rounded-lg shadow-inner mt-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                      {currentT.step3.totalRecon}
                    </span>
                    <span className="text-base font-black text-white">
                      Rs {totalContractValue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Farmer Farm Inspection Card (with QR Code) */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-xs flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFarmModal(true)}
                  className="w-20 h-20 bg-[#F0FDF4] hover:bg-emerald-100 border border-emerald-300 rounded-xl p-1.5 flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition"
                  aria-label="Tap to view farmer inspection"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#166534]">
                    <rect x="10" y="10" width="28" height="28" fill="currentColor" rx="4" />
                    <rect x="16" y="16" width="16" height="16" fill="white" rx="2" />
                    <rect x="20" y="20" width="8" height="8" fill="currentColor" rx="1" />
                    
                    <rect x="62" y="10" width="28" height="28" fill="currentColor" rx="4" />
                    <rect x="68" y="16" width="16" height="16" fill="white" rx="2" />
                    <rect x="72" y="20" width="8" height="8" fill="currentColor" rx="1" />

                    <rect x="10" y="62" width="28" height="28" fill="currentColor" rx="4" />
                    <rect x="16" y="68" width="16" height="16" fill="white" rx="2" />
                    <rect x="20" y="72" width="8" height="8" fill="currentColor" rx="1" />

                    <rect x="44" y="12" width="8" height="8" fill="currentColor" rx="2" />
                    <rect x="44" y="26" width="8" height="12" fill="currentColor" rx="2" />
                    <rect x="12" y="44" width="10" height="8" fill="currentColor" rx="2" />
                    <rect x="26" y="44" width="12" height="8" fill="currentColor" rx="2" />
                    <rect x="44" y="44" width="12" height="12" fill="#15803d" rx="2" />
                    <rect x="62" y="44" width="8" height="10" fill="currentColor" rx="2" />
                    <rect x="76" y="44" width="14" height="8" fill="currentColor" rx="2" />
                    <rect x="44" y="64" width="8" height="14" fill="currentColor" rx="2" />
                    <rect x="58" y="64" width="12" height="8" fill="currentColor" rx="2" />
                    <rect x="76" y="64" width="14" height="14" fill="currentColor" rx="2" />
                  </svg>
                </button>

                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="font-bold text-stone-900 text-xs">
                    {currentT.step3.farmerFarmCardTitle}
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    {currentT.step3.qrInstruction}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowFarmModal(true)}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#166534] bg-[#F0FDF4] hover:bg-emerald-100 border border-emerald-300 px-2 py-1 rounded-md transition cursor-pointer"
                  >
                    <QrCode className="w-3 h-3 text-emerald-700" />
                    <span>{currentT.step3.tapToInspect}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Status & Digital Credit Record */}
          {currentStep === 4 && (
            <div className="space-y-3 animate-fadeIn">
              
              {/* Income Record Banner */}
              <div className="bg-gradient-to-r from-emerald-950 via-[#166534] to-emerald-900 text-white rounded-xl p-3.5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Landmark className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold text-white leading-tight">
                        {currentT.step4.incomeBannerTitle}
                      </h2>
                      <p className="text-[10px] text-emerald-200">
                        {currentT.step4.incomeBannerSub}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-400 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    {currentT.step4.creditBadge}
                  </span>
                </div>
              </div>

              {/* Net Direct Farmer Payout Card */}
              <div className="bg-white rounded-xl p-4 border-2 border-emerald-600 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {currentT.step4.netPayoutTitle}
                  </span>
                  <span className="bg-[#166534] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {currentT.step4.sharePill}
                  </span>
                </div>
                <div className="text-3xl font-black text-[#166534] tracking-tight">
                  Rs {farmerShare.toLocaleString('en-IN')} added
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">
                  {currentT.step4.payoutNote}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
                  <span>{selectedCrop.icon} {lang === 'ta' ? selectedCrop.nameTa : selectedCrop.nameEn} ({weeklyQuantityKg} kg)</span>
                  <span className="font-mono font-bold text-emerald-800">TNSC · 4419</span>
                </div>
              </div>

              {/* Value Proposition Card */}
              <div className="bg-[#F0FDF4] rounded-xl p-3.5 border border-emerald-200 shadow-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-emerald-950 text-xs mb-1">
                    {currentT.step4.valuePropTitle}
                  </h3>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    {currentT.step4.valuePropText}
                  </p>
                </div>
              </div>

              {/* Financial Audit Summary Table */}
              <div className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                  <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    {currentT.step4.financialAuditTitle}
                  </h3>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3 h-3" />
                    {currentT.step4.printReceipt}
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-600">{currentT.step4.auditInvoiced}</span>
                    <span className="font-bold text-stone-900 font-mono">Rs {totalContractValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100 text-[#166534]">
                    <span className="font-medium">{lang === 'ta' ? 'விவசாயிக்கு வரவு (65%)' : 'Farmer Payout (65%)'}</span>
                    <span className="font-bold font-mono">Rs {farmerShare.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100 text-blue-900">
                    <span className="text-stone-600">{currentT.step4.auditLogistics}</span>
                    <span className="font-bold font-mono">Rs {logisticsShare.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1 text-amber-900">
                    <span className="text-stone-600">{currentT.step4.auditPlatform}</span>
                    <span className="font-bold font-mono">Rs {platformShare.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Regional Bank Working Capital Card */}
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    {currentT.step4.eligibleLoanTitle}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-sm">
                    {currentT.step4.creditRating}
                  </span>
                </div>
                <div className="text-xs font-bold text-amber-950">
                  {currentT.step4.eligibleLoanAmt}
                </div>
                <p className="text-[10px] text-amber-800">
                  {currentT.step4.bankPartnerName}
                </p>
              </div>

              {/* Action to Start New Listing */}
              <div className="pt-1 flex justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-[#166534] hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{currentT.btnFinish}</span>
                </button>
              </div>

            </div>
          )}

        </main>

        {/* Bottom Navigation Wizard Bar (Fixed to phone bottom) */}
        <footer className="bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-md px-3.5 py-2.5 shrink-0 select-none z-20">
          <div className="flex items-center justify-between gap-2">
            
            {/* Back Button */}
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl font-bold text-xs transition ${
                currentStep === 1
                  ? 'text-stone-300 bg-stone-100 cursor-not-allowed border border-stone-200'
                  : 'text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{currentT.btnBack}</span>
            </button>

            {/* Step Indicators */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((step) => {
                const isActive = currentStep === step;
                const isDone = currentStep > step;
                return (
                  <button
                    key={step}
                    onClick={() => setCurrentStep(step)}
                    className="focus:outline-hidden"
                    aria-label={`Go to Step ${step}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        isActive
                          ? 'bg-[#166534] text-white shadow-xs scale-105'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-400 border border-stone-200'
                      }`}
                    >
                      {isDone ? '✓' : step}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next / Finish Button */}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                className="bg-[#166534] hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
              >
                <span>{currentT.btnNext}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#166534] hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{currentT.btnFinish}</span>
              </button>
            )}

          </div>

          {/* Bottom Home Indicator Bar (Realistic Phone Gesture Bar) */}
          <div className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-2" />
        </footer>

        {/* Farm Inspection Modal */}
        {showFarmModal && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
            <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl border border-emerald-100 space-y-3 animate-scaleUp">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#166534] flex items-center justify-center">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-xs">
                    {currentT.modal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFarmModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-stone-700">
                <div className="p-2.5 bg-[#F0FDF4] rounded-xl border border-emerald-200 space-y-0.5">
                  <div className="font-bold text-emerald-950 text-xs flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    {currentT.modal.farmerName}
                  </div>
                  <div className="text-emerald-800 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {currentT.modal.location}
                  </div>
                  <div className="font-mono text-emerald-700 text-[10px]">
                    {currentT.modal.coordinates}
                  </div>
                </div>

                <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
                  <div>
                    <span className="font-bold text-stone-900 block text-[11px]">{lang === 'ta' ? 'விவசாய முறை' : 'Cultivation Type'}</span>
                    <span className="text-stone-600 text-[10px]">{currentT.modal.farmingType}</span>
                  </div>
                  <div className="pt-1 border-t border-stone-200">
                    <span className="font-bold text-stone-900 block text-[11px]">{lang === 'ta' ? 'விவசாயி உற்பத்தியாளர் குழு' : 'FPO Co-op'}</span>
                    <span className="text-stone-600 text-[10px]">{currentT.modal.fpo}</span>
                  </div>
                </div>

                <div className="p-2 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="font-bold text-stone-900 block text-[11px]">{lang === 'ta' ? 'மண் ஆரோக்கிய அட்டை' : 'Soil Health Parameter'}</span>
                  <span className="text-stone-600 text-[10px]">{currentT.modal.soilStatus}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 p-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{currentT.modal.verifiedBy}</span>
                </div>
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowFarmModal(false)}
                  className="bg-[#166534] hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition cursor-pointer"
                >
                  {currentT.modal.close}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
