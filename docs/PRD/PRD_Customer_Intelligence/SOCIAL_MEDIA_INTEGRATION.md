# Social Media Management Tool Integration Strategy

**Document Version**: 1.0
**Last Updated**: 2025-10-09
**Audience**: Product Team, Developers
**Purpose**: Define integration between operations social media tool and Customer Intelligence Center

---

## Executive Summary

The PCC operations team requires a social media management tool for daily posting and content scheduling across Instagram, Facebook, and TikTok. This document outlines the recommended tool and its integration with the Customer Intelligence Center's Feature 2.4 (Social Signal Enrichment).

**Key Decision**: Recommend **Metricool** as the social media management platform for PCC operations.

**Integration Goal**: Leverage social media engagement data from Metricool to enrich customer segments and improve confidence scoring in the Customer Intelligence Center.

---

## 1. Social Media Tool Recommendation

### 1.1 Tool Selection: Metricool

**Recommendation**: **Metricool Advanced Plan** ($45/month)

**Rationale**:
- **Affordable for small business**: $45/mo vs Hootsuite Professional ($99/mo) or Sprout Social Standard ($249/mo)
- **Multi-platform support**: Instagram, Facebook, TikTok, LinkedIn, Twitter
- **Visual content planning**: Critical for pickleball club visual content (court photos, event highlights)
- **API access**: Advanced plan includes API for data export
- **Analytics dashboard**: Built-in engagement metrics and member interaction tracking
- **Zapier integration**: Alternative to direct API for easier setup

**Alternative Options Considered**:
- **Buffer** ($6/channel/mo): Too basic, limited analytics, no API on low tiers
- **Later** ($25/mo): Good for Instagram but weaker multi-platform support
- **Hootsuite** ($99/mo): Over-budget for small club operations
- **Sprout Social** ($249/mo): Enterprise-level pricing, unnecessary features

### 1.2 Metricool Capabilities Aligned with PCC Needs

| PCC Requirement | Metricool Feature |
|-----------------|-------------------|
| Schedule Instagram posts | Visual planner with drag-and-drop calendar |
| Facebook event promotion | Multi-platform publishing to Facebook Pages |
| TikTok content | TikTok integration (Advanced plan) |
| Member engagement tracking | Comment/mention monitoring dashboard |
| Content performance | Post analytics with engagement metrics |
| Team collaboration | Multi-user access (3 team members on Advanced) |

### 1.3 Pricing Structure

**Recommended Plan**: Advanced
**Cost**: $45/month (annual billing) or $54/month (monthly billing)
**Features**:
- 10 social media brands
- 3 team members
- API access
- Zapier integration
- Advanced analytics
- Comment management
- Post scheduling across all platforms

**Budget Impact**: ~$540-648/year operational expense for social media management

---

## 2. Integration Architecture

### 2.1 Integration Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PCC Operations Workflow                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Metricool                             │
│  - Post scheduling (Instagram, Facebook, TikTok)             │
│  - Member engagement tracking (@mentions, comments)          │
│  - Event promotion                                           │
│  - Visual content calendar                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API or Zapier Export
                              ▼
┌─────────────────────────────────────────────────────────────┐
│             Customer Intelligence Center                     │
│  Feature 2.4: Social Signal Enrichment                       │
│  - Import member engagement data                             │
│  - Map @mentions → customer profiles                         │
│  - Update confidence scores                                  │
│  - Identify "Social Ambassador" segment                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              customer-segments.json                          │
│  Enhanced with social engagement indicators                  │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

**Phase 1: Manual Export (MVP - Sprint 5)**
1. PCC operations team uses Metricool for daily social media posting
2. Monthly: Export engagement report from Metricool analytics
3. Developer imports CSV into enrichment script
4. Script matches Instagram/Facebook handles to customer profiles
5. Updates `customer-segments.json` with social indicators

**Phase 2: Automated Integration (Future Enhancement)**
1. Metricool API webhook triggers on new engagement events
2. Zapier catches webhook and sends to PCC backend
3. Enrichment service matches social handles to customer emails
4. Real-time updates to confidence scores
5. Dashboard reflects social engagement within 24 hours

### 2.3 Technical Integration Points

**Integration Method**: Zapier (recommended for MVP)

**Why Zapier over Direct API**:
- Faster setup (~2 hours vs 2-3 days development)
- No authentication/OAuth complexity
- Built-in error handling and retry logic
- PCC team can modify without developer
- Lower maintenance burden

**Zapier Workflow**:
```
Trigger: New mention/comment in Metricool
  ↓
Filter: Only @pcc_chicago tagged posts
  ↓
Action: Send to Google Sheets or Webhook
  ↓
Monthly: Developer exports sheet → enrichment script
```

**Alternative: Direct API Integration** (if Zapier insufficient)
- Metricool API endpoint: `GET /analytics/engagement`
- Authentication: API key (included in Advanced plan)
- Rate limit: 100 requests/hour
- Response format: JSON with member handles, engagement counts

---

## 3. Updated Feature 2.4 Specification

### 3.1 Original Feature 2.4 (from PRD)

**Feature 2.4: Social Signal Enrichment**
- **Description**: Track member social media engagement (Instagram posts with @pcc_chicago, Facebook event RSVPs)
- **Data Source**: Manual scraping or social media APIs
- **Output**: Social activity indicators in customer profiles

### 3.2 Revised Feature 2.4 (with Metricool Integration)

**Feature 2.4: Social Signal Enrichment via Metricool**

**Description**: Leverage Metricool analytics to enrich customer profiles with social engagement data, identifying "Social Ambassador" segment and improving confidence scoring.

**Data Sources**:
1. **Primary**: Metricool API/Zapier export (automated)
2. **Fallback**: Metricool CSV export (manual monthly process)

**Social Signals Tracked**:
- Instagram @mentions of @pcc_chicago
- Comments on PCC posts (name matching)
- Facebook event RSVPs
- Post shares/saves (high engagement indicator)
- User-generated content (members posting from PCC courts)

**Mapping Logic**:
```javascript
// Match Metricool engagement data to customer profiles
{
  "instagram_handle": "@john_pickleball",
  "engagement_count": 8,        // mentions in last 90 days
  "ugc_posts": 3,                // user-generated content
  "last_engagement": "2025-09-15"
}
  ↓
Match to customer profile (by handle → email lookup)
  ↓
{
  "customer_id": "cust_12345",
  "name": "John Smith",
  "email": "john@example.com",
  "social_signals": {
    "instagram_handle": "@john_pickleball",
    "engagement_score": 8,      // → HIGH indicator for Social Ambassador
    "last_activity": "2025-09-15"
  }
}
```

**Confidence Score Impact**:
- **High engagement** (5+ mentions in 90 days): +15 points to Social Ambassador confidence
- **Medium engagement** (2-4 mentions): +8 points
- **Low engagement** (1 mention): +3 points
- **User-generated content**: +10 bonus points per post

**Updated Customer Segments**:
- **Social Ambassadors**: Confidence score now includes social engagement weight (20% of total score)
  - Example: Member with 8+ Instagram mentions → 85% confidence Social Ambassador

---

## 4. Implementation Plan

### 4.1 Sprint 5 Additions (Metricool Integration MVP)

**Epic 2: Best Practice Research Engine** → Add new user story:

**User Story 2.4.1**: Social Media Tool Setup
- **As a**: PCC operations team member
- **I want to**: Use Metricool to schedule and track social media posts
- **So that**: We have a centralized platform for Instagram, Facebook, and TikTok content

**Acceptance Criteria**:
- [ ] Metricool Advanced account created and configured
- [ ] PCC Instagram, Facebook, TikTok accounts connected
- [ ] 3 team members granted access
- [ ] Sample post scheduled across all platforms
- [ ] API key generated for future integration

**Tasks**:
1. Purchase Metricool Advanced plan ($45/mo) - *1 hour*
2. Connect social media accounts - *1 hour*
3. Add team members and set permissions - *0.5 hours*
4. Create sample content calendar (1 week) - *2 hours*
5. Generate API key and document in .env.example - *0.5 hours*

**Effort Estimate**: 5 hours (non-developer task, operations team)

---

**User Story 2.4.2**: Manual Social Enrichment Script
- **As a**: Developer
- **I want to**: Import Metricool engagement data into customer profiles
- **So that**: We can identify Social Ambassador segment members

**Acceptance Criteria**:
- [ ] Script accepts Metricool CSV export as input
- [ ] Matches Instagram/Facebook handles to customer emails
- [ ] Updates `customer-segments.json` with social indicators
- [ ] Logs unmatched handles for manual review
- [ ] Calculates social engagement confidence scores

**Tasks**:
1. Create `scripts/enrich-social-data.js` - *3 hours*
2. Build handle → email matching logic - *4 hours*
3. Implement confidence score calculation - *2 hours*
4. Add CSV parsing and validation - *2 hours*
5. Write tests for matching accuracy - *3 hours*
6. Document usage in README - *1 hour*

**Effort Estimate**: 15 hours

**Technical Details**:
```javascript
// scripts/enrich-social-data.js
const fs = require('fs');
const csv = require('csv-parser');

// Input: Metricool CSV export with columns:
// username, engagement_type, post_url, timestamp
async function enrichSocialData(csvPath, customersPath) {
  const engagementData = await parseMetricoolCSV(csvPath);
  const customers = JSON.parse(fs.readFileSync(customersPath));

  // Match handles to customers
  const handleToEmail = buildHandleIndex(customers);

  engagementData.forEach(engagement => {
    const email = handleToEmail[engagement.username];
    if (email) {
      updateCustomerSocialSignals(customers, email, engagement);
    } else {
      logUnmatchedHandle(engagement.username);
    }
  });

  // Recalculate confidence scores with social weight
  customers.forEach(customer => {
    customer.segments.forEach(segment => {
      if (segment.name === 'Social Ambassadors') {
        segment.confidence = calculateSocialConfidence(customer);
      }
    });
  });

  fs.writeFileSync(customersPath, JSON.stringify(customers, null, 2));
}
```

---

### 4.2 Future Enhancements (Post-MVP)

**Phase 2.5: Automated Zapier Integration** (Sprint 8-9)
- Set up Zapier trigger for new Metricool engagement
- Create Google Sheets buffer for staging data
- Weekly automated script run to import sheet → customer-segments.json
- Estimated effort: 8-10 hours

**Phase 3.2: Real-time API Integration** (Sprint 12+)
- Direct Metricool API integration (bypass Zapier)
- Webhook receiver for real-time engagement events
- Automated handle → email matching service
- Dashboard widget showing live social engagement
- Estimated effort: 40-50 hours

---

## 5. Data Schema Updates

### 5.1 customer-segments.json Enhancement

**Add new field to customer objects**:
```json
{
  "customer_id": "cust_12345",
  "name": "John Smith",
  "email": "john@example.com",
  "social_signals": {
    "instagram_handle": "@john_pickleball",
    "facebook_handle": "john.smith.123",
    "engagement_score": 8,
    "engagement_breakdown": {
      "mentions": 5,
      "comments": 2,
      "ugc_posts": 1
    },
    "last_engagement_date": "2025-09-15",
    "data_source": "metricool",
    "last_updated": "2025-10-01"
  },
  "segments": [
    {
      "name": "Social Ambassadors",
      "confidence": 0.85,
      "confidence_breakdown": {
        "booking_behavior": 0.60,
        "jtbd_survey": 0.70,
        "social_signals": 0.95,  // ← HIGH due to Metricool data
        "demographics": 0.50,
        "linkedin": 0.40,
        "composite": 0.85
      }
    }
  ]
}
```

### 5.2 New Configuration File: metricool-config.json

**Path**: `src/data/metricool-config.json`

```json
{
  "api_key": "ENV:METRICOOL_API_KEY",
  "account_id": "pcc_chicago",
  "platforms": ["instagram", "facebook", "tiktok"],
  "engagement_tracking": {
    "mentions": true,
    "comments": true,
    "shares": true,
    "ugc_detection": true
  },
  "confidence_weights": {
    "high_engagement_threshold": 5,
    "high_engagement_boost": 15,
    "medium_engagement_boost": 8,
    "low_engagement_boost": 3,
    "ugc_bonus_per_post": 10
  },
  "sync_frequency": "weekly",
  "last_sync": null
}
```

---

## 6. Cost-Benefit Analysis

### 6.1 Costs

**Direct Costs**:
- Metricool Advanced: $45/month = **$540/year**
- Developer time (Sprint 5): 15 hours × $100/hr = **$1,500 one-time**

**Total Year 1 Cost**: $2,040

### 6.2 Benefits

**Operational Benefits**:
- Centralized social media management (saves ~5 hours/week for operations team)
- Professional content calendar and scheduling
- Member engagement tracking (identify brand advocates)

**Customer Intelligence Benefits**:
- Improved Social Ambassador segment accuracy (+20% confidence from social data)
- Identify high-value members for referral programs
- Track community sentiment and brand perception

**ROI Calculation**:
- Operations time saved: 5 hrs/week × 52 weeks × $30/hr = **$7,800/year**
- Improved targeting (assume 10% yield increase from Social Ambassadors): **$2,000-5,000/year**
- **Total ROI**: 350-600% in Year 1

---

## 7. Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Metricool API changes/deprecation | High | Low | Use Zapier as abstraction layer; maintain CSV export fallback |
| Low handle → email match rate | Medium | Medium | Prompt members to link social handles during booking; manual review process |
| Operations team adoption resistance | Medium | Low | Provide training session; emphasize time savings |
| Data privacy concerns (tracking member social) | Low | Low | Only track public @mentions; document in privacy policy |
| Metricool pricing increase | Low | Medium | Lock in annual billing; evaluate alternatives yearly |

---

## 8. Success Metrics

**Operations Team Metrics**:
- Time spent on social media management: Target <5 hours/week (from current ~10 hours)
- Post consistency: Target 5+ posts/week across platforms
- Team satisfaction: Target 4.5/5 in quarterly survey

**Customer Intelligence Metrics**:
- Handle → email match rate: Target >60% in first month, >80% by month 3
- Social Ambassador segment size: Expect 50-100 members identified (15-20% of active base)
- Confidence score improvement: Target +15 points average for identified ambassadors

**Business Impact Metrics**:
- Referral rate from Social Ambassadors: Track 10% increase in Q1 2026
- Social engagement rate: Target 3-5% engagement rate on posts
- User-generated content: Target 10+ member posts/month featuring PCC

---

## 9. Next Steps

### Immediate Actions (Week 1)
1. **Purchase Metricool Advanced plan** - Operations Team Lead
2. **Connect social media accounts** - Operations Team
3. **Generate API key** - Operations Team → share with Dev Team
4. **Kickoff Sprint 5 User Story 2.4.2** - Assign to developer

### Sprint 5 Deliverables
1. Metricool fully operational for daily posting
2. `scripts/enrich-social-data.js` completed and tested
3. First manual enrichment run completed
4. Documentation updated in README

### Post-Sprint 5 Review
1. Evaluate handle → email match rate
2. Review Social Ambassador segment confidence scores
3. Decide on Zapier automation timeline (Sprint 8-9)
4. Plan Phase 2 real-time integration (if needed)

---

## 10. Related Documents

- **[PRD_Customer_Intelligence_Center_v2.md]**: Original Feature 2.4 specification
- **[TECHNICAL_SPEC_Customer_Intelligence.md]**: Technical architecture for enrichment pipeline
- **[EPICS_AND_SPRINTS.md]**: Sprint 5 task breakdown for social enrichment
- **[FUNCTIONAL_SPEC_Customer_Intelligence.md]**: Social signal enrichment functional requirements

---

## Appendix A: Metricool vs Competitors

| Feature | Metricool Advanced | Buffer Essentials | Hootsuite Professional | Sprout Social Standard |
|---------|-------------------|-------------------|----------------------|------------------------|
| **Price** | $45/mo | $6/channel | $99/mo | $249/mo |
| **API Access** | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| **Instagram** | ✅ Full | ✅ Basic | ✅ Full | ✅ Full |
| **Facebook** | ✅ Full | ✅ Basic | ✅ Full | ✅ Full |
| **TikTok** | ✅ Full | ❌ No | ✅ Limited | ✅ Full |
| **Analytics** | ✅ Advanced | ⚠️ Basic | ✅ Advanced | ✅ Advanced |
| **Team Members** | 3 | 1 | 10 | 10 |
| **Zapier** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Best For** | **Small business** | Individuals | Mid-size | Enterprise |

**Winner for PCC**: Metricool (best value for small club with API needs)

---

## Appendix B: Sample Metricool Export

**CSV Format** (from Metricool Analytics):
```csv
username,engagement_type,platform,post_url,timestamp
@john_pickleball,mention,instagram,https://instagram.com/p/abc123,2025-09-15 14:23:00
@sarah_smash,comment,instagram,https://instagram.com/p/def456,2025-09-14 09:12:00
john.smith.123,event_rsvp,facebook,https://facebook.com/events/789,2025-09-13 18:45:00
```

**Enrichment Script Input**:
- Read CSV
- Match `username` → customer email via lookup table
- Count engagements by type
- Calculate confidence boost

**Output**: Updated `customer-segments.json` with social_signals populated
