export class SimpleSyn extends EventTarget {
    pre;
    post;
    weight;
    preTrace = 0;
    postTrace = 0;
    transferStorage = () => { return; };
    constructor(pre, post, weight = 1) {
        super();
        this.pre = pre;
        this.post = post;
        this.weight = weight;
        pre.registerEvent((e) => {
            this.preTrace = 1;
            this.transferSpike(e.vth * this.pre.ie);
        });
        post.registerEvent((e) => {
            this.postTrace = 1;
        });
    }
    tick() {
        this.preTrace = Math.max(0, this.preTrace - 0.1);
        this.postTrace = Math.max(0, this.postTrace - 0.1);
        this.applySTDP();
    }
    transferSpike(v) {
        this.post.input(v * this.weight);
    }
    applySTDP() {
        if (this.preTrace == 0 || this.postTrace == 0)
            return;
        this.weight = Math.min(1, Math.max(0, this.weight + this.pre.ie * (this.postTrace - this.preTrace) * 0.03));
    }
}
//# sourceMappingURL=SimpleSyn.js.map