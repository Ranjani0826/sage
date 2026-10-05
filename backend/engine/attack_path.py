import re
from typing import Dict, Any, List

def analyze_attack_path(text: str, detected_keywords: List[str] = None) -> Dict[str, Any]:
    """
    Deconstructs the social-engineering manipulation sequence across 6 stages:
    1. TRUST: Familiar name / greeting / brand impersonation
    2. AUTHORITY: Regulatory body / Bank / Government / Postal service
    3. FEAR: Account suspension / penalty / legal arrest / parcel destruction
    4. URGENCY: Limited time window (24 hrs / midnight / immediately)
    5. ACTION: Click link / scan QR / call / download APK
    6. CREDENTIAL / MONEY: OTP / password / card details / UPI PIN / payment fee
    """
    text_lower = text.lower()
    
    # 1. TRUST
    trust_patterns = [
        r'\b(dear customer|dear user|hello|greetings|valuable customer|प्रिय ग्राहक|அன்புள்ள வாடிக்கையாளரே|sir|mam)\b',
        r'\b(sbi|hdfc|icici|axis|india post|bluedart|speedpost|phonepe|gpay|paytm|police|parivahan|hr global)\b'
    ]
    trust_detected = any(re.search(p, text_lower) for p in trust_patterns)
    trust_evidence = "Impersonates recognizable brand, greeting, or service name to establish baseline rapport." if trust_detected else "Standard generic opening."

    # 2. AUTHORITY
    authority_patterns = [
        r'\b(rbi|compliance|kyc|regulatory|mandatory|police|court|warrant|mv act|ministry|department|government|magistrate|அரசு|காவல்துறை|न्यायालय|पुलीस|अधिनियम)\b',
        r'\b(bank|official|verification officer|dispatch cell)\b'
    ]
    authority_detected = any(re.search(p, text_lower) for p in authority_patterns)
    authority_evidence = "Invokes regulatory decrees, institutional authority, or legal mandates to disarm skepticism." if authority_detected else "No overt institutional authority claimed."

    # 3. FEAR
    fear_patterns = [
        r'\b(suspend|suspended|blocked|freeze|deactivated|cancelled|warrant|arrest|legal action|penalty|destroyed|return to sender|முடக்கப்பட்டுள்ளது|ரத்து|ब्लॉक|गिरफ्तारी|वारंट|कार्रवाई)\b',
        r'\b(permanent deactivation|impound|lawsuit|hold)\b'
    ]
    fear_detected = any(re.search(p, text_lower) for p in fear_patterns)
    fear_evidence = "Leverages loss aversion: threat of account block, arrest warrant, or parcel cancellation." if fear_detected else "No overt fear/intimidation tactic."

    # 4. URGENCY
    urgency_patterns = [
        r'\b(immediately|urgent|urgently|within 24 hours|24 hr|24hr|12 hours|midnight|today|now|instant|expires in|உடனடியாக|24 மணி|तुरंत|आज रात|12 घंटे|abhi|turant)\b',
        r'\b(limited time|deadline|asap)\b'
    ]
    urgency_detected = any(re.search(p, text_lower) for p in urgency_patterns)
    urgency_evidence = "Imposes an artificial urgency deadline to short-circuit cognitive verification and force panic." if urgency_detected else "Standard timeline."

    # 5. ACTION
    action_patterns = [
        r'\b(click|visit|update|verify|download|install|pay|scan|contact|re-activate|access|புதுப்பிக்கவும்|செலுத்தவும்|अपडेट करें|भुगतान करें|kare|link|portal|apk)\b',
        r'(https?://|www\.)'
    ]
    action_detected = any(re.search(p, text_lower) for p in action_patterns)
    action_evidence = "Compels victim to execute an external out-of-band action (clicking an unverified link, installing APK, scanning QR)." if action_detected else "Passive informative message."

    # 6. CREDENTIAL / MONEY
    cred_patterns = [
        r'\b(pan|aadhaar|otp|password|pin|upi pin|cvv|card|rs|inr|₹|\$|fee|charge|deposit|recharge|payment|பணம்|கட்டணம்|रुपये|पैसे|ओटीपी|पिन)\b',
        r'\b(redelivery fee|challan fee|advance fee|cashback)\b'
    ]
    cred_detected = any(re.search(p, text_lower) for p in cred_patterns)
    cred_evidence = "Directly aims to harvest confidential banking credentials, OTPs, or extract unauthorized money transfers." if cred_detected else "No explicit financial ask identified."

    stages = [
        {
            "stage_number": 1,
            "name": "TRUST",
            "title": "1. Trust Vector",
            "triggered": trust_detected,
            "evidence": trust_evidence,
            "tag": "Social Engineering Primer"
        },
        {
            "stage_number": 2,
            "name": "AUTHORITY",
            "title": "2. Authority & Coercion",
            "triggered": authority_detected,
            "evidence": authority_evidence,
            "tag": "Institutional Masking"
        },
        {
            "stage_number": 3,
            "name": "FEAR",
            "title": "3. Fear & Intimidation",
            "triggered": fear_detected,
            "evidence": fear_evidence,
            "tag": "Panic Inducer"
        },
        {
            "stage_number": 4,
            "name": "URGENCY",
            "title": "4. Artificial Urgency",
            "triggered": urgency_detected,
            "evidence": urgency_evidence,
            "tag": "Cognitive Overload"
        },
        {
            "stage_number": 5,
            "name": "ACTION",
            "title": "5. Malicious Call to Action",
            "triggered": action_detected,
            "evidence": action_evidence,
            "tag": "Execution Trigger"
        },
        {
            "stage_number": 6,
            "name": "CREDENTIAL_MONEY",
            "title": "6. Extraction (Credentials / Money)",
            "triggered": cred_detected,
            "evidence": cred_evidence,
            "tag": "Payload / Monetary Theft"
        }
    ]

    triggered_count = sum(1 for s in stages if s["triggered"])
    
    # Judge explanation synthesis
    narrative_parts = []
    if trust_detected or authority_detected:
        narrative_parts.append("impersonates an institutional authority to establish false trust")
    if fear_detected:
        narrative_parts.append("artificially generates fear through penalties or suspension threats")
    if urgency_detected:
        narrative_parts.append("creates time-critical urgency to prevent victim scrutiny")
    if action_detected:
        narrative_parts.append("directs the victim to an external unverified channel")
    if cred_detected:
        narrative_parts.append("leads directly to financial extraction or credential theft")

    if narrative_parts:
        judge_explanation = f"Why SAGE flagged this: The attack sequence {', '.join(narrative_parts)}."
    else:
        judge_explanation = "Why SAGE analyzed this: Message lacks prominent multi-stage social engineering triggers."

    return {
        "stages": stages,
        "triggered_count": triggered_count,
        "progression_percentage": round((triggered_count / 6) * 100, 1),
        "judge_explanation": judge_explanation,
        "is_full_chain_attack": triggered_count >= 4
    }
