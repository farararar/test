/*
 *  Table involved
 *  Parameter:
 *  mr_product - productType
 *  mr_loan_type - loanType
 *  mr_document_types - suporting document
 * 
 *  Result:
 *  loan_applications
 *  supporting_documents
 *  financing_object
 * 
 */

require('module-alias/register');
const help = require('@lib/helper');
const vars = require('@root/vars');
const input = require('@fixtures/commonInputType');
const assert = require('@lib/assert');
const request = require('@lib/request');
const config = require('@root/config');

const chai = require('chai');
chai.use(require('chai-json-schema-ajv'));
const chaiHttp = require('chai-http');
const expect = chai.expect;

describe('General information for add MCA application', function () {

    let todayDate = help.currentDate();
    let description = help.randomDescription(2);
    let borrowerId = 13838392;
    let loanNumberDate = help.formatDate(help.timestamp(), "dmy", "").slice(0, 4) + help.formatDate(help.timestamp(), "dmy", "").slice(-2);

    describe('#smoke', function () {

        it('success when inputing all minimum valid data', async function () {
            this.timeout(20000)
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
            let res = await request.requestPost('/validate/loan-application/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            // console.log(JSON.parse(res.text));

            assert.assertBodyOk(res, 'application added successfully');
            expect(res.body.data).to.include('MCA-' + loanNumberDate + '-' + borrowerId + '-');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when sending request without header', async function () {
            this.timeout(10000)

            let index = parseInt(help.randomInteger());

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
                    "unitPrice": 2000,
                    "qty": 1000,
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
            let res = await request.requestPostWithoutHeader('/validate/loanapplication/corporateloanapplication/add', body)
            const responseTime = await help.responseTime(startTime);

            assert.assertMissingRequestHeader(res);
            assert.assertResponseTime(responseTime);
        })


        xit('trying something new', async function () {
            this.timeout(20000)
            let index = help.randomInteger();
            root_url = config.url.dev_svc;

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": 850,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": 40,
                        "loanAmount": 2000000,
                        "loanTenorDays": 0,
                        "loanTenorMonths": 6,
                        "loanTenorYears": 0,
                        "financingPurpose": 0,
                        "loanPurpose": description,
                        "createdBy": 850
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

            let loginBody = {
                "username": "jangandihapusplease",
                "password": "358b01dae797be80fbb9f215c0868bb35ac3432819876221989699ae48eff909",
                "flag": 1
            };


            let getToken = await request.login(loginBody)

            console.log(JSON.parse(getToken.text))

            let token = await getToken.body.data.accessToken;

            console.log(token);            

            const startTime = await help.startTime();
            let res = await request.requestPost('/validate/loan-application/corporateloanapplication/add', body, token)
            const responseTime = await help.responseTime(startTime);

            console.log(JSON.parse(res.text));

            // assert.assertBodyOk(res, 'application added successfully');
            // expect(res.body.data).to.include('MCA-' + loanNumberDate + '-' + borrowerId + '-');
            assert.assertResponseTime(responseTime);
        })


        //borrowerid


        //apply date
        it('should fail when apply date fill with future date', async function () {

            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": help.futureDate(null, null, 1),
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
                    "unitPrice": 2000,
                    "qty": 1000,
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

            //   console.log(JSON.parse(res.text))

            assert.assertBody400Error(res, 'loanInformation.basicInformation.applyDate should be current date , cannot be backdate/future date');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when apply date fill with past date', async function () {

            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": help.backDate(1),
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
                    "unitPrice": 2000,
                    "qty": 1000,
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

            assert.assertBody400Error(res, 'loanInformation.basicInformation.applyDate should be current date , cannot be backdate/future date');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when apply date fill with null #errorMessage', async function () {
            this.timeout(10000)

            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": null,
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
                    "unitPrice": 2000,
                    "qty": 1000,
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

            console.log(JSON.parse(res.text))

            assert.assertBody400Error(res, 'Exception Occurred. Check the logs');
            assert.assertResponseTime(responseTime);

        })


        //loan type
        it('should fail when inputing nonexist loan type', async function () {

            this.timeout(10000)
            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "syari",
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

            console.log(JSON.parse(res.text));

            assert.assertBodyError(res);
            assert.assertResponseTime(responseTime);
        })

        it('should fail when loan type fill with null', async function () {

            this.timeout(10000)
            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": null,
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

            assert.assertBody400Error(res, 'LoanType is mandatory in the loanInformation.basicInformation');
            assert.assertResponseTime(responseTime);

        })


        //product type
        it('should fail when inputing nonexist product type #sanity #[OBS-466]', async function () {
            this.timeout(10000)

            let index = parseInt(help.randomInteger(5));

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": index,
                        "loanAmount": 200000,
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
                    "unitPrice": 2000,
                    "qty": 1,
                    "totalPrice": null
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

            console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, 'nonexist product type');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when product type fill with null #sanity [LP-178]', async function () {
            this.timeout(10000)

            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "SYARIAH",
                        "productType": null,
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
                    "unitPrice": 2000,
                    "qty": 1000,
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

            console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);
        })


        //financing purpose
        it('should fail when inputing nonexist financing purpose (3)', async function () {

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
                        "financingPurpose": 3,
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

            console.log(JSON.parse(res.text));

            assert.assertBodyError(res);
            assert.assertResponseTime(responseTime);

        })

        it('should fail when financing purpose fill with null', async function () {

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
                        "financingPurpose": null,
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
            assert.assertBody400Error(res, 'FinancingPurpose is mandatory in the loanInformation.basicInformation');
            // expect(res.body.data).to.include('INV-');
            assert.assertResponseTime(responseTime);

        })


        //loan purpose
        it('success when loan purpose fill with 50 caracter (contain unicode and special caracter and white space)', async function () {

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
                        "loanPurpose": help.randomAlphaNumeric(40) + '  !  ' + input.unicodeJapannese,
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

            console.log(JSON.parse(res.text));

            assert.assertBodyOk(res, 'application added successfully');
            expect(res.body.data).to.include('MCA-' + loanNumberDate + '-' + borrowerId + '-');
            assert.assertResponseTime(responseTime);

        })

        it('success when loan purpose fill with 200 caracter', async function () {

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
                        "loanPurpose": help.randomAlphaNumeric(200),
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

        it('should fail when loan purpose fill below 50 caracter #sanity', async function () {

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
                        "loanPurpose": help.randomAlphaNumeric(49),
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

            console.log(JSON.parse(res.text));
            assert.assertBody400Error(res, 'LoanPurpose description should have 50 to 200 characters in loanInformation.basicInformation');
            // expect(res.body.data).to.include('INV-');
            assert.assertResponseTime(responseTime);

        })

        it('should fail when loan purpose fill above 200 caracter', async function () {

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
                        "loanPurpose": help.randomAlphaNumeric(201),
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

            console.log(JSON.parse(res.text));
            assert.assertBody400Error(res, 'LoanPurpose description should have 50 to 200 characters in loanInformation.basicInformation');
            assert.assertResponseTime(responseTime);

        })

        it('should fail when loan purpose fill with null', async function () {

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
                        "loanPurpose": null,
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

            assert.assertBody400Error(res, 'LoanPurpose is mandatory in the loanInformation.basicInformation');
            assert.assertResponseTime(responseTime);

        })

        it('should fail loan purpose fill with empty string', async function () {

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
                        "loanPurpose": "",
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

            console.log(JSON.parse(res.text));

            assert.assertBody400Error(res, 'LoanPurpose description should have 50 to 200 characters in loanInformation.basicInformation');
            assert.assertResponseTime(responseTime);
        })


        //created by


    })

    describe('#negative', function () {

        //borrower id


        //apply date
        it('should fail when inputing apply date with integer', async function () {
            this.timeout(10000)
            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": parseInt(help.formatDate(help.timestamp(), 'ymd', '')),
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

            console.log(JSON.parse(res.text));

            assert.assertBodyError(res);
            assert.assertResponseTime(responseTime);
        })


        //loan type
        it('should fail when inputing out range loan type string ("ALL")', async function () {
            this.timeout(10000)
            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": "ALL",
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

            assert.assertBodyError(res);
            assert.assertResponseTime(responseTime);
        })

        it('should fail when inputing out range loan type loan type with integer 2 ("ALL") #sanity', async function () {
            this.timeout(10000)
            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": 2,
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
                    "unitPrice": 2000,
                    "qty": 1000,
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

            assert.assertBodyError(res);
            assert.assertResponseTime(responseTime);
        })

        it('should fail when inputing loan type with negative integer ', async function () {
            this.timeout(10000)
            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": -1,
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
                    "unitPrice": 2000,
                    "qty": 1000,
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

            assert.assertBodyError(res, 1050, 'Invalid Data Type');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when loan type is 0 ("KONVENSIONAL") but inputing financing objects #sanity', async function () {
            this.timeout(10000)
            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": 1,
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

            assert.assertBody400Error(res, '');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when inputing loan type with random string', async function () {

            this.timeout(10000)
            let index = help.randomInteger();

            let body = {
                "loanInformation": {
                    "basicInformation": {
                        "borrowerId": borrowerId,
                        "applyDate": todayDate,
                        "loanType": help.randomAlphaNumeric(5),
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

            assert.assertBodyError(res);
            assert.assertResponseTime(responseTime);

        })


        //financing purpose
        it('should fail when financing purpose fill with random string', async function () {
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
                        "financingPurpose": help.randomAlphaNumeric(3),
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

            assert.assertBodyError(res);
            assert.assertResponseTime(responseTime);

        })

        it('should fail when financing purpose fill with  empty string', async function () {

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
                        "financingPurpose": "",
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

            assert.assertBodyError(res);
            assert.assertResponseTime(responseTime);

        })

        xit('should fail when financing purpose fill with  negative number (-1)', async function () {

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
                        "financingPurpose": -1,
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

            assert.assertBodyError(res);
            assert.assertResponseTime(responseTime);

        })


        //loan purpose
        xit('should fail when loan purpose fill with zero-widht white space #sanity', async function () {
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

            console.log(JSON.parse(res.text));
            assert.assertBody400Error(res, 'LoanPurpose is mandatory in the loanInformation.basicInformation');
            // expect(res.body.data).to.include('INV-');
            assert.assertResponseTime(responseTime);
        })

        it('should fail when loan purpose fill with only white space (57 character) #sanity #card', async function () {
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
                        "loanPurpose": "                                                         ",
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

            console.log(JSON.parse(res.text));
            assert.assertBody400Error(res, 'LoanPurpose description should have 50 to 200 characters in loanInformation.basicInformation');
            // expect(res.body.data).to.include('INV-');
            assert.assertResponseTime(responseTime);
        })

    })
})