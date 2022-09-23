<div id='top'>

# NLW eSports - Trilha Ignite | Rocketseat

</div>

<p align="center">
  <a href="#memo-about">About</a> &#xa0; | &#xa0; 
  <!-- <a href="#sparkles-features">Features</a> &#xa0; | &#xa0; -->
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#bookmark-api-reference">API Reference</a> &#xa0; | &#xa0;
  <a href="#memo-license-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/itzmatheus" target="_blank">Author</a>
</p>


## :memo: About

During the event **NLW eSports** we have developed a _web_ and _mobile_ platform where Gamers can find partners for the most popular games being displayed on Twitch. This project is part of the Ignite Trail and we learned about NodeJS with Express, React with TypeScript and React Native with Expo.

The web application allows us to create ads and find game partners (or duos). In the mobile application, we can access those ads to view the informations about each player and copy their Discord username to clipboard, so we can add them to our friends list.

This project was developed during the event **#NLWtogether** hosted by [Rocketseat](https://www.rocketseat.com.br) with the help of the instructors [Diego Fernandes](https://github.com/diego3g) and [Rodrigo Gonçalves](https://github.com/rodrigorgtic).

<!-- prettier-ignore -->
| 🪧 Vitrine.Dev   |     |
| --------------- | --- |
| ✨ Nome         | **API NLW eSports** - Rocketseat |
| 🏷️ Tecnologias  | TypeScript, NodeJS, TypeScript e Prisma |
| 💻 Web version  | [Click here](https://github.com/itzmatheus/nlwt-ignite-eSport-web) |
| 📲 Mobile version | [Click here](https://github.com/itzmatheus/nlwt-ignite-eSport-mobile) |
| 🔥 Design       | [**Figma**](https://www.figma.com/community/file/1150897317533332617) |

![](https://raw.githubusercontent.com/sucodelarangela/nlw-esports-ignite/main/web/public/og-image.jpg#vitrinedev)

<div>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
</div>

## 🩹 Improvements needed

The project was totally developed according to the instructions given, no aditionals. In the future, it would be interesting to add the following implementations:

-   Discord authentication, automatically filling the form field for Discord username.

## :white_check_mark: Requirements

Before starting 🏁, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) v16.14.0 installed.

Suggest: https://github.com/nvm-sh/nvm

## :checkered_flag: Starting

```bash
# Clone this project
$ git clone https://github.com/itzmatheus/nlwt-ignite-eSport-server
# Access
$ cd nlwt-ignite-eSport-server
# Install dependencies
$ npm install
# Create sqlite db local
$ npx prisma init --datasource-provider SQLite
# Run the project
$ npm run dev
# The server will initialize in the <http://localhost:3333>
```

PS: if you have [make](https://www.cs.swarthmore.edu/~newhall/unixhelp/howto_makefiles.html) installed, consult Makefile to see all commands shortcuts =)

## :bookmark: API Reference

#### List Ads By Game

```http
  GET /games/${id}/ads
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of a game |

Response status code 200
```json
[
    {
        "id": "e85d9089-64cf-4d5f-a9a5-7a04f6deb70d",
        "name": "Name",
        "weekdays": [
            "0",
            "6"
        ],
        "useVoiceChannel": true,
        "yearsPlaying": 1,
        "hourStart": "10:00",
        "hourEnd": "12:00"
    }
]
```

#### List Games

```http
  GET /games
```

Response status code 200
```json
[
    {
        "id": "2856e6d1-7760-40b8-8d56-b17be15a1db1",
        "title": "League of Legends",
        "bannerUrl": "url",
        "_count": {
            "ads": 1,
        }
    },
]
```

#### Create Ad

```http
  POST /games/${id}/ads
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of a game |

Weekdays number list:
- 0 Sunday
- 1 Monday
- 2 Tuesday
- 3 Wednesday
- 4 Thursday
- 5 Friday
- 6 Saturday

Body
```json
{
    "name": "Name",
    "yearsPlaying": 1,
    "discord": "DiscordName#1000",
    "weekdays": [0,6],
    "hourStart": "10:00",
    "hourEnd": "12:00",
    "useVoiceChannel": true
}
```

Response status code 201
```json
{
    "id": "c5bba57d-74a3-4b5a-a2d3-d688f7f561d6",
    "gameId": "2856e6d1-7760-40b8-8d56-b17be15a1db1",
    "name": "Name",
    "yearsPlaying": 1,
    "discord": "DiscordName#1000",
    "weekdays": "0,6",
    "hourStart": 600,
    "hourEnd": 720,
    "useVoiceChannel": true,
    "createdAt": "2022-09-23T01:52:53.424Z"
}
```

#### Get Discord By Ad

```http
  GET /ads/${id}/discord
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of a ad |

Response status code 200
```json
{
    "discord": "DiscordName#1000"
}
```

---

## :memo-license: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


<a href='#top'>🔼 Back to top</a>

---
Developer by [@Matheus Leite](https://itzmatheus.github.io/portfolio/)

Readme by [@sucodelarangela](https://angelacaldas.vercel.app)
