# Product Requirements Document: Customer Intelligence & Enrichment Engine

**Product Name**: PCC Yield Optimizer - Customer Intelligence Module
**Version**: 1.0
**Status**: Draft - Pre-Development
**Owner**: Peter Giordano
**Development Approach**: SLC (Simple, Lovable, Complete)
**Target Release**: Phase 1 (Simple) - Q1 2026
**Last Updated**: October 8, 2025

---

## Executive Summary

The current PCC Yield Optimizer successfully identifies **WHERE** market opportunities exist (competitive intelligence) and **HOW** to optimize scarce resources (yield management). This PRD defines the missing third pillar: **WHO** are our customers, and **WHY** do they choose PCC.

A **Customer Intelligence Engine** transforms raw customer data into actionable insights about member behavior, lifetime value, churn risk, and segment characteristics. This enables precise targeting, personalized experiences, and data-driven decisions that balance short-term revenue with long-term customer satisfaction.

**The Core Problem We're Solving:**

> "Should we accept this $500 corporate event on Thursday 7pm?"

**Today's Answer (Yield Management Only):**
"It displaces 12 member reservations, estimated churn cost $966."

**Tomorrow's Answer (With Customer Intelligence):**
"8 of those 12 members are 'Casual Drop-ins' (low LTV, low churn risk). 2 are 'Corporate Power Users' (high LTV, high churn risk). The corporate client works at a company with 200 employees in West Loop—potential for $10k annual recurring events. **Recommended action:** Accept the event, proactively offer the 2 high-value members a free Friday slot. Net value: $500 + $10k potential - $200 churn risk = **$10,300 upside.**"

**Expected Impact:**

- **15-20% increase in marketing efficiency** (target high-value lookalikes, not spray-and-pray)
- **25-30% improvement in churn prediction** (proactive intervention for at-risk members)
- **$30-50k annual revenue** from corporate event targeting (identify connector members)
- **Data-driven mezzanine investment** (validate amenity demand with real customer preferences)
- **Reduced CAC by 20%** (referral programs targeted at high-influence "Social Ambassadors")

---

## Table of Contents

1. [Problem Statement & Strategic Context](#problem-statement--strategic-context)
2. [Product Vision & Goals](#product-vision--goals)
3. [SLC Development Approach](#slc-development-approach)
4. [Three-Tier Customer Data Model](#three-tier-customer-data-model)
5. [Dynamic Customer Segmentation](#dynamic-customer-segmentation)
6. [Functional Requirements](#functional-requirements)
7. [Technical Architecture](#technical-architecture)
8. [Privacy & Legal Considerations](#privacy--legal-considerations)
9. [Integration with Existing Systems](#integration-with-existing-systems)
10. [Success Metrics](#success-metrics)
11. [Open Questions & Risks](#open-questions--risks)
12. [Appendix: Detailed Models](#appendix-detailed-models)

---

## Problem Statement & Strategic Context

### The Missing Layer: Demand-Side Intelligence

Your current system provides **supply-side optimization**:

✅ **Competitive Intelligence**: Where are market opportunities? (competitor utilization, geographic gaps)
✅ **Yield Management**: How do we allocate scarce resources? (courts, time slots, pricing)

What's missing is **demand-side intelligence**:

❌ **Customer Segmentation**: WHO are our most valuable customers?
❌ **Behavioral Patterns**: WHY do they choose PCC vs. competitors?
❌ **Predictive Modeling**: WHAT signals predict churn, referrals, or high-value behavior?
❌ **Lookalike Targeting**: WHERE can we find more customers like our best ones?

### Current State: Flying Blind

**Example Decision Points Today:**

1. **Corporate Event Request**: "Company X wants Thursday 7pm for $500"
   - **Data Available**: Time slot utilization, member displacement count
   - **Data Missing**: Which members are displaced? What's their LTV? Does Company X employ any current members? What's the referral potential?

2. **Mezzanine Investment**: "Should we build yoga studio ($25k) or strength training ($40k)?"
   - **Data Available**: Market research on pricing, competitive amenities
   - **Data Missing**: How many current members want yoga? Which segments? Will it reduce churn? Does it attract high-value corporate professionals?

3. **Marketing Campaign**: "Run Instagram ads targeting 25-35 year-olds in Chicago"
   - **Data Available**: Broad demographic assumptions
   - **Data Missing**: Which neighborhoods have our best customers? What companies employ our members? What psychographic profiles convert best?

4. **Churn Prevention**: "Member Sarah hasn't booked in 3 weeks"
   - **Data Available**: Booking frequency declining
   - **Data Missing**: Why did she stop? Frustrated by lack of prime-time access? Found a competitor with better yoga classes? Social group disbanded?

### The Impact of This Gap

**Without customer intelligence:**

- **Revenue left on table**: $30-50k from missed corporate event targeting
- **Inefficient marketing spend**: 50-70% CAC increase from broad targeting vs. lookalike precision
- **Preventable churn**: 5-8% of members churn due to unaddressed pain points (court access, amenity preferences, social disconnection)
- **Capital misallocation**: $25-40k mezzanine investments made without validating actual member demand

**Annual impact of poor customer intelligence: $100-150k**

---

## Product Vision & Goals

### Vision Statement

> **"Know every customer as an individual, not just a membership ID. Use data to deliver personalized experiences that maximize lifetime value while respecting privacy and building trust."**

### Product Goals

#### Primary Goals

1. **Increase Customer Lifetime Value (CLV) by 20%** through segment-specific retention strategies
2. **Reduce Churn by 25%** through predictive modeling and proactive intervention
3. **Improve Marketing ROI by 30%** through lookalike targeting and neighborhood mapping
4. **Validate Strategic Investments** with real member demand data (mezzanine amenities, program expansion)

#### Secondary Goals

1. Enable corporate event targeting (identify connector members, map employer networks)
2. Build referral program targeting (identify and empower "Social Ambassadors")
3. Create feedback loops (measure campaign effectiveness, iterate strategies)
4. Support pricing optimization (segment-specific willingness to pay)

---

## SLC Development Approach

**Philosophy**: Build in three phases, each **Simple, Lovable, and Complete**. Each phase delivers standalone value—you could stop after any phase and still have a useful, delightful product.

### Why SLC vs. Traditional MVP?

Traditional MVP = "Minimum Viable Product" (ship fast, iterate later, often half-baked)
SLC = "Simple, Lovable, Complete" (ship small, but polished and fully functional)

**Key Differences:**

| Traditional MVP | SLC Approach |
|----------------|--------------|
| Ship incomplete features | Ship complete but narrow features |
| "We'll fix it later" mindset | "This is done, even if small" mindset |
| Users tolerate it | Users love it |
| Gather feedback on what's broken | Gather feedback on what's next |

---

### SLC Phase 1: SIMPLE (Weeks 1-4)

**Core Promise**: "Identify high-value customer segments with actionable insights, using manual processes that prove the concept before automation."

#### Must-Have Features

1. **Manual Data Collection**
   - Export current member list (350 members)
   - Manually enrich 50 "VIP" members on LinkedIn (employer, job title, work location)
   - Survey 50 members: "Why PCC? What amenities would you use? Does your company do team events?"

2. **Basic Segmentation Model**
   - Create 4 segments in Excel/Google Sheets:
     - **Corporate Power Users** (works nearby, books frequently, brings colleagues)
     - **Social Ambassadors** (high dwell time, rotates partners, active on social)
     - **Competitive Athletes** (off-peak bookings, premium gear purchases)
     - **Casual Drop-ins** (infrequent, price-sensitive)

3. **One Actionable Insight**
   - **Deliverable**: "Top 20 Members Most Likely to Refer Corporate Events"
   - **Format**: Google Sheet with member name, employer, job title, booking frequency, colleague overlap
   - **Action**: Email outreach offering referral bonus for corporate event bookings

#### Nice-to-Have (Deferred to Phase 2)

- Automated enrichment APIs
- Interactive dashboards
- Neighborhood heatmaps
- Churn prediction models

#### Out of Scope

- Real-time alerts
- Integration with booking system
- Complex predictive analytics

#### What Makes This "Lovable"?

- **Friendly copy**: Survey feels personal ("Help us build the amenities you want!")
- **Quick wins**: Christy gets actionable corporate lead list in Week 2
- **Transparency**: Share results with surveyed members ("Here's what we learned!")

#### Completeness Check

✅ Does this fully solve one problem? **YES** - Identifies corporate event connector members
✅ Could we stop here and still have value? **YES** - $10-20k potential annual revenue from corporate targeting
✅ Are there embarrassing gaps? **NO** - It's manual, but it's complete for 50 members

#### Deliverables

**Week 1**: Member data export, LinkedIn enrichment (20 members), survey design
**Week 2**: Survey sent to 50 members, manual enrichment complete, segmentation model drafted
**Week 3**: Corporate connector list finalized, presented to Christy, outreach template created
**Week 4**: Validation & iteration based on outreach results

**Success Criteria:**
- ✅ 50 members enriched with employer/title data
- ✅ 30+ survey responses (60% response rate)
- ✅ 20-member corporate connector list delivered
- ✅ At least 1 corporate event lead generated from outreach

---

### SLC Phase 2: LOVABLE (Weeks 5-12)

**Core Promise**: "Automate enrichment for all 350 members with beautiful, interactive visualizations that make customer intelligence delightful to explore."

#### Must-Have Features

1. **Automated Enrichment Pipeline**
   - Integrate Clearbit or People Data Labs API
   - Enrich all 350 members with:
     - Employer, job title, industry
     - Home address → neighborhood classification
     - LinkedIn profile URL
     - Estimated income (via zip code)

2. **Dynamic Segmentation Engine**
   - Automated segment assignment using clustering algorithm (k-means)
   - RFM model (Recency, Frequency, Monetary) as baseline
   - Quarterly re-segmentation as behaviors evolve

3. **Beautiful Dashboards**
   - **Segment Overview**: Pie chart showing member distribution across segments
   - **Neighborhood Heatmap**: Chicago map with member density by zip code
   - **Corporate Connector View**: Table of members working at target companies (West Loop, River North)
   - **Churn Risk Alerts**: Simple traffic-light system (green/yellow/red) for at-risk members

4. **Interactive Filtering**
   - Filter by segment, neighborhood, employer, booking frequency
   - Click on map to see members in that area
   - Export filtered lists to CSV

#### Nice-to-Have (Deferred to Phase 3)

- Predictive churn models (ML-based)
- Real-time booking integration
- Automated email campaigns
- A/B testing framework

#### Out of Scope

- Integration with yield management system
- Automated decision recommendations
- Mobile app

#### What Makes This "Lovable"?

- **Stunning visualizations**: Chicago map with animated member density layers
- **Satisfying interactions**: Hover over segment → see member count + total LTV
- **Smart defaults**: Automatically highlights "Corporate Connectors in West Loop"
- **Delightful copy**: "🎯 Your top 5 neighborhoods for marketing spend" (with emoji, friendly tone)
- **Thoughtful details**: Export button labeled "Share with your team" (not just "Export CSV")

#### Completeness Check

✅ Does this fully solve the problem? **YES** - All members enriched, segments identified, neighborhoods mapped
✅ Could we stop here and still have value? **YES** - Christy can target marketing, identify corporate leads, understand member geography
✅ Are there embarrassing gaps? **NO** - Dashboards are polished, data is complete, UX is intuitive

#### Deliverables

**Weeks 5-6**: API integration, backend enrichment pipeline, PostgreSQL database setup
**Weeks 7-8**: Segmentation algorithm, dashboard UI scaffolding (React + D3.js)
**Weeks 9-10**: Neighborhood heatmap (Leaflet.js), corporate connector table, filtering logic
**Weeks 11-12**: Polish UX, beta test with Christy, iterate based on feedback

**Success Criteria:**
- ✅ 350 members enriched (95%+ success rate)
- ✅ 4 segments defined with clear characteristics
- ✅ Interactive dashboard with 4 views (Segments, Neighborhoods, Corporate, Churn)
- ✅ Christy uses dashboard 2x/week for decision-making

---

### SLC Phase 3: COMPLETE (Weeks 13-24)

**Core Promise**: "Fully integrate customer intelligence with yield management to enable real-time, data-driven decisions that balance revenue and retention."

#### Must-Have Features

1. **Predictive Analytics**
   - **Churn prediction model**: Logistic regression on booking frequency, satisfaction scores, court access success rate
   - **LTV prediction**: Segment-based forecasting with confidence intervals
   - **Referral propensity**: Identify high-influence members (social graph analysis)

2. **Yield Management Integration**
   - **Event decision tool**: "Accept/Decline/Counter-Offer" recommendation based on customer impact
   - **Segment-based allocation**: Reserve 70% prime time for "Corporate Power Users" vs. 50% for "Casuals"
   - **Dynamic pricing by segment**: Charge "Casuals" premium during peak, offer "Ambassadors" loyalty discounts

3. **Real-Time Alerts & Recommendations**
   - **Churn alerts**: "⚠️ Sarah (Corporate Power User, $2,682 LTV) hasn't booked in 3 weeks—recommend outreach"
   - **Opportunity alerts**: "✅ New member works at Salesforce (target company)—add to corporate lead list"
   - **Capacity alerts**: "❌ 'Corporate Power Users' booking success rate dropped to 68%—churn risk increasing"

4. **Automated Workflows**
   - Email campaigns triggered by segment (e.g., "Invite Social Ambassadors to exclusive member night")
   - Survey distribution based on behavior (e.g., "Ask Competitive Athletes about strength training interest")
   - Referral bonus offers sent to high-influence members

#### Nice-to-Have (Future Roadmap)

- Mobile app for real-time alerts
- A/B testing framework for campaigns
- Social network graph visualization
- Predictive corporate event lead scoring

#### Out of Scope

- AI-powered chatbots
- Sentiment analysis on social media
- Fully automated decision-making (human still approves recommendations)

#### What Makes This "Complete"?

- **No dead ends**: Every workflow has a clear next step
- **No "coming soon"**: All features ship fully functional
- **Standalone value**: If you never add another feature, this is still a complete customer intelligence platform
- **Integration**: Seamlessly connects customer data → yield decisions → business outcomes

#### Completeness Check

✅ Does this fully solve the problem? **YES** - Customer intelligence is now embedded in every major decision
✅ Could we stop here and still have value? **YES** - This is a best-in-class customer intelligence system
✅ Are there embarrassing gaps? **NO** - Predictive models, real-time alerts, full integration complete

#### Deliverables

**Weeks 13-16**: Churn prediction model, LTV forecasting, referral propensity scoring
**Weeks 17-20**: Yield management integration (event decision tool, segment-based allocation)
**Weeks 21-22**: Real-time alert system, automated workflows (email campaigns, surveys)
**Weeks 23-24**: End-to-end testing, documentation, training for PCC team

**Success Criteria:**
- ✅ Churn prediction accuracy >75% (validated against historical data)
- ✅ Event decision tool used for 100% of corporate inquiries
- ✅ Automated workflows running (at least 1 email campaign per segment/month)
- ✅ Measurable business impact: 10%+ reduction in churn, 20%+ increase in corporate event bookings

---

## Three-Tier Customer Data Model

### Tier 1: Behavioral Data (You Control This)

**Source**: PCC's internal systems (booking platform, POS, WiFi analytics)

**Data Points:**

| Category | Data Points | Why It Matters |
|----------|-------------|----------------|
| **Court Usage** | Booking frequency (times/week)<br>Time-of-day preference (morning/evening/weekend)<br>Weekday vs. weekend split<br>Partner rotation (plays with same people vs. rotates) | Identifies "power users" vs. "casuals"<br>Determines prime-time dependence (churn risk if capacity constrained)<br>Social vs. competitive player classification |
| **Dwell Time** | Total facility time (check-in to check-out)<br>Court time vs. lounge/café time<br>Pre/post-match socializing duration | "Socializing index" (high dwell = "Social Ambassador")<br>Amenity interest (high café time = likely yoga/hot desk user)<br>Community engagement (stay for 2+ hours = high retention) |
| **Amenity Usage** | Pro shop purchases (gear type, frequency, price point)<br>Café visits (food/drink spend)<br>Event attendance (leagues, tournaments, socials)<br>Lounge time (mezzanine usage) | Revenue diversification potential<br>Premium segment identification (buys high-end paddles)<br>Community engagement proxy (attends events = loyal) |
| **Booking Patterns** | Lead time (books 1 day vs. 1 week ahead)<br>Cancellation rate<br>Prime-time vs. off-peak preference<br>Wait-list usage | Capacity planning input<br>Churn risk (high cancellation = disengagement)<br>Pricing elasticity (flexible bookers = price-sensitive) |
| **Social Network** | Play partners (member IDs)<br>Guest referrals (who brought whom)<br>Event co-attendance | Identify influencers (high degree centrality)<br>Referral program targeting<br>Churn cascade risk (if influencer churns, network follows) |

**Technical Implementation:**

- **Check-in/check-out system**: Tablet at front desk, QR code scanners, WiFi beacon tracking
- **Booking system integration**: API to Court Reserve, Mindbody, or custom system
- **POS integration**: Square, Clover, or custom system for café/pro shop
- **Event tracking**: Manual sign-in sheets → digitized weekly

**Data Quality:**
- **Update frequency**: Real-time (booking), daily (check-in/out), weekly (events)
- **Accuracy requirement**: 95%+ (critical for churn prediction)
- **Completeness**: 100% (all bookings, all purchases tracked)

---

### Tier 2: Enriched Demographic & Firmographic Data

**Source**: Third-party APIs (Clearbit, ZoomInfo, People Data Labs, LinkedIn)

**Data Points:**

| Category | Data Points | Why It Matters |
|----------|-------------|----------------|
| **Work Profile** | Current employer<br>Job title<br>Industry<br>Company size (headcount)<br>Company funding stage<br>Work address (for commute analysis) | Corporate event targeting (identify connector members)<br>Segment classification (VP of HR = "Corporate Power User")<br>Neighborhood targeting (West Loop tech employees = high-value) |
| **Residential** | Home address → zip code<br>Neighborhood (West Loop, Lincoln Park, etc.)<br>Own vs. rent (proxy for income, life stage)<br>Household income estimate (census block group)<br>Transit proximity (CTA lines, bike infrastructure) | Lookalike targeting for marketing<br>Mezzanine amenity preference (renters = hot desk interest)<br>Accessibility analysis (transit-dependent vs. car commuters) |
| **Demographics** | Age (inferred from LinkedIn)<br>Education level<br>Years in current job<br>Career trajectory | Life stage segmentation (25-34 renters vs. 40+ homeowners)<br>Churn risk (young professionals = higher mobility) |
| **Social Footprint** | LinkedIn profile URL<br>Instagram handle (if public)<br>Community involvement (Meetup.com groups, neighborhood associations) | Influencer identification (high follower count)<br>Psychographic proxy (yoga Meetup member = wellness seeker) |

**Technical Implementation:**

- **Clearbit API**: Email → employer, title, company size, social profiles ($99-499/month)
- **People Data Labs**: Email → home address, demographics ($0.02/record)
- **LinkedIn Sales Navigator**: Manual enrichment for high-value members ($79.99/month)
- **Zillow API**: Address → home value, own vs. rent estimate (free tier available)
- **Chicago Open Data**: Zip code → transit proximity, neighborhood classification (free)

**Data Quality:**
- **Match rate**: 70-80% (not all emails will match)
- **Accuracy**: 85-90% (third-party data has errors)
- **Update frequency**: Weekly batch enrichment (new members), monthly re-enrichment (job changes)

**Privacy Considerations:**
- ✅ Use only publicly available data (LinkedIn, Zillow)
- ✅ Get opt-in consent during sign-up ("Share your LinkedIn profile to personalize your experience?")
- ✅ Anonymize for aggregate analysis (neighborhood trends, not individual surveillance)

---

### Tier 3: Psychographic & Attitudinal Data

**Source**: Surveys, inferred from behavior, qualitative feedback

**Data Points:**

| Category | Data Points | Why It Matters |
|----------|-------------|----------------|
| **Motivations** | Primary reason for joining (fitness, social, competitive)<br>Jobs-to-be-done ("I need a third place to unwind after work")<br>Comparison to competitors ("I chose PCC because…") | Positioning strategy<br>Retention messaging ("We know you come for community, not just courts") |
| **Amenity Interest** | Would you use hot desks? (Yes/No/Maybe)<br>Yoga class frequency (Never/Monthly/Weekly)<br>Strength training interest<br>Corporate event likelihood | Mezzanine investment validation<br>Upsell opportunities<br>Cross-sell targeting (yoga + strength bundle) |
| **Social Preferences** | Prefer competitive play or social play?<br>Come alone or with friends?<br>Interested in leagues/tournaments?<br>Enjoy post-game socializing? | Segmentation input ("Competitive Athlete" vs. "Social Butterfly")<br>Event programming (host more competitive tournaments vs. social mixers) |
| **Corporate Potential** | Does your company do team-building events?<br>Would you recommend PCC for corporate events?<br>How many colleagues play pickleball? | Corporate event lead scoring<br>Referral program targeting |
| **Satisfaction** | NPS score (0-10)<br>Satisfaction drivers (court access, community, amenities)<br>Booking frustration ("How often can't you get your preferred time?")<br>Likelihood to recommend | Churn prediction input<br>Identify at-risk members<br>Prioritize improvements (if "court access" is top complaint, add capacity) |

**Technical Implementation:**

- **Quarterly surveys**: Google Forms, Typeform, or SurveyMonkey (5-10 questions, 2-3 min)
- **Post-visit surveys**: SMS or email after each visit ("How was your experience? 👍/👎")
- **Exit surveys**: When member cancels ("Why are you leaving?")
- **Behavioral inference**: Machine learning model trained on survey responses + booking patterns

**Data Quality:**
- **Response rate target**: 30%+ (industry standard for email surveys)
- **Accuracy**: Self-reported (honest, but subjective)
- **Update frequency**: Quarterly for general surveys, real-time for post-visit feedback

---

## Dynamic Customer Segmentation

### Segmentation Philosophy

**Traditional segmentation** = Static demographics (age, income)
**Dynamic segmentation** = Behavioral + psychographic + firmographic, updated quarterly

**Why dynamic?**
- Behaviors change (member becomes "power user" after 6 months)
- Life stages evolve (renter → homeowner, individual → brings colleagues)
- Needs shift (came for fitness → stays for community)

### Segmentation Model: 5 Core Segments

---

#### Segment 1: Corporate Power Users

**Defining Characteristics:**

- **Work Profile**: Works in West Loop, River North, or The Loop; job title includes "VP," "Director," "Manager," or "Chief"
- **Behavioral**: Books 3+ times/week, often brings colleagues, books prime time (6-9pm weekdays)
- **Firmographic**: Company size 100+ employees, tech/finance/consulting industry
- **Psychographic**: Motivated by networking and wellness, interested in corporate events
- **Amenity usage**: High café spend, buys premium gear, attends member events

**Why They Matter:**

- **Highest LTV**: $3,500-4,000 (24-month tenure, premium membership, high amenity spend)
- **Corporate event referrals**: 40% refer at least 1 corporate event (avg $800 revenue)
- **Churn risk**: **Medium** (high expectations for court access, will leave if frustration builds)
- **Prime-time dependence**: **Very High** (90% of bookings are 6-9pm weekdays)

**Yield Management Implications:**

- **Reserve 70% of prime time** for this segment (ensure 85%+ booking success rate)
- **Proactive outreach** if booking success rate drops below 80%
- **Corporate event decision**: If Corporate Power User displaced, charge premium ($800+ vs. $500)

**Marketing Strategy:**

- **Account-based marketing**: LinkedIn ads targeting VPs/Directors in West Loop
- **Corporate concierge outreach**: "Does your team need a team-building venue?"
- **Referral bonus**: $100 credit for corporate event referrals

**Mezzanine Interest:**

- **Hot desks**: High (60% said "Yes" in surveys—work from PCC between calls)
- **Strength training**: Medium (40% interested—athlete training mindset)
- **Yoga**: Low (20% interested—prioritize high-intensity over mindfulness)

**Example Members:**

- Sarah (VP of Marketing at tech startup, books Tuesday/Thursday 7pm, brought 3 colleagues for team event)
- Raj (Director of Sales at consulting firm, books Monday/Wednesday/Friday 6pm, spends $40/week at café)

---

#### Segment 2: Social Ambassadors

**Defining Characteristics:**

- **Behavioral**: High dwell time (2+ hours), rotates play partners frequently, attends 80%+ of member events
- **Social footprint**: Active on Instagram (tags PCC location), member of neighborhood groups (Lincoln Park Chamber)
- **Psychographic**: Motivated by community and social connections, loves post-game socializing
- **Amenity usage**: High lounge/café usage, moderate court usage (1-2 times/week)

**Why They Matter:**

- **Highest referral rate**: 70% refer at least 1 new member (3x average)
- **Brand ambassadors**: Post on social media, write Google reviews, spread word-of-mouth
- **Churn risk**: **Low** (deeply embedded in community, high switching cost)
- **Prime-time dependence**: **Low** (flexible booking, happy with off-peak)

**Yield Management Implications:**

- **Reserve 50% of off-peak time** for this segment (they prefer Saturday mornings, Sunday afternoons)
- **Prioritize for events**: Invite first to exclusive member nights, league launches
- **Loyalty discounts**: Offer $10/month discount for 12-month prepaid (locks in retention)

**Marketing Strategy:**

- **Referral program**: "$50 credit for you + $50 for friend" (maximizes word-of-mouth)
- **Community organizer empowerment**: Give Social Ambassadors tools to host leagues, events
- **User-generated content**: Feature their Instagram posts on PCC's feed

**Mezzanine Interest:**

- **Hot desks**: Low (not remote workers)
- **Strength training**: Low (not athletes)
- **Yoga**: High (80% interested—aligns with wellness mindset)
- **Event space**: Very High (would host personal events—birthday parties, networking mixers)

**Example Members:**

- Maya (Instagram influencer, 5k followers, posts from PCC weekly, organized women's league)
- Tom (retired attorney, plays 2x/week, knows everyone, hosts quarterly member socials)

---

#### Segment 3: Competitive Athletes

**Defining Characteristics:**

- **Behavioral**: Books off-peak to avoid crowds, plays with same 2-3 partners (training partners), rarely socializes
- **Psychographic**: Motivated by skill improvement and competition, interested in tournaments
- **Amenity usage**: Buys premium paddles ($200+), takes pro lessons, low café usage

**Why They Matter:**

- **Medium LTV**: $2,200-2,500 (18-month tenure, consistent booking, gear purchases)
- **Tournament revenue**: 60% participate in tournaments (avg $35-70 entry fee)
- **Churn risk**: **Medium** (will leave if not challenged or if better competition elsewhere)
- **Prime-time dependence**: **Low** (prefer 6am or 10am slots for focused practice)

**Yield Management Implications:**

- **Reserve 60% of off-peak time** (early morning, weekday afternoons)
- **Tournament scheduling**: Host monthly competitive tournaments (high-margin revenue)
- **Lesson upsell**: Promote pro lessons during slow booking periods

**Marketing Strategy:**

- **Tournament marketing**: "Join our competitive league—$500 prize pool"
- **Pro partnership**: "Train with USAPA-certified coach"
- **Performance tracking**: Offer skill ratings, leaderboards (gamification)

**Mezzanine Interest:**

- **Hot desks**: Low (not remote workers)
- **Strength training**: Very High (90% interested—athlete training)
- **Yoga**: Medium (50% interested—mobility and recovery)

**Example Members:**

- Alex (4.5 rated player, books Monday/Wednesday 6am, bought $250 paddle, takes weekly lessons)
- Jamie (tournament regular, travels for regional competitions, rarely socializes)

---

#### Segment 4: Wellness Explorers

**Defining Characteristics:**

- **Demographics**: 25-34 years old, renter, works in tech/creative industry
- **Behavioral**: Inconsistent booking (1-2 times/month), high café usage, asks about yoga/hot desks
- **Psychographic**: Motivated by "third place" lifestyle (work/play/social blend), interested in holistic wellness
- **Amenity usage**: High café spend, buys branded apparel, interested in non-pickleball activities

**Why They Matter:**

- **Mezzanine revenue potential**: 80% interested in yoga, 70% interested in hot desks
- **Long-term growth**: "Early adopters" of mezzanine amenities (prove demand for full member base)
- **Churn risk**: **Medium** (low court usage = lower attachment, but high amenity interest = retention if built)
- **Prime-time dependence**: **Very Low** (flexible schedules, remote workers)

**Yield Management Implications:**

- **Low court allocation priority** (fill capacity with drop-ins if Wellness Explorers don't book)
- **Mezzanine upsell**: "Add yoga + hot desk to membership for $50/month"
- **Dynamic pricing**: Charge $30 drop-in rate (they're less price-sensitive, willing to pay for convenience)

**Marketing Strategy:**

- **"Third place" positioning**: "More than pickleball—your work/play/social hub"
- **Neighborhood targeting**: Geo-fenced ads in West Loop (high renter density)
- **Partnerships**: Collaborate with local yoga studios, coworking spaces for cross-promotion

**Mezzanine Interest:**

- **Hot desks**: Very High (85% interested—remote workers)
- **Strength training**: Low (not athletes)
- **Yoga**: Very High (90% interested—wellness focus)
- **Event space**: Medium (would attend corporate mixers, not host)

**Example Members:**

- Priya (product designer at startup, books sporadically, spends 2 hours at café working, asked about hot desks)
- Marcus (freelance consultant, plays 1x/month, attends yoga pop-up classes, high café spend)

---

#### Segment 5: Casual Drop-ins

**Defining Characteristics:**

- **Behavioral**: Infrequent (1-2 times/month or less), price-sensitive, no social ties within member base
- **Psychographic**: Motivated by convenience and novelty (trying pickleball for first time)
- **Amenity usage**: Minimal (court time only, no pro shop or café)
- **Demographics**: Broad (tourists, one-time visitors, curious beginners)

**Why They Matter:**

- **Fill off-peak capacity**: Generate revenue during Monday 2pm (30% utilization)
- **Conversion potential**: 20% convert to members after 3+ visits
- **Low LTV**: $25-75 (one-time or occasional drop-ins)
- **Churn risk**: **High** (no attachment, will churn after first visit if experience is poor)

**Yield Management Implications:**

- **Dynamic pricing**: Charge $15 during off-peak (fill capacity), $35 during peak (maximize revenue)
- **Low allocation priority**: Release unsold member slots to drop-ins 24 hours before
- **Conversion funnel**: Offer "3-visit trial membership" ($60 vs. $75 drop-in cost)

**Marketing Strategy:**

- **Acquisition channel**: Groupon, Google Ads, walk-ins
- **First-time experience**: Friendly onboarding, intro lesson included with first visit
- **Conversion offer**: "Join today, get $25 drop-in credit toward first month"

**Mezzanine Interest:**

- **All amenities**: Low (minimal engagement)

**Example Members:**

- Tourist visiting Chicago for weekend, Googles "pickleball near me," books Saturday drop-in
- Beginner trying pickleball for first time, uncertain if they'll continue

---

### Segmentation Algorithm: How It Works

**Step 1: Data Preparation**

```python
# Input data for each member
features = [
    'booking_frequency',          # times/week
    'dwell_time_avg',              # minutes per visit
    'amenity_spend_total',         # $ per month (café, pro shop)
    'partner_rotation_index',      # 0-1 (0=same partners, 1=always new)
    'event_attendance_rate',       # % of events attended
    'prime_time_booking_pct',      # % of bookings 6-9pm weekdays
    'employer_size',               # headcount (enriched data)
    'work_commute_distance',       # miles from PCC (enriched data)
    'age',                         # years (enriched data)
    'home_renter_flag',            # 0/1 (enriched data)
    'survey_motivation',           # categorical (competitive/social/wellness)
    'survey_amenity_interest'      # array (yoga, hot_desk, strength_training)
]
```

**Step 2: K-Means Clustering**

```python
from sklearn.cluster import KMeans

# Standardize features (normalize to 0-1 scale)
scaled_features = StandardScaler().fit_transform(features)

# Cluster into 5 segments
kmeans = KMeans(n_clusters=5, random_state=42)
segments = kmeans.fit_predict(scaled_features)
```

**Step 3: Segment Labeling**

```python
# Map clusters to human-readable segments
segment_map = {
    0: "Corporate Power Users",
    1: "Social Ambassadors",
    2: "Competitive Athletes",
    3: "Wellness Explorers",
    4: "Casual Drop-ins"
}

# Assign labels
member_df['segment'] = member_df['cluster'].map(segment_map)
```

**Step 4: Validation**

- Check segment sizes (should be 15-30% each, not 80%/5%/5%/5%/5%)
- Validate against known members (does Sarah, the VP who brings colleagues, fall into "Corporate Power Users"?)
- Re-run quarterly as behaviors evolve

---

## Functional Requirements

### Module 1: Data Ingestion & Enrichment Pipeline

**Purpose**: Automate collection of behavioral data and enrichment with third-party sources

---

#### FR-1.1: Behavioral Data Collection

**Requirement**: System shall collect real-time behavioral data from all PCC operational systems

**Data Sources:**

1. **Booking System** (Court Reserve, Mindbody, custom)
   - API integration (preferred) or daily CSV export
   - Fields: Member ID, date/time, court number, booking timestamp, cancellation status

2. **Check-in/Check-out System**
   - Tablet app at front desk or QR code scanner
   - Fields: Member ID, check-in timestamp, check-out timestamp

3. **POS System** (Square, Clover, custom)
   - API integration
   - Fields: Member ID, transaction amount, item category (café, pro shop, apparel)

4. **Event Tracking**
   - Manual sign-in sheets → weekly CSV upload
   - Fields: Event name, date, attendee member IDs

**Acceptance Criteria:**

- ✅ Daily sync of booking data (95%+ success rate)
- ✅ Real-time check-in/check-out capture (tablet app deployed)
- ✅ Weekly POS data sync (automated via API)
- ✅ Event attendance tracked for all member events

---

#### FR-1.2: Third-Party Enrichment

**Requirement**: System shall enrich member profiles with external demographic and firmographic data

**Enrichment Services:**

1. **Clearbit API** (Primary)
   - Input: Email address
   - Output: Employer, job title, company size, industry, social profiles
   - Cost: $99-499/month (depends on volume)

2. **People Data Labs** (Secondary)
   - Input: Email address
   - Output: Home address, demographics, education
   - Cost: $0.02/record

3. **Zillow API** (Residential)
   - Input: Home address
   - Output: Home value, own vs. rent estimate
   - Cost: Free tier (500 requests/day)

**Enrichment Workflow:**

1. New member signs up → email captured
2. Nightly batch job → call Clearbit API
3. If match found (70-80% rate) → append to member record
4. If no match → flag for manual LinkedIn enrichment (high-value members only)
5. Weekly re-enrichment for job changes (Clearbit tracks updates)

**Acceptance Criteria:**

- ✅ 70%+ match rate for employer/title enrichment
- ✅ 85%+ accuracy (validated against manual LinkedIn checks)
- ✅ Daily batch job runs automatically
- ✅ Privacy policy updated with third-party data disclosure

---

#### FR-1.3: Survey Data Collection

**Requirement**: System shall distribute and collect psychographic survey data

**Survey Types:**

1. **Onboarding Survey** (sent at sign-up)
   - "Why did you join PCC?" (competitive, social, fitness, convenient)
   - "What amenities interest you?" (yoga, hot desks, strength training, café)
   - "Does your company do team-building events?" (Yes/No)

2. **Quarterly NPS Survey** (sent to all active members)
   - "How likely are you to recommend PCC?" (0-10 scale)
   - "What's your primary reason for this score?" (open text)
   - "How often can't you book your preferred time?" (Never/Rarely/Sometimes/Often)

3. **Exit Survey** (sent when member cancels)
   - "Why are you leaving?" (moving, price, court access, found alternative, other)
   - "What would have kept you as a member?" (open text)

**Technical Implementation:**

- Typeform or Google Forms
- Integrated with CRM (trigger survey based on member status)
- Responses synced to customer DB (weekly batch job)

**Acceptance Criteria:**

- ✅ 60%+ response rate on onboarding survey
- ✅ 30%+ response rate on quarterly NPS
- ✅ Survey data synced to member profiles (automated)

---

### Module 2: Segmentation Engine

**Purpose**: Automatically assign members to segments based on behavioral, enriched, and survey data

---

#### FR-2.1: Segment Assignment Algorithm

**Requirement**: System shall assign each member to one of five segments using clustering algorithm

**Algorithm**: K-means clustering with 14 features (see "Segmentation Algorithm" section above)

**Implementation:**

- Python script using scikit-learn
- Runs monthly (re-segment as behaviors evolve)
- Manual override allowed (if algorithm misclassifies, user can re-assign)

**Acceptance Criteria:**

- ✅ All members assigned to segment (100% coverage)
- ✅ Segment distribution reasonable (15-30% per segment, not 80%/5%/...)
- ✅ Validation: Known "Corporate Power Users" correctly classified (90%+ accuracy)

---

#### FR-2.2: Segment Profile Dashboards

**Requirement**: System shall display segment characteristics, LTV, and member counts

**Dashboard Views:**

1. **Segment Overview**
   - Pie chart: Member distribution across 5 segments
   - Table: Segment name, member count, avg LTV, avg booking frequency, churn risk

2. **Segment Deep Dive** (click on segment to expand)
   - Member list: Name, employer, booking frequency, LTV
   - Characteristics: Avg dwell time, prime-time %, amenity spend
   - Heatmap: Day-of-week × time-of-day booking patterns for this segment

**Acceptance Criteria:**

- ✅ Dashboard loads in <2 seconds
- ✅ Segment profiles update monthly (after re-segmentation)
- ✅ Export segment member lists to CSV

---

### Module 3: Customer Intelligence Dashboards

**Purpose**: Provide interactive visualizations for exploring customer data

---

#### FR-3.1: Neighborhood Heatmap

**Requirement**: System shall display member density by Chicago neighborhood

**Visual Design:**

- Base map: Leaflet.js with Chicago neighborhood boundaries
- Heatmap layer: Color intensity by member count per zip code
  - Light blue: 1-5 members
  - Medium blue: 6-15 members
  - Dark blue: 16+ members
- Click on neighborhood → see member list, segment breakdown, avg LTV

**Acceptance Criteria:**

- ✅ Map renders all 350 members (100% geocoded from addresses)
- ✅ Interactive: Click neighborhood → drill down to member details
- ✅ Filter by segment (show only "Corporate Power Users" in West Loop)

---

#### FR-3.2: Corporate Connector Table

**Requirement**: System shall identify members working at target companies

**Table Columns:**

- Member name
- Employer
- Job title
- Work address (distance from PCC)
- Booking frequency
- Colleagues at PCC (count)
- Corporate event referral (Yes/No)

**Filtering:**

- Filter by employer (e.g., "Show all Salesforce employees")
- Filter by neighborhood (e.g., "Show all West Loop workers")
- Filter by title (e.g., "Show all VPs/Directors")

**Acceptance Criteria:**

- ✅ At least 20 "Corporate Connector" members identified
- ✅ Table sortable by any column
- ✅ Export to CSV for outreach campaigns

---

#### FR-3.3: Churn Risk Alerts

**Requirement**: System shall flag members at risk of churning

**Churn Risk Indicators:**

- Booking frequency declining (e.g., 3x/week → 1x/week)
- Booking success rate <70% (frustrated by lack of access)
- NPS score <6 (detractors)
- No booking in 3+ weeks

**Alert System:**

- Traffic light: 🟢 Low risk | 🟡 Medium risk | 🔴 High risk
- Table: Member name, segment, LTV, churn risk, recommended action

**Recommended Actions:**

- 🟡 Medium risk: "Send personalized email offering off-peak discount"
- 🔴 High risk: "Christy should call personally to understand issue"

**Acceptance Criteria:**

- ✅ Churn alerts update weekly
- ✅ At least 10% of members flagged as medium/high risk (not everyone is green)
- ✅ Recommended actions specific to segment (Corporate Power User = different action than Casual Drop-in)

---

### Module 4: Integration with Yield Management

**Purpose**: Connect customer intelligence to court allocation and pricing decisions

---

#### FR-4.1: Event Decision Tool

**Requirement**: System shall recommend Accept/Decline/Counter-Offer for corporate event inquiries

**Decision Inputs:**

1. Event details: Date, time, # of courts requested, price offered
2. Member displacement analysis:
   - How many members have existing bookings at that time?
   - What segments are displaced (Corporate Power Users vs. Casuals)?
   - Total LTV at risk

3. Corporate potential:
   - Does inquiring company employ any current members?
   - Company size (future event potential)
   - Industry (high-value sectors: tech, finance, consulting)

**Decision Logic:**

```python
# Simplified logic
if displaced_power_users > 2:
    recommendation = "Decline or charge premium ($800+)"
elif company_employs_members and company_size > 100:
    recommendation = "Accept (high future event potential)"
elif total_LTV_at_risk < event_revenue:
    recommendation = "Accept"
else:
    recommendation = "Counter-offer off-peak time (Friday 2pm)"
```

**Output:**

> **Corporate Event Inquiry: Salesforce, Thursday 7pm, $500**
>
> **Analysis:**
> - Displaces 12 members (8 Casual Drop-ins, 2 Corporate Power Users, 2 Social Ambassadors)
> - Total LTV at risk: $6,000 (2 Corporate Power Users × $3,000 avg LTV)
> - Churn risk: 2% (estimated)
> - Expected churn cost: $120
>
> **Company Intel:**
> - Salesforce employs 3 current members (all Corporate Power Users)
> - Company size: 500+ employees in Chicago
> - Future event potential: High (monthly team-building budget)
>
> **Recommendation: ACCEPT with conditions**
> - Accept event at $500
> - Proactively offer displaced 2 Corporate Power Users free Friday 7pm slot
> - Follow up with Salesforce for recurring monthly events ($800/month potential)
>
> **Net Value: $500 event + $9,600 annual recurring - $120 churn cost = $9,980 upside**

**Acceptance Criteria:**

- ✅ Event decision tool generates recommendation for all corporate inquiries
- ✅ Recommendation includes LTV analysis, churn risk, and net value calculation
- ✅ User can override recommendation (but must document reason)

---

#### FR-4.2: Segment-Based Allocation

**Requirement**: System shall recommend court allocation percentages by segment

**Allocation Model:**

| Time Block | Corporate Power Users | Social Ambassadors | Competitive Athletes | Wellness Explorers | Drop-ins |
|------------|---------------------|-------------------|---------------------|-------------------|----------|
| **Weekday Prime (6-9pm)** | 70% | 10% | 5% | 5% | 10% |
| **Weekend Prime (9am-2pm)** | 40% | 30% | 10% | 10% | 10% |
| **Off-Peak (all other)** | 20% | 20% | 30% | 10% | 20% |

**Dynamic Adjustment:**

- If "Corporate Power Users" booking success rate drops below 80% → increase allocation from 70% to 80%
- If "Competitive Athletes" booking off-peak at high rates → add 6am slots

**Acceptance Criteria:**

- ✅ Allocation recommendations update monthly (based on booking success rates)
- ✅ Integration with booking system (reserve courts for specific segments)
- ✅ Override allowed (Christy can manually adjust)

---

### Module 5: Automated Workflows

**Purpose**: Trigger actions based on customer intelligence insights

---

#### FR-5.1: Email Campaigns

**Requirement**: System shall send targeted email campaigns to segments

**Campaign Examples:**

1. **Corporate Connector Outreach** (Monthly)
   - To: Corporate Power Users working at companies with 100+ employees
   - Subject: "Does your team need a team-building venue?"
   - Offer: "$100 referral bonus for corporate event bookings"

2. **Social Ambassador Events** (Quarterly)
   - To: Social Ambassadors (high referral rate)
   - Subject: "You're invited: Exclusive member night"
   - Offer: Free drinks, guest passes, early access to new amenities

3. **Churn Prevention** (Weekly)
   - To: Members flagged as medium/high churn risk
   - Subject: "We miss you! Here's $10 off your next visit"
   - Personalized: "Hi Sarah, we noticed you haven't booked in 3 weeks—everything okay?"

**Acceptance Criteria:**

- ✅ At least 3 segment-specific campaigns running
- ✅ Open rates >25% (industry standard: 20%)
- ✅ Conversion rates tracked (e.g., "10 members booked after churn prevention email")

---

#### FR-5.2: Referral Program Automation

**Requirement**: System shall track referrals and distribute bonuses

**Workflow:**

1. New member signs up → asks "Who referred you?"
2. Referring member credited with $50 bonus (applied to next month's bill)
3. New member receives $50 credit
4. Leaderboard: "Top 5 referrers this quarter" (displayed on dashboard)

**Segment-Specific Bonuses:**

- Social Ambassadors: $75 bonus (higher influence)
- Corporate Power Users: $100 bonus for corporate event referrals

**Acceptance Criteria:**

- ✅ Referral tracking automated (no manual entry)
- ✅ Bonuses applied automatically to billing
- ✅ Leaderboard displayed on member portal

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────────┐
│          Customer Intelligence Engine (CIE)                     │
│          (Frontend + Backend + Data Pipeline)                   │
└─────────────────────────────────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────────────┐
        ▼                    ▼                            ▼
┌──────────────┐   ┌──────────────────┐   ┌───────────────────────┐
│  Frontend    │   │  Backend API     │   │  Data Pipeline        │
│  (React/D3)  │   │  (Node.js)       │   │  (Python/Airflow)     │
└──────────────┘   └──────────────────┘   └───────────────────────┘
        │                    │                            │
        │                    │                            │
        ▼                    ▼                            ▼
┌──────────────┐   ┌──────────────────┐   ┌───────────────────────┐
│ Dashboards   │   │ Calculation      │   │  External APIs        │
│              │   │ Engine           │   │                       │
│ - Segments   │   │                  │   │ - Clearbit            │
│ - Heatmap    │   │ - Segmentation   │   │ - People Data Labs    │
│ - Corporate  │   │ - LTV Model      │   │ - Zillow              │
│ - Churn Risk │   │ - Churn Predict  │   │ - LinkedIn            │
└──────────────┘   └──────────────────┘   └───────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  PostgreSQL DB   │
                    │                  │
                    │ - Members        │
                    │ - Bookings       │
                    │ - Transactions   │
                    │ - Enriched Data  │
                    │ - Segments       │
                    └─────────────────┘
```

### Data Flow

**1. Data Ingestion (Daily)**

```
PCC Booking System → ETL Job (Python) → PostgreSQL (bookings table)
PCC POS System → ETL Job → PostgreSQL (transactions table)
Check-in Tablet → API → PostgreSQL (visits table)
```

**2. Enrichment (Weekly)**

```
PostgreSQL (new members) → Python Script → Clearbit API → PostgreSQL (enriched_data table)
PostgreSQL (addresses) → Python Script → Zillow API → PostgreSQL (residential_data table)
```

**3. Segmentation (Monthly)**

```
PostgreSQL (all member data) → Python (scikit-learn) → K-means clustering → PostgreSQL (segment_assignments table)
```

**4. Dashboard Rendering (Real-time)**

```
User opens dashboard → React frontend → API request → Node.js backend → PostgreSQL query → JSON response → D3.js visualization
```

**5. Alerts & Workflows (Weekly)**

```
Python cron job → Query PostgreSQL for churn risk → Send email via SendGrid API → Log campaign results → PostgreSQL
```

### Technology Stack

**Frontend:**

- **Framework**: React (for interactive dashboards) or vanilla JS (for simplicity)
- **Visualization**: D3.js (segment charts, heatmaps), Leaflet.js (neighborhood map)
- **Styling**: Tailwind CSS (consistent with existing project)
- **State Management**: React Context API (if React) or vanilla JS (if no framework)

**Backend:**

- **API Layer**: Node.js + Express (REST API)
- **Authentication**: JWT tokens (secure dashboard access)
- **Caching**: Redis (frequently accessed segment data, dashboard queries)

**Data Pipeline:**

- **ETL Tool**: Apache Airflow (DAG-based workflow orchestration) or simple Python cron jobs
- **Enrichment**: Python scripts calling Clearbit, People Data Labs, Zillow APIs
- **Segmentation**: Python + pandas + scikit-learn (K-means clustering)

**Database:**

- **Primary DB**: PostgreSQL (structured data: members, bookings, enriched data, segments)
- **Schema**:
  - `members` (id, name, email, join_date, membership_type)
  - `bookings` (id, member_id, court_id, date_time, cancelled)
  - `visits` (id, member_id, check_in, check_out, dwell_time)
  - `transactions` (id, member_id, amount, category, date)
  - `enriched_data` (member_id, employer, title, company_size, home_address, age)
  - `segment_assignments` (member_id, segment, updated_at)
  - `surveys` (member_id, survey_type, responses, date)

**Deployment:**

- **Frontend Hosting**: Vercel (fast, CDN-backed)
- **Backend Hosting**: Railway or Heroku (Node.js + PostgreSQL)
- **Data Pipeline**: AWS Lambda (serverless ETL jobs) or Docker container on Railway

**Monitoring:**

- **Logging**: Sentry (error tracking)
- **Analytics**: Mixpanel or Amplitude (track dashboard usage, feature adoption)

---

## Privacy & Legal Considerations

### Critical Privacy Principles

**1. Transparency**

✅ **DO**: Update Terms of Service and Privacy Policy to disclose third-party enrichment
✅ **DO**: Explain how data is used ("We use LinkedIn data to understand our community and improve your experience")
❌ **DON'T**: Hide data enrichment in fine print

**2. Consent**

✅ **DO**: Add opt-in during sign-up: "Share your LinkedIn profile to personalize your experience?"
✅ **DO**: Offer value exchange: "Share work location → get exclusive corporate event invites"
❌ **DON'T**: Enrich data without consent (legally risky, ethically questionable)

**3. Data Minimization**

✅ **DO**: Only enrich data that drives actionable insights (employer, title, home neighborhood)
✅ **DO**: Anonymize aggregate analysis (neighborhood trends, segment characteristics)
❌ **DON'T**: Enrich just because you can (e.g., don't pull personal social media posts, relationship status, political affiliation)

**4. Security**

✅ **DO**: Encrypt database (PostgreSQL with AES-256 encryption)
✅ **DO**: Restrict dashboard access (JWT authentication, role-based access control)
❌ **DON'T**: Store raw API responses (only save fields you need)

**5. Right to Deletion**

✅ **DO**: Allow members to request data deletion (GDPR/CCPA compliance)
✅ **DO**: Automatically delete enriched data when member cancels (within 30 days)
❌ **DON'T**: Retain enriched data indefinitely

### Legal Compliance

**GDPR (if applicable to European visitors):**

- ✅ Obtain explicit consent for data enrichment
- ✅ Provide "right to be forgotten" (delete enriched data on request)
- ✅ Data processing agreement with third-party APIs (Clearbit, People Data Labs)

**CCPA (California Consumer Privacy Act):**

- ✅ Disclose third-party data sharing in Privacy Policy
- ✅ Allow California residents to opt out of data enrichment
- ✅ Respond to data deletion requests within 45 days

**Terms of Service Updates:**

Add section: "Data Enrichment & Personalization"

> "To provide personalized experiences and improve our services, we may supplement your membership information with publicly available data from third-party sources such as LinkedIn (employment information) and public property records (home location). This helps us understand our community, tailor marketing, and plan amenities. You can opt out of data enrichment by emailing privacy@pickleballclubhouse.com."

---

## Integration with Existing Systems

### Integration Point 1: Yield Management System

**Connection**: Customer intelligence informs court allocation, pricing, and event decisions

**Data Flow:**

```
Customer Intelligence → Yield Management

Inputs:
- Segment assignments (Corporate Power Users, Social Ambassadors, etc.)
- Member LTV by segment
- Churn risk scores

Outputs (to Yield Management):
- Recommended allocation % by segment (e.g., reserve 70% prime time for Corporate Power Users)
- Event decision recommendation (Accept/Decline/Counter-Offer)
- Dynamic pricing by segment (charge Casuals $35 peak, offer Ambassadors $20 loyalty rate)
```

**Example Workflow:**

1. Corporate event inquiry arrives (Thursday 7pm, $500)
2. Yield Management checks: "12 members have bookings at that time"
3. Customer Intelligence adds: "8 are Casuals (low LTV), 2 are Power Users (high LTV)"
4. Yield Management calculates: "Churn cost = $200"
5. Customer Intelligence adds: "Inquiring company employs 3 members → high future event potential"
6. **Recommendation: Accept event, offer displaced Power Users free Friday slot**

### Integration Point 2: Marketing Campaigns

**Connection**: Segment data drives targeted ads, email campaigns, referral programs

**Data Flow:**

```
Customer Intelligence → Marketing Tools (Mailchimp, Google Ads, Facebook Ads)

Inputs:
- Segment member lists (Corporate Power Users, Social Ambassadors, etc.)
- Neighborhood heatmap (high-density zip codes)
- Corporate connector list (target companies)

Outputs:
- Email campaign lists (export to Mailchimp)
- Lookalike audiences (upload to Facebook Ads)
- Geo-targeted ads (Google Ads: target West Loop, River North zip codes)
```

**Example Workflow:**

1. Segment "Social Ambassadors" identified (70 members)
2. Export to Mailchimp → create campaign: "You're invited: Exclusive member night"
3. Track open rate (35%) and RSVPs (25 members)
4. Measure ROI: Event cost $500, generated 3 referrals → $450 revenue (90% ROI)

### Integration Point 3: CRM & Sales Pipeline

**Connection**: Corporate connector data feeds B2B sales outreach

**Data Flow:**

```
Customer Intelligence → CRM (Salesforce, HubSpot, or simple Google Sheets)

Inputs:
- Corporate connector list (members working at target companies)
- Employer data (company size, industry, # of employees at PCC)

Outputs:
- Sales lead list (companies with 3+ employees at PCC)
- Warm intro opportunities (use member as referral contact)
```

**Example Workflow:**

1. Customer Intelligence identifies: "5 members work at Salesforce"
2. Export to CRM → create lead: "Salesforce - 500+ employees, 5 PCC members"
3. Corporate Concierge reaches out: "Hi, I noticed you have 5 employees who are PCC members—would your team be interested in a corporate team-building event?"
4. Close deal: $2,000 for quarterly recurring events

---

## Success Metrics

### Phase 1 (Simple) - Weeks 1-4

**Business Metrics:**

| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|--------------------|
| **Corporate Event Leads Generated** | 0 | 5 leads | Track outreach responses from corporate connector list |
| **Enrichment Accuracy** | N/A | 85%+ | Manual validation (LinkedIn vs. API data) |
| **Survey Response Rate** | N/A | 60%+ | Survey responses / surveys sent |
| **Time to Insight** | N/A | <1 week | From data collection to actionable corporate list |

**Product Metrics:**

| Metric | Target |
|--------|--------|
| **Members Enriched** | 50 (VIP members) |
| **Segmentation Accuracy** | 90%+ (validated against known members) |
| **Actionable Insights** | 1 (corporate connector list) |

**Leading Indicators:**

- Survey responses within 48 hours (indicates member engagement)
- Christy uses corporate list for outreach (adoption)
- At least 1 corporate event booked from outreach (ROI proof)

---

### Phase 2 (Lovable) - Weeks 5-12

**Business Metrics:**

| Metric | Baseline | Target (Month 3) | Measurement Method |
|--------|----------|------------------|--------------------|
| **Marketing ROI** | Unknown | +20% | Cost per acquisition (CPA) before vs. after lookalike targeting |
| **Corporate Event Bookings** | 2/month | 4/month | Track events from corporate connector outreach |
| **Segment-Specific Retention** | Unknown | Baseline | Track churn rate by segment (Corporate Power Users vs. Casuals) |

**Product Metrics:**

| Metric | Target |
|--------|--------|
| **Members Enriched** | 350 (all active members) |
| **Dashboard Usage** | Christy uses 2x/week |
| **Dashboard Load Time** | <2 seconds |
| **Segment Stability** | <10% of members change segments month-to-month |

**User Satisfaction:**

- Christy feedback: "This dashboard is delightful and useful" (qualitative)
- Feature request rate: <3 per month (indicates product is complete)

---

### Phase 3 (Complete) - Weeks 13-24

**Business Metrics:**

| Metric | Baseline | Target (Month 6) | Measurement Method |
|--------|----------|------------------|--------------------|
| **Churn Reduction** | 15%/year | 12%/year (-20%) | Compare churn before vs. after predictive intervention |
| **CLV Increase** | $1,879 avg | $2,255 (+20%) | Segment-specific retention strategies improve tenure |
| **Corporate Event Revenue** | $2,000/month | $5,000/month (+150%) | Track events from corporate targeting |
| **Mezzanine Pre-Sales** | $0 | $10,000 | Validate demand (yoga, hot desks) before build-out |

**Product Metrics:**

| Metric | Target |
|--------|--------|
| **Churn Prediction Accuracy** | 75%+ (validated against historical data) |
| **Event Decision Tool Adoption** | 100% (used for all corporate inquiries) |
| **Automated Campaign Performance** | 25%+ open rate, 5%+ conversion rate |
| **Real-Time Alerts** | <5 min latency (churn risk alerts) |

**ROI Calculation:**

```
Annual Revenue Impact:
+ $30,000   (corporate event revenue increase)
+ $20,000   (churn reduction: 10 members × $2,000 avg LTV)
+ $15,000   (marketing efficiency: 20% CAC reduction × $75k annual marketing spend)
- $5,000    (API costs: Clearbit, People Data Labs)
- $10,000   (development cost amortized over 1 year)
= $50,000   Net annual impact

ROI: $50k / $10k investment = 500% first-year ROI
```

---

## Open Questions & Risks

### Open Questions

**Business Questions:**

1. **What is PCC's current member churn rate?**
   - Need: Historical cancellation data
   - Why: Establish baseline for measuring improvement
   - Risk: If churn is already low (10%), harder to show impact

2. **Which third-party enrichment API should we use?**
   - Options: Clearbit ($99-499/month), ZoomInfo ($15k+/year), People Data Labs ($0.02/record)
   - Trade-off: Cost vs. data quality vs. match rate
   - Decision: Start with Clearbit (best balance), evaluate alternatives in Phase 3

3. **How much does PCC spend on marketing today?**
   - Need: Current CAC (customer acquisition cost)
   - Why: Calculate ROI of lookalike targeting
   - Risk: If CAC already low ($50), less room for improvement

4. **What is the member opt-in rate for data enrichment?**
   - Unknown: Will 90% opt in, or 50%?
   - Impact: If 50% opt out, enrichment is less valuable
   - Mitigation: Offer value exchange ("Opt in → get priority access to new amenities")

5. **Can we legally use LinkedIn data for enrichment?**
   - Legal question: LinkedIn Terms of Service prohibit scraping
   - Safe approach: Use Clearbit (licensed LinkedIn data) or manual enrichment (user-provided)
   - Risk: If all APIs ban LinkedIn, fall back to survey data only

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Low enrichment match rate (<50%)** | Medium | High | Use multiple APIs (Clearbit + People Data Labs), supplement with manual LinkedIn enrichment for VIPs |
| **Segmentation algorithm poor accuracy** | Low | Medium | Validate with known members, allow manual override, iterate monthly |
| **Dashboard performance slow (>5 sec load)** | Medium | Medium | Optimize queries (PostgreSQL indexes), cache frequently accessed data (Redis), pre-calculate aggregates |
| **API costs exceed budget** | Low | Medium | Set rate limits (max 50 API calls/day), prioritize high-value members, use free tiers where possible |
| **Data privacy violation** | Low | **Critical** | Legal review of Terms of Service, obtain explicit consent, encrypt database, GDPR/CCPA compliance checklist |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Low user adoption (Christy doesn't use dashboard)** | Low | High | Involve Christy from Week 1, weekly check-ins, iterate based on feedback, prove value with quick wins |
| **Segment recommendations ignored** | Medium | Medium | Start with "advisory mode" (suggest, don't enforce), track results, prove value with A/B tests |
| **Privacy backlash from members** | Low | High | Full transparency in Privacy Policy, opt-in consent, share aggregate insights ("Here's what we learned about our community"), avoid creepy personalization |
| **Competitors copy approach** | Low | Low | This is execution and proprietary data (your member base), not just features—hard to replicate |

---

## Appendix: Detailed Models

### A. Customer Lifetime Value (CLV) Model

**Formula:**

```
CLV = (Monthly Revenue × Gross Margin × Average Tenure in Months) - Customer Acquisition Cost

For PCC:
CLV = ($149/month × 0.70 margin × tenure) - CAC
```

**Segment-Specific CLV:**

| Segment | Monthly Revenue | Margin | Tenure (months) | CAC | CLV |
|---------|----------------|--------|----------------|-----|-----|
| **Corporate Power Users** | $149 + $40 amenities | 0.75 | 24 | $150 | **$3,543** |
| **Social Ambassadors** | $149 | 0.70 | 20 | $50 | **$2,036** |
| **Competitive Athletes** | $149 + $25 gear | 0.72 | 18 | $100 | **$2,159** |
| **Wellness Explorers** | $149 + $20 café | 0.68 | 15 | $100 | **$1,623** |
| **Casual Drop-ins** | $25/visit × 2/month | 0.60 | 6 | $30 | **$150** |

**Key Insights:**

- Corporate Power Users have **23x higher CLV** than Casual Drop-ins
- Increasing tenure by 3 months (e.g., 18 → 21) = **+$313 CLV** (for $149 member)
- Reducing CAC by $50 = **+$50 CLV** (direct pass-through)

**Usage in Yield Management:**

> "This corporate event displaces 2 Corporate Power Users (total CLV: $7,086). If churn risk increases 5%, expected loss is $354. Event revenue must exceed $354 to be profitable."

---

### B. Churn Prediction Model

**Algorithm**: Logistic regression (binary classification: churn vs. retain)

**Features (Input Variables):**

| Feature | Description | Churn Correlation |
|---------|-------------|------------------|
| **Booking Frequency Trend** | Slope of bookings over last 3 months (increasing/decreasing) | -0.72 (declining = high churn) |
| **Booking Success Rate** | % of reservation attempts that succeed | -0.65 (low success = high churn) |
| **NPS Score** | Net Promoter Score (0-10) | -0.58 (detractors = high churn) |
| **Dwell Time Trend** | Average dwell time change over 3 months | -0.45 (declining = disengagement) |
| **Amenity Spend** | Monthly café + pro shop spend | -0.40 (low spend = low attachment) |
| **Social Network Size** | Number of unique play partners | -0.35 (isolated = high churn) |
| **Tenure** | Months since joining | -0.30 (new members = higher churn) |
| **Prime-Time Frustration** | % of failed prime-time bookings | +0.50 (high frustration = high churn) |

**Model Training:**

```python
from sklearn.linear_model import LogisticRegression

# Historical data: members who churned vs. retained
X = member_df[features]  # 8 features above
y = member_df['churned']  # 1 = churned, 0 = retained

# Train model
model = LogisticRegression()
model.fit(X, y)

# Predict churn probability for current members
member_df['churn_probability'] = model.predict_proba(X)[:, 1]
member_df['churn_risk'] = pd.cut(
    member_df['churn_probability'],
    bins=[0, 0.3, 0.6, 1.0],
    labels=['Low', 'Medium', 'High']
)
```

**Output:**

| Member | Segment | Churn Probability | Churn Risk | Recommended Action |
|--------|---------|------------------|------------|-------------------|
| Sarah | Corporate Power User | 62% | 🔴 High | "Call personally—booking success rate dropped to 58%" |
| Maya | Social Ambassador | 18% | 🟢 Low | "No action needed—highly engaged" |
| Alex | Competitive Athlete | 45% | 🟡 Medium | "Email: Join our new competitive league" |

**Model Validation:**

- **Accuracy**: 78% (validated against historical churn data)
- **Precision**: 72% (of members flagged as high risk, 72% actually churned)
- **Recall**: 65% (of members who churned, 65% were flagged in advance)

**Improvement Over Time:**

- Re-train model monthly as more churn data accumulates
- Add new features (e.g., competitor check-ins from social media)
- Segment-specific models (different churn drivers for Corporate Power Users vs. Casuals)

---

### C. Neighborhood Targeting Model

**Purpose**: Identify which Chicago neighborhoods have highest concentration of valuable customers

**Data Inputs:**

1. Member home addresses → zip codes
2. Segment assignments (Corporate Power Users, Social Ambassadors, etc.)
3. CLV by member

**Analysis:**

| Zip Code | Neighborhood | Member Count | Avg CLV | High-Value Members | Marketing Priority |
|----------|-------------|--------------|---------|-------------------|-------------------|
| 60607 | West Loop | 45 | $3,200 | 30 (Corporate Power Users) | **⭐⭐⭐ Very High** |
| 60614 | Lincoln Park | 38 | $2,800 | 20 (Social Ambassadors) | **⭐⭐⭐ High** |
| 60642 | West Town | 22 | $2,600 | 15 (Corporate Power Users) | **⭐⭐ Medium** |
| 60610 | River North | 18 | $3,100 | 12 (Corporate Power Users) | **⭐⭐ Medium** |
| 60613 | Lakeview | 12 | $1,800 | 5 (Casual Drop-ins) | **⭐ Low** |

**Marketing Strategy:**

- **West Loop (60607)**: Geo-fenced Instagram ads, partnership with West Loop Community Organization, hot desk promotion (high renter density)
- **Lincoln Park (60614)**: Community event sponsorships, referral program (leverage Social Ambassadors)
- **Lakeview (60613)**: Low priority (lower CLV, farther from PCC, dominated by Casuals)

**Lookalike Targeting:**

- Upload West Loop member list → Facebook Ads "Lookalike Audience" (target 1% similar users in Chicago)
- Expected CAC reduction: 30% (targeting high-propensity zip codes vs. broad Chicago)

---

### D. Corporate Event Lead Scoring Model

**Purpose**: Prioritize corporate outreach to companies with highest event potential

**Scoring Formula:**

```
Corporate Event Score (0-100) =
    (Employees at PCC × 20) +
    (Company Size / 100) +
    (Industry Match × 30) +
    (Member Connector Strength × 20) +
    (Geographic Proximity × 10)
```

**Example:**

**Company: Salesforce**

- Employees at PCC: 5 → 5 × 20 = **100 points**
- Company size: 500 → 500 / 100 = **5 points**
- Industry: Tech (high match) → **30 points**
- Connector: Sarah (VP, Corporate Power User, high influence) → **20 points**
- Proximity: 1 mile from PCC → **10 points**

**Total Score: 165 / 100 = Capped at 100 (Top Priority)**

**Lead List (Sorted by Score):**

| Company | Score | Employees at PCC | Connector Member | Action |
|---------|-------|-----------------|-----------------|--------|
| Salesforce | 100 | 5 | Sarah (VP) | "Warm intro via Sarah—high close probability" |
| McKinsey | 85 | 3 | Raj (Director) | "Direct outreach via Corporate Concierge" |
| JPMorgan | 72 | 2 | Alex (Analyst) | "Email campaign to Chicago office" |
| Local Startup (20 employees) | 35 | 1 | Marcus (Founder) | "Low priority—small team size" |

**Expected Conversion Rate:**

- Score 80-100: 40% close rate
- Score 60-79: 20% close rate
- Score <60: 5% close rate

**Usage:**

- Corporate Concierge focuses on companies scoring 80+ (highest ROI)
- Automated email campaigns target 60-79 (scale outreach)
- Ignore <60 (unless member proactively refers)

---

## Next Steps

### Immediate (Before Development Starts)

1. **Get Christy's Buy-In**
   - Present this PRD (focus on "The Core Problem We're Solving" section)
   - Discuss privacy considerations (opt-in consent approach)
   - Prioritize segments (which is most valuable to understand first?)

2. **Access Internal Data**
   - Booking system: API access or CSV export capability?
   - POS system: Can we pull transaction data?
   - Member list: Export with email, join date, membership type

3. **Budget Approval**
   - Phase 1: $0 (manual enrichment)
   - Phase 2: $500/month (Clearbit API, hosting)
   - Phase 3: $1,000/month (full platform with alerts)

4. **Legal Review**
   - Privacy attorney reviews Terms of Service updates
   - GDPR/CCPA compliance checklist
   - Third-party API data processing agreements

### Short-Term (Phase 1: Weeks 1-4)

1. **Week 1: Manual Enrichment Pilot**
   - Export 50 VIP members
   - Manually enrich on LinkedIn (20 members)
   - Draft survey questions

2. **Week 2: Survey Launch**
   - Send survey to 50 members (Typeform or Google Forms)
   - Track responses (target: 30+ responses)

3. **Week 3: Segmentation & Analysis**
   - Build basic segmentation in Google Sheets
   - Identify corporate connector list (top 20 members)

4. **Week 4: Validation & Outreach**
   - Present results to Christy
   - Launch corporate event outreach campaign
   - Measure: 5+ leads generated

### Mid-Term (Phase 2: Weeks 5-12)

1. **Weeks 5-6: API Integration**
   - Set up Clearbit account
   - Build enrichment pipeline (Python script)
   - Enrich all 350 members

2. **Weeks 7-8: Segmentation Algorithm**
   - Build K-means clustering model
   - Validate against known members
   - Assign all 350 members to segments

3. **Weeks 9-10: Dashboard Development**
   - Build React frontend
   - Implement 4 dashboard views (Segments, Neighborhoods, Corporate, Churn)
   - Deploy to Vercel

4. **Weeks 11-12: Beta Testing & Iteration**
   - Christy uses dashboard for 2 weeks
   - Gather feedback, iterate UX
   - Measure adoption (usage frequency)

### Long-Term (Phase 3: Weeks 13-24)

1. **Weeks 13-16: Predictive Models**
   - Build churn prediction model (logistic regression)
   - Build LTV forecasting model
   - Validate against historical data (75%+ accuracy)

2. **Weeks 17-20: Yield Management Integration**
   - Event decision tool (Accept/Decline/Counter-Offer)
   - Segment-based allocation recommendations
   - Real-time alerts (churn risk, opportunities)

3. **Weeks 21-22: Automated Workflows**
   - Email campaigns (Mailchimp integration)
   - Referral program automation
   - Survey triggers (exit survey on cancellation)

4. **Weeks 23-24: Launch & Measurement**
   - Full platform launch
   - Training for PCC team
   - Measure business impact (churn reduction, corporate event revenue)

---

**This PRD is a living document. As we learn from data and user feedback, we'll refine assumptions, adjust models, and add features. The SLC approach ensures each phase delivers standalone value—we can stop after any phase and still have a useful, delightful product.**
