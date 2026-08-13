# New repository handoff

Greenfield rule: do not push this release into `stunning-spork`, `jhbcurtaincleaning-agy`, or `business-website`.

Create a NEW repository named `jhb-curtain-cleaning-greenfield` under `luxrugcare-cmyk`, preferably private initially. Do not initialize it with a README, license, or .gitignore.

Then from the extracted release directory:

```powershell
git init
git add .
git commit -m "feat: initialize JHB Curtain Cleaning greenfield v0.5"
git branch -M main
git remote add origin https://github.com/luxrugcare-cmyk/jhb-curtain-cleaning-greenfield.git
git push -u origin main
```

After that, import the repository into Vercel as a Preview project. Do not attach the production domain until the acceptance tests in `docs/DEPLOYMENT-GATE.md` pass.
