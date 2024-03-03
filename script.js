const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const allPost = data.posts;
  //   console.log(post);

  const allPostContainer = document.getElementById("all-post-container");
  allPost.forEach((item) => {
    // console.log(item);
    const div = document.createElement("div");
    div.innerHTML = `
        <div id="dynamic-all-post" class="flex bg-[#F3F3F5] p-4 lg:p-6 rounded-xl mb-5 lg:mb-0">
            <div>
              <!-- avatar --> 
              <div class="${item.isActive}avatar online mr-2">
                <div class="avatar">
                  <div class="w-16 rounded-xl">
                    <img
                      src="${item.image}"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex gap-5 font-inter text-[#12132DCC] font-medium">
                <p>#${item.category}</p>
                <p>Author : ${item.author.name}</p>
              </div>
              <div class="border-b-2 border-dotted">
                <h1 class="font-mulish text-xl font-bold text-[#12132D]">
                  10 Kids Unaware of Their Halloween Costume
                </h1>
                <p class="text-[#12132D99] mb-2">
                  These examples are programmatically compiled from various
                  online sources <br />
                  to usage of the word 'description.
                </p>
              </div>
              <div class="flex justify-between mt-2">
                <div class="flex gap-5 *:items-center items-center">
                  <div class="flex gap-3">
                    <img src="./images/text.svg" alt="" />
                    <p>50520</p>
                  </div>
                  <div class="flex gap-3">
                    <img src="./images/chokh.svg" alt="" />
                    <p>50520</p>
                  </div>
                  <div class="flex gap-3">
                    <img src="./images/clock.svg" alt="" />
                    <p>50520</p>
                  </div>
                </div>
                <div>
                  <button>
                    <img src="./images/email 1.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
    
    `;
    allPostContainer.appendChild(div)
  });
};
loadData();
