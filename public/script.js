const plans = [
    { id: '1gb', name: '1GB RAM', ram: 1000, disk: 1000, cpu: 40, price: '5.000' },
    { id: '2gb', name: '2GB RAM', ram: 2000, disk: 1000, cpu: 60, price: '10.000' },
    { id: '3gb', name: '3GB RAM', ram: 3000, disk: 2000, cpu: 80, price: '15.000' },
    { id: '4gb', name: '4GB RAM', ram: 4000, disk: 2000, cpu: 100, price: '20.000' },
    { id: '5gb', name: '5GB RAM', ram: 5000, disk: 3000, cpu: 120, price: '25.000' },
    { id: '6gb', name: '6GB RAM', ram: 6000, disk: 3000, cpu: 140, price: '30.000' },
    { id: '7gb', name: '7GB RAM', ram: 7000, disk: 4000, cpu: 160, price: '35.000' },
    { id: '8gb', name: '8GB RAM', ram: 8000, disk: 4000, cpu: 180, price: '40.000' },
    { id: '9gb', name: '9GB RAM', ram: 9000, disk: 5000, cpu: 200, price: '45.000' },
    { id: '10gb', name: '10GB RAM', ram: 10000, disk: 5000, cpu: 220, price: '50.000' },
    { id: 'unlimited', name: 'UNLIMITED', ram: 0, disk: 0, cpu: 0, price: '100.000' }
];

let selectedPlan = null;

// Generate plan cards
function initPlans() {
    const plansGrid = document.getElementById('plansGrid');
    plans.forEach(plan => {
        const card = document.createElement('div');
        card.className = 'plan-card';
        card.onclick = () => selectPlan(plan.id, card);
        card.innerHTML = `
            <div class="plan-icon">🖥️</div>
            <div class="plan-name">${plan.name}</div>
            <div class="plan-specs">
                💾 ${plan.ram === 0 ? '∞' : plan.ram / 1000} GB RAM<br>
                📦 ${plan.disk === 0 ? '∞' : plan.disk / 1000} GB Disk<br>
                🧠 ${plan.cpu === 0 ? '∞' : plan.cpu}% CPU
            </div>
            <div class="plan-price">Rp ${plan.price}</div>
        `;
        plansGrid.appendChild(card);
    });
}

function selectPlan(planId, cardElement) {
    selectedPlan = planId;
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    cardElement.classList.add('selected');
}

// Username input filter
document.addEventListener('DOMContentLoaded', () => {
    initPlans();

    const usernameInput = document.getElementById('username');
    usernameInput.addEventListener('input', function() {
        this.value = this.value.toLowerCase().replace(/[^a-z0-9]/g, '');
    });

    // Submit button
    document.getElementById('submitBtn').addEventListener('click', handleSubmit);
});

async function handleSubmit() {
    const username = document.getElementById('username').value;
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    errorMessage.classList.remove('show');

    if (!username || !selectedPlan) {
        errorText.textContent = 'Username dan paket harus diisi!';
        errorMessage.classList.add('show');
        return;
    }

    // Disable button and show loading
    submitBtn.disabled = true;
    btnText.innerHTML = '<div class="loader"></div> Membuat Panel...';

    try {
        const response = await fetch('/api/create-panel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                plan: selectedPlan
            })
        });

        const data = await response.json();

        if (data.success) {
            showResult(data.data);
        } else {
            throw new Error(data.error || 'Gagal membuat panel');
        }
    } catch (error) {
        errorText.textContent = error.message;
        errorMessage.classList.add('show');
        submitBtn.disabled = false;
        btnText.innerHTML = '⚡ CREATE PANEL NOW';
    }
}

function showResult(data) {
    document.getElementById('formSection').classList.add('hidden');
    document.getElementById('resultSection').classList.add('show');

    document.getElementById('resultUsername').textContent = data.username;
    document.getElementById('resultPassword').textContent = data.password;
    document.getElementById('resultServerId').textContent = data.serverId;
    document.getElementById('resultRam').textContent = data.ram;
    document.getElementById('resultCpu').textContent = data.cpu;
    document.getElementById('resultDisk').textContent = data.disk;
    document.getElementById('resultDate').textContent = data.date;
    
    const domainLink = document.getElementById('domainLink');
    domainLink.href = data.domain;
    domainLink.textContent = data.domain;
}

function resetForm() {
    document.getElementById('formSection').classList.remove('hidden');
    document.getElementById('resultSection').classList.remove('show');
    document.getElementById('username').value = '';
    selectedPlan = null;
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('btnText').innerHTML = '⚡ CREATE PANEL NOW';
}

function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.currentTarget;
        const originalText = btn.textContent;
        btn.textContent = '✅';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}