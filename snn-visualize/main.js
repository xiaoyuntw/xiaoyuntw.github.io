const tickspeed = 1;
import { Neuron } from './Neuron.js';
class Pool {
    constructor(c) {
        if (c <= 1) {
            throw new Error(`A pool must have 2+ neurons, size ${c} given`);
        }
        this.canvas = null;
        this.size = c;
        this.neurons = [];
        this.synapses = [];
        for (let i = 0; i < this.size; i++) {
            let n = new Neuron(i);
            this.neurons.push(n);
        }
        let t = false;
        while (!t) {
            t = true;
            this.neurons.forEach(n => {
                let lol = 1;
                if (n.connected)
                    lol = 0.01;
                this.neurons.forEach(m => {
                    if (n != m && Math.random() < 0.005 * lol)
                        this.synapses.push(n.connect(m));
                });
            });
            this.neurons.forEach(n => {
                if (!n.connected) {
                    t = false;
                }
            });
        }
    }
    sim(net) {
        this.canvas = net;
        // let simN = this.neurons[this.neurons.length - 1]!
    }
    tick(dt) {
        this.neurons.forEach(n => n.nexttick(dt));
        this.synapses.forEach(s => s.nexttick(dt));
        this.updateCanvas();
    }
    createGraphIn(v) {
        this.neurons.forEach(n => {
            let neuron = n.element;
            v.appendChild(neuron);
            let th = ((n.id) / (this.neurons.length));
            // if ( n.id < 20 ) {
            //     let thc = ((n.id)/(20))
            //     neuron.setAttribute('style', `transform: translate(${100 * Math.cos(2*Math.PI*thc)}px, ${100 * Math.sin(2*Math.PI*thc)}px);  border-color:hsl(${360*th}, 50%, 80%)`)
            // } else if ( n.id < 60 ) {
            //     let thc = ((n.id)/(40))
            //     neuron.setAttribute('style', `transform: translate(${200 * Math.cos(2*Math.PI*thc)}px, ${200 * Math.sin(2*Math.PI*thc)}px);  border-color:hsl(${360*th}, 50%, 80%)`)
            // } else {
            //     let thc = ((n.id)/(this.neurons.length-60))
            //     neuron.setAttribute('style', `transform: translate(${400 * Math.cos(2*Math.PI*thc)}px, ${400 * Math.sin(2*Math.PI*thc)}px);  border-color:hsl(${360*th}, 50%, 80%)`)
            // }
            neuron.setAttribute('style', `transform: translate(${1000 * Math.random() - 500}px, ${1000 * Math.random() - 500}px);  border-color:hsl(${360 * th}, 50%, 80%)`);
            neuron.setAttribute('id', `n${n.id}`);
        });
    }
    updateCanvas() {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const s of this.synapses) {
            if (this.canvas == null)
                break;
            this.synapses.forEach(s => {
                if (s.preTrace < 0.3)
                    return;
                let vp = this.canvas.getBoundingClientRect();
                let n1 = s.pre.element.getBoundingClientRect();
                let n2 = s.post.element.getBoundingClientRect();
                ctx.beginPath(); // Start a new path
                ctx.moveTo(n1.left - vp.left + 10, n1.top - vp.top + 10); // Move the "pen" to the start point
                ctx.lineTo(n2.left - vp.left + 10, n2.top - vp.top + 10 + (s.weight < 0 ? 10 : -10)); // Draw a line to the end point
                if (s.weight < 0)
                    ctx.strokeStyle = `rgba(255, 50, 150, ${(-1 * s.weight * (Math.pow(s.preTrace, 4)))})`;
                else
                    ctx.strokeStyle = `rgba(50, 255, 150, ${(s.weight * (Math.pow(s.preTrace, 4)))})`;
                // console.log(s.weight+0.1)
                ctx.lineWidth = 1; // Set the line width
                ctx.stroke(); // Render the line
            });
        }
    }
}
export default new Pool(160);
//# sourceMappingURL=main.js.map