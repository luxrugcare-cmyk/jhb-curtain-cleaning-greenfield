# Resend transactional sender DNS

Transactional sender domain: `notify.jhbcurtaincleaning.co.za`

The domain has been created in Resend but is not verified yet. Configure these DNS records at the authoritative DNS provider for `jhbcurtaincleaning.co.za`, then trigger Resend verification.

## DKIM

- Type: TXT
- Name/Host: `resend._domainkey.notify`
- Value: `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdxl/FFbs3GA3bGyb21dmk1iItPULYOq9wwrW1to/6SDA+FClSFpjOQYTwmfhWfYKuK8HEJDoL7D0gYPXFbKWUAzqm0pfEvGLyw35g0MtnGLrbG8ao5VAUpSTYGpO0WmBVMq7/cfbtCmtOxu+JeDt0Pn0MAfORXFxq6fZEHxGEEwIDAQAB`

## Return-Path / SPF MX

- Type: MX
- Name/Host: `send.notify`
- Value: `feedback-smtp.eu-west-1.amazonses.com`
- Priority: `10`

## SPF TXT

- Type: TXT
- Name/Host: `send.notify`
- Value: `v=spf1 include:amazonses.com ~all`

## Sender configuration after verification

Recommended application sender:

`JHB Curtain Cleaning <website@notify.jhbcurtaincleaning.co.za>`

The Resend API key is deliberately not stored in this repository or release archive. Add it only as the secret `RESEND_API_KEY` in the deployment environment.
