# TAX Calcultation
Tax Codes can be statically assigned:
- food and beverage (tax_code = 1)
10% of Price Refundable

- tobacco (tax_code = 2)
10 + (2% of Price ) Not Refundable

- entertainment (tax_code = 3)
0 < Price < 100: tax-free
Price >= 100: 1% of ( Price - 100)
Not Refundable

### Installation
Build and Up the Docker
```sh
$ docker-compose build
$ docker-compose up
```

### Unit Test

```sh
$ npm run unit-test
```

### Access

Some of endpoint that can be access in this application.

| Function | URL |
| ------ | ------ |
| Swagger | http://localhost:3003/docs |
| Form Page |  http://localhost:3002/ |

