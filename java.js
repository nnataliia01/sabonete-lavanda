let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let precoProduto = 15.00;

document.addEventListener("DOMContentLoaded", () => {
    atualizarCarrinho();
    iniciarModal();
});

function adicionarAoCarrinho() {
    const quantidade = parseInt(document.getElementById("quantity").value);
    for (let i = 0; i < quantidade; i++) {
        carrinho.push({ nome: "Sabonete de Lavanda", preco: precoProduto });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
    mostrarModal();
}

function atualizarCarrinho() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    
    cartItems.innerHTML = "";

    if (carrinho.length === 0) {
        cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
        cartTotal.innerText = "Total: R$ 0,00";
    } else {
        let total = 0;
        carrinho.forEach((item, index) => {
            total += item.preco;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            `;
            cartItems.appendChild(cartItem);
        });
        cartTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
    }

    cartCount.innerText = `(${carrinho.length})`;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        alert("Compra finalizada com sucesso!");
        carrinho = [];
        localStorage.removeItem('carrinho');
        atualizarCarrinho();
    }
}

function scrollToProduct() {
    document.querySelector('#product').scrollIntoView({ behavior: 'smooth' });
}

function mostrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";

    setTimeout(() => {
        modal.style.display = "none";
    }, 2000);
}

function iniciarModal() {
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

function validarFormulario() {
    const nome = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("message").value.trim();
    const feedback = document.getElementById("form-feedback");

    if (nome === "" || email === "" || mensagem === "") {
        feedback.innerText = "Por favor, preencha todos os campos.";
        feedback.style.color = "red";
        return false;
    }

    feedback.innerText = "Mensagem enviada com sucesso!";
    feedback.style.color = "green";
    return true;
}
