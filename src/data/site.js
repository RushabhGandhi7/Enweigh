import { PHOTOS } from './photos.js'

export const COMPANY = {
  name: 'Enweigh India Pvt. Ltd.',
  short: 'Enweigh',
  tagline: 'Precision Weighing & Feeding Systems',
  phonePrimary: '+91 98692 64635',
  phonePrimaryRaw: '+919869264635',
  phoneSecondary: '+91 83560 73597',
  phoneSecondaryRaw: '+918356073597',
  email: 'sales@enweigh.in',
  emailMarketing: 'marketing@enweigh.in',
  emailAlt: 'info@enweigh.in',
  whatsapp: '+91 98692 64635',
  whatsappRaw: '919869264635',
  address: 'A 810, Jaswanti Business Center, Kanchpada, Malad (West), Mumbai — 400064, Maharashtra, India',
  website: 'www.enweigh.in',
  logo: '/images/logo/enweigh-logo.svg',
  logoMark: '/images/logo/enweigh-logo.svg',
  logoHorizontal: '/images/logo/enweigh-logo.svg',
  logoWhite: '/images/logo/enweigh-logo.svg',
  logoMarkWhite: '/images/logo/enweigh-logo.svg',
  logoLeftAligned: '/images/logo/enweigh-logo.svg',
  logoLeftAlignedWhite: '/images/logo/enweigh-logo.svg',
}

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Downloads', to: '/downloads' },
  { label: 'Contact Us', to: '/contact' },
]

export const PRODUCTS = [
  {
    slug: 'weigh-feeder',
    name: 'Weigh Feeder',
    img: PHOTOS['weigh-feeder'][0].img,
    alt: PHOTOS['weigh-feeder'][0].alt,
    gallery: PHOTOS['weigh-feeder'],
    category: 'Continuous Feeding',
    tagline: 'Closed-loop gravimetric control',
    blurb:
      'A continuous closed-loop gravimetric feeding system engineered to hold material flow to setpoint with high precision. Regulates feed rate in real time via load cells, speed sensing and microprocessor inverter control. Seamlessly accepts supervisory setpoint commands from SCADA, HMI, or plant DCS.',
    tags: ['Load-cell based', 'Closed-loop', 'SCADA / HMI / DCS', '±0.5% Accuracy'],
    featured: true,
    specs: {
      'Accuracy': '±0.5% or better',
      'Feed Rate': '500 kg/hr to 1,000 TPH',
      'Belt Width': '650 mm to 2,000 mm',
      'Drive Unit': 'Shaft-mounted geared motor with AC Inverter (VFD)',
      'Measuring System': 'Special load transfer mechanism with high sensitivity',
      'Construction': 'CNC-fabricated, epoxy-painted mild steel; optional stainless steel',
      'Controller': 'Enweigh Universal Microprocessor with 7" Color Touchscreen HMI',
      'Communications': 'Modbus RTU, Profibus, Ethernet/IP; independent RS485 ports',
      'Belt Replacement': 'Quick-release design without dismantling pulleys or hopper',
    },
    highlights: [
      'Fully automatic belt zeroing and calibration routine',
      'Optically isolated loadcell and digital speed sensor inputs',
      'Internal & external heavy-duty belt scrapers to prevent material spill',
      'Web browser remote monitoring and event logging via Ethernet',
    ],
    applications: [
      'Raw meal, limestone, gypsum & clinker in cement plants',
      'Iron ore, sinter & coal feeding in steel mills',
      'Continuous proportioning of chemical bulk solids & fertilizers',
    ],
  },
  {
    slug: 'batch-weighing-system',
    name: 'Batch Weighing System',
    img: 'images/p03.webp',
    alt: 'Batching plant with elevated steel storage bins, access stairs and discharge hoppers',
    gallery: [
      { img: '/images/p03.webp', thumb: '/images/p03.webp', name: 'Batch Weighing System', alt: 'Batching plant with elevated steel storage bins, access stairs and discharge hoppers', width: 960, height: 850 },
      ...PHOTOS['hopper-weighing'],
    ],
    category: 'Batching & Blending',
    tagline: 'Repeatable multi-ingredient recipe accuracy',
    blurb:
      'Integrated batching plants for handling and storage of raw materials and glass shards. Separate bin systems and aggregate dosing devices are engineered around the chosen mixer, with application software, an operating interface and commissioning support.',
    tags: ['Multi-ingredient', 'Recipe Manager', 'Turnkey Plant', 'Stand-alone PLC'],
    featured: true,
    specs: {
      'System Type': 'Turnkey automatic batching & blending plant',
      'Accuracy': 'Up to ±0.1% to ±0.25% per ingredient',
      'Ingredients': '2 to 24+ bulk solids & liquids per recipe batch',
      'Structure': 'Rigid rolled mild steel structure with wear-resistant liners',
      'Bearings': 'Sealed anti-friction bearings with low wear rating',
      'Control Architecture': 'PLC + SCADA recipe manager / sequential batch controller',
      'Diagnostics': 'Intelligent fault message system & event log',
      'Environmental': 'Low dust and noise levels',
    },
    highlights: [
      'Rigid main structure fabricated from rolled mild steel',
      'Separate raw-material storage bins with aggregate dosing devices',
      'Process access through an operating interface with intelligent fault messages',
      'Wear-resistant materials and sealed bearings for low wear and maintenance',
    ],
    applications: [
      'Glass batching and shard handling',
      'AAC plants, dry-mix mortars, putty and construction chemicals',
      'Ceramic body preparation, electrode paste, and foundry sand mixing',
    ],
  },
  {
    slug: 'loss-in-weight',
    name: 'Loss in Weight System',
    img: PHOTOS.liw[0].img,
    alt: PHOTOS.liw[0].alt,
    gallery: PHOTOS.liw,
    category: 'Continuous Feeding',
    tagline: 'Gravimetric rate control by weight loss',
    blurb:
      'Measures the continuous rate of weight loss from an isolated supply hopper to determine true instantaneous mass flow. Ideal for fine powders, light flakes, or highly fluid materials where conveyor belt feeding is impractical.',
    tags: ['High precision', 'Gravimetric', 'Refill logic', 'Micro-dosing'],
    featured: true,
    specs: {
      'Accuracy': '±0.25% to ±0.5% of setpoint',
      'Feed Rate': '1 kg/hr to 50,000 kg/hr',
      'Feeder Tool': 'Single screw, twin intermeshing screw, or vibratory tray',
      'Weighing': 'Multi-cell or single high-precision load cell flexure mount',
      'Refill Cycle': 'Volumetric bumpless switchover during high-speed refill',
      'Controller': 'High-speed DSP processor with digital vibration filter',
      'Contact Parts': 'Stainless Steel 304 / 316 with sanitary finish options',
    },
    highlights: [
      'Seamless bumpless transfer between gravimetric and volumetric refill modes',
      'Hermetically sealed load cells with mechanical overload protection',
      'Agitator and conditioned hopper to prevent material bridging and ratholing',
      'Ethernet / Profibus connectivity to DCS for remote setpoint control',
    ],
    applications: [
      'Micro-ingredient dosing in plastics compounding & extrusion',
      'Additive feeding in cement, pigments, and detergents',
      'Carbon black, fumed silica, and active pharmaceutical ingredients',
    ],
  },
  {
    slug: 'hopper-weighing',
    name: 'Hopper Weighing System',
    img: PHOTOS['hopper-weighing'][2].img,
    alt: PHOTOS['hopper-weighing'][2].alt,
    gallery: [PHOTOS['hopper-weighing'][2], ...PHOTOS['hopper-weighing'].slice(0, 2)],
    category: 'Weighing & Inventory',
    tagline: 'Three- and four-cell load cell mount assemblies',
    blurb:
      'Load-cell weighing and level-measuring systems for silos, bins, hoppers and tanks. All-live-load-cell installations provide weighing accuracy of ±0.5%; one or two live load cells combined with two tilt bearings are intended for level measurement only.',
    tags: ['3 / 4 cell', 'MS or SS', 'Level & inventory', 'Easy install'],
    featured: true,
    specs: {
      'Capacity Range': '5 kg to 3,000 tons, selected to suit the application',
      'Weighing Configuration': '3 / 4 live load-cell systems, up to 3,000 tons',
      'Weighing Accuracy': '±0.5% with all live load cells',
      'Level Measurement': '1 or 2 live load cells + 2 tilt bearings (dummy load cells)',
      'Electronics': 'EUC Controller / Weigh Indicators',
      'Scope': 'Load cells, mounting accessories and weigh indicators',
    },
    highlights: [
      'Separate configurations for accurate weighing and level measurement',
      'Load cells, mounting accessories and indicators supplied as a complete solution',
      'Easy to plan and integrate with silo, bin, hopper and tank installations',
      'High-protection load cells and options for hazardous-area applications',
    ],
    applications: [
      'Raw material storage silos and surge hoppers in cement & steel plants',
      'Chemical reaction vessels, liquid batch tanks, and blend hoppers',
      'Grain silos, flour bins, and aggregate storage hoppers',
    ],
  },
  {
    slug: 'belt-feeder',
    name: 'Belt Feeder',
    img: 'images/p04.webp',
    category: 'Continuous Feeding',
    tagline: 'Volumetric & gravimetric heavy extraction',
    blurb:
      'Rugged continuous belt feeders designed for extraction and controlled metering of bulk solids from track hoppers, bins, and dump pockets. Engineered for high burden depths and varying lump sizes.',
    tags: ['Continuous', 'Custom width', 'Heavy extraction'],
    specs: {
      'Feed Rate': '10 TPH to 2,500 TPH',
      'Belt Width': '650 mm to 2,400 mm',
      'Belt Speed': '0.05 m/s to 0.8 m/s (variable speed AC drive)',
      'Skirt Boards': 'Full-length heavy skirt boards with adjustable rubber seals',
      'Infeed Gate': 'Adjustable guillotine regulating slide gate',
      'Drive': 'Hollow-shaft mounted helical-bevel gear motor',
    },
    highlights: [
      'Heavy structural steel channels built to carry head loads without deflection',
      'Closely spaced impact idlers beneath the infeed skirt',
      'Reversible belt travel available upon request',
    ],
    applications: [
      'Coal and wagon tippler hopper extraction',
      'Limestone, iron ore, and aggregate transfer conveyors',
    ],
  },
  {
    slug: 'belt-weigher',
    name: 'Belt Weigher',
    img: PHOTOS['belt-weigher'][0].img,
    alt: PHOTOS['belt-weigher'][0].alt,
    gallery: PHOTOS['belt-weigher'],
    category: 'Measurement',
    tagline: 'Flow rate and totalizer for troughed conveyors',
    blurb:
      'In-motion belt scale system mounted directly onto an existing troughed belt conveyor. Continuously measures instantaneous flow rate (TPH) and cumulative total tonnage without interrupting production flow.',
    tags: ['Flow measurement', 'Retrofit capable', 'Process control', '±0.5% Accuracy'],
    specs: {
      'Accuracy': '±0.5% (single/multi-idler) to ±0.25% (quad-idler certification)',
      'Belt Width': '500 mm to 2,200 mm',
      'Belt Speed': 'Up to 5.0 m/s',
      'Incline': 'Suitable for conveyor inclinations up to 20°',
      'Speed Sensor': 'Digital optical rotary pulse encoder with high resolution',
      'Weighbridge': 'Counter-balanced parallelogram or direct load-cell suspension',
    },
    highlights: [
      'Easy bolt-on installation on existing conveyor stringers without cutting belt',
      'High overload capacity protects cells against shock loads and tramp iron',
      'Dual optical speed encoder options for fail-safe speed measurement',
    ],
    applications: [
      'Plant intake and dispatch totalizing',
      'Crusher feed control and stockpile inventory tracking',
      'Ship loaders, rail loading, and overland bulk conveyors',
    ],
  },
  {
    slug: 'vibratory-feeder',
    name: 'Vibratory Feeder',
    img: 'images/p10.webp',
    category: 'Continuous Feeding',
    tagline: 'Uniform extraction and de-aeration',
    blurb:
      'Electromagnetic and electromechanical vibratory feeders for controlled, steady extraction of bulk solids from bins. Smooths out surges and feeds evenly onto downstream weigh feeders or process belts.',
    tags: ['Vibration drive', 'Anti-bridging', 'Standalone or inline'],
    specs: {
      'Capacity': '500 kg/hr to 1,200 TPH',
      'Trough Length': 'Up to 4,000 mm; widths from 300 mm to 1,800 mm',
      'Drive Type': 'Electromagnetic vibrating drive or unbalance motor drive',
      'Amplitude': 'Continuously adjustable vibration stroke via thyristor / VFD',
      'Liners': 'Wear-resistant Hardox, ceramic tiles, or SS liners',
    },
    highlights: [
      'Instantaneous start/stop with zero overrun',
      'Effective handling of sticky, interlocking or sluggish bulk products',
      'Low power consumption and zero maintenance sealed drive units',
    ],
    applications: [
      'Pre-feeder for weigh feeder lines and belt conveyors',
      'Screen and crusher feed regulation',
      'Foundry return sand, ferro alloys, and aggregates',
    ],
  },
]

export const FEATURED = PRODUCTS.filter((p) => p.featured)

export const CATEGORIES = ['All', ...new Set(PRODUCTS.map((p) => p.category))]

export const PILLARS = [
  {
    index: '01',
    title: 'Technology',
    line: 'Simple. Innovative. Solution.',
    body: 'We design the control architecture around your plant — not the other way around. Load-cell instrumentation, closed-loop control and clean integration with the SCADA, HMI or DCS you already run.',
  },
  {
    index: '02',
    title: 'Reliability',
    line: 'Rugged. Dependable.',
    body: 'Industrial duty means dust, heat, vibration and 24/7 operation. Every machine is built for the environment it actually lives in, because an unplanned stop costs far more than the equipment.',
  },
  {
    index: '03',
    title: 'Service',
    line: 'Commissioning. Spares. Maintenance.',
    body: 'We stay with the installation past the handover — commissioning support, genuine spares and breakdown response, so the line keeps running long after the invoice is settled.',
  },
]

export const PROCESS = [
  {
    step: '01',
    title: 'Application Study',
    body: 'Material characteristics, tonnage, accuracy target and plant layout. We start by understanding the duty, not by quoting a catalogue number.',
  },
  {
    step: '02',
    title: 'System Design',
    body: 'Mechanical design, load-cell selection, control philosophy and the integration points with your existing PLC, SCADA or DCS.',
  },
  {
    step: '03',
    title: 'Manufacture',
    body: 'Fabrication, assembly and wiring in-house, followed by dry-run testing before anything leaves for site.',
  },
  {
    step: '04',
    title: 'Commissioning',
    body: 'Site installation support, calibration, loop tuning and operator familiarisation until the system holds setpoint in real production.',
  },
  {
    step: '05',
    title: 'Lifecycle Support',
    body: 'Spares, preventive maintenance and breakdown response for the full service life of the machine.',
  },
]

export const INDUSTRIES = [
  'Cement',
  'Steel',
  'Chemical',
  'Glass',
  'Foundry',
  'Fertilizer',
  'Power & Boilers',
  'Ceramics & AAC',
]

export const CLIENTS = [
  'Tata Steel',
  'ACC Limited',
  'Ambuja Cements',
  'Dalmia Cement',
  'Shree Cement',
  'Jindal Stainless',
  'Lloyds Metals & Energy',
  'Nuvoco Vistas Corporation',
  'Wonder Cement',
  'India Cements',
]

/**
 * Bulk Materials handled by Enweigh systems (matching the 5 process streams)
 */
export const MATERIALS = [
  {
    id: 'clinker',
    name: 'Cement Clinker & Aggregates',
    shortName: 'Clinker & Cement',
    industry: 'Cement & Mineral Plants',
    img: 'images/materials/clinker.webp',
    thumb: 'images/materials/mat-clinker-thumb.webp',
    system: 'Weigh Feeder',
    systemSlug: 'weigh-feeder',
    metric: '±0.5% Accuracy',
    feedRate: '500 kg/hr – 1,000 TPH',
    desc: 'Continuous gravimetric proportioning of hot clinker, limestone, raw meal and gypsum into cement mills.',
    tags: ['Closed-loop', 'Continuous', 'Dust-sealed'],
  },
  {
    id: 'coal',
    name: 'Coal & Industrial Coke',
    shortName: 'Coal & Petcoke',
    industry: 'Power Plants & Steel Mills',
    img: 'images/materials/coal.webp',
    thumb: 'images/materials/mat-coal-thumb.webp',
    system: 'Weigh Feeder',
    systemSlug: 'weigh-feeder',
    metric: '±0.5% Accuracy',
    feedRate: '500 kg/hr – 1,000 TPH',
    desc: 'Continuous gravimetric weighing and controlled feeding of coal and coke for process proportioning.',
    tags: ['Closed-loop', 'Continuous', 'Material Totalizer'],
  },
  {
    id: 'glass',
    name: 'Glass Cullet & Raw Shards',
    shortName: 'Glass Cullet & Shards',
    industry: 'Glass & Solar Manufacturing',
    img: 'images/materials/glass.webp',
    thumb: 'images/materials/mat-glass-thumb.webp',
    system: 'Batch Weighing Plant',
    systemSlug: 'batch-weighing-system',
    metric: '±0.1% Recipe Precision',
    feedRate: 'Turnkey Dosing & Mixing',
    desc: 'High-precision automated batching and blending of cullet, silica, soda ash, and raw glass shards.',
    tags: ['Multi-ingredient', 'Recipe Manager', 'Turnkey Plant'],
  },
  {
    id: 'iron-ore',
    name: 'Iron Ore & Hot Sinter',
    shortName: 'Iron Ore & Sinter',
    industry: 'Steel & Metallurgical Smelters',
    img: 'images/materials/iron-ore.webp',
    thumb: 'images/materials/mat-iron-ore-thumb.webp',
    system: 'Belt Weigher',
    systemSlug: 'belt-weigher',
    metric: 'In-Motion Weighing',
    feedRate: 'Conveyor Scaler Line',
    desc: 'In-motion weighing and tonnage totalizing of iron ore and sinter on existing process conveyors.',
    tags: ['In-Motion Flow', 'Conveyor Retrofit', 'Totalized Tonnage'],
  },
  {
    id: 'limestone',
    name: 'Limestone & Gypsum Rocks',
    shortName: 'Limestone & Quarry',
    industry: 'Crushing & Mineral Processing',
    img: 'images/materials/limestone.webp',
    thumb: 'images/materials/mat-limestone-thumb.webp',
    system: 'Belt Weigher',
    systemSlug: 'belt-weigher',
    metric: 'In-Motion Totalizer',
    feedRate: 'Conveyor Scaler Line',
    desc: 'Instantaneous flow rate monitoring and cumulative tonnage totalizing directly on existing conveyors.',
    tags: ['In-Motion Flow', 'Easy Retrofit', 'Process Control'],
  },
]

/**
 * Verified company facts (sourced from MCA records + official Enweigh literature).
 * `value` = static string · `to` = animated counter.
 */
export const STATS = [
  { value: '2021', label: 'Founded — incorporated in Mumbai' },
  { to: PRODUCTS.length, label: 'Engineered product systems' },
  { to: 8, label: 'Core process industries served' },
  { value: '10–50', label: 'Team across design, production & service' },
]

export const CAPABILITIES = [
  'Load-cell instrumentation & calibration',
  'Closed-loop gravimetric flow control',
  'SCADA / HMI / DCS communication (Modbus, Profibus, Ethernet)',
  'Complete batching plant engineering',
  'Custom-built mechanical fabrication',
  'Retrofit kits for existing mechanical & electrical systems',
  'On-site commissioning & loop tuning',
  'Original manufacturer spares & AMC support',
]

export const GALLERY = [
  ...Object.values(PHOTOS).flat(),
  { img: '/images/p03.webp', name: 'Batch Weighing System', alt: 'Steel storage bins and access platforms in a batching plant', category: 'Batching & Blending' },
  { img: '/images/p04.webp', name: 'Belt Feeder', alt: 'Open belt feeder with steel skirts and a geared drive', category: 'Continuous Feeding' },
  { img: '/images/p10.webp', name: 'Vibratory Feeder', alt: 'Vibratory tray feeder with a red lining and underside drive', category: 'Continuous Feeding' },
]

export const DOWNLOADS = [
  {
    "title": "Weigh Feeder Brochure",
    "desc": "Continuous gravimetric feeding, mechanical construction and controller features.",
    "type": "PDF",
    "size": "5.1 MB",
    "file": "/downloads/enweigh-weigh-feeder-2024-11-20.pdf",
    "isOfficial": true,
    "badge": "Official Brochure",
    "date": "20 Nov 2024",
    "tags": [
      "Mechanical Characteristics",
      "Controller Features",
      "7-inch Touchscreen HMI"
    ]
  },
  {
    "title": "General Company Brochure",
    "desc": "Company capabilities, belt weigh feeders, batching plants and bin/hopper weighing systems. Original supplied brochure; its historical product list includes a discontinued product.",
    "type": "PDF",
    "size": "4.2 MB",
    "file": "/downloads/enweigh-general-brochure.pdf",
    "isOfficial": true,
    "badge": "Official Brochure",
    "date": null,
    "tags": [
      "Company Capabilities",
      "Weighing & Batching"
    ]
  },
  {
    "title": "Batching Plants Brochure",
    "desc": "Integrated raw-material storage, aggregate dosing and batching plants for glass, putty, mortar, dry mix and other process industries.",
    "type": "PDF",
    "size": "7.4 MB",
    "file": "/downloads/enweigh-batching-plants-brochure.pdf",
    "isOfficial": true,
    "badge": "Official Brochure",
    "date": null,
    "tags": [
      "Raw-Material Storage",
      "Aggregate Dosing",
      "Plant Engineering"
    ]
  },
  {
    "title": "Equipment Photos Catalogue",
    "desc": "25-page equipment and installation photo catalogue, including weigh feeders, belt weighers, loss-in-weight equipment and EUC-2 controller features.",
    "type": "PDF",
    "size": "6.7 MB",
    "file": "/downloads/enweigh-equipment-photos-2025-09-01.pdf",
    "isOfficial": false,
    "badge": "Equipment Catalogue",
    "date": "1 Sep 2025",
    "tags": [
      "Equipment Installations",
      "EUC-2 Controller"
    ]
  },
  {
    "title": "Belt Weigher Datasheet",
    "file": "/downloads/belt-weigher-datasheet.pdf",
    "desc": "Brief overview of flow-rate measurement on troughed conveyors and retrofit capability.",
    "badge": "Datasheet",
    "type": "PDF",
    "size": "1.0 KB",
    "isOfficial": false
  },
  {
    "title": "Installation & Commissioning Guide",
    "file": "/downloads/installation-commissioning-guide.pdf",
    "desc": "Brief overview of site readiness, installation, calibration and loop tuning.",
    "badge": "Technical Guide",
    "type": "PDF",
    "size": "1.0 KB",
    "isOfficial": false
  },
  {
    "title": "Spares & Service Support Guide",
    "file": "/downloads/spares-service-guide.pdf",
    "desc": "Brief overview of genuine spares, preventive maintenance and breakdown response.",
    "badge": "Service Guide",
    "type": "PDF",
    "size": "1.0 KB",
    "isOfficial": false
  }
]
