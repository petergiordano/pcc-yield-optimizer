# Demo Script: PCC Yield Optimizer
**Presenter**: Peter Giordano
**Audience**: Christy (PCC Partner)
**Duration**: 15-20 minutes
**Format**: Zoom screen share
**Goal**: Demonstrate data-driven approach to membership growth and revenue optimization

---

## Pre-Demo Setup

**Before the call:**
- [ ] Open application in browser (should land on Heatmap View)
- [ ] Have all 6 facilities selected in filter panel
- [ ] Close any browser dev tools/console
- [ ] Test screen share quality
- [ ] Have backup talking points ready for questions

---

## Data Sources Overview

### What Powers This Dashboard

1. **Google Maps Popular Times API**
   - Real-time hourly utilization data (0-100%) for all 6 facilities
   - 7 days × 24 hours = 168 time slots per facility
   - Reflects actual foot traffic patterns updated continuously

2. **Facility Intelligence Database**
   - **PCC** + 5 competitors: SPF Chicago, Big City Pickle West Loop, Pickle Haus, Grant Park Pickleball, Diversey Driving Range
   - Comprehensive data: locations, court counts, amenities, pricing, hours, customer segments
   - Sourced from: Google Maps, facility websites, public records

3. **CTA Transit GeoJSON**
   - Brown, Red, and Blue Line routes and station locations
   - Accessibility analysis for catchment area mapping
   - Source: City of Chicago Open Data Portal

4. **Member Density Data**
   - Geographic distribution of existing PCC members
   - Heatmap showing demand concentration across Chicago
   - *(Note: Currently using anonymized mock data for demo)*

5. **Proprietary Analytics**
   - Opportunity scoring algorithm (0-10 scale) - factors: demand gap, capacity, segment match, accessibility
   - Revenue potential calculations based on 400-member growth target
   - Competitive positioning metrics

---

## INTRODUCTION (2 minutes)

### Opening Hook
> **"Christy, I want to show you something that could change how we think about growing PCC's membership. What if we could see exactly when our competitors are packed and we have empty courts? What if we knew precisely which time slots represent the highest revenue opportunity?"**

### Context Setting
> **"For the past few weeks, I've been pulling together competitive intelligence from multiple sources. This dashboard analyzes real-time data from our competitors, maps it against our own utilization, and identifies specific growth opportunities."**

### Roadmap
> **"I'm going to walk you through 6 different views that tell a complete story:**
> 1. **Heatmap View** - See the competitive landscape at a glance
> 2. **Opportunity List** - Get specific, ranked opportunities with recommendations
> 3. **Gap Analysis** - Quantify exactly how much revenue we're leaving on the table
> 4. **Geographic Map** - Understand why location and accessibility matter
> 5. **Market Gaps** - Find times when demand is completely unserved
> 6. **Positioning** - See how to message PCC's competitive advantage
>
> **"At the end, you'll have 3-5 concrete actions we can take to grow membership this quarter. Sound good?"**

---

## 1. HEATMAP VIEW (3 minutes)
**Tab**: 📊 Heatmap View (already open)

### Opening Statement
> **"Alright, so this is the Competitive Intelligence Center. Each grid shows one week of hourly utilization for a facility. Darker red means busier, white means empty."**

### Key Points to Highlight

#### A. Show PCC vs. SPF Side-by-Side
> **"Let's start with us versus our biggest competitor, SPF Chicago."**
> - **Point to PCC grid**: "Notice Tuesday evenings around 7pm - we're orange/yellow, maybe 50-60% full"
> - **Point to SPF grid**: "Now look at SPF at the same time - deep red, they're at 85-90% capacity"
> - **Conclusion**: "That means there are customers who want to play Tuesday at 7pm, they're going to SPF, and SPF is turning people away or has a waitlist. But we have courts available."

#### B. Explain Green Borders
> **"See these green borders on certain time slots?"**
> - "Those are what we call 'High Opportunities' - times when we have capacity AND 2+ competitors are busy"
> - **Click on a green-bordered cell** (e.g., Thursday 6pm): "This tooltip shows exactly what's happening. PCC is at 45%, but SPF is 88%, Big City is 82%. That's a gap we can exploit."
> - "The number in the green badge tells us how many competitors are at capacity"

#### C. Identify Patterns
> **"This is where it gets interesting - look for patterns."**
> - **Weekday evenings 6-8pm**: "Across the board, competitors are red but we're yellow. That's systematic underperformance on our most valuable hours"
> - **Saturday mornings 9-11am**: "Similar story - high competitor demand, we have availability"
> - "These aren't random - these are weekly patterns we can build programming around"

### Transition to Next Tab
> **"So we can SEE the opportunities visually. But which ones should we prioritize? Let's look at the Opportunity List."**

---

## 2. OPPORTUNITY LIST (4 minutes)
**Tab**: ✨ Opportunity List

### Opening Statement
> **"This tab takes every single time slot where there's an opportunity and scores it 0-10 based on multiple factors: demand gap, our capacity, customer segment match, geographic overlap, and accessibility."**

### Key Points to Highlight

#### A. Review Top Opportunity
> **"Let's look at the #1 ranked opportunity."**
> - **Read the card**: "Thursday 6pm - Score 8.7 out of 10"
> - **Metrics**: "We're at 45% while market peak is 88% - that's a 43 percentage point gap"
> - **Estimated customers**: "We could capture approximately 35 customers at this time slot"

#### B. Walk Through the WHO/WHERE/HOW/WHY
> **"What I love about this is it breaks down exactly HOW to capture this opportunity:"**

**WHO**:
> "Busy competitors: SPF (88%), Big City Pickle (82%) - these facilities are full of competitive players and fitness enthusiasts who match our target segments"

**WHERE**:
> "Geographic overlap is high - we're competing for the same catchment area around the northwest side"

**HOW**:
> "Recommended channels: Instagram ads targeting pickleball players, Google Ads for 'pickleball near me', email campaign to waitlist"

**WHY**:
> "Why Thursday 6pm specifically? Working professionals want prime time after work. SPF is saturated, we're not. We have a competitive advantage."

#### C. Show the Recommendation
> **"Here's what the system recommends:"**
> - **Read the recommendation**: "Create 'Thursday Competitive Night' at 6pm. Host skill-based tournament. Target: 35 serious players."
> - **Action buttons**: "We could click 'Create Event' or 'Launch Campaign' and the system would generate the event details, pricing, targeting parameters"
> - "This isn't theory - it's actionable intelligence"

#### D. Scan Down the List
> **"And it's not just one opportunity:"**
> - Scroll to show 5-10 more opportunities
> - "We have 30+ high-scoring opportunities across the week. Each one is a revenue opportunity we're currently missing"

### Transition to Next Tab
> **"Okay, so we know WHAT the opportunities are and HOW to capture them. But how much money are we talking about? Let's quantify it."**

---

## 3. GAP ANALYSIS (3 minutes)
**Tab**: 📈 Gap Analysis

### Opening Statement
> **"This view answers one question: How much revenue are we leaving on the table?"**

### Key Points to Highlight

#### A. Explain the Grid
> **"Each cell shows PCC's utilization compared to the market maximum."**
> - "White/green means we're performing well - close to or exceeding market max"
> - "Orange/red means there's a gap - we're underperforming"
> - **Point to a red cell**: "This dark red Thursday 6pm? We're at 45%, market max is 88%. That's a 43% gap."

#### B. Calculate Revenue Potential
> **"Let's do the math on just ONE time slot:"**
> - "43% gap × 7 courts × 4 players per court = about 12 additional court hours"
> - "If we can fill that gap even halfway, that's 6 additional court hours/week"
> - "At our membership model: 6 hours × 4 weeks = 24 additional member-hours/month"
> - "If we convert those to memberships or drop-ins, that's roughly $3,600/month or **$43,000 annually** from ONE time slot"

> **"Now multiply that across 30+ opportunity slots..."**

#### C. Prime Time Focus
> **"Look at the whole grid - where are the biggest gaps?"**
> - **Highlight weekday evenings 6-9pm**: "Prime time. This is when people WANT to play and WILL pay premium rates"
> - "We're leaving **$60,000-$80,000 annual recurring revenue** on the table by not capturing these prime time slots"
> - "That's 40-50 new members we're not converting"

#### D. Link to Target
> **"Remember, our goal is 400 members, right?"**
> - "We're at [current number]. To get to 400, we need [gap] more members"
> - "This data shows us exactly WHERE those members are - they're currently going to SPF and Big City on Thursday nights, Tuesday evenings, Saturday mornings"
> - "We just need to give them a reason to come here instead"

### Transition to Next Tab
> **"So far we've seen WHAT opportunities exist and HOW MUCH they're worth. But WHY are customers choosing competitors over us? Let's look at location and accessibility."**

---

## 4. GEOGRAPHIC MAP (3 minutes)
**Tab**: 🗺️ Geographic Map

### Opening Statement
> **"This map shows all 6 facilities, their catchment areas, transit accessibility, and member density. It helps us understand the competitive dynamics of location."**

### Key Points to Highlight

#### A. Facility Clustering
> **"First, notice how close we are to competitors."**
> - **Point to PCC (blue) and SPF (red)**: "SPF is only 0.8 miles from us - we're competing for the same customers"
> - "The circles show 15-minute drive time catchment areas"
> - **Show overlap**: "See this overlap? About 60% of SPF's catchment area overlaps with ours. We're fishing in the same pond."

#### B. Transit Accessibility
> **"Now let's layer in CTA transit lines."**
> - **Toggle on CTA Transit**: "Brown Line runs near both of us"
> - **Point to Irving Park station**: "We're 12 minutes walk from Irving Park - that's accessible for transit-dependent customers"
> - **Compare to SPF**: "SPF is farther from transit - that's actually an ADVANTAGE for us"
> - "We should be marketing to people without cars: 'Train-accessible pickleball - 12 min from Irving Park'"

#### C. Member Density (if available)
> **"The red heatmap overlay shows where pickleball demand is concentrated."**
> - "Darker red = more members/demand"
> - **Point to hot zones**: "High demand in Lakeview, Lincoln Park, Bucktown"
> - "We're positioned in a strong demand zone, but so is SPF - which is why Thursday nights are such a battleground"

#### D. Strategic Insight
> **"Here's the takeaway:"**
> - "Location-wise, we're well-positioned"
> - "We have a transit accessibility advantage over SPF"
> - "The question isn't 'are customers nearby?' - they are. The question is 'why are they choosing SPF on Thursday nights?'"
> - "Answer: SPF is full. They're turning people away. We just need to capture that overflow."

### Transition to Next Tab
> **"We've talked about times when WE have capacity and competitors are busy. But are there times when EVERYONE is busy or closed? Let's find completely unserved demand."**

---

## 5. MARKET GAPS (2 minutes)
**Tab**: 🎯 Market Gaps

### Opening Statement
> **"This heatmap shows when 4, 5, or even all 6 competitors are either closed or at capacity simultaneously. Dark red = big market gap."**

### Key Points to Highlight

#### A. Find Systematic Gaps
> **"Look for patterns in dark red:"**
> - **Point to Monday 6am-7am**: "See this dark red? 5 competitors are closed - most don't open until 7 or 8am"
> - "But there IS early-bird demand - people who want to play before work"
> - **Question**: "Should we consider opening at 6am on weekdays?"

> - **Point to Saturday 10am-12pm**: "Saturday morning - this is interesting. 4 competitors are at or near capacity"
> - "That means families and recreational players are competing for court time and some are getting shut out"
> - "Opportunity: 'Saturday Family Pickleball' - market to families who can't get into Grant Park or Diversey"

#### B. Strategic Insights
> **"What's powerful about this view is it shows UNSERVED demand:"**
> - "These aren't times when customers are choosing competitors over us"
> - "These are times when customers WANT to play, can't find availability, and either give up or go to a less desirable option"
> - "If PCC is open and marketing during these gaps, we're capturing demand no one else is serving"

#### C. Extended Hours Opportunity
> **"One big strategic question this raises:"**
> - "Should we extend hours? Monday-Friday 6am opening? Sunday evenings?"
> - "This data helps us answer that question with evidence, not guesswork"
> - "If there's a systematic gap when we're closed but demand exists, that's a data-driven case for extended hours"

### Transition to Next Tab
> **"Alright, last view. We've identified opportunities, quantified revenue, understood geography, found unserved demand. Now the final question: How do we MESSAGE all this? How do we position PCC competitively?"**

---

## 6. POSITIONING (2 minutes)
**Tab**: 📈 Positioning

### Opening Statement
> **"This scatter plot shows all 6 facilities positioned by monthly price (X-axis) versus amenities score (Y-axis). Bubble size is court count."**

### Key Points to Highlight

#### A. Locate PCC
> **"The blue bubble is us."**
> - **Point to PCC position**: "We're at $149/month - mid-market pricing"
> - "But notice our amenities score - we're HIGH. 85/100"
> - "Why? Café, bar, pro shop, lounge, fitness area. We're not just courts - we're a clubhouse."

#### B. Compare to SPF
> **"Now look at SPF."**
> - **Point to SPF**: "Similar price point - around $150/month"
> - "But lower amenities score - they have courts and basic amenities, but no café, no bar"
> - "We're in a better quadrant: similar price, MORE value"

#### C. Identify Competitive Advantage
> **"This chart tells us our positioning:"**
> - "We're in the 'Best Value' quadrant: moderate price, high amenities"
> - **Strategic message**: "Premium experience without premium price"
> - "That's what we should be saying in EVERY campaign"

#### D. Apply to Marketing
> **"When we launch that Thursday Competitive Night campaign targeting SPF overflow:"**
> - "The message isn't just 'we have availability'"
> - "The message is: 'Why pay the same for just courts? PCC gives you courts PLUS café, bar, pro shop, lounge - same price as SPF, way more experience'"
> - "That's differentiated positioning based on data, not hunches"

### Transition to Conclusion
> **"Alright Christy, let me bring this all together."**

---

## CONCLUSION (3 minutes)

### Recap the Journey
> **"So in the last 15 minutes, we've gone on a complete journey:"**
>
> 1. **Heatmap View**: We SAW the competitive landscape - identified that Thursday 6pm is a massive opportunity
> 2. **Opportunity List**: We PRIORITIZED it - scored 8.7/10, estimated 35 customers, got specific recommendations
> 3. **Gap Analysis**: We QUANTIFIED it - $43k annually from just that one slot, $60-80k from all prime time gaps
> 4. **Geographic Map**: We UNDERSTOOD it - we're 0.8 miles from SPF, have transit advantage, competing for same customers
> 5. **Market Gaps**: We EXPANDED it - found unserved demand in early mornings and Saturday peaks
> 6. **Positioning**: We MESSAGED it - "premium experience without premium price" is our competitive advantage
>
> **"That's not guesswork. That's data-driven strategy."**

### Immediate Next Step
> **"Here's what I recommend we do THIS WEEK:"**
>
> 1. **Launch Thursday Competitive Night**
>    - Time: 6pm-8pm every Thursday
>    - Format: Skill-based tournament or league play
>    - Target: Competitive players currently going to SPF
>    - Marketing: Instagram/Google ads with 2-mile radius around SPF
>    - Message: "SPF full? We've got courts + café + bar"
>    - Investment: $150 ad spend
>    - Expected outcome: 10-15 new Thursday regulars in first month
>
> 2. **Test Saturday Family Programming**
>    - Time: 10am-12pm Saturdays
>    - Format: Family doubles mixer
>    - Target: Families shut out of Grant Park/Diversey
>    - Marketing: Facebook community groups, family-focused messaging
>    - Message: "While public courts are packed, PCC has space + amenities"
>
> 3. **Update All Marketing Materials**
>    - Lead with: "Premium experience without premium price"
>    - Highlight: Café, bar, pro shop vs. competitors' basic offerings
>    - Emphasize: Transit accessibility for car-free players

### Long-Term Vision
> **"But Christy, this is just scratching the surface:"**
> - "Imagine updating this data weekly - tracking which campaigns work, which don't"
> - "Imagine A/B testing: we run two different Thursday formats, see which captures more customers"
> - "Imagine seasonal patterns: maybe Saturday mornings are winter opportunities when outdoor courts close"
> - "This isn't a one-time analysis - this becomes our growth operating system"
>
> **"The path to 400 members isn't mysterious anymore. It's right here in the data. We just have to execute."**

### Final Question
> **"So, what do you think? Should we pull the trigger on Thursday Competitive Night and see what happens?"**

---

## Handling Likely Questions

### Q: "How accurate is this Google Maps data?"
**A**: "Great question. Google Maps Popular Times is based on anonymized location data from millions of Android users. It's the same data Google uses to show 'busy times' on Google Maps search results. Industry research shows it's 85-90% accurate for high-traffic venues. We can validate it by visiting SPF on a Thursday at 6pm and seeing if it matches - I'm confident it will."

### Q: "What if we launch Thursday Night and no one shows up?"
**A**: "That's why we start with targeted, low-cost testing. $150 ad spend is minimal risk. We're not committing to a huge overhead cost - we're testing a hypothesis with data backing it. If it fails, we learn. But the data says SPF is at 88% on Thursdays and turning people away - those people need somewhere to go. We should be that somewhere."

### Q: "How much time did you spend building this?"
**A**: "I've been working on this for a few weeks in my spare time - learning some data analysis tools, pulling together APIs, designing the dashboards. But the important part isn't how long it took to BUILD - it's how much faster we can GROW with this intelligence. One successful campaign could add 20 members = $36,000 annual revenue. That's ROI."

### Q: "Can we track results in here?"
**A**: "Not yet - this is a competitive intelligence tool, not a CRM. But that's the next step. We could integrate with our booking system, track which campaigns drive which bookings, measure conversion rates. Then we have a closed loop: Identify opportunity → Launch campaign → Track results → Optimize. That's the vision."

### Q: "Should we be worried about competitors seeing this?"
**A**: "This is internal intelligence for our strategy only. We're using publicly available data (Google Maps, facility websites, city data) and analyzing it in ways that give us a competitive edge. It's not about stealing - it's about being smarter. And honestly, if SPF is at 88% capacity on Thursdays, they're already winning. We're just trying to capture the overflow they can't serve."

### Q: "What about other opportunities besides Thursday 6pm?"
**A**: "There are 30+ scored opportunities in the Opportunity List. Thursday 6pm is just the highest-scoring. We could run 3-4 campaigns simultaneously: Thursday nights, Saturday mornings, Tuesday evenings, maybe early weekday mornings. The data gives us a prioritized backlog. We pick the top 3, execute, measure, iterate."

---

## Backup: Deep Dive Topics (If Time Allows)

### Opportunity Scoring Algorithm
"The 0-10 score is calculated from multiple factors:
- **Demand Gap** (40% weight): How much higher is competitor demand vs. our utilization?
- **Capacity** (25% weight): Do we have courts available?
- **Segment Match** (20% weight): Do competitor customers match our target segments?
- **Geographic Overlap** (10% weight): How much catchment area do we share?
- **Accessibility** (5% weight): Transit, parking, walkability advantages"

### Customer Segments
"We've identified 4 core segments:
1. **Competitive Players** (40% of our target): Serious athletes, tournament players, high skill level
2. **Fitness Enthusiasts** (30%): Health-focused, consistent players, appreciate gym/fitness amenities
3. **Social Players** (20%): Recreational, looking for community and fun, value café/bar
4. **Families** (10%): Parents with kids, weekend players, need flexible scheduling

Our amenities (café, bar, lounge) appeal most to segments 2-4, giving us an edge over court-only competitors."

### Revenue Model Assumptions
"Our $43k annual revenue calculation assumes:
- 43% gap = 12 additional court-hours/week at Thursday 6pm
- 50% conversion rate (conservative) = 6 court-hours captured
- Mix of memberships ($149/mo) and drop-ins ($25/session)
- 4 weeks/month, 12 months/year
- Accounts for churn and seasonality

This is a conservative estimate - actual results could be higher if we execute well."

---

## Post-Demo Action Items

**If Christy says YES:**
1. [ ] Schedule campaign planning session (this week)
2. [ ] Draft Thursday Competitive Night event description
3. [ ] Design Instagram/Facebook ad creative
4. [ ] Set up Google Ads campaign targeting 2-mile radius
5. [ ] Create landing page for event registration
6. [ ] Plan internal staffing for increased Thursday demand
7. [ ] Set KPIs: # registrations, # show-ups, # conversions to memberships

**If Christy wants to think about it:**
1. [ ] Send summary deck with key screenshots
2. [ ] Offer to do deeper dive on specific opportunities
3. [ ] Provide competitive research reports (SPF, Big City Pickle)
4. [ ] Schedule follow-up in 3-5 days

**If Christy has concerns:**
1. [ ] Address specific objections with data
2. [ ] Offer pilot test with minimal investment ($50 ad spend)
3. [ ] Provide case studies from other industries using similar approaches
4. [ ] Adjust recommendations based on her feedback

---

## Technical Notes for Presenter

- **Browser**: Use Chrome for best performance
- **Screen Resolution**: 1920×1080 or higher for clarity
- **Tab Navigation**: Use mouse clicks, not keyboard shortcuts (more visible)
- **Scrolling**: Slow, deliberate scrolling - give Christy time to absorb
- **Cursor**: Use cursor to point at specific cells/metrics as you speak
- **Pace**: Pause after each major point for questions
- **Energy**: Enthusiastic but not overwhelming - this is collaborative, not a sales pitch

---

## Success Metrics for This Demo

**Demo is successful if Christy:**
1. ✅ Understands the concept of competitive intelligence for growth
2. ✅ Sees the specific revenue opportunity in 1-2 time slots
3. ✅ Agrees to test at least ONE campaign (Thursday Night or Saturday Family)
4. ✅ Is excited about the potential, not skeptical
5. ✅ Wants to be involved in planning next steps

**Demo needs follow-up if Christy:**
- Seems overwhelmed by data/complexity → Simplify to top 3 opportunities only
- Questions data accuracy → Offer to manually validate SPF data
- Concerns about execution bandwidth → Propose phased rollout (1 campaign first)
- Wants more detail → Schedule technical deep dive with dashboards

---

**Good luck! You've got the data, you've got the story, you've got the vision. Now make it compelling and collaborative. Christy is your partner - show her how data can be her superpower too.** 🚀
