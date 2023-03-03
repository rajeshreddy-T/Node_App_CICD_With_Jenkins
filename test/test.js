const express = require('express');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;


const app = express();
describe('POST', () => {
    it('should send response', () => {
        request(app)
        .post('/')
        .send({})
        .expect(200)
        .then((res) => {
         expect(res.headers.location).to.be.eql('123456/wallet');
         // more validations can be added here as required
    });
 });
});

