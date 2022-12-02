require("../src/app");
const client = require("./client");
require("mocha");
const assert = require("node:assert/strict");


function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reset() {
    let res = await client.reset();
    assert.equal(res.status, 200);
    assert.equal(res.body.status, "success");
    assert.equal(res.body.message, "data reseated successfully");
}

describe("api tests", async () => {
    before(async () => {
        //wait server to come up
        await timeout(4000);
        await reset();
    })
    after(async () => {
        await reset();
    })
    it("should order data", async () => {
        const response = await client.order();
        assert.equal(response.status, 200);
        assert.equal(response.body.status, "success");
        assert.equal(response.body.message, "drivers ordered successfully");
        assert.ok(response.body.data);
    });
    it("should scan data and get status", async () => {
        const { body: ordered_data } = await client.order();
        const driver = ordered_data.data[0];
        for (const package of driver.packages) {
            const res = await client.scan(package.voucher, driver.driver);
            assert.equal(res.status, 200);
            assert.equal(res.body.status, "success");
            assert.equal(res.body.message, "package scanned successfully");
        }
        const response = await client.status();

        assert.equal(response.status, 200);
        assert.equal(response.body.status, "success");
        assert.equal(response.body.message, "drivers status fetched successfully");

        for (const data of response.body.data) {
            if (data.driver === driver.driver) {
                assert.equal(data.driver_status, "READY");
                assert.equal(data.packages_to_pick_up.length, 0);
                assert.notEqual(data.picked_up_packages.length, 0);
            } else {
                assert.equal(data.driver_status, "NOT_READY");
                assert.notEqual(data.packages_to_pick_up.length, 0);
                assert.equal(data.picked_up_packages.length, 0);
            }
        }
    });
});
