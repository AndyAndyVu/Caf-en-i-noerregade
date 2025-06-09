const domain = "https://www.huyvu.dk/";
const postsEndpointMad = "wp-json/wp/v2/madret";
const postsEndpointDrikke = "wp-json/wp/v2/drikkevare";
const morePages = "?per_page=25";
// per_page er en parameter der fortæller hvor mange opskrifter skal vises på et array. Wordpress kan maks have 10 opskrifter i et array, derfor var vi nød til tilføje denne for at vise alle 25.
const getRealImageUrls = "&acf_format=standard";

async function getPublicFoodItems() {
  // Async gør funktionen asynkron, så den venter på at dataene er hentet.
  try {
    const response = await fetch(
      domain + postsEndpointMad + morePages + getRealImageUrls
    );
    // response er et objekt fordi fetch() returnerer et objekt. Man kan også sige at domain + postEndPoint er vores metadata og data fra vores API. Await gør at vi venter på at dataene er hentet.

    const foodItems = await response.json();
    return foodItems;
    // Vi konvertere vores data til JSON og får vores opskrifter ud af det. Altså et objekt
  } catch (error) {
    console.log("det virker ikke", error);
    // Hvis der er en fejl, så log den i konsollen.
  }
}

// Henter drikkevarer async fra API'ET
async function getPublicDrinkItems() {
  try {
    const response = await fetch(
      domain + postsEndpointDrikke + morePages + getRealImageUrls
    );
    const drinkItems = await response.json();
    return drinkItems;
  } catch (error) {
    console.log("det virker ikke", error);
  }
}

getPublicFoodItems().then(data => {
  console.log("Madvarer:", data);
});

getPublicDrinkItems().then(data => {
  console.log("Drikkevarer:", data);
});

getPublicFoodItems().then(data => {
  const container = document.getElementById("food-container");
  
  data.forEach(item => {
    container.innerHTML += `
      <div class="food-item">
        <h3>${item.title.rendered}</h3>
         <p class="price">${item.class_list[5].replace("mad_kategori-","")}</p>
        <p>${item.acf?.beskrivelse || "Ingen beskrivelse"}</p>
        <p class="price">${item.acf?.pris || "Pris ikke angivet"}</p>
        <p>${item.mad_kategori}</p>
      </div>
    `;
  });
});
