from typing import Dict, Any, List

def calculate_risk(
    text: str,
    dna: Dict[str, Any],
    attack_path: Dict[str, Any],
    url_analysis: List[Dict[str, Any]],
    is_known_family_match: bool
) -> Dict[str, Any]:
    """
    Calculates a transparent, explainable prototype risk score (0-100) based on detected signals.
    Evaluates:
    - Impersonation level (+20)
    - Fear / Loss aversion (+20)
    - Artificial Urgency (+15)
    - Suspicious / Obfuscated URL (+25)
    - Credential / OTP / PIN request (+25)
    - Known Scam Family Genome Match (+20)
    - Attack Path Progression Stage Depth (+10)
    """
    score = 0
    factors = []

    tactics = dna.get("tactics", [])
    
    # 1. Impersonation
    if dna.get("impersonation") and "Unverified" not in dna.get("impersonation", ""):
        score += 20
        factors.append({
            "signal": "Institutional Impersonation",
            "points": 20,
            "detail": f"Spoofs identity of '{dna.get('impersonation')}'"
        })

    # 2. Urgency & Fear tactics
    if "Fear" in tactics:
        score += 15
        factors.append({
            "signal": "Fear & Loss Aversion",
            "points": 15,
            "detail": "Leverages coercive penalties or account deactivation"
        })
    if "Urgency" in tactics:
        score += 15
        factors.append({
            "signal": "High Urgency Coercion",
            "points": 15,
            "detail": "Forces rapid action within compressed time constraint"
        })

    # 3. Credential & Financial Ask
    financial_ask = dna.get("financial_ask", "")
    if any(k in financial_ask.lower() for k in ["otp", "pin", "credential", "password", "card", "fee", "deposit"]):
        score += 25
        factors.append({
            "signal": "Credential / Financial Extraction",
            "points": 25,
            "detail": f"Direct request for sensitive data or payment: {financial_ask}"
        })

    # 4. Suspicious URL / Infrastructure
    if url_analysis:
        url_threat_sum = max(u.get("simulated_threat_score", 0) for u in url_analysis)
        if url_threat_sum >= 40:
            score += 25
            factors.append({
                "signal": "Deceptive URL Infrastructure",
                "points": 25,
                "detail": f"Target domain matches phishing pattern ({url_analysis[0].get('domain')})"
            })

    # 5. Attack Path Completeness
    progression = attack_path.get("progression_percentage", 0)
    if progression >= 60:
        score += 10
        factors.append({
            "signal": "Advanced Attack Path Execution",
            "points": 10,
            "detail": f"Multi-stage psychological manipulation chain completed ({progression}%)"
        })

    # 6. Known Scam Family Match
    if is_known_family_match:
        score += 15
        factors.append({
            "signal": "Campaign Memory Vector Match",
            "points": 15,
            "detail": "Correlates directly with cataloged Scam DNA genome"
        })

    # Clamp score between 5 and 99 for realism
    final_score = min(98, max(12, score))

    if final_score >= 75:
        risk_level = "CRITICAL"
        recommended_action = "BLOCK"
        action_reason = "Critical threat detected. Message matches an active phishing genome with credential extraction and coercive urgency."
        badge_color = "rose"
    elif final_score >= 50:
        risk_level = "HIGH"
        recommended_action = "BLOCK"
        action_reason = "High threat level. Contains deceptive links or institutional spoofing with financial risk."
        badge_color = "amber"
    elif final_score >= 30:
        risk_level = "MEDIUM"
        recommended_action = "WARN"
        action_reason = "Moderate risk. Unverified sender request with commercial or generic urgency."
        badge_color = "yellow"
    else:
        risk_level = "LOW"
        recommended_action = "ALLOW / REVIEW"
        action_reason = "Low risk signals. No critical social engineering or phishing payloads identified."
        badge_color = "emerald"

    return {
        "risk_level": risk_level,
        "risk_score": final_score,
        "recommended_action": recommended_action,
        "action_reason": action_reason,
        "badge_color": badge_color,
        "evaluated_factors": factors,
        "calculation_transparency": {
            "methodology": "Transparent Rule & Signal Accumulator (Prototype Engine)",
            "max_possible": 120,
            "raw_accumulated": score,
            "normalized_score": final_score
        }
    }
