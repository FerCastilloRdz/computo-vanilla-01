import  { db } from './firebase.js'
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const productTable = document.getElementById('productTable')
const addProductFrom = document.getElementById('addProductForm')

const products = collection(db,'products')

const loadProducts = async () => {
    productTable.innerHTML = ''
    const allProducts = await getDocs(products)
    allProducts.forEach((item) => {
        const product = item.data()
        const row = document.createElement('tr')
        row.innerHTML = `
        <th>${product.name}</th>
        <th>${product.stock}</th>
        <th>
            <button class="btn btn-warning btn-sm edit-product" data-id="${item.id}">
            <i class="fas fa-edit"></i>
            </button>
            |
           <button class="btn btn-danger btn-sm delete-product" data-id="${item.id}">
            <i class="fas fa-trash"></i>
            </button>
        </th>
        `
        productTable.appendChild(row)
    })
}

// Función para agregar productos
addProductFrom.addEventListener('submit', async () => {
    e.preventDefault();
    const name = document.getElementById('productname').value 
    const stock = document.getElementById('productStock').value

    try {
        await addDoc(products, { name, stock })
        alert('Producto agregado satisfactoriamente')
        addProductFrom.reset()
        //loadProducts()
    } catch (error) {
        alert('Error al agregar el producto: ' + error.message)
    }
})