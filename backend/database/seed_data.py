"""
SAGE — Scam Analysis & Genome Engine
Seeded realistic Scam DNA Families, Campaigns, and Surface Variants.
All domains and infrastructure are safe illustrative prototypes (.test domains).
"""

SEEDED_CAMPAIGNS = [
    {
        "id": "CAMP-001",
        "name": "Bank KYC Suspension Blitz",
        "category": "Banking & Financial Services",
        "first_seen": "2026-09-12T08:30:00Z",
        "status": "ACTIVE_MUTATING",
        "dna": {
            "intent": "Account Takeover via Credential & OTP Harvest",
            "target": "Retail Bank Customers (SBI, HDFC, ICICI)",
            "tactics": ["Authority", "Fear", "Urgency", "Account Suspension Threat"],
            "impersonation": "Nationalized / Major Private Banking Institutions",
            "requested_action": "Click URL to submit PAN/Aadhaar/Netbanking login and OTP",
            "financial_ask": "Banking Credentials + OTP + Debit Card PIN",
            "infrastructure": "Dynamic typosquatted .test landing portals with reverse OTP proxy",
            "semantic_fingerprint": "DNA-BNK-KYC-94F8A2",
            "genome_hash": "e7c8b214901f4a9b",
            "core_vector": [0.88, 0.95, 0.92, 0.84, 0.91, 0.78, 0.96]
        },
        "attack_path": [
            {"stage": 1, "name": "TRUST", "description": "Spoofed sender ID resembling official bank alert (e.g. SBIBNK, HDFCAL)"},
            {"stage": 2, "name": "AUTHORITY", "description": "Cites RBI KYC Compliance guidelines and regulatory mandate"},
            {"stage": 3, "name": "FEAR", "description": "Warns of immediate account freeze, card deactivation, or penalty"},
            {"stage": 4, "name": "URGENCY", "description": "Imposes strict 24-hour deadline before irreversible block"},
            {"stage": 5, "name": "ACTION", "description": "Directs user to click external shortened/typosquatted verification link"},
            {"stage": 6, "name": "CREDENTIAL_MONEY", "description": "Harvests Netbanking User ID, Password, and intercepts live OTP"}
        ],
        "languages_observed": ["English", "Tamil", "Hindi", "Hinglish"],
        "mutation_count": 8,
        "variants": [
            {
                "id": "VAR-001-EN-ORIG",
                "label": "English Original SMS",
                "language": "English",
                "text": "Dear Customer, Your SBI account has been suspended due to pending KYC update. Please update your PAN card immediately at https://sbi-kyc-verify-portal.test to avoid permanent account deactivation within 24 hours.",
                "mutation_type": "Original Seed",
                "carrier": "SMS",
                "detected": True
            },
            {
                "id": "VAR-001-AI-REWRITE",
                "label": "AI Paraphrased / Polite Tone",
                "language": "English",
                "text": "Important banking notice: To prevent disruption of your netbanking services, mandatory verification of your KYC documents is required before midnight. Access our secure verification portal: https://secure-bank-update.test",
                "mutation_type": "AI Neural Paraphrase",
                "carrier": "Email / Web",
                "detected": True
            },
            {
                "id": "VAR-001-TA",
                "label": "Tamil Version",
                "language": "Tamil",
                "text": "அன்புள்ள வாடிக்கையாளரே, உங்கள் வங்கி கணக்கு KYC புதுப்பிக்கப்படாததால் தற்காலிகமாக முடக்கப்பட்டுள்ளது. 24 மணி நேரத்திற்குள் கணக்கு ரத்து செய்யப்படுவதைத் தவிர்க்க உடனடியாக இங்கே புதுப்பிக்கவும்: https://tamil-bank-kyc.test",
                "mutation_type": "Natural Vernacular Translation",
                "carrier": "SMS / WhatsApp",
                "detected": True
            },
            {
                "id": "VAR-001-HI",
                "label": "Hindi Version",
                "language": "Hindi",
                "text": "प्रिय ग्राहक, आपका बैंक खाता KYC अपडेट न होने के कारण आज रात ब्लॉक कर दिया जाएगा। खाते को चालू रखने के लिए तुरंत अपना पैन और आधार कार्ड अपडेट करें: https://bank-seva-kyc.test",
                "mutation_type": "Natural Vernacular Translation",
                "carrier": "SMS / WhatsApp",
                "detected": True
            },
            {
                "id": "VAR-001-HINGLISH",
                "label": "Hinglish Code-mixed",
                "language": "Hinglish",
                "text": "Dear Customer aapka Bank Account aaj suspend ho jayega because KYC update pending hai. Abhi 24 hours me verify kare nahi toh account block hoga: https://quick-kyc-update.test",
                "mutation_type": "Code-Mixed Romanized",
                "carrier": "WhatsApp / Telegram",
                "detected": True
            },
            {
                "id": "VAR-001-SHORT-SMS",
                "label": "Short SMS / Abbreviated",
                "language": "English",
                "text": "ALERT: Acct Blocked! KYC exp in 24hr. Re-activate now: https://bit-ly-sbi.test",
                "mutation_type": "High-Compression SMS",
                "carrier": "SMS",
                "detected": True
            },
            {
                "id": "VAR-001-QR",
                "label": "QR / Visual Invoice",
                "language": "English",
                "text": "SCAN TO RESTORE BANK ACCESS: Immediate KYC verification required by Banking Regulatory Cell. Scan the code below or visit https://qr-kyc-auth.test",
                "mutation_type": "QR / OCR Graphic",
                "carrier": "Image / MMS",
                "detected": True
            }
        ]
    },
    {
        "id": "CAMP-002",
        "name": "Failed Parcel Delivery Redirection",
        "category": "E-Commerce & Logistics",
        "first_seen": "2026-09-18T14:10:00Z",
        "status": "HIGH_SURGE",
        "dna": {
            "intent": "Micro-payment Fee Fraud + Stored Card Theft",
            "target": "Online Shoppers & E-Commerce Delivery Recipients",
            "tactics": ["Trust", "Urgency", "Curiosity", "Low-Friction Small Fee"],
            "impersonation": "India Post / Blue Dart / DTDC / SpeedPost",
            "requested_action": "Pay nominal ₹10-₹50 redelivery fee to reschedule parcel",
            "financial_ask": "Credit/Debit Card full details (CVV/Expiry) + Fake Gateway",
            "infrastructure": "Fake postal tracking portal with spoofed payment iframe",
            "semantic_fingerprint": "DNA-LOG-PARCEL-55C1D3",
            "genome_hash": "a4d31e98823f0091",
            "core_vector": [0.72, 0.65, 0.40, 0.89, 0.95, 0.94, 0.81]
        },
        "attack_path": [
            {"stage": 1, "name": "TRUST", "description": "Mentions package tracking ID and courier brand (India Post, BlueDart)"},
            {"stage": 2, "name": "AUTHORITY", "description": "Official delivery failed notification status from postal dispatch system"},
            {"stage": 3, "name": "FEAR", "description": "Warning that parcel will be returned to sender or destroyed within 48h"},
            {"stage": 4, "name": "URGENCY", "description": "Action must be taken before warehouse return cutoff"},
            {"stage": 5, "name": "ACTION", "description": "Redirects to update address and pay small nominal ₹25 redelivery charge"},
            {"stage": 6, "name": "CREDENTIAL_MONEY", "description": "Phishing form captures full card details while charging unauthorized sums"}
        ],
        "languages_observed": ["English", "Tamil", "Hindi", "Hinglish"],
        "mutation_count": 6,
        "variants": [
            {
                "id": "VAR-002-EN-ORIG",
                "label": "English Parcel SMS",
                "language": "English",
                "text": "Your package #IN-88291 cannot be delivered due to an incomplete street address. Please update your address and pay ₹25 redelivery fee at https://indiapost-redelivery.test within 24 hours to prevent parcel return.",
                "mutation_type": "Original Seed",
                "carrier": "SMS",
                "detected": True
            },
            {
                "id": "VAR-002-TA",
                "label": "Tamil Parcel SMS",
                "language": "Tamil",
                "text": "உங்கள் பார்சல் எண் #TN-4019 முகவரி பிழை காரணமாக டெலிவரி செய்யப்படவில்லை. பார்சல் திரும்ப அனுப்பப்படுவதை தவிர்க்க 24 மணி நேரத்திற்குள் ₹20 செலுத்தி முகவரியை புதுப்பிக்கவும்: https://tamil-postal-track.test",
                "mutation_type": "Natural Vernacular Translation",
                "carrier": "SMS / WhatsApp",
                "detected": True
            },
            {
                "id": "VAR-002-HI",
                "label": "Hindi Parcel SMS",
                "language": "Hindi",
                "text": "आपका पार्सल अधूरा पता होने के कारण डिलीवर नहीं हो सका। पार्सल वापस जाने से बचाने के लिए 24 घंटे में ₹25 का पुनः शुल्क दें और पता अपडेट करें: https://speedpost-delivery.test",
                "mutation_type": "Natural Vernacular Translation",
                "carrier": "SMS",
                "detected": True
            },
            {
                "id": "VAR-002-HINGLISH",
                "label": "Hinglish Courier Notice",
                "language": "Hinglish",
                "text": "Aapka parcel wrong address ki wajah se hold par hai. Urgent ₹25 pay karke address update kare warna package return ho jayega: https://courier-track-update.test",
                "mutation_type": "Code-Mixed Romanized",
                "carrier": "SMS / WhatsApp",
                "detected": True
            }
        ]
    },
    {
        "id": "CAMP-003",
        "name": "Traffic Challan & Court Summons Extortion",
        "category": "Government & Legal Authority",
        "first_seen": "2026-09-22T11:45:00Z",
        "status": "CRITICAL_SEVERITY",
        "dna": {
            "intent": "Coercive Extortion via Legal Panic & Fake Gateway",
            "target": "Vehicle Owners & Citizens",
            "tactics": ["Authority", "Fear", "Legal Threat", "Severe Urgency", "Intimidation"],
            "impersonation": "Traffic Police / E-Challan Cell / Ministry of Transport",
            "requested_action": "Download APK app or pay pending ₹1,500 fine to avoid warrant",
            "financial_ask": "Immediate UPI/Card payment or Malicious APK installation",
            "infrastructure": "Spoofed Parivahan/Challan portals hosting malicious Android APKs",
            "semantic_fingerprint": "DNA-GOV-CHALLAN-77E2A9",
            "genome_hash": "c1f9042b7814e567",
            "core_vector": [0.95, 0.98, 0.99, 0.92, 0.88, 0.85, 0.97]
        },
        "attack_path": [
            {"stage": 1, "name": "TRUST", "description": "Simulates official transport department notification format"},
            {"stage": 2, "name": "AUTHORITY", "description": "Quotes Motor Vehicles Act, Section 133, and e-Court summons"},
            {"stage": 3, "name": "FEAR", "description": "Threatens non-bailable arrest warrant, license seizure, and impoundment"},
            {"stage": 4, "name": "URGENCY", "description": "Mandates resolution within 12 hours before judicial magistrate escalation"},
            {"stage": 5, "name": "ACTION", "description": "Directs to download 'E-Challan-App.apk' or pay at rogue site"},
            {"stage": 6, "name": "CREDENTIAL_MONEY", "description": "Steals banking permissions via APK malware or takes direct UPI transfer"}
        ],
        "languages_observed": ["English", "Tamil", "Hindi", "Hinglish"],
        "mutation_count": 5,
        "variants": [
            {
                "id": "VAR-003-EN-ORIG",
                "label": "English Challan SMS",
                "language": "English",
                "text": "TRAFFIC POLICE NOTICE: Pending e-challan of Rs 1,500 registered against vehicle. Pay within 12 hours at https://echallan-parivahan-gov.test or court warrant will be issued under MV Act Section 133.",
                "mutation_type": "Original Seed",
                "carrier": "SMS",
                "detected": True
            },
            {
                "id": "VAR-003-HI",
                "label": "Hindi Challan SMS",
                "language": "Hindi",
                "text": "यातायात पुलिस सूचना: आपके वाहन पर ₹1500 का ई-चालान लंबित है। अदालती कार्यवाही और गिरफ्तारी वारंट से बचने के लिए 12 घंटे के अंदर तुरंत भुगतान करें: https://echallan-seva-pay.test",
                "mutation_type": "Natural Vernacular Translation",
                "carrier": "SMS",
                "detected": True
            },
            {
                "id": "VAR-003-TA",
                "label": "Tamil Challan SMS",
                "language": "Tamil",
                "text": "போக்குவரத்து காவல்துறை எச்சரிக்கை: உங்கள் வாகனத்திற்கு ₹1,500 அபராதம் நிலுவையில் உள்ளது. கைது வாரண்ட் மற்றும் நீதிமன்ற நடவடிக்கையை தவிர்க்க 12 மணி நேரத்திற்குள் செலுத்தவும்: https://tamil-echallan.test",
                "mutation_type": "Natural Vernacular Translation",
                "carrier": "SMS",
                "detected": True
            }
        ]
    },
    {
        "id": "CAMP-004",
        "name": "UPI Refund / Cashback QR Reverse-Pay",
        "category": "UPI & Payment Platforms",
        "first_seen": "2026-09-25T16:00:00Z",
        "status": "ACTIVE_MUTATING",
        "dna": {
            "intent": "Deceptive Reverse Payment via Malicious Collect QR",
            "target": "UPI Users (PhonePe, Google Pay, Paytm)",
            "tactics": ["Trust", "Reward / Greed", "Misdirection", "Immediate Reward"],
            "impersonation": "PhonePe / GPay Merchant Rewards Division",
            "requested_action": "Scan QR and enter UPI PIN to 'receive' ₹4,999 cashback reward",
            "financial_ask": "UPI PIN entered into a disguised payment collect request",
            "infrastructure": "Direct UPI collect intent links & dynamic QR generation",
            "semantic_fingerprint": "DNA-UPI-REWARD-33B880",
            "genome_hash": "f29103bc448109ad",
            "core_vector": [0.65, 0.45, 0.20, 0.85, 0.96, 0.99, 0.90]
        },
        "attack_path": [
            {"stage": 1, "name": "TRUST", "description": "Uses recognizable UPI app branding and payment icons"},
            {"stage": 2, "name": "AUTHORITY", "description": "Claims to be automated central rewards engine"},
            {"stage": 3, "name": "FEAR", "description": "Fear of missing out: cashback voucher expires in 15 minutes"},
            {"stage": 4, "name": "URGENCY", "description": "Urgent countdown timer to claim refund/cashback"},
            {"stage": 5, "name": "ACTION", "description": "Instructs recipient to open scanner and scan attached QR code"},
            {"stage": 6, "name": "CREDENTIAL_MONEY", "description": "Misleads user into typing UPI PIN which debits instead of crediting"}
        ],
        "languages_observed": ["English", "Hindi", "Hinglish"],
        "mutation_count": 4,
        "variants": [
            {
                "id": "VAR-004-EN-ORIG",
                "label": "English Cashback SMS",
                "language": "English",
                "text": "Congratulations! You have received a cashback reward of Rs 4,999 on PhonePe. Click here or scan QR to receive instant credit into your bank account: https://phonepe-reward-claim.test",
                "mutation_type": "Original Seed",
                "carrier": "SMS / WhatsApp",
                "detected": True
            },
            {
                "id": "VAR-004-HINGLISH",
                "label": "Hinglish Cashback Alert",
                "language": "Hinglish",
                "text": "Badhai ho! Aapke Google Pay account me ₹3,500 ka scratch card cashback approve hua hai. Bank me receive karne ke liye abhi QR scan kare aur PIN dale: https://gpay-cashback-instant.test",
                "mutation_type": "Code-Mixed Romanized",
                "carrier": "WhatsApp",
                "detected": True
            }
        ]
    },
    {
        "id": "CAMP-005",
        "name": "AI Part-Time Job / Telegram Task Scam",
        "category": "Employment & Freelance Fraud",
        "first_seen": "2026-09-28T10:20:00Z",
        "status": "MONITORED",
        "dna": {
            "intent": "Advance-Fee Ponzi via YouTube / Hotel Rating Tasks",
            "target": "Job Seekers, Students, Work-from-Home Aspirants",
            "tactics": ["Trust", "High Reward", "Low Effort", "Social Validation"],
            "impersonation": "Global Recruitment Agency / Tech MNC HR",
            "requested_action": "Join Telegram group, like 3 videos, pay deposit for VIP tasks",
            "financial_ask": "Initial crypto/UPI recharge of ₹1,000 - ₹50,000 for high payouts",
            "infrastructure": "Telegram bot channels + Fake crypto task dashboard",
            "semantic_fingerprint": "DNA-JOB-TASK-11D44E",
            "genome_hash": "d881902ae457812c",
            "core_vector": [0.55, 0.40, 0.15, 0.70, 0.90, 0.96, 0.75]
        },
        "attack_path": [
            {"stage": 1, "name": "TRUST", "description": "Polite HR greeting offering flexible work-from-home position"},
            {"stage": 2, "name": "AUTHORITY", "description": "Claims partnership with Google, Amazon, YouTube rating teams"},
            {"stage": 3, "name": "FEAR", "description": "Limited job vacancies: only 5 slots available today"},
            {"stage": 4, "name": "URGENCY", "description": "Complete demo task within 30 minutes to receive initial ₹200 bonus"},
            {"stage": 5, "name": "ACTION", "description": "Click link to message HR on Telegram or WhatsApp"},
            {"stage": 6, "name": "CREDENTIAL_MONEY", "description": "Traps victim in advance-fee recharge tasks with escalating fund demands"}
        ],
        "languages_observed": ["English", "Hindi", "Hinglish"],
        "mutation_count": 4,
        "variants": [
            {
                "id": "VAR-005-EN-ORIG",
                "label": "English Job Invitation",
                "language": "English",
                "text": "Hello! I am Sarah from HR Global. We are hiring part-time remote data evaluators. Earn ₹3,000 - ₹8,000 daily by rating hotels and videos for 30 mins. Contact our coordinator: https://telegram-job-desk.test",
                "mutation_type": "Original Seed",
                "carrier": "WhatsApp / SMS",
                "detected": True
            }
        ]
    }
]
