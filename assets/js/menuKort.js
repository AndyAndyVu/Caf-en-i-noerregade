// const domain = "https://www.huyvu.dk/";
// const postsEndpointMad = "wp-json/wp/v2/madret";
// const postsEndpointDrikke = "wp-json/wp/v2/drikkevare";
// const morePages = "?per_page=25";
// // per_page er en parameter der fortæller hvor mange opskrifter skal vises på et array. Wordpress kan maks have 10 opskrifter i et array, derfor var vi nød til tilføje denne for at vise alle 25.
// const getRealImageUrls = "&acf_format=standard";

// async function getPublicFoodItems() {
//   // Async gør funktionen asynkron, så den venter på at dataene er hentet.
//   try {
//     const response = await fetch(
//       domain + postsEndpointMad + morePages + getRealImageUrls
//     );
//     // response er et objekt fordi fetch() returnerer et objekt. Man kan også sige at domain + postEndPoint er vores metadata og data fra vores API. Await gør at vi venter på at dataene er hentet.

//     const foodItems = await response.json();
//     return foodItems;
//     // Vi konvertere vores data til JSON og får vores opskrifter ud af det. Altså et objekt
//   } catch (error) {
//     console.log("det virker ikke", error);
//     // Hvis der er en fejl, så log den i konsollen.
//   }
// }

// // Henter drikkevarer async fra API'ET
// async function getPublicDrinkItems() {
//   try {
//     const response = await fetch(
//       domain + postsEndpointDrikke + morePages + getRealImageUrls
//     );
//     const drinkItems = await response.json();
//     return drinkItems;
//   } catch (error) {
//     console.log("det virker ikke", error);
//   }
// }

// getPublicFoodItems().then(data => {
//   console.log("Madvarer:", data);
// });

// getPublicDrinkItems().then(data => {
//   console.log("Drikkevarer:", data);
// });

// getPublicFoodItems().then(data => {
//   const container = document.getElementById("food-container");
  
//   data.forEach(item => {
//     container.innerHTML += `
//       <div class="food-item">
//         <h3>${item.title.rendered}</h3>
//          <p class="price">${item.class_list[5].replace("mad_kategori-","")}</p>
//         <p>${item.acf?.beskrivelse || "Ingen beskrivelse"}</p>
//         <p class="price">${item.acf?.pris || "Pris ikke angivet"}</p>
//         <p>${item.mad_kategori}</p>
//       </div>
//     `;
//   });
// });

const domain = "https://www.huyvu.dk/";

// Endpoints for madretter og drikkevarer
const postsEndpointMad = "wp-json/wp/v2/madret";
const postsEndpointDrikke = "wp-json/wp/v2/drikkevare";

// per_page er en parameter der gør det muligt at hente flere elementer ad gangen.
// Den normale limit er 10, med dette kan vi hente 25 ad gangen.
const morePages = "?per_page=25";

// Endpoints for taxonomi kategorier (fx. læskedrikke, varm kaffe, kold kaffe, Snacks, Morgenmad osv.)
const postsEndpointMadKategori = "wp-json/wp/v2/mad_kategori";
const postsEndpointDrikkeKategori = "wp-json/wp/v2/drikke_kategori";

// Html element hvor vi indsætter vores resultater
const resultEl = document.querySelector(".results");

// ! Mangler at lave tags om til emojis
// // Emoji-ikon map til tags
// const tagIcons = {
//   "Vegansk": "🌱",
//   "Børnevenlig": "🧸",
//   "Glutenfri": "🌾",
//   "Caféens anbefaling": "👍",
//   "Mest populære": "⭐"
// };

// fetch for at hente madkategorier
async function getPublicFoodCategories() {
  // Try catch blok, endten virker det eller så fanger den en fejl.
  try {
    // Henter data fra API'et ved at fetch domain og endpoint
    const response = await fetch(domain + postsEndpointMadKategori);
    // Konventerer svaret til JSON format som er objekt format
    const foodCategories = await response.json();
    // Returnerer de hentede madkategorier så vi kan bruge dem senere
    return foodCategories;
  } catch (error) {
    console.log("det virker ikke", error);
  }
}

// fetch food items
async function getPublicFoodItems() {
  try {
    const response = await fetch(domain + postsEndpointMad + morePages);
    const foodItems = await response.json();
    return foodItems;
  } catch (error) {
    console.log("det virker ikke", error);
  }
}

// fetch for at hente drikkekategorier
async function getPublicDrinkCategories() {
  try {
    const response = await fetch(domain + postsEndpointDrikkeKategori);
    const drinkCategories = await response.json();
    return drinkCategories;
  } catch (error) {
    console.log("det virker ikke", error);
  }
}

// fetch drink items
async function getPublicDrinkItems() {
  try {
    const response = await fetch(domain + postsEndpointDrikke + morePages);
    const drinkItems = await response.json();
    return drinkItems;
  } catch (error) {
    console.log("det virker ikke", error);
  }
}

// Render mad og madkategorier
function renderFoods(foodCategories, foodItems) {
  // Tømmer resultEl for tidligere resultater
  resultEl.innerHTML = "";

  foodCategories.forEach((category) => {
    // innerHTML ind i resultEl for hver mad kategori fx. "Snacks", "Morgenmad", osv.
    resultEl.innerHTML += `
    <div class="category"> 
    <h2>${category.name}</h2>
    </div>
    `;

    // Filtrerer madretter for at finde dem der matcher med deres kategori ID
    // Filtrer specifikt foodItems(madretter) at de inderholder mad_kategori(som er ID) som matcher med category.id
    const matchingIDs = foodItems.filter((foodItem) =>
      foodItem.mad_kategori.includes(category.id)
    );

    // Hvis der er madretter i denne kategori, så render dem
    if (matchingIDs.length > 0) {
      matchingIDs.forEach((id) => {
        resultEl.innerHTML += `
        <div class="foodItem">
        <div class="foodText"> 
        <div class="foodTitleTags"> 
        <h3>${id.title.rendered}</h3>

        <!-- 
        // Vi tjekker om tags er over 0 fordi hvis den er over 0 er det et array, under er den en string, (fordi feltet ikke er udfyldt field groups cms)
        // hvis array, så bruger vi join (array function) det konventere array til en string så vi kan bruge det i HTML.
        // Example: ["Vegansk", "Glutenfri"] bliver til "Vegansk Glutenfri"
        // "?" og ":" er ternary operators der fungerer som en kortere if-else
        // enten ?joiner vi arrayet eller :retunere vi en tom string.
        -->
        <p>${id.acf.tags.length > 0 ? id.acf.tags.join(" ") : ""}</p>
        </div>
        <p>${id.acf.beskrivelse}</p>
        </div> 
        <div class="foodPrice"> 
        <h3>${id.acf.pris},-</h3>
        </div>
        </div>
        `;
      });
    } else {
      resultEl.innerHTML += `<p>Fejl ingen elementer i denne kategori.</p>`;
    }
  });
}

// Her laver vi en asynkron funktion initFoods for at hente madretter og kategorier
// Det kan  vi gøre fordi vi har returnet de data fra vores fetch funktioner.
async function initFoods() {
  try {
    // Venter på at hente madkategorier og madretter fra API'et
    const foodCategories = await getPublicFoodCategories();
    const foodItems = await getPublicFoodItems();

    // Logger de hentede data til konsollen for debugging
    console.log(foodCategories);
    console.log(foodItems);

    // Kalder renderFoods med de hentede data
    renderFoods(foodCategories, foodItems);
  } catch (error) {
    console.log(error);
    resultEl.innerHTML = `Der gik noget galt3`;
  }
}
// Kører renderFoods funktionen
initFoods();

// ! Vi har ikke lavet drinks endnu, derfor er denne kode kommenteret ud.
// ! Fjernelse af kommentarer vil køre drinks funktionen og break pga drinks ikke er lavet endnu.
/* 
// Her laver vi en asynkron funktion initDrinks for at hente drikkevarer og kategorier
// Det kan  vi gøre fordi vi har returnet de data fra vores fetch funktioner.
async function initDrinks() {
  try {
    // Venter på at hente drikkekategorier og drikkevarer fra API'et
    const drinkCategories = await getPublicDrinkCategories();
    const drinkItems = await getPublicDrinkItems();
    
    // Logger de hentede data til konsollen for debugging
    console.log(drinkCategories);
    console.log(drinkItems);
    
    // Kalder renderDrinks med de hentede data
    renderDrinks(drinkCategories, drinkItems);
  } catch (error) {
    console.log(error);
    resultEl.innerHTML = `Der gik noget galt`;
  }
}
// Kører renderDrinks funktionen
initDrinks();
*/
