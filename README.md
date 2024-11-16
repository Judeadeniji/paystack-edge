# Paystack SDK (Edge)

## Why Another [Paystack](https://paystack.com) Package?

Other packages are either outdated or don't support TypeScript or only works with Node.js. This package is built with TypeScript and works with any JavaScript environment.

### Installation

For Yarn:

```sh
yarn add paystack-edge-sdk
```

For NPM:

```sh
npm install paystack-edge-sdk
```

### Usage

For TypeScript:

```typescript
import { Paystack } from 'paystack-edge-sdk';

const paystack = new Paystack("secret_key");
```

For JavaScript:

```javascript
const Paystack = require('paystack-edge-sdk').Paystack;
const paystack = new Paystack('secret_key');
```

OR

```javascript
const { Paystack } = require('paystack-edge-sdk');
const paystack = new Paystack('secret_key');
```

All methods use promises, meaning you can either use `async...await`, `then...catch`, or `try...catch`.

### Example

```typescript
import { Paystack } from 'paystack-edge-sdk';

const paystack = new Paystack("secret_key");

const { data: transaction, error } = await paystack.transaction.initialize({
  amount: 10000,
  email: "email@example.com",
});

if (error) {
  console.error(error);
} else {
  console.log(transaction);
}
```

### Modules

- [x] Apple Pay
- [x] Bulk Charges
- [x] Charge
- [x] Customer
- [x] Dedicated Virtual Accounts
- [x] Invoice
- [x] Payment Page
- [x] Plan
- [x] Product
- [x] Recipient
- [x] Refund
- [x] Settlement
- [x] SubAccount
- [x] Subscription
- [x] Transaction
- [x] Transaction Split
- [x] Transfer
- [x] Verification
- [ ] Control Panel
- [ ] Disputes
- [ ] Miscellaneous

### Contributing

If you notice a missing function or a bug, please feel free to submit a PR. You will need to fork the repo and create a PR against it with your changes.  
Thank you! :smile:
