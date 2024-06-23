const siteKey = 'YOUR_COINIMP_SITE_KEY'; // Replace with your CoinImp site key

let miner = null;

document.getElementById('startButton').addEventListener('click', function() {
    if (!miner) {
        miner = new Coinimp.User(siteKey, {
            autoThreads: true,
            throttle: 0.6,
        });
    }
    
    if (!miner.isRunning()) {
        miner.start();
        document.getElementById('status').innerText = "Mining started...";
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('stopButton').style.display = 'inline-block';
        
        miner.on('open', function() {
            console.log('Mining started');
        });
        
        miner.on('authed', function() {
            console.log('Miner authenticated');
        });
        
        miner.on('optin', function(params) {
            console.log('Opted-in', params);
        });
        
        miner.on('close', function() {
            console.log('Mining stopped');
        });

        setInterval(function() {
            document.getElementById('hashesPerSecond').innerText = 'Hashes per second: ' + miner.getHashesPerSecond().toFixed(2);
            document.getElementById('totalHashes').innerText = 'Total hashes: ' + miner.getTotalHashes();
            document.getElementById('acceptedHashes').innerText = 'Accepted hashes: ' + miner.getAcceptedHashes();
        }, 1000);
    }
});

document.getElementById('stopButton').addEventListener('click', function() {
    if (miner && miner.isRunning()) {
        miner.stop();
        document.getElementById('status').innerText = "Mining stopped.";
        document.getElementById('startButton').style.display = 'inline-block';
        document.getElementById('stopButton').style.display = 'none';
    }
});
