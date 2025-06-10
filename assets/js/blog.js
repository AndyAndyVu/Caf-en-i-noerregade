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

const blogContainer = document.getElementById("blog-container");

async function fetchBlogs() {
  try {
    const response = await fetch(domain + postsEndpointBlog);
    const blogIndlaeg = await response.json();

    console.log("Blog-indlæg hentet:", blogIndlaeg);

    // Indsæt indlæggene i DOM
    blogIndlaeg.forEach((post) => {
      blogContainer.innerHTML += `
        <article class="blog-post">
          <h2>${post.title.rendered}</h2>
          <div>${post.content.rendered}</div>
        </article>
      `;
    });

  } catch (error) {
    console.error("Fejl ved hentning af blogs:", error);
    blogContainer.innerHTML = `<p>Kunne ikke hente blogindlæg.</p>`;
  }
}

fetchBlogs();
