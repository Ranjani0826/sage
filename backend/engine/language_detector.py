import re
from typing import Dict, Any

def detect_language(text: str) -> Dict[str, Any]:
    """
    Detects language and script characteristics for SAGE:
    Supports: English, Tamil (தமிழ்), Hindi (हिंदी), Hinglish (Code-Mixed / Romanized Hindi).
    Returns detailed script breakdown and confidence.
    """
    if not text or not text.strip():
        return {
            "primary_language": "Unknown",
            "script": "None",
            "confidence": 0.0,
            "is_multilingual": False,
            "vernacular_script_detected": False,
            "detected_scripts": []
        }

    # Count character sets
    tamil_chars = len(re.findall(r'[\u0B80-\u0BFF]', text))
    hindi_chars = len(re.findall(r'[\u0900-\u097F]', text))
    latin_chars = len(re.findall(r'[a-zA-Z]', text))
    total_alpha = tamil_chars + hindi_chars + latin_chars

    if total_alpha == 0:
        return {
            "primary_language": "Symbols/Numeric",
            "script": "Numeric/Symbol",
            "confidence": 1.0,
            "is_multilingual": False,
            "vernacular_script_detected": False,
            "detected_scripts": ["Symbolic"]
        }

    # Check for Hinglish keywords (Romanized Hindi lexicon)
    hinglish_keywords = [
        "aapka", "aapke", "aaj", "kare", "karo", "hoga", "ho jayega",
        "nahi", "warna", "badhai", "rupaye", "paise", "khata", "turant",
        "parivahan", "chalan", "seva", "abhi", "kripya", "kijiye", "bheje", "milega"
    ]
    text_lower = text.lower()
    hinglish_matches = sum(1 for kw in hinglish_keywords if re.search(r'\b' + re.escape(kw) + r'\b', text_lower))

    scripts = []
    if tamil_chars > 0:
        scripts.append("Tamil")
    if hindi_chars > 0:
        scripts.append("Devanagari")
    if latin_chars > 0:
        scripts.append("Latin")

    if tamil_chars / total_alpha > 0.15:
        primary = "Tamil"
        script = "Tamil Script (தமிழ்)"
        conf = round(tamil_chars / total_alpha, 2)
        vernacular = True
    elif hindi_chars / total_alpha > 0.15:
        primary = "Hindi"
        script = "Devanagari Script (देवनागरी)"
        conf = round(hindi_chars / total_alpha, 2)
        vernacular = True
    elif hinglish_matches >= 2:
        primary = "Hinglish"
        script = "Latin (Code-Mixed Romanized)"
        conf = min(0.95, 0.65 + (hinglish_matches * 0.1))
        vernacular = True
    else:
        primary = "English"
        script = "Latin Script"
        conf = round(latin_chars / max(1, total_alpha), 2)
        vernacular = False

    return {
        "primary_language": primary,
        "script": script,
        "confidence": max(0.60, conf),
        "is_multilingual": len(scripts) > 1 or primary == "Hinglish",
        "vernacular_script_detected": vernacular,
        "detected_scripts": scripts,
        "char_breakdown": {
            "tamil_chars": tamil_chars,
            "hindi_chars": hindi_chars,
            "latin_chars": latin_chars
        }
    }
