# Cloud Function for Email Verification

This project implements a Google Cloud Function for sending email verification links to users using Mailgun.

## Introduction

This Cloud Function is designed to be triggered when a new user account is created and sends a verification email to the user's email address. The verification link expires after a certain period to ensure security.

## Features

- Sends email verification links using Mailgun API.
- Generates expiring verification links for user email verification.
- Integrates with Google Cloud Pub/Sub for triggering the function.
