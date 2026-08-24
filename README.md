# PrivaSync AI — iQOO Smart Gallery

> **Zero-Cloud, On-Device AI Gallery with Instant Collaborative Shared Spaces for iQOO (Funtouch OS / OriginOS)**

---

## 📱 The Real-World Problem
After trips, events, or parties with friends, sharing photos is broken:
- **WhatsApp** compresses full-resolution photos into low-quality files.
- **Google Drive links** require tedious manual uploads, sorting, and downloads.
- **The "Lost Candids" Dilemma:** Great candid photos of *you* taken by friends remain locked in *their* phones forever.
- **Privacy Hazards:** Photos of Aadhaar cards, PAN cards, Passports, and handwritten passwords sit unencrypted in open camera rolls.

---

## 💡 The Solution: PrivaSync AI
**PrivaSync AI** is an on-device AI gallery and instant collaborative photo space that eliminates cloud dependency:
1. **Instant Group Rooms:** Friends join via a 6-digit room code or QR link and dump raw photos over zero-data local Wi-Fi / P2P.
2. **"You're In This Too" (Killer Feature):** On-device face-embedding matching (FaceNet) automatically surfaces every photo of **YOU** right at the top of your feed — including candids taken by friends.
3. **AI Sensitive Vault & Auto-Notes:** Automatically detects Indian IDs (Aadhaar, PAN, Passports), locks them with **AES-256 Android Keystore encryption + Biometric authentication**, and extracts credentials into a structured Notes file.
4. **Instant Cleaning:** Real-time **OpenCV Laplacian Variance** blur detection and **pHash hashmap** duplicate prevention.
5. **Neural Style Transfer:** On-device AI art studio (Cyberpunk, Anime, Watercolor, Van Gogh) powered by TensorFlow Lite on the Snapdragon GPU/NPU.
6. **Smart Memories:** Auto-curated "On This Day" flashback reels.
7. **Ask Assistant:** Natural language search by Timeline, Location, and OCR on-image text.

---

## 🏗️ Technical Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION & GESTURE LAYER                    │
│   Jetpack Compose (120Hz)  •  4-Way Swipe  •  Memories Reel Story UI   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                       DOMAIN & COORDINATION LAYER                      │
│     P2P Room Coordinator (Nearby API)  •  Ask Assistant NLP Engine     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    ON-DEVICE AI & HARDWARE ACCELERATION                │
│  • FaceNet (TFLite on iQOO NPU): "You're In This Too" Face Matching    │
│  • Google ML Kit OCR: Document Classification & Data Extraction        │
│  • TFLite Style Transfer: Local GPU-accelerated Art Generation         │
│  • OpenCV Laplacian Engine: Real-time Blur & pHash Deduplication       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                        DATA, SECURITY & HARDWARE                       │
│  • Room DB (SQLite FTS5 Full-Text Search) + Fast Memory Hashmap        │
│  • Android Keystore + AES-256 Encrypted File Vault + BiometricPrompt   │
│  • Vivo Office Kit Integration & Android MediaStore Hook               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ iQOO Hardware & Ecosystem Integration

| iQOO Hardware Capability | How PrivaSync AI Leverages It |
| :--- | :--- |
| **Snapdragon Adreno GPU / NPU** | Sub-40ms on-device Neural Style Transfer & FaceNet vector inference |
| **120Hz Ultra-Smooth Display** | 4-way gesture navigation (Swipe Left/Right, Up to Save, Down to Delete) |
| **Vivo Office Kit** | Wireless cross-device sync to drag-and-drop credentials notes and high-res albums to PC |
| **MediaStore ContentObserver** | Background hook into native iQOO camera to index newly snapped photos instantly |
| **Ultrasonic Biometric Sensor** | BiometricPrompt API for instant fingerprint unlock of the private vault |

---

## 🚀 Interactive Prototype (Web Simulator)

To run the interactive iQOO OS mobile prototype locally:

```bash
cd prototype
npm install
npm run dev
```

Visit `http://localhost:5173` to test:
- 👥 Joining Room `IQOO-779` and dumping 3 friend photos
- 👤 "You're In This Too" live face segregation
- 🔒 AI Sensitive Vault biometric unlock & Notes auto-extraction
- 🧹 Blur & Duplicate detection cleaner
- 🎨 Neural Style Transfer filters
- ✨ Smart Memories story reel player
- 🔍 "Ask Assistant" search by date, location, and OCR text
- 💻 Vivo Office Kit cross-device projection

---

## 📂 Repository Structure

```
├── android/                         # Native Android Studio Project
│   ├── app/src/main/
│   │   ├── AndroidManifest.xml      # Camera, MediaStore, Biometric permissions
│   │   └── java/com/privasync/ai/
│   │       ├── domain/usecase/      # FaceMatcherUseCase, SensitiveScanner, BlurDetector
│   │       ├── domain/model/        # Models (Photo, Room, DocumentResult)
│   │       └── ui/theme/            # iQOO Monster theme (Yellow #FFE600, Orange #FF5722)
├── prototype/                       # Interactive iQOO OS Prototype
│   ├── src/
│   │   ├── components/              # PhoneFrame, SharedRoom, Vault, Style, Memories, Search
│   │   ├── data/                    # Mock datasets for offline testing
│   │   ├── App.jsx                  # Main iQOO OS interface
│   │   └── index.css                # Tailwind styles
│   └── package.json
└── README.md
```
