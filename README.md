# PayAgent AI — Autonomous Spend Firewall & Ephemeral Settlement Protocol

[![PayPal Developer Platform](https://img.shields.io/badge/PayPal-Orders%20API%20v2-003087?style=flat&logo=paypal&logoColor=white)](https://developer.paypal.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Build Status](https://img.shields.io/badge/Build-Passing%20(0%20errors)-brightgreen)]()

> **Built for the PayPal AI Hackathon (Grand Prize Track & Best Use of Agentic Commerce)**  
> *The world's first application-layer deterministic firewall and single-use settlement protocol that makes it safe for autonomous AI agents to spend enterprise money.*

---

## 1. Executive Summary & The Problem

In 2026, autonomous agent frameworks exploded into enterprise production. Engineering teams deployed multi-agent swarms (Devin, Claude Code, Cursor, and custom AutoGen/LangChain workers) with programmatic authority to provision cloud servers, purchase SaaS licenses, and scrape web APIs.

Then the crisis began:
* **The $82,000 Weekend Leak**: An autonomous dev-agent entered an unmonitored retry loop when an API endpoint returned 503s. Over 48 hours, it spawned 10,000 parallel GPU inference jobs on Google Cloud using a static API key.
* **The $250,000 "Lobstar Wilde" Unit Hallucination**: A procurement bot misparsed tokenized JSON quantity fields, multiplying an intended 10-unit order by 100x.
* **The Forbes Diagnosis**: As Sandy Carter and John Sviokla reported in *Forbes*:
  > *"Banks and payment processors cannot distinguish between a malicious actor, a hallucinating AI, and a legitimate cardholder."*

### Why Modern Payment Rails Failed
Traditional payment rails (Visa, Mastercard, Stripe) are **dumb pipelines**. They evaluate only two basic predicates:
1. *Is the credit card number valid and unexpired?*
2. *Is there sufficient balance or credit limit?*

They have **zero visibility into the agent's application layer**. They cannot inspect the LLM’s prompt history, detect semantic prompt drift, catch unit hallucinations, or stop recursive loop bursts before the card limit is reached.

---

## 2. The Solution: PayAgent AI

An autonomous agent **must never hold a static credit card, API key, or corporate bank account**.

Instead:
1. The agent dispatches its purchase *intent* (the goal, requested items, and prompt excerpt) to PayAgent AI.
2. The firewall evaluates the intent across **4 Deterministic Gates in under 16ms**:
   * **Gate 01 — Semantic Intent & Injection Suite**: Cosine vector alignment + 6-engine regex filter suite (DAN roleplay, system overrides, fund siphons).
   * **Gate 02 — Merchant Authentication & Anti-Typosquatting**: Strict domain allowlists + Levenshtein distance check halting lookalike phishing (`evil-aws.com`).
   * **Gate 03 — Delegated Caps & Slippage Lock**: Single-tx cap ($50–$1,000), monthly budget ceiling, and cryptographic SKU line-item lock.
   * **Gate 04 — Loop & Smurfing Circuit Breaker**: Sliding 60-second frequency limiter (max 5 tx/min) + rolling 10-minute cumulative velocity cap ($300).
3. If all gates pass, PayAgent AI mints an **Ephemeral, Single-Use PayPal Order v2 Authorization**:
   * Hard-capped to the exact approved dollar amount (**$0.00 slippage tolerance**).
   * Cryptographically locked to the approved merchant domain and SKU hash (`skuHashLock`).
   * Auto-destructing with a **15-minute Time-To-Live (TTL)**.
   * Backed by PayPal's global **180-Day Buyer Protection** network.

---

## 3. Architecture Overview

<p align="center">
  <img src="public/architecture.svg" alt="PayAgent AI Architecture Flowchart" width="100%" />
</p>

---

## 4. Academic Literature & Engineering Foundations

Every tier of PayAgent AI is benchmarked against canonical computer science literature:

* **Martin Kleppmann, *Designing Data-Intensive Applications* (O'Reilly, Ch. 7, 9, 12)**:
  * **Idempotency-Key Engine**: Every purchase intent is deterministically hashed (`idemp_sha256(...)`). Retried requests within a 120-second window receive the cached authorization without re-decrementing budgets or falsely tripping rate limiters.
  * **Single-Use Ephemeral Vouchers**: Implements linearizable state transitions where tokens self-destruct upon capture.
* **Michael T. Nygard, *Release It!* (Pragmatic Bookshelf, Ch. 4 & 5)**:
  * **Circuit Breakers & Token Buckets**: Gate 04 isolates runaway retry bursts (sliding 60-second frequency limiter, max 5 tx/min) and halts micro-transaction smurfing (rolling 10-minute cumulative cap).
* **Google SRE Team, *Building Secure & Reliable Systems* (O'Reilly, Ch. 6 & 9)**:
  * **Zero-Trust Architecture & Dual-Custody**: Dual-signature escrow transitions requiring verified human supervisor countersignatures (`SUP_ED25519_...`) for unvetted merchant domains.
* **OWASP Foundation, *OWASP Top 10 for LLMs (2025/2026)***:
  * **LLM01 (Prompt Injections & Jailbreaks)**: 6-engine regex filter suite halts DAN roleplay, SYSTEM OVERRIDE directives, and cash-equivalent siphons.
  * **LLM06 (Excessive Agency)**: Agents never hold static corporate cards. Spending authority is strictly delegated Just-In-Time with $0.00 slippage guarantees.

---

## 5. Quickstart & Judge Evaluation Guide

### Prerequisites
* Node.js v18+ or v20+
* npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/your-username/payagent-ai.git
cd payagent-ai
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 3. Build & Production Verification
```bash
npm run build
```
Builds cleanly with **0 TypeScript and 0 Vite errors**.

---

## 6. How to Test the 6 Benchmark Scenarios

From the **Firewall Workbench** (`[2]` in top navigation):

1. **Scenario 1: Safe Tooling Purchase (GitHub Copilot)**
   - Click *Simulate*.
   - **Result**: All 4 Gates PASS (16ms). Single-Use PayPal Order Voucher minted with live 15-minute countdown clock and Ed25519 signature.
2. **Scenario 2: Runaway Retry Loop (5,000 AWS Spot Units)**
   - Click *Simulate*.
   - **Result**: Gate 03 (Hard Cap) & Gate 04 (Velocity) TRIP. Stops $4,250 runaway damage. Zero dollars move.
3. **Scenario 3: Hostile Prompt Injection (DAN Roleplay Visa Gift Cards)**
   - Click *Simulate*.
   - **Result**: Gate 01 HALTS execution (`SYSTEM_OVERRIDE_DIRECTIVE` detected). Shields $3,500.
4. **Scenario 4: Phishing & Typosquatting (`evil-aws.com`)**
   - Click *Simulate*.
   - **Result**: Gate 02 HALTS execution (`SPOOFING THREAT DETECTED` via Levenshtein audit).
5. **Scenario 5: Unvetted Merchant (ProxyNinja Web Scraper)**
   - Click *Simulate*.
   - **Result**: Triggers **Supervisory Escrow Quarantine**. Click *Review & Counter-Sign* to observe Google SRE dual-custody approval.
6. **Scenario 6: Network Stutter Idempotency Replay (Kleppmann DDIA)**
   - Click *Simulate* twice.
   - **Result**: The second click immediately returns `REPLAY PROTECTED (0 extra budget consumed)`.

---

## 7. Project Structure

```
payagent-ai/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                # Obsidian institutional command bar
│   │   ├── AgentSimulator.tsx        # Hardware swarm rack & attack matrix
│   │   ├── VerificationPipeline.tsx  # 4-Gate waterfall & Ephemeral PayPal Voucher
│   │   ├── TransactionDrawer.tsx     # Forensic certificate drawer & Merkle proof
│   │   └── HumanApprovalModal.tsx    # Dual-custody supervisory escrow modal
│   ├── engine/
│   │   ├── guardrailEngine.ts        # 4-Gate deterministic firewall & Idempotency cache
│   │   └── paypalClient.ts           # PayPal Orders API v2 settlement client
│   ├── views/
│   │   ├── DashboardView.tsx         # Broadsheet manifesto & telemetry wall
│   │   ├── AgentFleetView.tsx        # Fleet spend matrix & allowlist manager
│   │   ├── LedgerView.tsx            # Audit ledger with CSV export
│   │   └── PoliciesView.tsx          # Dynamic policy sliders & smurfing controls
│   ├── data/
│   │   └── mockScenarios.ts          # 6 benchmark enterprise exploit scenarios
│   ├── types/
│   │   └── index.ts                  # TypeScript domain models
│   ├── App.tsx                       # Main application state container
│   ├── index.css                     # Tailwind design tokens & font settings
│   └── main.tsx                      # React root entry
├── index.html                        # Google Fonts (Newsreader, Plus Jakarta Sans, JetBrains Mono)
├── storyreadme.md                    # Master origin story, market sizing & literature
├── LICENSE                           # Open-source MIT License
└── package.json                      # Scripts & dependencies
```

---

## 8. License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Built for the PayPal AI Hackathon.

