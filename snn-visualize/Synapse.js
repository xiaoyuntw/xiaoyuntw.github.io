export class Synapse {
    constructor(pre, post) {
        this.pre = pre;
        this.post = post;
        this.preTrace = 0;
        this.postTrace = 0;
        this.tau = 20;
        this.weight = (Math.random() * 2 - 1);
        // this.weight = 0
        this.ei = this.weight >= 0 ? 1 : -1;
        this.pre.registerSpike(v => this.onPreSpike(v));
        this.post.registerSpike(v => this.onPostSpike(v));
    }
    onPreSpike(v) {
        this.post.add(v * this.weight);
        this.preTrace = 1;
    }
    onPostSpike(v) {
        this.postTrace = 1;
    }
    nexttick(dt) {
        this.postTrace *= Math.exp(-dt / this.tau);
        this.preTrace *= Math.exp(-dt / this.tau);
        this.applySTDP();
    }
    applySTDP() {
        if (Math.min(this.preTrace, this.postTrace) <= 0.001 || this.ei == -1)
            return;
        // if (Math.min(this.preTrace, this.postTrace) <= 0.001) return
        let w_change = (this.postTrace - this.preTrace) * 0.001 * this.ei;
        let newWeight = this.weight + w_change;
        this.weight = this.ei * newWeight <= 0 ? 0 : Math.abs(newWeight) > 1 ? this.ei : newWeight;
        // this.weight = this.weight * newWeight <= 0 ? 0 : Math.min(newWeight, 1)
    }
}
//# sourceMappingURL=Synapse.js.map