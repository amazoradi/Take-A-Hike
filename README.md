<img src="src/img/Take-a-Hike-Logo.png" alt="Take a Hike" width=150 >

# Take A Hike

Take A Hike is an app for the explorer who may not know where the next adventure lies. If you have ever wanted to go for a hike but needed help finding the perfect trail, Take A Hike is the app you have been waiting for. Take a Hike allows the user to find new trails, create an inventory of the their completed hikes (from their faithful standbys to the not so favorites, and everything in between), create a list of hikes the user wants to go on in the future,  and allows the user to chat with others in the hiking community.
Take a hike is written with the JavaScript framework, React.js.

## Getting Started
To run Take A Hike locally, create an empty directory and clone the project by running the following command in your terminal: ``` git@github.com:amazoradi/Take-A-Hike.git```

Take A Hike uses a database.json file to store all data. To create the database, run:
```
mkdir api
cd api
touch database.json
```
Open **database.json** and copy the following into the file to create a database skeleton:
```
{
  "users": [
    {
      "id": 1,
      "name": "JoeShep",
      "password": "broccoli",
      "email": "joe@joe.com",
      "location": "Nashville"
    },
    {
      "id": 2,
      "name": "Austin",
      "password": "austin",
      "email": "austin@austin.com",
      "location": "Santa Barbara"
    },
    {
      "name": "Bryan Nilsen",
      "password": "cool",
      "email": "bryan@bryan.com",
      "location": "Long Island",
      "id": 3
    }],
"hikes": [
     {
      "id": 1,
      "userId": 3,
      "name": "Warner Woods Trail (White)",
      "hikeLocation": "Forest Hills, Tennessee",
      "hikeState": "Tennessee",
      "length": 2.3,
      "stars": 4.4,
      "summary": "A popular wooded singletrack trail beginning at the entrance to the Warner Parks trail system.",
      "imageUrl": "https://cdn-files.apstatic.com/hike/7030317_small_1493523895.jpg",
      "completed": true,
      "public": false,
      "date_completed": "11-21-2018",
      "user_rating": 5,
      "completed_message": "One of my favorite hikes in Nashville, I love how close it is to my house!",
      "editId": 1
    },
    {
      "userId": 2,
      "name": "Mount Mitchell - Black Mountain Crest Trail #179",
      "hikeLocation": "Burnsville, North Carolina",
      "hikeState": "North Carolina",
      "length": 12.1,
      "stars": 4.8,
      "summary": "The highest, most airy ridge traverse in the east and a destination hike not to be taken lightly.",
      "completed": true,
      "public": false,
      "date_completed": "2018-07-30",
      "user_rating": 4,
      "completed_message": "What a great hike, glad we drove up part of it though...I need to get in shape.",
      "id": 3,
      "editId": 3
    },
    {
      "userId": 2,
      "name": "Montecito Peak",
      "hikeLocation": "Montecito, California",
      "hikeState": "California",
      "length": 7,
      "stars": 4,
      "summary": "This out-and-back hike takes you through Cold Spring Canyon to the summit of Montecito Peak.",
      "completed": true,
      "public": false,
      "date_completed": "2018-12-04",
      "user_rating": 5,
      "completed_message": "Best hike ever, tough but really rewarding.",
      "id": 4,
      "editId": 4
    },
    {
      "userId": 1,
      "name": "Jenny Lake",
      "hikeLocation": "Jackson, Wyoming",
      "hikeState": "Wyoming",
      "length": 7.3,
      "stars": 4.5,
      "summary": "One of the most popular trails in Grand Teton and maybe the world...",
      "completed": true,
      "public": false,
      "date_completed": "2015-05-21",
      "user_rating": 5,
      "completed_message": "One of the best hikes.  a great taste of the teatons!",
      "id": 5,
      "editId": 5
    }],
"messages": [
    {
      "userId": 4,
      "time": "2018-12-04T15:32:42.975Z",
      "message": "Take a hikes first ever message. And my name is Bryan and I am soooo cool",
      "imgUrl": "https://avatars2.githubusercontent.com/u/43187473?s=400&v=4",
      "id": 1
    },
    {
      "userId": 2,
      "time": "2018-12-04T15:42:54.512Z",
      "message": "Hiking is the best when you're with a friend! But not with Bryan, his legs are too long.",
      "imgUrl": "https://avatars3.githubusercontent.com/u/42081267?s=400&u=374ae2c0940e3881536dd3216d467fa2eec5ed63&v=4",
      "id": 2
    },
    {
      "userId": 3,
      "time": "2018-12-06T20:04:13.636Z",
      "message": "Here Kitty kitty! Saw this little guy hiking the other day.",
      "imgUrl": "https://i.imgur.com/VhjrRLR.jpg",
      "id": 3
    },
    {
      "userId": 1,
      "time": "2018-12-06T20:08:14.586Z",
      "message": "Broccoli! My Fav! Such a great hiking snack!",
      "imgUrl": "https://media1.tenor.com/images/c1ce229d484184e5c0b0fb0fa5cfad5e/tenor.gif?itemid=5654386",
      "id": 4
    }]
}
```

Traverse back the take-a-hike folder and run: ```npm install```
This is will install all packages, libraries and their dependencies used by Take A Hike.
Next  run the following in order to view Take A Hike in your browser: ```npm start```
Open [http://localhost:3000]( http://localhost:3000) to view it in the browser.
In another window of your terminal go into the ```src/api``` forlder and run: ```json-server -p 5002 -w database.json```

## Entity Relationship Diagrams
<img src="src/img/Take%20A%20Hike.png" >

## Technologies Used
<img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-128.png" alt='React.JS' width=100><img src="https://www.schemecolor.com/wp-content/uploads/javascript-logo.png" alt='JS' width=100><img src="http://www.myiconfinder.com/uploads/iconsets/256-256-8b61de4c84033266e15317a6eb9fda2d-css3.png" alt='CSS3' width=100><img src="https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png" alt='HTML5' width=100>
<img src="https://react.semantic-ui.com/logo.png" alt='Semantic-ui React' width=100>
<img src="https://www.bootcdn.cn/assets/img/momentjs.svg?1541408619167" alt='Momentjs' width=100>
<img src="https://www.google.com/images/branding/product/2x/maps_96in128dp.png" alt='Google-Maps-React' width=100>
<img src="https://site-images.similarcdn.com/url?url=https%3A%2F%2Flh3.googleusercontent.com%2FWEcmkSnm_lH7VwRC-r4O1b2bGMeDusyVEBKuDpfFu8lR3TC-Dzd7YP9Uw8YP_zvp4O4%3Dw256&h=6765243021399790723" alt='The Hiking Project' width=100>
<img src="https://dashboard.snapcraft.io/site_media/appmedia/2018/07/code-256px_yXmjUSe.png" alt='VS Code' width=100>
<img src="https://cdn.rawgit.com/npm/logos/31945b5c/npm%20square/n-64.png" alt='NPM' width=100>
<img src="https://lh3.googleusercontent.com/HxaWoP7_9DZnmC3jzt6E4mHAupAHN2rzwnI2MgLvHGi_O4qPxIK8Ah3n5fAL0u0Nfuu5o1LdnA=w128-h128-e365" alt='Canva' width=100>

## Visualization of Take A Hike




[link to Google!](http://google.com)
## Enjoy Take A Hike 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
### Author
[Austin Zoradi](https://github.com/amazoradi)
