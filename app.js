const cafeList = document.querySelector("#cafe-list");

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

db.collection("cafes")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.data());
      renderCafeList(doc);
    });
  });
