// المتغيرات
let inputproduct = document.getElementById("inputproduct");
let addbtn = document.getElementById("addbtn");
let count = document.getElementById("count");
let inputsearch = document.getElementById("search");
let notfound = document.getElementById("notfound");
let content = document.getElementById("content");
let edit = null;
let editvalue = null;

//المنتجات
let allproducts = [
    { id: 1, name: "Hills", price: 450, img: "هيلز.webp" },
    { id: 2, name: "Sneakers", price: 500, img: "سنيكرز .avif" },
    { id: 3, name: "Smart Watch", price: 1150, img: "ساعه.jpg" },
    { id: 4, name: "iPhone 15", price: 25000, img: "ايفون 15.webp" },
    { id: 5, name: "Backpack", price: 350, img: "شنطه ظهر.webp" },
    { id: 6, name: "MackBook", price: 48000, img: "ماك بوك.jpg" },
    { id: 7, name: "Sunglasses", price: 180, img: "نضاره.jpeg" },
    { id: 8, name: "Headphones", price: 650, img: "هيدفون.jpg" },
    { id: 9, name: "Leather Wallet", price: 200, img: "محفظه.jpg" }
]

// عداد المنتجات
count.innerHTML = `${allproducts.length}  :عدد المنتجات`;

// الكارد
function drow() {
    content.innerHTML = "";
    allproducts.forEach(ele => {
        content.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card h-100">
            <img src="images/${ele.img}" class="card-img-top object-fit-cover" style="height: 350px;" alt="${ele.name}" />
                <div class="card-body">
                    <h4 class="card-title">${ele.name}</h4>
                    <p class="card-text">💸 ${ele.price} $</p>
                    <a href="#" class="btn btn-warning ms-2" onclick="editname(${ele.id})">
                        <i class="fa-solid fa-pen-to-square"></i> Edit Name 
                    </a>
                    <a href="#" class="btn btn-warning ms-2" onclick="editprice(${ele.id})">
                        <i class="fa-solid fa-pen-to-square"></i> Edit Price
                    </a>
                    <a href="#" class="btn btn-danger ms-2" onclick="deletebtn(${ele.id})">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                </div>
            </div>
        </div>`;
    });
}
drow(allproducts);

// (disabled)زر ال 
inputproduct.addEventListener("input", () => {
  if (inputproduct.value != "") {
    addbtn.removeAttribute("disabled");
  } else {
    addbtn.setAttribute("disabled", true);
  }
});

// (name)زر التعديل 
function editname(id) {
  let findproduct = allproducts.find((f) => f.id === id);
  if (findproduct) {
    inputproduct.value = findproduct.name;
    addbtn.removeAttribute("disabled");
    addbtn.innerText = "Update";
    edit = id;
    editvalue = "name";
  }
}

// (price)زر التعديل 
function editprice(id) {
  let findproduct = allproducts.find((f) => f.id === id);
  if (findproduct) {
    inputproduct.value = findproduct.price;
    addbtn.removeAttribute("disabled");
    addbtn.innerText = "Update";
    edit = id;
    editvalue = "price";
  }
}

// زر الاضافه 
addbtn.addEventListener("click", () => {
  let db = allproducts.some(
    (d) =>
      d.name.toLocaleLowerCase().trim() ===
      inputproduct.value.toLocaleLowerCase().trim()
  );
  if (db) {
    Swal.fire({
      title: "المنتج موجود مسبقا",
      icon: "warning",
      draggable: true,
    });
    return;
  }
  if (edit) {
    let findproduct = allproducts.find((f) => f.id === edit);
    if (findproduct) {
      if (editvalue === "name") {
        findproduct.name = inputproduct.value;
      } else if (editvalue === "price") {
        findproduct.price = inputproduct.value;
      }
      drow();
    }
    edit = null;
    editvalue = null;
    addbtn.innerText = "Add";
  } else {
    let lastid = allproducts.length
      ? allproducts[allproducts.length - 1].id
      : 0;
    allproducts.push({
      id: ++lastid,
      name: inputproduct.value,
      price: prompt("ادخل السعر"),
    });
    let product1 = allproducts[allproducts.length - 1];
    content.innerHTML +=`<div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card h-100">
            <img src="images/${product1.img}" class="card-img-top object-fit-cover" style="height: 350px;" alt="${product1.name}" />
                <div class="card-body">
                    <h4 class="card-title">${product1.name}</h4>
                    <p class="card-text">💸 ${product1.price} $</p>
                    <a href="#" class="btn btn-warning ms-2" onclick="editname(${product1.id})">
                        <i class="fa-solid fa-pen-to-square"></i> Edit Name 
                    </a>
                    <a href="#" class="btn btn-warning ms-2" onclick="editprice(${product1.id})">
                        <i class="fa-solid fa-pen-to-square"></i> Edit Price
                    </a>
                    <a href="#" class="btn btn-danger ms-2" onclick="deletebtn(${product1.id})">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                </div>
            </div>
        </div>`;
}
count.innerHTML = `${allproducts.length} : عدد المنتجات`;
  inputproduct.value = "";
  addbtn.setAttribute("disabled", true);
});

// حذف المنتج
function deletebtn(id) {
  let index = allproducts
    .map((del) => {
      return del.id;
    })
    .indexOf(id);

  if (index != -1) {
    allproducts.splice(index, 1); 
  }

  Swal.fire({
    title: "تم الحذف",
    icon: "success",
    draggable: true
  });

  drow();
  count.innerHTML = `${allproducts.length} : عدد المنتجات`;
}

// البحث
inputsearch.addEventListener("input", () => {
  let inputvalue = inputsearch.value.toLocaleLowerCase();
  let productfiltr = allproducts.filter((item) => {
    return item.name.toLocaleLowerCase().includes(inputvalue);
  });
  content.innerHTML = "";
  productfiltr.forEach((product2) => {
    content.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card h-100">
            <img src="images/${product2.img}" class="card-img-top object-fit-cover" style="height: 350px;" alt="${product2.name}" />
                <div class="card-body">
                    <h4 class="card-title">${product2.name}</h4>
                    <p class="card-text">💸 ${product2.price} $</p>
                    <a href="#" class="btn btn-warning ms-2" onclick="editname(${product2.id})">
                        <i class="fa-solid fa-pen-to-square"></i> Edit Name 
                    </a>
                    <a href="#" class="btn btn-warning ms-2" onclick="editprice(${product2.id})">
                        <i class="fa-solid fa-pen-to-square"></i> Edit Price
                    </a>
                    <a href="#" class="btn btn-danger ms-2" onclick="deletebtn(${product2.id})">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                </div>
            </div>
        </div>`
  });
  if (productfiltr.length == 0) {
    notfound.style.display = "block";
  } else {
    notfound.style.display = "none";
  }
});