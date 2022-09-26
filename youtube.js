const api_key = `AIzaSyCbvsgCPlQbyijUVjJg4PVYKoTVXGusI9g`;

let show_video = document.querySelector("#videoes");
//const url = `https://youtube.googleapis.com/youtube/v3/search?maxResults=15&q=${search}&key=${api_key}`;


//these is on click even of button
let searchQuery = async () => {
  try {
    let search = document.querySelector("#query").value;
    //search.innerHTML=null;
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search}%202&key=${api_key}`
    );

    const data = await res.json();

    //console.log(data);
    appendTobody(data.items);
  } catch (error) {
    console.log(error);
  }
};

//arrow function
let appendTobody = (video) => {
  show_video.innerHTML = null;

  //destruring the value we get
  video.map(({ id: { videoId }, snippet: { title,channelTitle } }) => {
    let div = document.createElement("div");
    div.setAttribute("id", "divOf_");

    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.setAttribute("id", "frames");
    iframe.allow = "fullscreen ; autoplay";

    let vid_name = document.createElement("h4");
    vid_name.setAttribute("id", "videoname");
    vid_name.innerText = title;

    let channel_name= document.createElement("p");
    channel_name.innerHTML=channelTitle;
    channel_name.setAttribute("id", "channel")

    div.append(iframe, vid_name,channel_name);

    //send to another page
    let cur_data = {
      title,
      videoId,
      channelTitle,

    };
    div.onclick = () => {
      show_topage(cur_data);
    };

    show_video.append(div);
  });
};

let show_topage = (x) => {
  window.location.href = "SingleVideo.html";
  localStorage.setItem("video", JSON.stringify(x));
  //set data to local storage
};

//append when open app

const before_load = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=series%2Cmovie%2Csong%2Cadventure&videoDuration=any&videoType=any&key=${api_key}`;
fetch(before_load)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res.items);
    appendbodyWhneopen(res.items);
  })
  .catch(function (err) {
    console.log("err:", err);
  });

let appendbodyWhneopen = (load_data) => {
  //destruring the value we get
  load_data.map(({ id: { videoId }, snippet: { title,channelTitle,publishTime } }) => {
    let div = document.createElement("div");
    div.setAttribute("id", "divOf_");

    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.setAttribute("id", "frames");
    iframe.allow = "fullscreen ; autoplay";

    let vid_name = document.createElement("h4");
    vid_name.setAttribute("id", "videoname");
    vid_name.innerText = title;

    let channel_name= document.createElement("p");
    channel_name.setAttribute("id", "channel")
    channel_name.innerHTML=channelTitle;


    div.append(iframe, vid_name,channel_name);
    show_video.append(div);
  });
};

// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=20&order=viewCount&videoDuration=any&videoType=any&key=[YOUR_API_KEY]' \
