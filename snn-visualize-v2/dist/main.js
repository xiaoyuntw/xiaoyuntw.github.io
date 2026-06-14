import { SimplePool } from "./SimplePool.js";
const p = new SimplePool(25);
p.neurons[0].addEventListener('spike', event => {
    const e = event;
    console.log(e.detail.v, e.detail.vth);
});
for (let i = 0; i < 100; i++) {
    p.tick();
}
//# sourceMappingURL=main.js.map