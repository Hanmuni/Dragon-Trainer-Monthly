let article = document.querySelector("#article");
let url = "https://vanillajsacademy.com/api/dragons.json";
let url2 = "https://vanillajsacademy.com/api/dragons-authors.json";

let fetchUrls = async () => {
  try {
    let responses = await Promise.all([fetch(url), fetch(url2)]);

    if (!responses.every((response) => response.ok)) throw responses;

    let data = await Promise.all(responses.map((response) => response.json()));

    console.log("This is the APIs data", data);

    displayContent(data);
  } catch (error) {
    console.warn(error);
  }
};

let displayContent = (data) => {
  const articleData = data[0].articles
    .map((article) => {
      const authorData = data[1].authors.find(
        (author) => author.author === article.author
      );

      return `
          <h3>${article.title}</h3>
          <p>By ${article.author} </p>
          <p>${authorData.bio}</p>
          <p>Published: ${article.pubdate}</p>
          <article>${article.article}</article>
    `;
    })
    .join("");

  article.innerHTML = `<h1>${data[0].publication}</h1>` + articleData;
};

fetchUrls();
