const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const allPost = data.posts;
  dataAll(allPost);
};
const allPostContainer = document.getElementById("all-post-container");
const dataAll = (allPost) => {
  allPost.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div id="dynamic-all-post" class="flex bg-[#F3F3F5] p-4 lg:p-6 rounded-xl mb-5 lg:mb-0">
            <div>
              <!-- avatar --> 
              <div class="avatar ${item.isActive ? "online" : "offline"} mr-2 ">
                <div class="avatar">
                  <div class="w-16 rounded-xl">
                    <img
                      src="${item?.image}"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex gap-5 font-inter text-[#12132DCC] font-medium">
                <p>#${item?.category}</p>
                <p>Author : ${item?.author?.name}</p>
              </div>
              <div class="border-b-2 border-dashed">
                <h1 class="font-mulish text-xl font-bold text-[#12132D]">
                  ${item?.title}
                </h1>
                <p class="text-[#12132D99] mb-2">
                  ${item?.description}
                </p>
              </div>
              <div class="flex justify-between mt-2">
                <div class="flex gap-5 *:items-center items-center">
                  <div class="flex gap-3">
                    <img src="./images/text.svg" alt="" />
                    <p>${item?.comment_count}</p>
                  </div>
                  <div class="flex gap-3">
                    <img src="./images/chokh.svg" alt="" />
                    <p>${item?.view_count}</p>
                  </div>
                  <div class="flex gap-3">
                    <img src="./images/clock.svg" alt="" />
                    <p>${item?.posted_time}</p>
                  </div>
                </div>
                <div>
                  <button onclick="handleClick('${item.id}')">
                    <img src="./images/email 1.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
    `;
    allPostContainer.appendChild(div);
    toggleLoadingSpinner(false);
  });
};
// latest post
const latestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  const latestPostContainer = document.getElementById("latest-post-container");
  data.forEach((latestPostAll) => {
    const div = document.createElement("div");
    div.innerHTML = `

          <div class="card lg:w-[90%] h-[100%] bg-base-100 shadow-xl mb-4 lg:mb-0">
            <figure class="px-10 pt-10">
              <img
                src="${latestPostAll?.cover_image}"
                alt="Shoes"
                class="rounded-xl"
              />
            </figure>
            <div class="card-body">
              <div class="flex gap-3">
                <img src="./images/date.svg" alt="" />
                <p class="font-mulish text-[#12132D99]">${
                  latestPostAll?.author?.posted_date
                    ? latestPostAll?.author?.posted_date
                    : "No publish date"
                }</p>
              </div>
              <p
                class="text-[#12132D] text-lg font-mulish font-bold mb-1 lg:mb-3"
              >
                ${latestPostAll?.title}
              </p>
              <p class="font-mulish text-[#12132D99]">
                ${latestPostAll?.description}
              </p>

              <div class="flex items-center gap-2">
                <div class="avatar">
                  <div
                    class="w-16 rounded-full ring-offset-base-100 ring-offset-2"
                  >
                    <img
                      src="${latestPostAll?.profile_image}"
                    />
                  </div>
                </div>
                <div>
                  <h3 class="text-[#12132D] font-mulish font-bold">
                    ${latestPostAll?.author?.name}
                  </h3>
                <p>${
                  latestPostAll?.author?.designation
                    ? latestPostAll?.author?.designation
                    : "Unknown"
                }</p>
                </div>
              </div>
            </div>
          </div>
        `;
    latestPostContainer.appendChild(div);
  });
};

const markCount = document.getElementById("mark-count");
let count = 1;

const handleClick = (id) => {
  markCount.innerText = count;
  count++;
  handleTitle(id);
};

const handleTitle = async (id) => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const allPost = data.posts;
  const markDivContainer = document.getElementById("mark-title");
  allPost.forEach((postAll) => {
    if (id === `${postAll.id}`) {
      const div = document.createElement("div");
      div.className = `flex justify-between gap-2 bg-white p-4 rounded-xl`;
      div.innerHTML = `
         <h1>${postAll.title}</h1>
              <div class="flex items-center gap-2 px-3">
                <img src="./images/chokh.svg" alt="" />
                <p>${postAll?.view_count}</p>
              </div>
        `;
      markDivContainer.appendChild(div);
    }
  });
};

const categoryName = async (categoryName) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
  );
  const categoryData = await res.json();
  const category = categoryData.posts;
  dataAll(category);
  toggleLoadingSpinner(false);
};
const handleSearch = () => {
  toggleLoadingSpinner(true);
  allPostContainer.innerHTML = "";
  const value = document.getElementById("search-input");
  const valueText = value.value;
  categoryName(valueText);
  if (valueText) {
  } else {
    alert("Please enter a valid Category Name");
  }
};
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (!!isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

latestPost();
loadData();
