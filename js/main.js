let API = "http://localhost:8000/cars";
// ? Add Form
let carsList = $("#cars-list");
let details = $(".details");
let search = $("#search");
let pagination = $("#pagination");
let page = 1;
let limit = 1;
// model, price, video, image * 4
let addFormModel = $("#add-form-model");
let addFormPrice = $("#add-form-price");
let addFormVideo = $("#add-form-video");
let addFormImage1 = $("#add-form-image-1");
let addFormImage2 = $("#add-form-image-2");
let addFormImage3 = $("#add-form-image-3");
let addFormImage4 = $("#add-form-image-4");
let addFormSaveBtn = $("#add-form-save-btn");
// console.log(
//   addFormImage1,
//   addFormImage2,
//   addFormImage3,
//   addFormImage4,
//   addFormModel,
//   addFormPrice,
//   addFormVideo
let editFormModel = $("#edit-form-model");
let editFormPrice = $("#edit-form-price");
let editFormVideo = $("#edit-form-video");
let editFormImage1 = $("#edit-form-image-1");
let editFormImage2 = $("#edit-form-image-2");
let editFormImage3 = $("#edit-form-image-3");
let editFormImage4 = $("#edit-form-image-4");
let editFormId = $("#edit-form-id");
let editFormSaveBtn = $("#edit-form-save-btn");
// console.log(
//   editFormImage1,
//   editFormImage2,
//   editFormImage3,
//   editFormImage4,
//   editFormModel,
//   editFormPrice,
//   editFormVideo
// );

addFormSaveBtn.on("click", async function () {
  let newCar = {
    model: addFormModel.val(),
    price: addFormPrice.val(),
    video: addFormVideo.val(),
    image1: addFormImage1.val(),
    image2: addFormImage2.val(),
    image3: addFormImage3.val(),
    image4: addFormImage4.val(),
  };
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(newCar),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  getCars();
  console.log(newCar);
});

async function getCars() {
  let data = await fetch(
    `${API}?q=${search.val()}&_page=${page}&_limit${limit}`
  ).then((res) => res.json());
  //   console.log(data);
  carsList.html("");
  data.forEach((car) => {
    carsList.append(`

<div id=${car.id} class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${car.model}</h5>
    <p class="card-text">${car.price}</p>
    <div class="embed-responsive embed-responsive-21by9">
    <img src="${car.image1}" class="card-img-top" alt="...">
    </div>
    <div class="d-flex justify-content-around">
     <i class="fas fa-trash btn-delete"></i>
        <i class="fas fa-edit btn-edit" data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ></i>
        <i class="fas fa-info-circle btn-details" data-bs-toggle="modal"
        data-bs-target="#exampleModal1"></i>
    </div>
  </div>
</div>`);
  });
  pagination.html(
    `<button ${
      page == 1 ? "disabled" : ""
    } id="btn-prev">Prev</button><span>${page}</span><button id="btn-next">Next</button>`
  );
}
$("body").on("click", "#btn-prev", function () {
  page -= 1;
  getCars();
});
$("body").on("click", "#btn-next", function () {
  page += 1;
  getCars();
});
getCars();
search.on("input", getCars);

$("body").on("click", ".btn-delete", async function (e) {
  let id = e.target.parentNode.parentNode.parentNode.id;
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json; charset=utf-8" },
  });
  getCars();
});

$("body").on("click", ".btn-edit", async function (e) {
  let id = e.target.parentNode.parentNode.parentNode.id;
  // console.log(id);
  let editData = await fetch(`${API}/${id}`).then((res) => res.json());
  console.log(editData);
  editFormModel.val(editData.model);
  editFormVideo.val(editData.video);
  editFormPrice.val(editData.price);
  editFormImage1.val(editData.image1);
  editFormImage2.val(editData.image2);
  editFormImage3.val(editData.image3);
  editFormImage4.val(editData.image4);
  editFormId.val(editData.id);
});
editFormSaveBtn.on("click", function () {
  let editedData = {
    model: editFormModel.val(),
    price: editFormPrice.val(),
    video: editFormVideo.val(),
    image1: editFormImage1.val(),
    image2: editFormImage2.val(),
    image3: editFormImage3.val(),
    image4: editFormImage4.val(),
  };
  fetch(`${API}/${editFormId.val()}`, {
    method: "PATCH",
    body: JSON.stringify(editedData),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  getCars();
});
$("body").on("click", ".btn-details", async function (e) {
  let id = e.target.parentNode.parentNode.parentNode.id;
  let detailsData = await fetch(`${API}/${id}`).then((res) => res.json());
  details.html(`
  <video autoplay loop muted width='100%' src=${detailsData.video}></video>
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src=${detailsData.image2} class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src=${detailsData.image3} class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src=${detailsData.image4} class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>  
  `);
  console.log(detailsData);
});
