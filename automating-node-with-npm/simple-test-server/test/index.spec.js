const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../index');

describe('GET /', function () {
    it('should return with a message the server is running', (done) => {
        chai.request(app)
            .get('/')
            .end((error, res) => {
                if(error) {
                    return done(error);
                } else {
                    expect(res.body).to.equal('GET');
                    done();
                }
            });
    });
});

// Once again I am unable to complete this section because the fucking dickhead
// refuses to show or provide all his code. Fucking useless.

// I tried to piece it together as best I could but my expect() is wrong so
// the test won't pass.