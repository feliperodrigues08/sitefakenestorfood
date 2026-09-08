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

    // Função para acionar o discador de emergência
    const executeEmergencyCall = () => {
        window.location.href = 'tel:190';
    };

    // Controle de sensibilidade ao toque para evitar acionamentos ao rolar a tela
    let touchStartX = 0;
    let touchStartY = 0;
    const MOVE_THRESHOLD = 10; // Tolerância máxima em pixels para considerar como toque em vez de rolagem

    allTriggers.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            // Registra a posição onde o dedo encostou na tela
            element.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            // Executa a ação apenas se o dedo não tiver se movido além do limite (rolagem)
            element.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;

                const deltaX = Math.abs(touchEndX - touchStartX);
                const deltaY = Math.abs(touchEndY - touchStartY);

                // Se o movimento for menor que o limite, trata-se de um toque intencional
                if (deltaX < MOVE_THRESHOLD && deltaY < MOVE_THRESHOLD) {
                    e.preventDefault();
                    executeEmergencyCall();
                }
            });

            // Suporte para clique com mouse no computador
            element.addEventListener('click', (e) => {
                e.preventDefault();
                executeEmergencyCall();
            });
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
                executeEmergencyCall();
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