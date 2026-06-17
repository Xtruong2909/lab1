const PRODUCTS = [
  {id:1, name:'Green T-Shirt', price:199000, desc:'Comfortable cotton tee', img:'https://via.placeholder.com/320x200?text=T-Shirt+1'},
  {id:2, name:'Blue Hoodie', price:499000, desc:'Warm and cozy hoodie', img:'https://via.placeholder.com/320x200?text=Hoodie+2'},
  {id:3, name:'Cap Classic', price:129000, desc:'Adjustable cap', img:'https://via.placeholder.com/320x200?text=Cap+3'},
  {id:4, name:'Sneakers', price:899000, desc:'Everyday sneakers', img:'https://via.placeholder.com/320x200?text=Shoes+4'}
];

function formatPrice(v){
  return (v/1000).toFixed(0) + 'k VND';
}

function getCart(){
  try{ return JSON.parse(localStorage.getItem('cart')||'[]') }catch(e){return[]}
}

function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)) }

function addToCart(id, qty=1){
  const cart = getCart();
  const existing = cart.find(i=>i.id===id);
  if(existing) existing.qty += qty; else cart.push({id,qty});
  saveCart(cart);
  alert('Added to cart');
}

function renderProducts(){
  const el = document.getElementById('products');
  if(!el) return;
  el.innerHTML = PRODUCTS.map(p=>`
    <div class="product">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${formatPrice(p.price)}</p>
      <p class="pdesc">${p.desc}</p>
      <div class="pactions">
        <a class="btn" href="product.html?id=${p.id}">View</a>
        <button class="btn primary" onclick="addToCart(${p.id})">Add</button>
      </div>
    </div>
  `).join('');
}

function renderProductDetail(){
  const el = document.getElementById('product-detail');
  if(!el) return;
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id'))||1;
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) { el.innerHTML = '<p>Product not found</p>'; return }
  el.innerHTML = `
    <div class="product-detail">
      <img src="${p.img}" alt="${p.name}">
      <div class="pd-info">
        <h2>${p.name}</h2>
        <p class="price">${formatPrice(p.price)}</p>
        <p>${p.desc}</p>
        <div style="margin-top:12px">
          <button class="btn primary" onclick="addToCart(${p.id})">Add to cart</button>
          <a class="btn" href="products.html">Back</a>
        </div>
      </div>
    </div>
  `;
}

function renderCart(){
  const el = document.getElementById('cart');
  if(!el) return;
  const cart = getCart();
  if(cart.length===0){ el.innerHTML = '<p>Your cart is empty.</p>'; return }
  let html = '<div class="cart-list">';
  let total = 0;
  cart.forEach(item=>{
    const p = PRODUCTS.find(x=>x.id===item.id);
    if(!p) return;
    const sub = p.price * item.qty;
    total += sub;
    html += `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}">
        <div class="ci-info">
          <h4>${p.name}</h4>
          <p>Qty: ${item.qty} — ${formatPrice(sub)}</p>
        </div>
      </div>
    `;
  });
  html += `</div>
    <div class="cart-summary">
      <p>Total: <strong>${formatPrice(total)}</strong></p>
      <button class="btn primary" onclick="checkout()">Checkout</button>
      <button class="btn" onclick="clearCart()">Clear</button>
    </div>`;
  el.innerHTML = html;
}

function checkout(){
  alert('Checkout simulated — thank you!');
  localStorage.removeItem('cart');
  renderCart();
}

function clearCart(){ localStorage.removeItem('cart'); renderCart(); }

window.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
  renderProductDetail();
  renderCart();
});
