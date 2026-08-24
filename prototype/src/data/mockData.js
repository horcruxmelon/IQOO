export const MOCK_USER_FACE = {
  id: "user_primary",
  name: "You (Rohan)",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
};

export const MOCK_ROOM_PHOTOS = [
  {
    id: "r1",
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80",
    contributor: "Aarav (iQOO 12)",
    timestamp: "10 mins ago",
    containsUser: true,
    userMatchConfidence: 98.4,
    tags: ["Party", "Candid", "You"],
    blurScore: 420,
    isBlurry: false,
    isDuplicate: false,
    location: "Cafe Noir, Bangalore",
    ocrText: "Special Celebration Night 2026"
  },
  {
    id: "r2",
    url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    contributor: "Priya (iQOO Neo9)",
    timestamp: "15 mins ago",
    containsUser: true,
    userMatchConfidence: 96.1,
    tags: ["Portrait", "You"],
    blurScore: 512,
    isBlurry: false,
    isDuplicate: false,
    location: "Nandi Hills",
    ocrText: ""
  },
  {
    id: "r3",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
    contributor: "Vikram (iQOO 11)",
    timestamp: "22 mins ago",
    containsUser: true,
    userMatchConfidence: 94.7,
    tags: ["Friends", "Sunset", "You"],
    blurScore: 380,
    isBlurry: false,
    isDuplicate: false,
    location: "Goa Beach",
    ocrText: "Sunset Point Cafe"
  },
  {
    id: "r3b",
    url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80",
    contributor: "Priya (iQOO Neo9)",
    timestamp: "24 mins ago",
    containsUser: false,
    userMatchConfidence: 6.0,
    tags: ["Beach", "Goa"],
    blurScore: 455,
    isBlurry: false,
    isDuplicate: false,
    location: "Goa Beach",
    ocrText: ""
  },
  {
    id: "r3c",
    url: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&auto=format&fit=crop&q=80",
    contributor: "Rohan (You)",
    timestamp: "26 mins ago",
    containsUser: true,
    userMatchConfidence: 97.2,
    tags: ["Beach", "Goa", "You"],
    blurScore: 470,
    isBlurry: false,
    isDuplicate: false,
    location: "Goa Beach",
    ocrText: "Anjuna Beach Shack"
  },
  {
    id: "r4",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    contributor: "Vikram (iQOO 11)",
    timestamp: "25 mins ago",
    containsUser: false,
    userMatchConfidence: 12.0,
    tags: ["Landscape"],
    blurScore: 680,
    isBlurry: false,
    isDuplicate: false,
    location: "Western Ghats",
    ocrText: ""
  },
  {
    id: "r5",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
    contributor: "Aarav (iQOO 12)",
    timestamp: "30 mins ago",
    containsUser: false,
    userMatchConfidence: 8.5,
    tags: ["Campfire"],
    blurScore: 340,
    isBlurry: false,
    isDuplicate: false,
    location: "Coorg Estate",
    ocrText: ""
  },
  {
    id: "r6_blur",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    contributor: "Priya (iQOO Neo9)",
    timestamp: "35 mins ago",
    containsUser: false,
    userMatchConfidence: 5.0,
    tags: ["Shaky"],
    blurScore: 62,
    isBlurry: true,
    isDuplicate: false,
    location: "Pub Street",
    ocrText: ""
  },
  {
    id: "r7_dup",
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80",
    contributor: "Rohan (You)",
    timestamp: "40 mins ago",
    containsUser: true,
    userMatchConfidence: 98.4,
    tags: ["Duplicate"],
    blurScore: 418,
    isBlurry: false,
    isDuplicate: true,
    location: "Cafe Noir, Bangalore",
    ocrText: ""
  }
];

export const MOCK_VAULT_ITEMS = [
  {
    id: "v1",
    title: "Government Aadhaar ID Card",
    type: "Aadhaar Card",
    date: "Aug 20, 2026",
    thumbnail: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=600&auto=format&fit=crop&q=80",
    ocrData: { idNumber: "XXXX XXXX 8921", name: "Rohan S. Sharma", dob: "14/08/2002" },
    encryptedHash: "aes256_e89a77"
  },
  {
    id: "v2",
    title: "Permanent Account Number (PAN)",
    type: "PAN Card",
    date: "Aug 12, 2026",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    ocrData: { idNumber: "ABCDE1234F", name: "Rohan Sharma", dob: "14/08/2002" },
    encryptedHash: "aes256_77fa22"
  },
  {
    id: "v3",
    title: "Wi-Fi Credentials Screenshot",
    type: "Credentials",
    date: "Aug 5, 2026",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    ocrData: { ssid: "iQOO_HyperNet_5G", password: "SuperSecretPassword#2026" },
    encryptedHash: "aes256_bb9933"
  }
];

export const MOCK_STYLE_PRESETS = [
  {
    id: "cyberpunk",
    name: "Cyberpunk iQOO",
    desc: "Neon glow & high-contrast tones",
    filterCss: "contrast(140%) saturate(180%) hue-rotate(290deg) brightness(110%)"
  },
  {
    id: "anime",
    name: "Makoto Shinkai Anime",
    desc: "Vibrant skies and warm pastel animation",
    filterCss: "saturate(200%) contrast(115%) brightness(120%)"
  },
  {
    id: "vangogh",
    name: "Starry Night",
    desc: "Impressionist oil brush strokes",
    filterCss: "sepia(50%) contrast(150%) saturate(160%) hue-rotate(180deg)"
  },
  {
    id: "watercolor",
    name: "Watercolor Blossom",
    desc: "Soft bleeding water pigment edges",
    filterCss: "blur(0.4px) contrast(110%) saturate(150%) brightness(115%)"
  }
];

export const MOCK_GALLERY_SECTIONS = [
  {
    month: "August 2026",
    items: [
      { id: "g1", url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80", timestamp: "Aug 21, 2026", location: "Cafe Noir, Bangalore" },
      { id: "g2", url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&auto=format&fit=crop&q=80", timestamp: "Aug 20, 2026", location: "Solang Valley, HP" },
      { id: "g3", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop&q=80", timestamp: "Aug 19, 2026", location: "Solang Valley, HP" },
      { id: "g4", url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&auto=format&fit=crop&q=80", timestamp: "Aug 18, 2026", location: "Solang Valley, HP", featured: true },
      { id: "g5", url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop&q=80", timestamp: "Aug 17, 2026", location: "Coorg Estate" },
      { id: "g6", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80", timestamp: "Aug 16, 2026", location: "Western Ghats" },
      { id: "g7", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80", timestamp: "Aug 15, 2026", location: "Coorg Estate" },
      { id: "g8", url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80", timestamp: "Aug 14, 2026", location: "Pub Street" },
      { id: "g9", url: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=80", timestamp: "Aug 12, 2026", location: "Western Ghats" },
    ]
  },
  {
    month: "September 2026",
    items: [
      { id: "g10", url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80", timestamp: "Sep 3, 2026", location: "Cafe Noir, Bangalore" },
      { id: "g11", url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&auto=format&fit=crop&q=80", timestamp: "Sep 2, 2026", location: "Nandi Hills" },
      { id: "g12", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80", timestamp: "Sep 1, 2026", location: "Goa Beach" },
      { id: "g13", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80", timestamp: "Aug 31, 2026", location: "Nandi Hills" },
    ]
  }
];

export const MOCK_MEMORIES = [
  {
    id: "m1",
    title: "1 Year Ago in Manali",
    date: "Aug 24, 2025",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    photoCount: 14,
    location: "Solang Valley, HP",
    slides: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "m2",
    title: "Weekend Trip to Coorg",
    date: "Last Weekend",
    cover: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
    photoCount: 8,
    location: "Madikeri, KA",
    slides: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80"
    ]
  }
];
