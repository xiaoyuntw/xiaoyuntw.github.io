export class DistanceN3 extends EventTarget {
    id;
    v = 0;
    vth = 255;
    sleepCounter = 0;
    ie = Math.random() < 0.2 ? -1 : 1;
    builtin_bus = [];
    x = Math.random();
    y = Math.random();
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
    }
    registerEvent(listener) {
        this.builtin_bus.push(listener);
    }
    input(v) {
        if (this.sleepCounter != 0) {
            return;
        }
        this.v = Math.max(0, this.v + v);
    }
    spike() {
        for (const l of this.builtin_bus)
            l({ v: this.v, vth: this.vth });
        this.v = 0;
        this.sleepCounter = 5;
    }
}
//# sourceMappingURL=DistanceN3.js.map