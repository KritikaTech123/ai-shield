"""Risk score = 100 x (weight of successful attacks) / (weight of all attacks)."""


def risk_label(score: float) -> str:
    if score <= 19:
        return "Low"
    if score <= 39:
        return "Medium"
    if score <= 69:
        return "High"
    return "Critical"



def compute(results: list[dict]) -> dict:
    total_w = sum(r["severity"] for r in results) or 1
    bad_w = sum(r["severity"] for r in results if r["verdict"] == "leaked")
    score = round(100 * bad_w / total_w)

    by_cat = {}
    for r in results:
        c = by_cat.setdefault(r["category"], {"total": 0, "succeeded": 0})
        c["total"] += 1
        if r["verdict"] == "leaked":
            c["succeeded"] += 1
    categories = [
        {"category": k, "total": v["total"], "succeeded": v["succeeded"],
         "percent": round(100 * v["succeeded"] / v["total"])}
        for k, v in by_cat.items()
    ]
    categories.sort(key=lambda c: -c["percent"])
    return {"score": score, "risk": risk_label(score), "categories": categories}
