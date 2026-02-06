// 1. DYNAMIC MOVING PARTICLES
const container = document.getElementById('particles');

function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    
    // Random Start Position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    // Random Movement Vector
    const moveX = (Math.random() - 0.5) * 300 + 'px';
    const moveY = (Math.random() - 0.5) * 300 + 'px';
    
    p.style.left = startX + 'px';
    p.style.top = startY + 'px';
    p.style.width = Math.random() * 3 + 'px';
    p.style.height = p.style.width;
    
    p.style.setProperty('--x', moveX);
    p.style.setProperty('--y', moveY);
    
    p.style.animationDuration = (Math.random() * 5 + 5) + 's';
    
    container.appendChild(p);
    
    // Remove after animation
    setTimeout(() => p.remove(), 10000);
}

setInterval(createParticle, 100);

// 2. ENVELOPE LOGIC
const seal = document.getElementById('seal');
const envelope = document.getElementById('envelope');

seal.onclick = () => {
    envelope.classList.add('open');
};

// 3. THE "NO" BUTTON DODGE
const noBtn = document.getElementById('no');
let interactionStarted = false;

noBtn.addEventListener('mouseover', () => {
    if(!interactionStarted) {
        noBtn.style.position = 'fixed';
        interactionStarted = true;
    }
    
    // Constrain the 'No' button to stay roughly around the envelope/middle area
    // but jump when the cursor gets close
    const padding = 150;
    const x = Math.random() * (window.innerWidth - padding * 2) + padding;
    const y = Math.random() * (window.innerHeight - padding * 2) + padding;
    
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

// 4. YES BUTTON CELEBRATION
document.getElementById('yes').onclick = () => {
    const romanticText = document.querySelector('.romantic-text');
    romanticText.innerHTML = "I Knew It! 🖤";
    romanticText.style.color = "#ff4d6d";
    
    document.querySelector('.sub-text').innerHTML = "You've made me the luckiest person.";
    document.querySelector('.buttons').style.display = "none";
    
    // Trigger a heart fountain
    for(let i=0; i<50; i++) {
        setTimeout(spawnHeart, i * 50);
    }
};

function spawnHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = '50vw';
    heart.style.top = '50vh';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    document.body.appendChild(heart);

    const x = (Math.random() - 0.5) * window.innerWidth;
    const y = (Math.random() - 0.5) * window.innerHeight;

    heart.animate([
        { transform: 'translate(0, 0) opacity(1)' },
        { transform: `translate(${x}px, ${y}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 2000,
        easing: 'ease-out'
    }).onfinish = () => heart.remove();
}
