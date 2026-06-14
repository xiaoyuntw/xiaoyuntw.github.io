import { SimpleN3 } from "./SimpleN3.js";
import { SimpleSyn } from "./SimpleSyn.js";
export class SimplePool extends EventTarget {
    size;
    config;
    neurons = [];
    synapses = [];
    rules = [];
    constructor(size, config) {
        if (size <= 1)
            return;
        super();
        this.size = size;
        this.config = config;
        if (!config) {
            console.log("generating new config");
            this.generate();
        }
        for (let i = 0; i < this.size; i++)
            this.neurons.push(new SimpleN3(i));
        for (const c of this.config.connections)
            this.synapses.push(new SimpleSyn(this.neurons[c[0]], this.neurons[c[1]], c[2]));
    }
    tick() {
        for (const n of this.neurons) {
            n.input(Math.random() < 0.9 ? Math.random() * 3 : Math.random() * 10 + 15);
            n.tick();
        }
        for (const s of this.synapses)
            s.tick();
    }
    generate() {
        let newconfig = {
            neurons: this.size,
            connections: new Array
        };
        for (let i = 0; i < this.size; i++) {
            let ic = false;
            for (let j = 0; j < this.size; j++) {
                if (i == j)
                    continue;
                let con = true;
                for (const r of (this.rules ?? [
                    (pre, post) => Math.random() < 0.3 / this.size ** 0.8
                ]))
                    if (r(this.neurons[i], this.neurons[j]) == false) {
                        con = false;
                        break;
                    }
                if (!con)
                    continue;
                newconfig.connections.push([i, j, Math.random() * 0.7]);
                ic = true;
            }
            if (!ic)
                newconfig.connections.push([i, Math.floor(Math.random() * this.size), Math.random() * 0.3]);
        }
        this.config = newconfig;
    }
    regenerate() {
        this.generate();
        this.synapses = [];
        for (const c of this.config.connections)
            this.synapses.push(new SimpleSyn(this.neurons[c[0]], this.neurons[c[1]], c[2]));
        console.log(this.config);
    }
    read(f) {
    }
    save(f) {
    }
}
//# sourceMappingURL=SimplePool.js.map