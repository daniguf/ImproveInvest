# 📋 Record of Processing Activities (RoPA)

**GDPR Article 30 Compliance Document**

| Field                | Details                                 |
| -------------------- | --------------------------------------- |
| **Controller**       | Improve Invest A/S                      |
| **Address**          | Strandvejen 125, 2900 Hellerup, Denmark |
| **CVR**              | 44720795                                |
| **Contact**          | info@improveinvest.com                  |
| **DPO/Responsible**  | [To be assigned / Board of Directors]   |
| **Document Version** | 1.0                                     |
| **Last Updated**     | 20-04-2026                            |
| **Next Review**      | Annual or upon material change          |

> ⚠️ **Important Note on Analytics**:  
> While legacy legal text references Google Analytics, technical audit confirms **no analytics scripts are currently active** in the codebase. This RoPA reflects _actual_ processing activities. If analytics are added in the future, this document must be updated _before_ deployment, and consent gating must be implemented.

---

## 🔹 Processing Activity #1: Website Visit & Basic Functionality

| Field                       | Details                                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Enable website functionality, serve content, maintain security, and log basic access for operational purposes.                                                |
| **Legal Basis**             | Art. 6(1)(f) GDPR – Legitimate Interest (security, uptime, basic analytics-free operation).                                                                   |
| **Data Categories**         | • IP address (anonymized server-side)<br>• User-Agent string (truncated)<br>• Request timestamp<br>• Requested URL path<br>• HTTP status code                 |
| **Data Subjects**           | All website visitors (anonymous, no login required).                                                                                                          |
| **Recipients / Processors** | • Hosting provider (Vercel/other)<br>• Internal technical team (access logs for debugging)                                                                    |
| **International Transfers** | Hosting infrastructure may involve US/EU servers. Safeguards: EU-US Data Privacy Framework (DPF) or Standard Contractual Clauses (SCCs) with provider.        |
| **Retention Period**        | Server access logs: **90 days** (automated rotation). Anonymized aggregate metrics may be kept indefinitely.                                                  |
| **Security Measures**       | • TLS 1.3 encryption in transit<br>• IP anonymization (last octet removed for IPv4)<br>• No PII stored in logs<br>• Access restricted to authorized personnel |
| **DSAR Process**            | Anonymous logs cannot be linked to individuals. If a user provides sufficient identifying info (e.g., exact timestamp + IP), logs can be searched manually.   |

---

## 🔹 Processing Activity #2: Cookie Consent Management

| Field                       | Details                                                                                                                                                                                                                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Record and manage user consent for non-essential cookies; ensure compliance with ePrivacy Directive and GDPR Art. 7.                                                                                                                                                                                 |
| **Legal Basis**             | Art. 6(1)(a) GDPR – Explicit Consent (for analytics/marketing cookies). Essential cookies rely on Art. 6(1)(f).                                                                                                                                                                                      |
| **Data Categories**         | • Consent state (essential/analytics/marketing booleans)<br>• Policy version accepted<br>• Locale preference<br>• Session ID (ephemeral, sessionStorage)<br>• Anonymized IP address<br>• User-Agent (truncated)<br>• Timestamp of consent<br>• SHA-256 hash chain + HMAC signature (audit integrity) |
| **Data Subjects**           | All website visitors who interact with the cookie banner.                                                                                                                                                                                                                                            |
| **Recipients / Processors** | • File-based audit log (`logs/consent-audit.log`) stored on application server<br>• Internal compliance team (for DSAR fulfillment)                                                                                                                                                                  |
| **International Transfers** | None. Consent logs are stored locally/EU-hosted. No third-party processors for this activity.                                                                                                                                                                                                        |
| **Retention Period**        | • Active consent records: **365 days** (auto-expire per EDPB guidance)<br>• Archived/Anonymized audit logs: **5 years** (for regulatory defense)<br>• After retention: secure deletion or irreversible anonymization                                                                                 |
| **Security Measures**       | • SHA-256 hash chaining (tamper-evident)<br>• HMAC-SHA256 signatures (when `CONSENT_LOG_HMAC_SECRET` set)<br>• IP anonymization before storage<br>• File permissions restricted to application user<br>• Regular integrity verification via `/api/consent-log` GET endpoint                          |
| **DSAR Process**            | Users may request export or anonymization of their consent record via `/api/gdpr/manage` (admin-authenticated). Search by session ID or anonymized IP.                                                                                                                                               |

---

## 🔹 Processing Activity #3: Contact Form Submissions

| Field                       | Details                                                                                                                                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Enable communication with potential clients, answer inquiries, and initiate business relationships.                                                                                                                                                                                     |
| **Legal Basis**             | • Art. 6(1)(a) GDPR – Explicit Consent (via mandatory checkbox)<br>• Art. 6(1)(f) GDPR – Legitimate Interest (responding to business inquiries)                                                                                                                                         |
| **Data Categories**         | • First name<br>• Last name<br>• Email address<br>• Phone number (optional)\*<br>• Subject line<br>• Message content<br>• Consent timestamp & policy version<br>• Locale at time of submission                                                                                          |
| **Data Subjects**           | Individuals submitting inquiries via the website contact form.                                                                                                                                                                                                                          |
| **Recipients / Processors** | • **Resend** (email delivery service)<br>• Internal team members (email inbox access)<br>• [Optional] CRM if manually imported later                                                                                                                                                    |
| **International Transfers** | Resend may process data in the US. Safeguards: Resend participates in EU-US Data Privacy Framework (DPF) and offers SCCs. Verify current status at [resend.com/dpa](https://resend.com/dpa).                                                                                            |
| **Retention Period**        | • Email submissions: Deleted from inbox **30 days** after inquiry resolution (manual process)<br>• Consent audit record: Retained per Activity #2 schedule<br>• _Phone numbers_: Only retained if contextually necessary for service delivery; otherwise deleted after initial contact. |
| **Security Measures**       | • TLS encryption in transit (Resend API)<br>• Explicit consent checkbox with validation<br>• Server-side Zod validation<br>• No automatic storage in application database<br>• Access to Resend dashboard restricted to authorized personnel                                            |
| **DSAR Process**            | • Consent logs: Export/anonymize via `/api/gdpr/manage`<br>• Email content: Manual search in Resend dashboard or email client; export or delete upon verified request. Document fulfillment in internal DSAR tracker.                                                                   |

> _\* Phone number justification: Collected to enable direct follow-up for time-sensitive inquiries. Made optional in schema where not strictly necessary. Document business justification internally._

---

## 🔹 Processing Activity #4: Locale Preference Cookie

| Field                       | Details                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Remember user's language selection to provide localized content without repeated prompts.                                                           |
| **Legal Basis**             | Art. 6(1)(f) GDPR – Legitimate Interest (strictly necessary for requested service). Exempt from consent under ePrivacy Directive Art. 5(3).         |
| **Data Categories**         | • Locale code (`da`, `en`, or `de`)                                                                                                                 |
| **Data Subjects**           | Website visitors who change language preference.                                                                                                    |
| **Recipients / Processors** | • Browser (client-side cookie)<br>• Next.js middleware (server-side reading)                                                                        |
| **International Transfers** | None. Cookie is stored client-side; no transmission to third parties.                                                                               |
| **Retention Period**        | **1 year** (cookie expiration). Automatically deleted by browser thereafter.                                                                        |
| **Security Measures**       | • Cookie marked `SameSite=Lax`, `Secure` (in production)<br>• No PII or tracking identifiers included<br>• Value limited to predefined locale codes |
| **DSAR Process**            | Cookie contains no personal data beyond language preference. No action required for DSARs related solely to this cookie.                            |

---

## 🔹 Processing Activity #5: Content Management (Sanity CMS)

| Field                       | Details                                                                                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Create, edit, and publish website content (projects, ESG policy, GDPR page, etc.).                                                                                          |
| **Legal Basis**             | Art. 6(1)(f) GDPR – Legitimate Interest (business operation and content delivery).                                                                                          |
| **Data Categories**         | • Published content (text, images, metadata)<br>• Editor account metadata (name, email, role – internal staff only)<br>• Revision history (internal audit)                  |
| **Data Subjects**           | • Internal staff/editors (account data)<br>• _No visitor PII is stored or processed via Sanity_                                                                             |
| **Recipients / Processors** | • **Sanity.io** (headless CMS platform)                                                                                                                                     |
| **International Transfers** | Sanity operates globally. Safeguards: Sanity offers DPA with SCCs and complies with EU-US DPF. Verify at [sanity.io/legal](https://www.sanity.io/legal).                    |
| **Retention Period**        | • Content: Retained until manual deletion<br>• Editor accounts: Deleted within 30 days of staff departure<br>• Revision history: Retained for 2 years for operational audit |
| **Security Measures**       | • Role-based access control (RBAC)<br>• Two-factor authentication (2FA) for editor accounts<br>• API token restrictions<br>• Audit log of content changes                   |
| **DSAR Process**            | Sanity does not process visitor PII. For staff account DSARs: export or delete via Sanity dashboard upon HR request.                                                        |

---

## 🔹 Processing Activity #6: [Placeholder] Analytics / Tracking (NOT CURRENTLY ACTIVE)

| Field                       | Details                                                                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | _[If implemented]_ Understand user behavior to improve website usability and content relevance.                                                                               |
| **Legal Basis**             | Art. 6(1)(a) GDPR – **Explicit Consent Required** (opt-in only).                                                                                                              |
| **Data Categories**         | _[Example if GA added]_ Page views, session duration, referral source, device type, anonymized IP.                                                                            |
| **Data Subjects**           | Website visitors who consent to analytics.                                                                                                                                    |
| **Recipients / Processors** | _[Example]_ Google Analytics (Google LLC)                                                                                                                                     |
| **International Transfers** | _[Example]_ US transfers covered by EU-US DPF + SCCs. IP anonymization enabled.                                                                                               |
| **Retention Period**        | _[Example]_ 14 months (GA default), configurable.                                                                                                                             |
| **Security Measures**       | _[Example]_ • Scripts load ONLY after `consent.analytics === true`<br>• `anonymize_ip: true` configured<br>• No cross-site tracking<br>• Consent state logged per Activity #2 |
| **DSAR Process**            | _[Example]_ Users may withdraw consent anytime via cookie banner; data suppressed going forward. Historical data deletion handled via GA admin interface upon request.        |

> 🚫 **Current Status**: **NO analytics scripts are loaded** in the production codebase. This entry is a placeholder for future compliance. **Do not activate analytics without**: (1) updating this RoPA, (2) implementing consent gating, and (3) verifying processor agreements.

---

## 🔹 Data Subject Rights Fulfillment Procedure

| Right                            | Procedure                                                                                                                                                                                                 | Timeline  | Responsible                 |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------- |
| **Access (Art. 15)**             | 1. Verify identity via secure email reply<br>2. Search consent logs via `/api/gdpr/manage?id=<session>`<br>3. Manually search Resend inbox for contact form data<br>4. Compile response in plain text/PDF | ≤ 30 days | Compliance Lead             |
| **Rectification (Art. 16)**      | 1. Verify identity<br>2. Update contact info in Resend/email client<br>3. Note: Consent logs are immutable audit records; corrections documented via supplemental note                                    | ≤ 30 days | Compliance Lead             |
| **Erasure (Art. 17)**            | 1. Verify identity<br>2. Anonymize consent log entry via `DELETE /api/gdpr/manage` (preserves hash chain)<br>3. Delete relevant emails from Resend/inbox<br>4. Document action in DSAR tracker            | ≤ 30 days | Compliance Lead             |
| **Portability (Art. 20)**        | 1. Verify identity<br>2. Export consent record as JSON<br>3. Export contact form submission as plain text<br>4. Provide in structured, commonly used format                                               | ≤ 30 days | Compliance Lead             |
| **Objection (Art. 21)**          | 1. Log objection in internal tracker<br>2. Suppress future processing for objected purpose (e.g., disable analytics for user if implemented)<br>3. Confirm action to user                                 | ≤ 30 days | Compliance Lead             |
| **Withdraw Consent (Art. 7(3))** | 1. User clicks "Decline Non-Essential" or customizes banner<br>2. System updates consent state + logs withdrawal<br>3. Immediately suppress non-essential processing (e.g., block analytics if active)    | Immediate | Automated + Compliance Lead |

---

## 🔹 Third-Party Processor Register

| Processor     | Purpose                     | DPA Signed?            | Data Location | Transfer Mechanism | Verification Date |
| ------------- | --------------------------- | ---------------------- | ------------- | ------------------ | ----------------- |
| **Resend**    | Contact form email delivery | ✅ Yes (via dashboard) | US / EU       | EU-US DPF + SCCs   | [Date]            |
| **Sanity.io** | Headless CMS                | ✅ Yes (via dashboard) | Global        | SCCs + EU-US DPF   | [Date]            |
| **Vercel**    | Application hosting & CDN   | ✅ Yes (via dashboard) | Global        | SCCs + EU-US DPF   | [Date]            |
| _[Analytics]_ | _[Usage tracking]_          | _[Pending]_            | _[US/EU]_     | _[SCCs + DPF]_     | _[N/A]_           |

> ✅ **Action**: Re-verify DPA status and transfer mechanisms annually or upon provider policy changes.

---

## 🔹 Breach Notification Protocol (Summary)

1. **Detection**: Monitor server logs, error tracking, and staff reports.
2. **Assessment**: DPO/Compliance Lead evaluates risk to rights/freedoms within **24 hours**.
3. **Notification to Authority**: If risk exists, notify Datatilsynet within **72 hours** of awareness (Art. 33).
4. **Notification to Data Subjects**: If high risk, inform affected individuals without undue delay (Art. 34).
5. **Remediation**: Patch vulnerability, rotate credentials, audit logs, update RoPA.
6. **Documentation**: Record all breaches (even non-notifiable) in internal register.

**Contact for Breaches**: [Designated email/phone for security incidents]

---

## 🔹 Review & Approval

| Role                        | Name         | Signature | Date |
| --------------------------- | ------------ | --------- | ---- |
| **Prepared By**             | Daniel Saleh |           |20-04-2027|
| **Reviewed By (Legal/DPO)** | [Name/Title] |           |      |
| **Approved By (Board)**     | [Name/Title] |           |      |

**Next Scheduled Review**: 20-04-2027

---

> 📌 **Implementation Notes for Low-Traffic Site**:
>
> - This RoPA is intentionally lightweight; no dedicated DPO required under Art. 37(1) for core activities.
> - All automated processing is minimal; most DSAR fulfillment is manual but feasible at current scale.
> - Consent logs use file-based storage with hash chaining—sufficient for audit purposes without cloud DB costs.
> - **Critical**: Keep this document updated. If you add analytics, a CRM, or user accounts, revisit every section.

> ⚖️ **Disclaimer**: This template is for informational purposes and does not constitute legal advice. GDPR compliance depends on your specific context, national implementations, and risk profile. Consult a qualified data protection professional for formal validation.
