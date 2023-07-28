import { createElements } from "./utils.js";


// showHome => home elements shown
export async function showHome(e) {
  e.preventDefault();
  localStorage.clear;
  window.location = "./index.html";
}
if (!window.location.href.includes("theme-content.html")) {
  loadPosts();
}

function showComments(e) {
  let postId;
  if (e.target.tagName === "a") {
    postId = e.target.dataset.id;
  } else {
    postId = e.target.parentElement.getAttribute("dataset.id");
  }
  localStorage.setItem("postId", postId);
  window.location = "./theme-content.html";
}

//  load posts
async function loadPosts() {
  let topicDivElement = document.querySelector(".topic-title");
  topicDivElement.replaceChildren();

  try {
    let response = await fetch(
      "http://localhost:3030/jsonstore/collections/myboard/posts"
    );
    if (!response.ok) {
      let error = await response.json();
      throw new Error(error.message);
    }

    let posts = await response.json();
    for (const [postId, post] of Object.entries(posts)) {
      //console.log(postId, post);


      // <!-- Post structure example in the Home view -->
      // <div class="topic-container">
      //     <div class="topic-name-wrapper">
      //         <div class="topic-name">
      //             <a href="#" class="normal">
      //                 <h2>Angular 10</h2>
      //             </a>
      //             <div class="columns">
      //                 <div>
      //                     <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
      //                     <div class="nick-name">
      //                         <p>Username: <span>David</span></p>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // </div>

      let topicContainerDivElement = createElements("div", "", topicDivElement,{ class: "topic-container" }); // <div class="topic-container">
      let topicNameWrapperDivElement = createElements("div", "", topicContainerDivElement, {class: "topic-name-wrapper",}); //<div class="topic-name-wrapper">
      let topicNameDivElement = createElements("div", "", topicNameWrapperDivElement, {class: "topic-name",}); //<div class="topic-name">
      let anchorElement = createElements("a", "", topicNameDivElement, {href: "#", "dataset.id": postId, class: "normal",}); // <a href="#" class="normal">
      
      anchorElement.addEventListener("click", showComments);

      createElements("h2", post.title, anchorElement, {}); // <h2>Angular 10</h2>
      let columnsDivElement = createElements("div", "", topicNameDivElement, {class: "columns",}); //<div class="columns">
      let divElement = createElements("div", "", columnsDivElement, {}); // <div>
      let dateParagraphElement = createElements("p", "Date:", divElement, {}); // <p>Date: ..... </p>
      createElements("time", post.createDate, dateParagraphElement, {}); //<time>2020-10-10T12:08:28.451Z</time>
      let nickNameDivElement = createElements("div", "", divElement, {class: "nick-name",}); //<div class="nick-name">
      let userNameParagraphElement = createElements("p", "Username: ", nickNameDivElement, {}); //<p>Username: .... </p>
      createElements("span", post.username, userNameParagraphElement, {});  // <span>David</span>

    }
  } catch (error) {
    alert(error.message);
  }
}

// create post function => post functionality
export async function createPost(e) {
  e.preventDefault();

  const formElement = document.querySelector("form");

  let formData = new FormData(formElement);

  const title = formData.get("topicName").trim();
  const username = formData.get("username").trim();
  const content = formData.get("postText").trim();
  const createDate = new Date();

  try {
    //check for valid input
    if (!title) {
      throw new Error("Title is required!");
    } else if (!username) {
      throw new Error("Username is required!");
    } else if (!content) {
      throw new Error("Post content is required!");
    }
    

    const res = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, username, content, createDate }),
      });

    if (!res.ok) { // error on response
      const err = await res.json();
      throw new Error(err.message);
    }

    formElement.reset();
    await loadPosts();

  } catch (error) {
    alert(error.message);
  }
}



// cancel functionally
export function onClose(e) {
  e.preventDefault();

  const formElement = document.querySelector("form");
  formElement.reset();
}
