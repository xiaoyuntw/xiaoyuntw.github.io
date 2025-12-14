import { Synapse } from "./Synapse.js";
export class Neuron {
    // interval: ReturnType<typeof setInterval>
    constructor(id) {
        /* 初始化ID */
        this.id = id;
        /* 初始化神經屬性 */
        this.base_threshold = 100; // 原閾值
        this.threshold = 100; // 當前閾值
        this.voltage = 0; // 當前電壓
        this.callbacks = []; // 連接與權重
        this.spiked = false;
        this.connected = false;
        /* 初始化電壓更新屬性 */
        this.v_loss = -1; // 每刻 "當前電壓" 壓降
        this.v_update = 0; // 下一刻將改變的 "當前電壓" 量
        /* 初始化adaptive threshold屬性 */
        this.alpha = 50; // 在發火後 "當前閾值" 上升的幅度
        this.beta = -0.95; // 每刻 "當前閾值" 壓降
        this.t_update = 0; // 下一刻將改變的 "當前閾值" 量
        /* 初始化HTML元素 */
        this.hover = false;
        this.element = document.createElement('div');
        this.element.className = 'neuron';
        this.element.setAttribute('id', `n${this.id}`);
        this.element.addEventListener('mouseover', () => this.hover = true);
        this.element.addEventListener('mouseout', () => this.hover = false);
        /* 執行循環更新 */
        // this.interval = setInterval(() => this.nexttick(), tickspeed)
        // arrow function 避免直接呼叫callback 造成this爆開
    }
    registerSpike(f) {
        this.callbacks.push(f);
    }
    nexttick(dt) {
        if (this.hover)
            this.add(0.5 * this.base_threshold);
        /* 噪聲機制 */
        this.add(Math.random() * 2);
        const poissonRate = 0.005; // 1% tick 機率
        if (Math.random() < poissonRate)
            this.add(20); // 突發電壓
        this.voltage += this.v_update + this.v_loss * dt;
        this.threshold += this.t_update + this.beta * (this.threshold - this.base_threshold) * dt;
        this.v_update = 0;
        this.t_update = 0;
        if (this.voltage < 0)
            this.voltage = 0;
        if (this.voltage >= this.threshold) {
            this.spike();
        }
        this.updateElement();
    }
    updateElement() {
        let opacity = this.voltage / this.threshold;
        this.element.style.backgroundColor = `rgba(65, 255, 220, ${opacity})`;
    }
    getVoltage() {
        return this.voltage;
    }
    add(x) {
        this.v_update += x;
    }
    connect(n) {
        this.connected = true;
        return new Synapse(this, n);
    }
    spike() {
        this.spiked = true;
        this.t_update += this.alpha;
        this.callbacks.forEach(cb => cb(this.voltage));
        this.voltage = 0;
    }
}
//# sourceMappingURL=Neuron.js.map