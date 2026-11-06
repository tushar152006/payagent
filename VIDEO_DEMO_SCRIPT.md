# 3-Minute Video Demo Script & Storyboard: PayAgent AI

**Target Runtime:** Exactly 2 Minutes 45 Seconds (165 Seconds)  
**Safety Buffer:** 15 Seconds under the strict 3:00 minute hard limit  
**Platform:** YouTube (Public or Unlisted link submitted to Devpost)  
**Resolution:** 1080p (1920x1080), 60fps  
**Tone:** Confident, energetic, authoritative, clear fintech founder tone  

---

## Screen-by-Screen Storyboard & Voiceover

### SECTION 1: THE HOOK & THE CRISIS (0:00 – 0:25 | 25s)
* **Screen View:** Full screen on [`DashboardView.tsx`](http://localhost:3000), starting with the top Broadsheet Manifesto headline and Forbes callout. Cursor highlights the $89,750 Shielded Rogue Capital metric.
* **Voiceover:**
  > *"In 2026, autonomous AI swarms—Devin, Claude Code, and AutoGen fleets—gained the authority to buy cloud servers, SaaS licenses, and APIs.*
  > *Then the nightmare began: one runaway retry loop burned $82,000 over a weekend on Google Cloud. A procurement bot hallucinated a 100x quantity multiplier, ordering $250,000 in compute.*
  > *As Forbes diagnosed: modern payment rails are dumb pipes. They cannot distinguish between a malicious actor, a hallucinating AI, and a legitimate cardholder.*
  > *This is PayAgent AI: the world’s first pre-execution spend firewall and single-use settlement protocol built natively on PayPal Orders v2."*

---

### SECTION 2: THE 4-GATE DETERMINISTIC ARCHITECTURE (0:25 – 0:50 | 25s)
* **Screen View:** Scroll down smoothly to the **Deterministic 4-Gate Execution Waterfall** on the Dashboard. Hover over Gate 01, Gate 02, Gate 03, Gate 04.
* **Voiceover:**
  > *"Instead of handing static credit cards or bank access to autonomous software, every purchase intent is intercepted by our deterministic firewall in under 16 milliseconds.*
  > *Gate 01 tests semantic intent and runs a 6-suite regex engine catching DAN jailbreaks.*
  > *Gate 02 enforces domain authentication and Levenshtein anti-typosquatting.*
  > *Gate 03 locks strict dollar caps and $0.00 slippage tolerances.*
  > *And Gate 04 deploys a Token Bucket circuit breaker to instantly trip on recursive retry loops.*
  > *Let’s see this live in the testing workbench."*

---

### SECTION 3: LIVE ATTACK SIMULATION WORKBENCH (0:50 – 1:45 | 55s)
* **Screen View:** Click **Firewall Workbench** tab (`[2]`). Show the full-width Agent Swarm Hardware Rack at the top, then test the benchmark scenarios on the left.
* **Action 1 (Rogue Loop):** Click *Simulate* on *"Rogue: 5,000 AWS Units (Lobstar/Cursor Loop)"*.
* **Voiceover:**
  > *"Here is our autonomous fleet. First, let's inject a rogue 5,000-unit loop attempting to spend $4,250 on AWS spot nodes. We click Simulate.*
  > *In 16 milliseconds, Gate 03 and Gate 04 trip. The transaction is instantly aborted pre-mint. Zero dollars move. $4,250 shielded."*
* **Action 2 (Typosquat Phishing):** Click *Simulate* on *"Phishing: Lookalike Vendor Spoofing (evil-aws.com)"*.
* **Voiceover:**
  > *"Next, an attacker tries typosquatting—redirecting an agent to `evil-aws.com`. Gate 02 executes a Levenshtein audit, detects the spoofing threat, and immediately halts execution."*
* **Action 3 (Safe Purchase):** Click *Simulate* on *"Normal: GitHub Copilot Seat Renewal"*.
* **Voiceover:**
  > *"Now, a verified $19 developer seat renewal. All 4 gates pass. Watch what happens:*
  > *PayAgent mints a Single-Use Ephemeral PayPal Order Voucher! It carries a live 15-minute countdown clock, a cryptographic SKU Line-Item Lock, a strict zero slippage guarantee, and 180-day buyer protection."*
* **Action 4 (Idempotency Replay):** Click *Simulate* on *"Idempotency Replay: Network Stutter Safe Retry"*.
* **Voiceover:**
  > *"Finally, benchmarked against Martin Kleppmann’s Designing Data-Intensive Applications: if the agent retries due to a network stutter, our Idempotency Key cache returns the cached verdict with zero duplicate charges and keeps the circuit breaker closed."*

---

### SECTION 4: AGENT FLEET GOVERNANCE & SUPERVISORY ESCROW (1:45 – 2:10 | 25s)
* **Screen View:** Click **Agent Fleet & Caps** tab (`[3]`). Click through the quick-switch cap buttons ($50, $100, $250, $500), add a vendor to the allowlist, and copy the Ed25519 session key.
* **Voiceover:**
  > *"For FinOps leaders, our Agent Fleet Governance studio gives granular control over every autonomous entity.*
  > *Managers set single-transaction hard caps with one click, define monthly budget burn runways, and maintain an enterprise merchant domain allowlist.*
  > *If an agent ever requests an unvetted vendor, funds are held in secure escrow until a verified human supervisor countersigns with a Google SRE dual-custody signature."*

---

### SECTION 5: AUDIT LEDGER & CRYPTOGRAPHIC PROOF-OF-INTENT (2:10 – 2:30 | 20s)
* **Screen View:** Click **Audit Ledger** tab (`[4]`). Filter by *Blocked*, then click a transaction to open the slide-over **Transaction Certificate Drawer**. Point out the Proof-of-Intent Hash Chain and the CSV export button.
* **Voiceover:**
  > *"For compliance officers, our Audit Ledger maintains an immutable, exportable accounting registry.*
  > *Every event links the raw LLM prompt excerpt, the exact rule code, the PayPal Order ID, and an Ed25519 Merkle Proof-of-Intent hash chain, satisfying OWASP LLM06 Excessive Agency defense."*

---

### SECTION 6: CLOSING & THE PAYPAL MOAT (2:30 – 2:45 | 15s)
* **Screen View:** Return to the **Executive Command** dashboard (`[1]`). Zoom out slightly showing the full, pristine UI and PayPal Trust Anchor card.
* **Voiceover:**
  > *"Unlike irreversible crypto rails that leave enterprises exposed, PayAgent leverages PayPal’s 400-million merchant network and 180-day buyer protection as the ultimate trust anchor.*
  > *Autonomous agents are the future of software. PayAgent AI makes sure they spend safely.*
  > *Thank you."*

---

## Recording Tips for Maximum Score
1. **Resolution:** Use Chrome/Edge at 100% zoom (1920x1080) for crisp typography.
2. **Audio:** Use a clean external microphone with no background noise or echo.
3. **Pacing:** Speak with confidence and clear rhythm; do not rush, but do not leave dead air between clicks.
4. **YouTube Settings:** Set video title to:  
   `PayAgent AI — Autonomous Spend Firewall & Ephemeral Settlement Protocol (PayPal AI Hackathon)`
5. **Set Video Privacy:** Set to **Public** or **Unlisted** (Devpost judges cannot access Private videos).

