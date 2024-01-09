let article = document.querySelector("#article");
let url = "https://vanillajsacademy.com/api/dragons.json";

let fetchArticles = async () => {
  try {
    let response = await fetch(url);

    if (!response.ok) throw response;

    let data = await response.json();
    console.log("This is the API data", data);

    const html = data.articles
      .map((article) => {
        return `
          <h3>${article.title}</h3>
          <p>By ${article.author}</hp>
          <p>${article.pubdate} </p>
          <article>${article.article}</article>
      `;
      })
      .join("");

    article.innerHTML = `<h1> ${data.publication}</h1>` + html;
  } catch (error) {
    console.warn(error);
  }
};

fetchArticles();
