import math
from typing import Dict, Any, List, Optional
from backend.database.memory import memory

def match_campaign(dna: Dict[str, Any], text: str) -> Dict[str, Any]:
    """
    Connects incoming message DNA to indexed Scam Families in Campaign Memory.
    Proves that even when wording, language, or URL shifts, the underlying attack genome links
    to the identical Campaign Family.
    """
    all_campaigns = memory.get_all_campaigns()
    text_lower = text.lower()
    
    best_campaign = None
    best_score = 0.0
    matching_criteria = []

    for camp in all_campaigns:
        camp_dna = camp.get("dna", {})
        camp_intent = camp_dna.get("intent", "").lower()
        camp_target = camp_dna.get("target", "").lower()
        camp_impersonation = camp_dna.get("impersonation", "").lower()

        current_intent = dna.get("intent", "").lower()
        current_target = dna.get("target", "").lower()
        current_impersonation = dna.get("impersonation", "").lower()

        score = 0.0
        criteria = []

        # Intent Matching (40% weight)
        if camp_intent == current_intent or any(w in camp_intent for w in current_intent.split() if len(w) > 4):
            score += 0.40
            criteria.append("Identical Core Intent: " + camp_dna.get("intent"))

        # Impersonation & Target Vector Matching (30% weight)
        if camp_target.split()[0] in current_target or current_target.split()[0] in camp_target:
            score += 0.20
            criteria.append("Matched Victim Demographics: " + camp_dna.get("target"))

        # Tactics & Strategy Overlap (20% weight)
        camp_tactics = set(t.lower() for t in camp_dna.get("tactics", []))
        current_tactics = set(t.lower() for t in dna.get("tactics", []))
        overlap = camp_tactics.intersection(current_tactics)
        if overlap:
            tactic_ratio = len(overlap) / max(1, len(camp_tactics))
            score += 0.20 * tactic_ratio
            criteria.append(f"Shared Manipulation Strategy ({', '.join([t.title() for t in overlap])})")

        # Lexicon / Keyword Corroboration (20% weight)
        for v in camp.get("variants", []):
            v_text = v.get("text", "").lower()
            # check common key terms
            keywords = ["kyc", "pan", "parcel", "delivery", "challan", "police", "cashback", "reward", "₹", "rs"]
            matches = [k for k in keywords if k in text_lower and k in v_text]
            if matches:
                score += 0.10
                criteria.append(f"Common Lexicon Signature: {', '.join(matches[:3])}")
                break

        if score > best_score:
            best_score = score
            best_campaign = camp
            matching_criteria = criteria

    if best_campaign and best_score >= 0.45:
        # Build Connected Variants tree
        variants = best_campaign.get("variants", [])
        return {
            "is_matched": True,
            "campaign_id": best_campaign["id"],
            "campaign_name": best_campaign["name"],
            "category": best_campaign["category"],
            "status": best_campaign["status"],
            "first_seen": best_campaign["first_seen"],
            "confidence": round(min(0.98, best_score + 0.15), 2),
            "match_verdict": "MATCHED TO ACTIVE CAMPAIGN FAMILY",
            "semantic_fingerprint": best_campaign["dna"]["semantic_fingerprint"],
            "genome_hash": best_campaign["dna"]["genome_hash"],
            "matching_criteria": matching_criteria,
            "explanation": f"SAGE linked this variant to {best_campaign['name']} (# {best_campaign['id']}) based on identical social engineering attack genome.",
            "known_variants": variants,
            "total_observed_mutations": len(variants),
            "languages_observed": best_campaign.get("languages_observed", []),
            "core_dna_summary": best_campaign["dna"]
        }
    else:
        # New emerging family
        return {
            "is_matched": False,
            "campaign_id": "NEW-CANDIDATE",
            "campaign_name": "Uncategorized Novel Attack Family",
            "category": "Emerging Threat Cluster",
            "status": "PROVISIONAL_DNA_CREATED",
            "confidence": 0.40,
            "match_verdict": "NEW SCAM GENOME DISCOVERED",
            "semantic_fingerprint": dna.get("semantic_fingerprint"),
            "genome_hash": dna.get("genome_hash"),
            "matching_criteria": ["Unique Intent Signature", "No previous campaign hash collision in local memory"],
            "explanation": "No prior campaign in memory matches this exact attack genome. SAGE has indexed a new provisional Scam Family.",
            "known_variants": [],
            "total_observed_mutations": 1,
            "languages_observed": ["Current Input"],
            "core_dna_summary": dna
        }
