const scanSchema = {
    type: "object",
	required: ["voucher", "pickedUpBy"],
	properties: {
		voucher: {
			type: "string",
			minLength: 1,
		},
		pickedUpBy: {
			type: "string",
			minLength: 1,
		},
	},
};
module.exports = {
    scanSchema
}