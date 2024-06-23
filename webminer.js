class WebMiner {
    constructor(config) {
        this.algorithm = config.algorithm;
        this.pool = config.pool;
        this.wallet = config.wallet;
        this.threads = config.threads;
        this.password = config.password;
        this.miner = null;
    }

    start() {
        if (this.miner) {
            this.miner.stop();
        }

        this.miner = new WMP(this.algorithm, this.pool, this.wallet, {
            password: this.password,
            threads: this.threads,
        });

        this.miner.start();
        alert("Đào coin đã bắt đầu với các cấu hình đã nhập!");
    }
}

function startMining() {
    const algorithm = document.getElementById('algorithm').value;
    const pool = document.getElementById('pool').value;
    const wallet = document.getElementById('wallet').value;
    const threads = parseInt(document.getElementById('threads').value, 10);
    const password = document.getElementById('password').value;

    const miner = new WebMiner({
        algorithm: algorithm,
        pool: pool,
        wallet: wallet,
        threads: threads,
        password: password
    });

    miner.start();
}

function addCustomAlgorithm() {
    const customAlgorithm = document.getElementById('customAlgorithm').value;
    if (customAlgorithm) {
        const algorithmSelect = document.getElementById('algorithm');
        const option = document.createElement('option');
        option.value = customAlgorithm;
        option.text = customAlgorithm;
        algorithmSelect.add(option);
        alert(`Đã thêm algorithm: ${customAlgorithm}`);
    } else {
        alert("Vui lòng nhập tên algorithm.");
    }
}

// Thêm script WMP từ WebMinerPool
const script = document.createElement('script');
script.src = 'https://webminerpool.com/lib/wmp.min.js';
document.head.appendChild(script);
