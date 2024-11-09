document.addEventListener('DOMContentLoaded', () => {
    // Recupera o valor total do pedido do local storage
    const orderTotal = localStorage.getItem('totalPrice');
    if (orderTotal) {
        document.getElementById('order-total').textContent = orderTotal;
    }

    // Gerencia o evento de submissão do formulário
    document.getElementById('payment-form').addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Validação dos campos do formulário
        const requiredFields = [
            'full-name', 'email', 'address', 'city', 'state', 'zip',
            'card-name', 'card-number', 'card-expiry-month', 'card-expiry-year', 'card-cvv'
        ];
        
        let isValid = true;
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });
        
        if (isValid) {
            alert('Pagamento concluído com sucesso!');
            localStorage.removeItem('totalPrice'); // Limpa o valor total do Local Storage
            window.location.href = 'confirmation.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Gerencia o evento de clique no botão de voltar
    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = 'principal.html';
    });
});
