// Variable
let allInputs = document.querySelectorAll("input");
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let priceInputs = document.querySelectorAll(".price_container input");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search_Title = document.getElementById("search_Title");
let search_Category = document.getElementById("search_Category");
let deleteAllBtn = document.getElementById("deleteAllBtn");
let tbody = document.getElementById("tbody");
let updateBtn = document.getElementById("update");
let deleteBtn = document.getElementById("delete");

let mood = "create";
let tmp;

// Get Total

function getTotal() {
  if (price.value !== "") {
    taxes == "" ? (taxes = 0) : taxes;
    ads == "" ? (ads = 0) : ads;
    discount == "" ? (discount = 0) : discount;
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.textContent = result;
    total.style.backgroundColor = "#3aa856";
  } else {
    total.textContent = "0";
    total.style.backgroundColor = "#e50000";
  }
}
priceInputs.forEach((input) => {
  input.onkeyup = () => {
    getTotal();
  };
});
// Create Product
let products = [];

if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
}
showData();
submit.addEventListener("click", createProduct);
function createProduct() {
  let newProduct = {
    title: title.value || "Title",
    price: price.value || 0,
    taxes: taxes.value || 0,
    ads: ads.value || 0,
    discount: discount.value || 0,
    total: total.textContent,
    count: count.value || 1,
    category: category.value || "Unknown",
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count < 100
  ) {
    if (mood == "create") {
      // Count
      if (newProduct.count > 1) {
        for (let i = 0; i < count.value; i++) {
          products.push(newProduct);
        }
      } else {
        products.push(newProduct);
      }
    } else {
      products[tmp] = newProduct;
      mood = "create";
      submit.textContent = "Create";
      submit.classList.remove("update");
      count.style.display = "block";
    }
    emptyInputs();
  }
  // Save in Local Storage
  localStorage.setItem("products", JSON.stringify(products));
}
// Empty Inputs
function emptyInputs() {
  allInputs.forEach((input) => {
    input.value = "";
  });
  total.textContent = "0";
  total.style.backgroundColor = "#e50000";
}
// Read Data
submit.addEventListener("click", showData);
function showData() {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
    <tr>
      <td>${i+1}</td>
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td>
      <td>${products[i].discount}</td>
      <td>${products[i].total}</td>
      <td>${products[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }
  tbody.innerHTML = table;
  if (products.length > 0) {
    deleteAllBtn.innerHTML = `
    <button onclick="deleteAll()">delete all (${products.length})</button>
    `;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}
// Update
function updateData(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  taxes.value = products[index].taxes;
  ads.value = products[index].ads;
  discount.value = products[index].discount;
  getTotal();
  count.style.display = "none";
  category.value = products[index].category;
  submit.textContent = "Update";
  submit.classList.add("update");
  mood = "update";
  tmp = index;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// Delete
function deleteData(index) {
  products.splice(index, 1);
  localStorage.products = JSON.stringify(products);
  showData();
}
// Delete All
function deleteAll() {
  products = [];
  localStorage.clear();
  showData();
}
// Search
let searchMood = "title";

function getSearchMood(id) {
  if (id === "search_Title") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
    <tr>
      <td>${i+1}</td>
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td>
      <td>${products[i].discount}</td>
      <td>${products[i].total}</td>
      <td>${products[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
    <tr>
      <td>${i}</td>
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td>
      <td>${products[i].discount}</td>
      <td>${products[i].total}</td>
      <td>${products[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
      }
    }
  }
  tbody.innerHTML = table;
}
// Clean Date
/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);
