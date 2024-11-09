document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cart = [];

    // Função para mostrar a notificação de confirmação
    const showNotification = () => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = 'Item adicionado ao carrinho! Role para baixo para acessar.';
        document.body.appendChild(notification);

        // Exibe e oculta a notificação
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            document.body.removeChild(notification);
        }, 3000);
    };

    const updateCart = () => {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item');
            
            const itemName = document.createElement('span');
            itemName.classList.add('item-name');
            itemName.textContent = item.name;

            const itemQuantity = document.createElement('input');
            itemQuantity.classList.add('item-quantity');
            itemQuantity.type = 'number';
            itemQuantity.value = item.quantity;
            itemQuantity.min = 1;
            itemQuantity.addEventListener('change', (event) => {
                item.quantity = parseInt(event.target.value);
                updateCart();
            });

            const itemPrice = document.createElement('span');
            itemPrice.classList.add('item-price');
            itemPrice.textContent = `R$${(item.price * item.quantity).toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-item');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                updateCart();
            });

            listItem.appendChild(itemName);
            listItem.appendChild(itemQuantity);
            listItem.appendChild(itemPrice);
            listItem.appendChild(removeButton);
            cartItems.appendChild(listItem);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.product');
            const productId = parseInt(productElement.dataset.id);
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = parseFloat(productElement.dataset.price);

            const existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            updateCart();
            showNotification(); // Chama a função de notificação ao adicionar item
        });
    });

    const showPaymentDialog = () => {
        const paymentDialog = document.createElement('div');
        paymentDialog.classList.add('payment-dialog');
        paymentDialog.innerHTML = `
            <h3>Selecione a Forma de Pagamento</h3>
            <button data-payment="pix">PIX</button>
            <button data-payment="cartao">Cartão</button>
            <button data-payment="dinheiro">Dinheiro</button>
        `;
        document.body.appendChild(paymentDialog);

        // Event listeners para cada botão de pagamento
        paymentDialog.querySelector('[data-payment="pix"]').addEventListener('click', () => {
            window.location.href = 'pix.html'; // Redireciona para a página PIX
        });
        
        paymentDialog.querySelector('[data-payment="cartao"]').addEventListener('click', () => {
            window.location.href = 'payment.html'; // Redireciona para a página de pagamento com cartão
        });
        
        paymentDialog.querySelector('[data-payment="dinheiro"]').addEventListener('click', () => {
            window.location.href = 'dinheiro.html'; // Redireciona para a página de pagamento em dinheiro
        });
    };

    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length > 0) {
            const totalPrice = totalPriceElement.textContent;
            localStorage.setItem('totalPrice', totalPrice); 
            showPaymentDialog();
        } else {
            alert('Seu carrinho está vazio!');
        }
    });
});
