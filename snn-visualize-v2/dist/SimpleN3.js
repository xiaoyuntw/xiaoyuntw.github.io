export class SimpleN3 extends EventTarget {
    id;
    v = 0;
    vth = 255;
    sleepCounter = 0;
    ie = Math.random() < 0 ? -1 : 1;
    constructor(id) {
        super();
        this.id = id;
    }
    tick() {
        if (this.sleepCounter != 0) {
            this.sleepCounter = Math.max(0, this.sleepCounter - 1);
            return;
        }
        if (this.v >= this.vth)
            this.spike();
        this.v = Math.max(0, this.v - 2);
        const event = new CustomEvent('change', {
            detail: { v: this.v, vth: this.vth }
        });
        this.dispatchEvent(event);
    }
    input(v) {
        if (this.sleepCounter != 0) {
            return;
        }
        this.v = Math.max(0, this.v + v);
    }
    spike() {
        const event = new CustomEvent('spike', {
            detail: { v: this.v, vth: this.vth }
        });
        this.v = 0;
        this.sleepCounter = 5;
        this.dispatchEvent(event);
    }
}
//# sourceMappingURL=SimpleN3.js.map