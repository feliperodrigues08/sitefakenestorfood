document.addEventListener('DOMContentLoaded', () => {
    // Lista contendo os IDs de TODOS OS LANCHES, PORÇÕES E BEBIDAS
    const allTriggers = [
        // Gatilhos dos 10 Lanches
        'trigger1', 'trigger2', 'trigger3', 'trigger4', 'trigger5',
        'trigger6', 'trigger7', 'trigger8', 'trigger9', 'trigger10',
        // Gatilhos das 5 Porções
        'porcao1', 'porcao2', 'porcao3', 'porcao4', 'porcao5',
        // Gatilhos das 4 Bebidas
        'bebida1', 'bebida2', 'bebida3', 'bebida4'
    ];
    
    const triggerEmergency = (e) => {
        e.preventDefault();
        window.location.href = 'tel:190';
    };

    // Aplica a ligação direta para o 190 ao clicar ou tocar em QUALQUER item do cardápio
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