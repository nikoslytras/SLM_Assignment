const request = require("supertest");

const url = "http://localhost:8000";
//send an order request to the server.
function order() {
    const request_ = request(url)
        .get("/order")
        .set("Content-Type", "application/json")
        .send();
    return request_;
}
//send an scan request to the server.
function scan(voucher, pickedUpBy) {
    const request_ = request(url)
        .put("/scan")
        .set("Content-Type", "application/json")
        .send({
            voucher,
            pickedUpBy
        });
    return request_;
}
//send an status request to the server.
function status() {
    const request_ = request(url)
        .get("/status")
        .set("Content-Type", "application/json")
        .send();
    return request_;
}
//send an reset request to the server.
function reset() {
    const request_ = request(url)
        .delete("/reset")
        .set("Content-Type", "application/json")
        .send();
    return request_;
}


module.exports = {
    order,
    scan,
    status,
    reset
}