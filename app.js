const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

// function to render list of cafes
function renderCafeList(cafe) {
  // creating requried elements
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");
  //   Setting attributes
  li.setAttribute("data-id", cafe.id);
  //   Updating contents
  name.textContent = cafe.data().name;
  city.textContent = cafe.data().city;
  cross.textContent = "x";
  //   appending the elements
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  cafeList.appendChild(li);

  //   Deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  });
}
// Getting data
// db.collection("cafes")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       //   console.log(doc.data());
//       renderCafeList(doc);
//     });
//   });

// Real time listener
db.collection("cafes")
  .orderBy("city")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    // console.log(changes);
    changes.forEach((change) => {
      if (change.type === "added") {
        renderCafeList(change.doc);
      } else if (change.type === "removed") {
        let li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
        cafeList.removeChild(li);
      }
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
