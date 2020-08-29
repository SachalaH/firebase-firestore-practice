const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

// function to render list of cafes
function renderCafeList(cafe) {
  // creating requried elements
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  //   Setting attributes
  li.setAttribute("data-id", cafe.id);
  //   Updating contents
  name.textContent = cafe.data().name;
  city.textContent = cafe.data().city;
  //   appending the elements
  li.appendChild(name);
  li.appendChild(city);
  cafeList.appendChild(li);
}
// Getting data
db.collection("cafes")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.data());
      renderCafeList(doc);
    });
  });

//  Saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("cafes").add({
    name: form.name.value,
    city: form.city.value,
  });
  form.name.value = "";
  form.city.value = "";
});
