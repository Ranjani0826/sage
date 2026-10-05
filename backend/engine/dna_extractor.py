import hashlib
import re
from typing import Dict, Any, List

def extract_scam_dna(text: str, urls: List[str], language_info: Dict[str, Any], attack_path_info: Dict[str, Any]) -> Dict[str, Any]:
    """
    Extracts the core Scam DNA (Genome) of a suspicious message:
    - Intent
    - Target
    - Tactics
    - Impersonation
    - Requested Action
    - Financial / Credential Ask
    - Infrastructure
    - Semantic Fingerprint & Genome Hash
    """
    text_lower = text.lower()

    # Intent Detection
    if any(k in text_lower for k in ["kyc", "pan", "aadhaar", "netbanking", "வங்கி கணக்கு", "बैंक खाता"]):
        intent = "Account Takeover via Credential & OTP Harvest"
        target = "Retail Banking Customer"
        impersonation = "Banking Institution / RBI Compliance Cell"
        financial_ask = "Netbanking Credentials, PAN/Aadhaar & OTP"
    elif any(k in text_lower for k in ["delivery", "parcel", "package", "street address", "redelivery", "பார்சல்", "पार्सल", "speedpost", "courier"]):
        intent = "Micro-Payment Fee Fraud + Card Credential Theft"
        target = "E-Commerce / Delivery Recipient"
        impersonation = "Postal / Courier Logistics Provider (India Post, BlueDart)"
        financial_ask = "Nominal Redelivery Fee + Full Credit/Debit Card Details"
    elif any(k in text_lower for k in ["challan", "traffic", "police", "court", "warrant", "mv act", "அபராதம்", "चालान", "वारंट"]):
        intent = "Legal Coercion Extortion & Malicious APK Infiltration"
        target = "Motorist / Citizen"
        impersonation = "Traffic Enforcement / Ministry of Road Transport & Highways"
        financial_ask = "Immediate Fine Settlement / Remote Access APK permissions"
    elif any(k in text_lower for k in ["cashback", "reward", "phonepe", "gpay", "paytm", "scratch card", "refund"]):
        intent = "Reverse-Payment Deception via Malicious Collect QR"
        target = "Digital Wallet / UPI User"
        impersonation = "UPI Payments Central Rewards Desk"
        financial_ask = "Victim UPI PIN entered into disguise debit collect"
    elif any(k in text_lower for k in ["job", "remote", "part-time", "evaluator", "rating", "telegram", "earn"]):
        intent = "Advance-Fee Ponzi / Prepaid Task Fraud"
        target = "Freelancer / Job Seeker"
        impersonation = "MNC Talent Acquisition / Global HR"
        financial_ask = "Deposit recharge / Security deposit for VIP tasks"
    else:
        intent = "Generic Social Engineering & Credential Harvesting"
        target = "General Public"
        impersonation = "Unverified Institutional Spoof"
        financial_ask = "Personal Identity & Contact Information"

    # Tactics Extraction
    tactics = []
    stages = attack_path_info.get("stages", [])
    for stage in stages:
        if stage.get("triggered"):
            tactics.append(stage.get("name").title())
    if not tactics:
        tactics = ["Informational Lure"]

    # Requested Action
    if urls:
        requested_action = f"Navigate to external URL ({urls[0]}) and complete verification form"
    elif "scan" in text_lower or "qr" in text_lower:
        requested_action = "Scan QR code on mobile camera and enter PIN"
    elif "call" in text_lower or "contact" in text_lower:
        requested_action = "Call rogue helpline number or message handler on Telegram"
    elif "download" in text_lower or "apk" in text_lower:
        requested_action = "Download and install sideloaded APK software"
    else:
        requested_action = "Execute urgent compliance instructions"

    # Infrastructure Profile
    if urls:
        primary_domain = urls[0].replace("https://", "").replace("http://", "").split("/")[0]
        infrastructure = f"Deceptive Domain ({primary_domain}) — Rapid Disposable Host"
    else:
        infrastructure = "Direct SMS/Chat Vector (No explicit external link payload)"

    # Semantic Fingerprint & Hex Genome
    # Combine normalized intent tokens to generate invariant hash
    normalized_core = f"{intent.lower()}|{target.lower()}|{impersonation.lower()}"
    raw_hash = hashlib.sha256(normalized_core.encode("utf-8")).hexdigest()
    genome_hash = raw_hash[:16]
    fingerprint_tag = f"DNA-{intent.split()[0].upper()}-{abs(hash(normalized_core)) % 100000:05d}"

    # Visual DNA Strands (Normalized 6-point genome vector for radar/fingerprint cards)
    dna_strands = {
        "authority_coercion": 0.95 if "Authority" in tactics else 0.25,
        "fear_urgency": 0.90 if "Fear" in tactics and "Urgency" in tactics else 0.40,
        "credential_harvest": 0.92 if "Credentials" in financial_ask or "OTP" in financial_ask else 0.30,
        "monetary_theft": 0.88 if "Fee" in financial_ask or "UPI" in financial_ask or "Deposit" in financial_ask else 0.20,
        "impersonation_depth": 0.85 if impersonation != "Unverified Institutional Spoof" else 0.35,
        "infrastructure_disp": 0.90 if urls else 0.20
    }

    return {
        "intent": intent,
        "target": target,
        "tactics": tactics,
        "impersonation": impersonation,
        "requested_action": requested_action,
        "financial_ask": financial_ask,
        "infrastructure": infrastructure,
        "semantic_fingerprint": fingerprint_tag,
        "genome_hash": genome_hash,
        "dna_strands": dna_strands,
        "key_observation": "1 Underlying Attack Strategy → Multiple Surface Variants"
    }
