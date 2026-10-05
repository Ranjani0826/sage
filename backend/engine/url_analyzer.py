import re
from urllib.parse import urlparse
from typing import Dict, Any, List, Optional

def extract_urls(text: str) -> List[str]:
    """Extracts all HTTP/HTTPS and bare domain URLs from text."""
    url_pattern = r'(https?://[^\s<>"]+|www\.[^\s<>"]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:/[^\s<>"]*)?)'
    matches = re.findall(url_pattern, text)
    valid_urls = []
    for m in matches:
        m_clean = m.rstrip('.,;:)!?"\'')
        if "." in m_clean and len(m_clean) > 4:
            valid_urls.append(m_clean)
    return valid_urls

def analyze_url(url: str) -> Dict[str, Any]:
    """
    Analyzes URL structure, typosquatting, suspicious keywords, TLD risk, and demo signals.
    Note: Uses simulated cyber intelligence markers labeled as Demo Signal.
    """
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "https://" + url

    try:
        parsed = urlparse(url)
        domain = parsed.netloc.lower()
        path = parsed.path
        is_https = parsed.scheme == "https"
    except Exception:
        domain = url.lower()
        path = ""
        is_https = False

    # Suspicious keywords
    phish_keywords = [
        "kyc", "verify", "update", "bank", "sbi", "hdfc", "icici", "pan", "aadhaar",
        "redelivery", "courier", "postal", "parivahan", "challan", "reward", "cashback",
        "claim", "refund", "login", "secure", "auth", "otp", "apk", "pay"
    ]
    matched_keywords = [kw for kw in phish_keywords if kw in domain or kw in path.lower()]

    # Typosquatting / Obfuscation indicators
    has_hyphens = domain.count("-") >= 2
    has_subdomain_abuse = domain.count(".") >= 3
    is_ip_address = bool(re.match(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$', domain))
    is_shortener = any(s in domain for s in ["bit.ly", "tinyurl.com", "t.co", "is.gd", "bit-ly", "cutt.ly"])
    is_demo_test_tld = domain.endswith(".test") or ".test" in domain

    # Simulated registrar and DNS signals (Prototype Demo Signal)
    suspicious_score = 0
    risk_factors = []

    if not is_https:
        suspicious_score += 25
        risk_factors.append("Insecure HTTP protocol (No TLS encryption)")

    if len(matched_keywords) >= 2:
        suspicious_score += 35
        risk_factors.append(f"High-risk brand/action keyword stacking: {', '.join(matched_keywords)}")
    elif len(matched_keywords) == 1:
        suspicious_score += 20
        risk_factors.append(f"Suspicious intent keyword detected: {matched_keywords[0]}")

    if has_hyphens:
        suspicious_score += 15
        risk_factors.append("Multi-hyphenated deceptive domain structure")

    if has_subdomain_abuse:
        suspicious_score += 20
        risk_factors.append("Deep sub-domain brand masking (subdomain camouflage)")

    if is_ip_address:
        suspicious_score += 40
        risk_factors.append("Direct IP address host without registered domain name")

    if is_shortener:
        suspicious_score += 25
        risk_factors.append("URL shortener obfuscating destination target")

    if is_demo_test_tld:
        risk_factors.append("Simulated .test domain environment (Safe Prototype)")

    reputation = "SUSPICIOUS / MALICIOUS (Demo Signal)" if suspicious_score >= 40 else "NEUTRAL / UNKNOWN"
    if suspicious_score >= 60:
        reputation = "HIGH-RISK PHISHING PHANTOM (Demo Signal)"

    return {
        "raw_url": url,
        "domain": domain,
        "path": path,
        "is_https": is_https,
        "matched_keywords": matched_keywords,
        "risk_factors": risk_factors,
        "obfuscation_detected": has_hyphens or has_subdomain_abuse or is_shortener or is_ip_address,
        "simulated_threat_score": min(98, suspicious_score + 10 if matched_keywords else 15),
        "threat_classification": reputation,
        "is_demo_environment": True,
        "telemetry": {
            "dns_resolution": "Simulated Safe Mock (192.0.2.1)",
            "hosting_asn": "AS-99201 Cloud Proxy [Simulated]",
            "ssl_issuer": "Let's Encrypt / Ephemeral Cert [Simulated]" if is_https else "None",
            "first_registered": "2 days ago (Rapid Disposable Infrastructure) [Simulated]"
        }
    }
