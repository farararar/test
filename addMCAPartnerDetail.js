require('module-alias/register');
const help = require('@lib/helper');
const vars = require('@root/vars');
const input = require('@fixtures/commonInputType');
const assert = require('@lib/assert');
const request = require('@lib/request');

const chai = require('chai');
chai.use(require('chai-json-schema-ajv'));
const chaiHttp = require('chai-http');
const expect = chai.expect;

describe('Payor information for add MCA application', function () {

    let todayDate = help.currentDate();
    let description = help.randomDescription(2);
    let borrowerId = 13838392;
    let loanNumberDate = help.formatDate(help.timestamp(), "dmy", "").slice(0, 4) + help.formatDate(help.timestamp(), "dmy", "").slice(-2);

    describe('#smoke', function () {
        it('success when inputing all minimum valid data', async function () {
            this.timeout(10000)
            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": 1,
                    "partnerName": "vv",
                    "partnerType": "bb"
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBodyOk(res, 'application added successfully');
            expect(res.body.data).to.include('MCA-' + loanNumberDate + '-' + borrowerId + '-');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when not inputing any partner detail #sanity', async function(){

            this.timeout(10000)
            let index = parseInt(help.randomInteger(5));

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": null,
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);

        })

        xit('should fail when inputing nonexist partner  id', async function(){

            this.timeout(10000)
            let index = parseInt(help.randomInteger(7));

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": index,
                    "partnerName": "vv",
                    "partnerType": "bb"
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);

        })

        it('should fail when inputing partner id with null', async function(){

            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": null,
                    "partnerName": "vv",
                    "partnerType": "bb"
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);

        })

        it('should fail when inputing partner  id with empty string', async function(){
            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": "",
                    "partnerName": "vv",
                    "partnerType": "bb"
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when inputing partner  id with only whitespace', async function(){
            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": "        ",
                    "partnerName": "vv",
                    "partnerType": "bb"
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);
        })

        xit('should fail when inputing nonexist partner name', async function(){

            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": 1,
                    "partnerName": help.randomAlphaNumeric(),
                    "partnerType": "bb"
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);

        })

        it('should fail when inputing null payor name', async function(){
            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": 1,
                    "partnerName": null,
                    "partnerType": "bb"
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when inputing partner name with empty string', async function(){

            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": 1,
                    "partnerName": "",
                    "partnerType": "bb"
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);

        })

        it('should fail when inputing partner name with only whitespace', async function(){

            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": 1,
                    "partnerName": "      ",
                    "partnerType": "bb"
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);

        })

        xit('should fail when inputing nonexist partner type', async function(){

            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": 1,
                    "partnerName": "vv",
                    "partnerType": help.randomAlphaNumeric()
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);

        })

        it('should fail when inputing null partner type', async function(){
            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": 1,
                    "partnerName": "vv",
                    "partnerType": null
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when inputing partner type with empty string', async function(){

            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": 1,
                    "partnerName": "vv",
                    "partnerType": ""
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);

        })

        it('should fail when inputing partner type with only whitespace', async function(){

            this.timeout(10000)

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 1
                    },

                    "supportingDocumentsInformation": [{
                        "documentType": 22,
                        "documentName": "Invoice Supplier",
                        "fileName": "http",
                        "docUUID": "7950f74aa1c14bcb86b78ff03b10cc42",
                        "docURL": "https://inv-dev-test.oss-ap-southeast-5.aliyuncs.com/Contract Document/Contract Document_MQ==_1_1566799124039.png",
                        "operations": "Add",
                        "active": true
                    }]
                },
                "financingObject": [{
                    "objectName": "as",
                    "purchaseCategory": "as",
                    "unitPrice": 200000,
                    "qty": 10,
                    "totalPrice": 2000000
                }],
                "partnerDetails": {
                    "partnerID": 1,
                    "partnerName": "vv",
                    "partnerType": "       "
                },
                "referralAndPromoInformation": null
            };

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);

        })

    })

    describe('#negative', function () {

    })

})