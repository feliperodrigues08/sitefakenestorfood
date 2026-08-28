// Paletas de cores harmônicas com rotação automática
const colorPalettes = [
    { primary: '#6B46C1', secondary: '#E879F9', button: '#4C1D95' },
    { primary: '#7C3AED', secondary: '#F97316', button: '#5B21B6' },
    { primary: '#6366F1', secondary: '#06B6D4', button: '#4F46E5' },
    { primary: '#8B5CF6', secondary: '#EC4899', button: '#6D28D9' },
    { primary: '#A855F7', secondary: '#14B8A6', button: '#7E22CE' }
];

function applyColorPalette() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    let firstMonday = new Date(startOfYear);
    const dayOfWeek = firstMonday.getDay();
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    firstMonday.setDate(firstMonday.getDate() + daysUntilMonday);
    
    const timeDiff = now - firstMonday;
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    const mondayNumber = Math.max(0, Math.floor(timeDiff / oneWeekInMs));
    const paletteIndex = mondayNumber % colorPalettes.length;
    
    const palette = colorPalettes[paletteIndex];
    document.documentElement.style.setProperty('--color-primary', palette.primary);
    document.documentElement.style.setProperty('--color-secondary', palette.secondary);
    document.documentElement.style.setProperty('--color-button', palette.button);
}

applyColorPalette();
setInterval(applyColorPalette, 60 * 60 * 1000);

document.addEventListener('DOMContentLoaded', () => {
    // Array contendo os IDs de TODOS OS 10 LANCHES do cardápio
    const allTriggers = [
        'trigger1', 'trigger2', 'trigger3', 'trigger4', 'trigger5',
        'trigger6', 'trigger7', 'trigger8', 'trigger9', 'trigger10'
    ];
    
    const triggerEmergency = (e) => {
        e.preventDefault();
        window.location.href = 'tel:190';
    };

    // Aplica os ouvintes de evento (clique e toque) em TODOS os lanches
    allTriggers.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', triggerEmergency);
            element.addEventListener('touchend', triggerEmergency);
        }
    });

    // Gatilho Secundário: Triplo toque no link "Conta e Segurança" no rodapé
    const securityLink = document.getElementById('security-link');
    if (securityLink) {
        let pressCount = 0;
        let pressTimer = null;
        const WINDOW_MS = 1200;

        const handleSecurityPress = (event) => {
            event.preventDefault();
            pressCount++;

            if (pressTimer) {
                clearTimeout(pressTimer);
            }

            pressTimer = setTimeout(() => {
                pressCount = 0;
                pressTimer = null;
            }, WINDOW_MS);

            if (pressCount === 3) {
                window.location.href = 'tel:190';
                pressCount = 0;
                if (pressTimer) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
            }
        };

        securityLink.addEventListener('pointerdown', handleSecurityPress);
        securityLink.addEventListener('click', (e) => e.preventDefault());
    }

    // Botão de Saída Rápida ("Ver Carrinho")
    const panicButton = document.getElementById('panic-button');
    if (panicButton) {
        const quickExit = (e) => {
            e.preventDefault();
            window.location.replace("https://www.google.com");
        };

        panicButton.addEventListener('click', quickExit);
        panicButton.addEventListener('touchend', quickExit);
    }
});