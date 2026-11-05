---
layout: article
title: "OpenSSH Emergency Patch Addresses Critical SSH Password Bypass"
date: 2026-11-05
categories:
  - vulnerabilities
  - linux
description: "OpenSSH 10.6p2 and Alpine Linux security updates address an authentication bypass affecting certain musl-based Linux systems running sshd without PAM."
author: UnknownWanderer
image: /assets/images/openssh-bypass.jpg
image_alt: "A padlock beside a terminal window representing SSH authentication security"
---

## Overview

OpenSSH and the Alpine Linux project have released urgent security fixes for an SSH password-authentication bypass affecting certain Linux systems that use the **musl C library** and run `sshd` without PAM-based password authentication.

The issue can allow an attacker who can reach an affected SSH service to log in to a qualifying account without knowing its password. The attack uses a specially crafted, unusually long password. The flaw is not a universal OpenSSH vulnerability: the affected authentication method and account configuration must be present.

On 5 November 2026, the OpenSSH project released **OpenSSH 10.6p2**, which includes a workaround. Alpine Linux also published fixed packages for affected Alpine releases, including older branches. Administrators should apply the relevant distribution update and restart the SSH daemon.

## What Happened?

The Alpine Linux security advisory describes an authentication bypass involving `sshd` when it is built and run without PAM. In this configuration, OpenSSH uses the system C library's `crypt()` function to check password attempts.

The issue arises because musl returns `*` as an error indicator when the supplied password is longer than 256 bytes. A `*` can also appear as the password field for an account that has no password configured. Under the required conditions, the returned error indicator can be mistaken for a matching password field.

The issue was reported by security researcher **Özgün Kültekin of Wakefield**. OpenSSH developer Damien Miller confirmed the release of version 10.6p2 as a workaround for affected systems.

## Which Systems Are Affected?

According to Alpine's advisory, a system is affected only when the relevant conditions are met:

- It runs Linux using **musl libc**.
- `sshd` uses password authentication without PAM. This includes Alpine's `openssh-server` package, or `openssh-server-pam` when `UsePAM no` is configured.
- `PasswordAuthentication` is enabled.
- There is an account with a `*` password field, such as an account configured for key-only access.
- At least one local account has a `$5$` or `$6$` password hash.
- The attacker can reach the SSH service and knows the username of a qualifying account.

The attacker can then submit a password between **257 and 1,024 bytes**. Alpine says a single connection can be sufficient; repeated password guesses are not required.

Systems using glibc, systems using PAM for SSH password authentication, and systems with `PasswordAuthentication no` are not affected by this specific issue, according to the OpenSSH and Alpine advisories. A container that does not run an SSH daemon is not exposed to this SSH-server attack.

## Vulnerability, Exploit, and Attack

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th scope="col">Term</th>
        <th scope="col">Meaning</th>
        <th scope="col">Example in this incident</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Vulnerability</strong></td>
        <td>A weakness in software or system behaviour.</td>
        <td>The password-checking path can treat musl's error indicator as a matching password field.</td>
      </tr>
      <tr>
        <td><strong>Exploit</strong></td>
        <td>A technique that takes advantage of a vulnerability.</td>
        <td>Sending a password between 257 and 1,024 bytes during SSH authentication.</td>
      </tr>
      <tr>
        <td><strong>Attack</strong></td>
        <td>An attempt to use an exploit against a real system.</td>
        <td>Attempting to authenticate to an exposed, vulnerable SSH server using a qualifying account.</td>
      </tr>
    </tbody>
  </table>
</div>

A vulnerability is the weakness itself. An exploit is the method used to take advantage of it. An attack is the attempt to use that method against a target.

## Why Is This Serious?

SSH is widely used to administer Linux servers, cloud instances, virtual machines, and network infrastructure. Administrators often create accounts that rely on SSH keys and have no password set. Under the specific conditions described in the Alpine advisory, this configuration can become vulnerable if password authentication remains enabled.

The incident is also a useful example of **defence in depth**. A secure account configuration can still be undermined by unexpected behaviour in the authentication software or the underlying system library. Security controls must therefore include timely patching, appropriate authentication settings, network restrictions, and monitoring.

If an attacker successfully accesses a server, the consequences depend on the privileges of the compromised account. Potential outcomes include unauthorised access to files, theft of credentials or configuration data, installation of malicious tools, and attempts to move further into the network.

## Immediate Response and Available Fixes

The OpenSSH project released **10.6p2** on 5 November 2026. The release notes describe the change as a security workaround for systems using musl with PAM disabled.

Alpine has also provided fixed packages for affected branches. The package versions differ by Alpine release, so administrators should use the package version listed in Alpine's official advisory rather than assuming that every affected system should install upstream OpenSSH 10.6p2 directly.

After updating, administrators must **restart `sshd`**. Installing an updated package does not necessarily replace the code used by an already-running daemon.

## Recommended Actions

Administrators of potentially affected systems should:

1. **Apply the vendor update.** Run the normal Alpine package upgrade process and confirm that the installed OpenSSH package includes Alpine's fix.
2. **Restart the SSH daemon.** On Alpine, the advisory gives `rc-service sshd restart` as the restart command.
3. **Disable password authentication if the update cannot be applied immediately.** Set `PasswordAuthentication no` in the effective SSH configuration and restart `sshd`.
4. **Verify the configuration.** Use `sshd -t` to check the configuration before restarting, and `sshd -T` to inspect the effective settings.
5. **Restrict SSH network access.** Where possible, limit access to trusted IP addresses, VPNs, or bastion hosts.
6. **Review authentication logs.** Look for unexpected successful password logins, particularly for accounts that should be key-only or have no password configured.
7. **Investigate possible compromise.** If an unexpected login is found, review account activity, authorised SSH keys, recently created users, privileged-command logs, and files modified around the incident.

Before disabling password authentication, administrators should confirm that working SSH-key access is available. Keep an existing administrative session open while testing a new connection, to avoid locking themselves out.

## Key Takeaway

The OpenSSH password bypass is serious, but it affects a specific combination of Linux library, SSH authentication configuration, and account conditions. Administrators should not assume that every Linux server or every Alpine installation is vulnerable. They should check the conditions in the official advisory, install the appropriate vendor fix, restart the SSH daemon, and disable password authentication if they cannot patch immediately.

The incident reinforces the importance of secure authentication design, timely updates, network restrictions, and log monitoring.

## Sources

- [Alpine Linux — Security advisory: openssh-server password authentication bypass](https://www.alpinelinux.org/posts/2026-11-05-openssh-password-authentication-bypass/)
- [OpenSSH — Release Notes (10.6p2, 5 November 2026)](https://www.openssh.org/releasenotes.html)
- [OpenSSH developer announcement — Portable OpenSSH 10.6p2 released](https://marc.info/?l=openssh-unix-dev&m=179388040862785&w=2)
- [LWN.net — Critical security vulnerability affects OpenSSH on Alpine Linux systems](https://lwn.net/Articles/1105464/)
