# Demo Script Narrative Consistency Issues

## Critical Inconsistencies Found

### 1. **DAY/TIME INCONSISTENCY (Heatmap View, Line 84-87)**

**Current:**
- Points to "Tuesday 7pm" (SPF at 85-90%)
- Then jumps to "Thursday 6pm" (SPF at 88%, Big City 82%)

**Problem:** Demo starts with Tuesday, but ENTIRE rest of demo is about Thursday

**Fix:** Change Heatmap View to focus on Thursday 6pm from the start

---

### 2. **REVENUE CALCULATION METHOD INCONSISTENCY**

**OLD calculation (still in script, lines 165-168):**
```
43% gap × 7 courts × 4 players per court = 12 additional court hours
$3,600/month or $43,000 annually from ONE time slot
```

**NEW calculation (what we just implemented):**
```
(43% / 100) × 7 courts × $20/hour = $60.20 per week
$60.20 × 52 weeks = $3,130 annually from ONE hour
```

**Problem:**
- Script says "$43k annually from one time slot"
- New system calculates $60/week = $3,130/year
- That's a **14x difference**!

**Where this appears:**
- Gap Analysis section (Line 165-168)
- Backup "Revenue Model Assumptions" (Line 433-440)
- Conclusion recap (Line 357)

**Fix:** Need to either:
- A) Update script to match new calculation ($60/week, $3K/year)
- B) OR explain that $43k is across MULTIPLE hours per week (not one slot)

---

### 3. **COMPETITOR FOCUS SHIFTS**

**Thursday 6pm:**
- **Primary**: SPF Chicago (88% utilization)
- **Secondary**: Big City Pickle (82%)

**Thursday 9pm:**
- **Primary**: Big City Pickle (50%)
- SPF: Not mentioned (likely closed)

**Problem:** Narrative isn't clear about PRIMARY competitor

**Current messaging:**
- "SPF is our biggest competitor" (Line 82)
- "SPF and Big City are our targets" (Line 190, implied)
- Thursday Night targets "SPF overflow" (Line 370)
- But Thursday 9pm is "Big City at 50%" (new section we added)

**Fix:** Establish clear hierarchy:
- **6pm = SPF battle** (they're at 88%, clear leader)
- **9pm = Big City opportunity** (SPF likely closed, Big City still open)
- **Combined strategy**: Target SPF overflow at 6pm, extend to 9pm to capture Big City late-night crowd

---

### 4. **"35 CUSTOMERS" CLAIM (Opportunity List)**

**Stated:** "35 customers at Thursday 6pm"

**Question:** How does this relate to:
- 43% gap?
- $60/week revenue?
- New court-based formula?

**Current math doesn't add up:**
- 35 customers × $149/month membership = $5,215/month
- 35 customers × $25 drop-in = $875 one-time

**Need clarity:** Are these:
- A) New members (ongoing $149/mo)?
- B) Drop-in players ($25/session)?
- C) Mix of both?

**Fix:** Either recalculate "35 customers" or explain the conversion model

---

### 5. **$60-80K ANNUAL REVENUE CLAIM**

**Stated:** "We're leaving $60,000-$80,000 annual recurring revenue on the table" (Line 175)

**Question:** How is this calculated if:
- One time slot = $60/week = $3,130/year (new formula)
- Would need ~20-25 time slots to reach $60-80K
- Is this across ALL prime time (Mon-Fri 6-9pm = 15 hours/week)?

**Fix:** Show the math:
- Prime time = Mon-Fri 6-9pm = 15 hours/week
- Average gap = 30%
- 15 hours × $60/hour/week × 52 weeks = $46,800/year (close to $60-80K lower bound)
- OR be specific: "This is across 15-20 high-opportunity prime time slots"

---

## Recommended Coherent Narrative

### THURSDAY 6PM (Core Opportunity)
- **Time**: 6:00 PM
- **PCC Utilization**: 45%
- **SPF Chicago**: 88% (PRIMARY competitor, market leader)
- **Big City Pickle**: 82% (secondary)
- **Gap**: 43%
- **Revenue**: $60/week = $3,130/year from this ONE hour alone
- **Target**: SPF overflow customers (competitive players)
- **Strategy**: Thursday Competitive Night (core hours 6-8pm)

### THURSDAY 9PM (Extended Hours Opportunity)
- **Time**: 9:00 PM
- **PCC Status**: CLOSED (0%)
- **Big City Pickle**: 50% (still open, PRIMARY at this hour)
- **SPF Chicago**: Likely closed
- **Gap**: 50%
- **Revenue**: $53/week = $2,756/year from this ONE hour alone
- **Insight**: Extend Thursday Night to 9pm to capture late-night demand
- **Strategy**: Extended hours (6-9pm instead of 6-8pm)

### COMBINED INSIGHT
- **6-8pm**: Capture SPF overflow (core competitive crowd)
- **8-9pm**: Capture Big City late-night crowd (different customer segment)
- **Total Thursday revenue**: $60 (6pm) + $60 (7pm) + $60 (8pm) + $53 (9pm) = $233/week = $12,116/year **from just Thursday alone**

### PRIME TIME OVERALL
- **15 hours/week**: Mon-Fri 6-9pm
- **Average gap**: ~30%
- **Average revenue**: ~$45/hour (mix of prime $20 and regular $15 rates)
- **Total annual**: 15 hours × $45/hour × 52 weeks = **$35,100/year opportunity**
- **Conservative estimate**: $35-50K (accounts for variability)

---

## Action Items

1. **Fix Heatmap View**: Change Tuesday 7pm to Thursday 6pm
2. **Update revenue calculations**: Replace $43K with new formula throughout
3. **Clarify competitor focus**: SPF = 6pm, Big City = 9pm
4. **Validate "35 customers"**: Recalculate or remove
5. **Fix $60-80K claim**: Either recalculate to $35-50K OR show full math
6. **Update Backup sections**: Revenue Model Assumptions needs new formula

---

## Key Decision: Which Calculation to Use?

**Option A: Use NEW formula (conservative)**
- ONE hour = $60/week = $3,130/year
- Thursday 6-9pm = $233/week = $12,116/year
- All prime time = $35-50K/year
- **Pro**: Matches actual system calculation
- **Con**: Lower numbers, less impressive

**Option B: Use hybrid (OLD + NEW)**
- Explain OLD calculation is "customer capture model" ($43K if we convert customers to members)
- NEW calculation is "incremental hourly revenue" ($3K/year per hour)
- Both are valid, different lenses
- **Pro**: Can use bigger number ($43K) with justification
- **Con**: Confusing, might seem like backpedaling

**Recommendation**: Use Option A (NEW formula only) for consistency with the actual system Christy will see.
