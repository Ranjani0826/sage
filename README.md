# SAGE — Scam Analysis & Genome Engine

> **“Detect the attack. Track its mutations. Build immunity.”**  
> *Attackers change the words. We track the attack.*

---

## 🛡️ Core Innovation

Traditional cybersecurity filters ask:  
> *“Is this individual message phishing?”*

**SAGE** asks:  
> *“What is the underlying **Scam DNA**, what mutations belong to this attack family, and have we seen this attack before?”*

When threat actors rewrite messages using generative AI, translate them into regional Indian languages (Tamil, Hindi, Hinglish), shorten them into SMS format, or rotate disposable domains, **the underlying social engineering genome remains invariant**. SAGE extracts this genome, tracks mutation lineages, maps the 6-stage psychological attack path, and builds collective threat immunity.

---

## 🧬 Key Features & Differentiators

### 1. Scam DNA Extraction
Extracts invariant architectural and psychological attack vectors:
- **Intent**: e.g., *Account Takeover via Credential & OTP Harvest*
- **Victim Target Profile**: e.g., *Retail Bank Customers (SBI, HDFC, ICICI)*
- **Tactics**: *Authority + Fear + Artificial Urgency*
- **Impersonation Spoof**: e.g., *Nationalized Banking Institution*
- **Requested Action**: e.g., *Click link and submit credentials*
- **Financial/Credential Ask**: *Netbanking Credentials + OTP + PIN*
- **Semantic Fingerprint & Hex Genome**: *Invariant mathematical hash across surface mutations*

### 2. Scam Evolution & Mutation Graph
Connects diverse surface variants to a single Campaign Family:
- **English Original SMS**
- **AI Neural Paraphrase (Polite corporate tone)**
- **Tamil Vernacular Translation (தமிழ்)**
- **Hindi Vernacular Translation (हिंदी)**
- **Hinglish Code-Mixing (Romanized Hindi)**
- **Compressed 160-char SMS**
- **Ephemeral Disposable Domains**
- **Visual QR / OCR Invoices**

*Judges can click between mutations to verify: **“Different words. Same attack.”***

### 3. 6-Stage Social Engineering Attack Path
Deconstructs the manipulation sequence with non-technical judge explanations:
1. `TRUST` — Spoofed sender / greeting
2. `AUTHORITY` — RBI / Regulatory / Police mandate
3. `FEAR` — Account suspension / arrest warrant / parcel destruction
4. `URGENCY` — 24-hour deadline
5. `ACTION` — Click link / scan QR / download APK
6. `CREDENTIAL / MONEY` — OTP harvest / nominal redelivery fee / UPI PIN

### 4. Transparent Risk Engine
Explainable prototype scoring (0–100) based on detected signals with clear recommended actions:
- `CRITICAL` / `HIGH` → **BLOCK**
- `MEDIUM` → **WARN**
- `LOW` → **ALLOW / REVIEW**

### 5. Mutation Lab (Stress-Testing & Blind Spot Discovery)
Adversarial test suite evaluating detection robustness vs prototype edge cases (e.g. extreme leetspeak homoglyphs) with an active feedback loop:  
`Known Attack → Controlled Mutation → Genome Detector → Blind Spot Identified → Adaptive Immunity Patch`.

### 6. Campaign Memory & Threat Intelligence Dossier
Indexed catalog of persistent scam campaigns with timeline, observed languages, and connected mutation clusters.

---

## ⚡ 10-Second Judge Demo Workflow

1. Open the web interface.
2. Click the glowing top banner: **`⚡ 10s Judge Live Demo`**.
3. Watch the automated showcase step through:
   - **Step 1:** English Original Phishing SMS
   - **Step 2:** AI Paraphrased polite tone rewrite
   - **Step 3:** Regional Tamil translation (தமிழ்)
   - **Step 4:** Compressed short SMS
   - **Step 5:** New disposable domain
4. Observe how all 5 mutations resolve to the **identical Scam DNA** (`DNA-BNK-KYC-94F8A2`) and **Campaign #001: Bank KYC Suspension Blitz**.

---

## 🏗️ Architecture

```
sage/
├── backend/
│   ├── main.py                     # FastAPI server with analysis & telemetry endpoints
│   ├── engine/
│   │   ├── language_detector.py    # Multi-language & script tokenizer (EN, TA, HI, Hinglish)
│   │   ├── dna_extractor.py        # Scam DNA & genome hash extraction
│   │   ├── attack_path.py          # 6-stage social-engineering mapper
│   │   ├── risk_engine.py          # Transparent risk evaluation & recommended action
│   │   ├── campaign_matcher.py     # Cross-variant family & mutation matcher
│   │   ├── url_analyzer.py         # Domain, typosquat, and infrastructure telemetry
│   │   ├── ocr_qr.py               # Image OCR and QR parser with fallback
│   │   └── mutation_lab.py         # Adversarial mutation suite & blind spot benchmark
│   └── database/
│       ├── memory.py               # SQLite campaign & analysis storage
│       └── seed_data.py            # Pre-seeded realistic scam families & variants
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Command bar & Judge Showcase trigger
│   │   │   ├── AnalyzerView.jsx    # Core analysis console & animated pipeline
│   │   │   ├── DnaCard.jsx         # Visual Scam DNA fingerprint card
│   │   │   ├── AttackPathPanel.jsx # 6-stage attack progression stepper
│   │   │   ├── RiskEnginePanel.jsx # Transparent risk score & factor breakdown
│   │   │   ├── CampaignMatchPanel.jsx # Matched family & variant linking
│   │   │   ├── UrlAnalysisPanel.jsx # URL & infrastructure telemetry
│   │   │   ├── ScamEvolutionView.jsx # Visual mutation starburst graph
│   │   │   ├── MutationLabView.jsx # Stress testing & blind spot feedback loop
│   │   │   ├── CampaignMemoryView.jsx # Threat intelligence dossiers
│   │   │   ├── DashboardView.jsx   # Threat operations metrics & feed
│   │   │   └── JudgeShowcaseModal.jsx # 10-second auto-play pitch modal
│   │   ├── api.js                  # Client API connector with fallback safety
│   │   ├── App.jsx                 # Root layout & state controller
│   │   └── index.css               # Cyber command center styles
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Start Backend Server
```bash
# In project root
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
API runs at `http://127.0.0.1:8000` (Interactive docs at `http://127.0.0.1:8000/docs`).

### 2. Start Frontend UI
```bash
cd frontend
npm run dev
```
Frontend opens at `http://localhost:5173`.

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/analyze` | Full SAGE pipeline: Language/OCR → Intent → DNA → Attack Path → Risk |
| `GET` | `/api/campaigns` | Retrieve all indexed Scam DNA families and variants |
| `GET` | `/api/campaigns/{id}` | Detailed threat dossier for a specific campaign |
| `POST` | `/api/mutation-lab/test` | Run adversarial stress test against baseline scam |
| `GET` | `/api/demo/showcase-flow` | 5-step automated judge showcase sequence |
| `GET` | `/api/stats` | Global threat intelligence metrics |

---

## 🔒 Ethical Safety & Disclaimer

This is a defensive cybersecurity research prototype.
- All mock domains use strictly reserved `.test` TLDs (e.g. `sbi-kyc-verify-portal.test`, `indiapost-redelivery.test`).
- No live malicious credential harvesting infrastructure or actual OTPs/PINs are generated or requested.
- Numerical scores and threat telemetry are transparent illustrative prototype signals.

---

### **MESSAGES → DNA → IMMUNITY**
*SAGE — Scam Analysis & Genome Engine*
