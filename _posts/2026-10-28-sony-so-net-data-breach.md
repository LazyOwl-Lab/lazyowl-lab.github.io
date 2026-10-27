---
layout: article
title: "Sony Network Communications / So-net Data Breach"
date: 2026-10-28
categories:
  - cybersecurity
description: "Sony Network Communications disclosed unauthorised access to its So-net member database, affecting more than 2.58 million member records and exposing email credentials for a smaller group."
author: UnknownWanderer
image: /assets/images/sony-so-net-data-breach.jpg
image_alt: "Cybersecurity illustration representing the Sony So-net data breach"
---

## Overview

On 27 October 2026, Sony Network Communications, Sony Group’s Japanese internet service provider subsidiary, disclosed that an unauthorised party had accessed the **So-net member database**, affecting personal data associated with more than **2.58 million member records**.

The company said that So-net account passwords were not leaked. However, email addresses and email passwords, a small number of bank-account records, and password-reset notification data were exposed in separate, smaller groups.

## Timeline

<div class="table-wrapper">

<table>
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Event</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>19 October 2026</td>
      <td>An external party gained unauthorised access to the So-net member database.</td>
    </tr>
    <tr>
      <td>23 October 2026</td>
      <td>Sony Network Communications detected the intrusion, stopped the affected server, and blocked communications from the attack source.</td>
    </tr>
    <tr>
      <td>24 October 2026</td>
      <td>The investigation confirmed personal-data leakage and identified the affected data categories and record counts.</td>
    </tr>
    <tr>
      <td>27 October 2026</td>
      <td>Sony publicly announced the incident, reset affected email-service passwords, and reported the matter to Japan’s Personal Information Protection Commission.</td>
    </tr>
  </tbody>
</table>

</div>

## What Was Exposed?

The incident affected two main customer groups: **So-net members** and **plala (S Course) members**.

<div class="table-wrapper">

<table>
  <thead>
    <tr>
      <th scope="col">Data category</th>
      <th scope="col">Records affected</th>
      <th scope="col">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>So-net member records</td>
      <td>2,141,986</td>
      <td>Includes 1,869,771 current members and 272,215 former members who left after March 2026.</td>
    </tr>
    <tr>
      <td>plala (S Course) member records</td>
      <td>443,495</td>
      <td>Includes 422,365 current members and 21,130 former members who left after March 2026.</td>
    </tr>
    <tr>
      <td>Email addresses and email passwords</td>
      <td>54,401</td>
      <td>Across Mail Service (G), A-Box, So-net VAIO Mail, and PostPet Mail.</td>
    </tr>
    <tr>
      <td>Bank-account information</td>
      <td>16</td>
      <td>Included bank name, bank and branch codes, account type, account number, and account-holder name. Bank PINs were not held.</td>
    </tr>
    <tr>
      <td>Password-reset notification data</td>
      <td>7</td>
      <td>Sony reset the relevant passwords and contacted affected users individually.</td>
    </tr>
  </tbody>
</table>

</div>

For the main So-net and plala member records, exposed personal information included **names, telephone numbers, email addresses, user IDs, dates of birth, sex, and internet-connection IDs**.

Sony stated that **So-net account passwords were not leaked**.

## What Was Not Affected?

Sony confirmed that **credit-card information was not included** in the exposed data categories. It also said that no data leakage had been identified for **NURO** or other services outside the affected So-net and plala systems.

This means the incident was not reported as a payment-card compromise. Nevertheless, identity information can still be used in phishing, impersonation, and targeted social-engineering attacks.

## Cause and Response

Sony attributed the incident to **unauthorised access by a third party**. At the time of its announcement, the technical root cause and full attack method remained under investigation.

After detecting the intrusion, the company:

- Shut down the affected server.
- Blocked communications from the attack source.
- Reset passwords for the affected email services.
- Reported the incident to Japan’s Personal Information Protection Commission.
- Established a dedicated customer-support channel.

Sony had not publicly identified the attacker, the initial entry point, or whether the intrusion involved a software vulnerability, stolen credentials, or another method. The company said it would continue investigating and review its security controls and information-management framework to help prevent a recurrence.

## Risks to Customers

The most immediate risk concerns the **54,401 records involving email addresses and email passwords**. Depending on the circumstances, exposed credentials could allow attackers to access affected mailboxes or attempt to reuse the same passwords on other services.

Sony reset the affected email-service passwords on 27 October and asked relevant users to set new passwords through My Page.

Other affected customers face a risk of **phishing and scam messages**. Names, telephone numbers, email addresses, and internet-connection IDs may help criminals make fraudulent emails, text messages, or calls appear more convincing.

Customers should:

- Treat unexpected emails, SMS messages, and calls with caution.
- Avoid clicking links or opening attachments in suspicious messages.
- Use a unique password for every online service.
- Change any other password that was reused on an affected email account.
- Enable multifactor authentication wherever it is available.
- Contact Sony through its official website if they are unsure whether a notification is genuine.

## Security Lessons

- **Containment speed matters:** Sony isolated the affected server and blocked attacker communications after detecting the intrusion. Effective containment can limit further unauthorised access.
- **Password reuse increases risk:** Even when a primary account password is not exposed, leaked email credentials can create risks for other accounts if passwords have been reused.
- **Identity data enables social engineering:** A breach can support convincing phishing, impersonation, and account-recovery scams even when payment-card data is not involved.
- **Monitoring and access controls are essential:** Organisations should monitor unusual database access, restrict privileges, segment critical systems, and protect sensitive information.
- **Transparency supports response:** Clear communication, regulator reporting, and practical guidance help affected customers understand what happened and what actions to take.

## Short Academic Summary

The Sony Network Communications incident illustrates how unauthorised access to a customer database can expose millions of identity records even when primary account passwords and payment-card information remain unaffected. Key cybersecurity concerns include unauthorised database access, a four-day interval between the reported intrusion and its detection, exposure of email credentials for a smaller group, and the need for effective monitoring, segmentation, access controls, and incident-response procedures.

## Sources

- [Sony Network Communications / So-net official notice](https://www.so-net.ne.jp/info/2026/20261027_0001.html)
- [Original PDF release](https://www.sonynetwork.co.jp/corporation/release/2026/v5e5u00000000zwj-att/20261027.pdf)
