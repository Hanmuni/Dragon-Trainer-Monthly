let article = document.querySelector("#article");
const url = "https://vanillajsacademy.com/api/dragons.json";
const url2 = "https://vanillajsacademy.com/api/dragons-authors.json";

const fetchUrls = async () => {
  try {
    let responses = await Promise.all([fetch(url), fetch(url2)]);

    let data = await Promise.all(responses.map((response) => response.json()));

    console.log("This is the APIs data", data);

    displayContent(data);
  } catch (error) {
    console.error(error);
  }
};

const displayContent = (data) => {
  const articleData = data[0].articles
    .map((article) => {
      const authorData = data[1].authors.find(
        (author) => author.author === article.author
      );

      return `
      <div>
      <h3>${article.title}</h3>
      <p>By ${article.author} <br>
      ${authorData.bio}
      </p>
      <p>Published: ${article.pubdate}</p>
      <article>${article.article}</article>
      </div>
    `;
    })
    .join("");

  article.innerHTML =
    `<h1>${cleanHTML(data[0].publication)}</h1>` + cleanHTML(articleData);
};

// Sanitizer Helper Function
const cleanHTML = (str, nodes) => {
  const stringToHTML = () => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    return doc.body || document.createElement("body");
  };

  const removeScripts = (html) => {
    let scripts = html.querySelectorAll("script");
    for (let script of scripts) {
      script.remove();
    }
  };

  const isPossiblyDangerous = (name, value) => {
    let val = value.replace(/\s+/g, "").toLowerCase();
    if (["src", "href", "xlink:href"].includes(name)) {
      if (val.includes("javascript:") || val.includes("data:")) return true;
    }
    if (name.startsWith("on")) return true;
  };

  const removeAttributes = (elem) => {
    let atts = elem.attributes;
    for (let { name, value } of atts) {
      if (!isPossiblyDangerous(name, value)) continue;
      elem.removeAttribute(name);
    }
  };

  const clean = (html) => {
    let nodes = html.children;
    for (let node of nodes) {
      removeAttributes(node);
      clean(node);
    }
  };

  let html = stringToHTML();
  removeScripts(html);
  clean(html);

  return nodes ? html.childNodes : html.innerHTML;
};

fetchUrls();
