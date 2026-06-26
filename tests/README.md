# Online Pharmacy — UI Tests (Selenium WebDriver + TypeScript)

Browser automation suite for the Online Pharmacy frontend (Vite + React +
React Router), written with **Selenium WebDriver**, **Mocha** and **Chai** in
TypeScript using the Page Object Model.

## Layout
```
tests/
├── support/driver.ts      # Chrome WebDriver factory (headless-aware)
├── pages/                 # Page Objects (Base, Home, Medicines, Cart)
├── specs/
│   ├── navigation.spec.ts # routing across all top-level pages
│   ├── medicines.spec.ts  # catalogue, search, add-to-cart
│   └── cart.spec.ts       # cart contents + checkout affordance
├── tsconfig.json
└── package.json
```

## Prerequisites
- Node 20+ and a local Google Chrome install (the `chromedriver` package is
  pinned to a matching major version).

## Running
```bash
# start the frontend (default Vite port 5173):
cd frontend && npm install && npm run dev

# in another terminal:
cd tests
npm install
npm test                 # headed
npm run test:headless    # CI-style headless run
```

Point at another environment:
```bash
BASE_URL=https://staging.pharmacy.app npm run test:headless
```

## Notes
- Page Objects use resilient locators (roles/`data-testid`/text) with explicit
  waits — no fixed `sleep` calls.
- Each spec owns its own driver lifecycle (`before`/`after`) for isolation.
