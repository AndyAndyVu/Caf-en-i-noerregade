// const domain = "https://www.huyvu.dk/";
// const postsEndpointBlog = "wp-json/wp/v2/blog-post"; 

// // Kald API og log resultaterne
// async function fetchBlogs() {
//   try {
//     const response = await fetch(domain + postsEndpointBlog);
//     const Blogindlæg = await response.json();
//     console.log(" Blog-indlæg hentet:", Blogindlæg);
//   } catch (error) {
//     console.error("Fejl ved hentning af blogs:", error);
//   }
// }

const domain = "https://www.huyvu.dk/";
const postsEndpointBlog = "wp-json/wp/v2/blog-post"; 
const getRealImageUrls = "?acf_format=standard";


const blogContainer = document.getElementById("blog-container");

async function fetchBlogs() {
  try {
    const response = await fetch(domain + postsEndpointBlog + getRealImageUrls);
    const blogIndlaeg = await response.json();

    console.log("Blog-indlæg hentet:", blogIndlaeg);

    // Indsæt indlæggene i DOM
    blogIndlaeg.forEach((post) => {
      blogContainer.innerHTML += `
        <article class="blog-post">
            <p>${post.acf["kategori-label"]} </p>
            <h2>${post.title.rendered}</h2>
            <div>${post.content.rendered}</div>
            <img src="${post.acf.billede.sizes.medium}" alt="">
        </article>
      `;
    });

  } catch (error) {
    console.error("Fejl ved hentning af blogs:", error);
    blogContainer.innerHTML = `<p>Kunne ikke hente blogindlæg.</p>`;
  }
}

fetchBlogs();
