const Reset_service = require("../src/services/reset_service");
const reset_service = new Reset_service();

async function main() {
    await reset_service.reset();
}

main()
    .then(async () => {
        await reset_service.db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await reset_service.db.$disconnect()
        process.exit(1)
    });