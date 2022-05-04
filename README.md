<h1 align="center"><img src="./assets/icon_object.png" width="30px"> Wandering Merchant of Arkesia <img src="./assets/icon_object.png" width="30px"></h1>

# 📋 Intro

The _Wandering Merchant of Arkesia_ is a Discord bot that runs alongside [Saint Bot](https://saint-bot.webflow.io/). It enables reading from subcribed channels from Saint Bot's official server and pinging users on your own server once a certain item is in stock. Furthermore, the bot can text users when an item of their preference is in stock. Never miss a Wei card again!

# 🚧 Setup

1. Invite the bot to your server
2. Run `/setup-channels` to configure which channel contains the Saint Bot updates and which channel the bot should send pings
3. Run `/setup-roles` to automatically create the roles that the bot pings
4. [Optional] Run `/setup-reactions` to create a message that users can react to too assign roles automatically
5. [Optional] Run `/status` to ensure there are no missing configuration settings
6. Enjoy!

# ☁️ Hosting

Due to limited resources, I won't be providing a server to host the bot for the public. If you'd like to add the bot to your server, you'll either need to host it yourself or find someone else who is hosting it for the public. If you choose to host it yourself, the instructions are as follows:

## Prerequisites

The following tools are needed to run the bot:

- [NodeJS v16.6+](https://nodejs.org/en/download/)
- [Postgres SQL](https://www.postgresql.org/download/)
- [Yarn](https://yarnpkg.com/)

## Installation

1. Clone the bot's repository to your local machine: `git clone https://github.com/NicolasNewman/Traveling-Salesman.git`
2. From the root of the repository, run: `yarn install`
3. Create a .env file and enter in the following fields:

   ```
   DISCORD_TOKEN=
   CLIENT_ID=
   GUILD_ID=
   TWILIO_TOKEN=
   TWILIO_SID=
   TWILIO_FROM=

   # This was inserted by `prisma init`:
   # Environment variables declared in this file are automatically made available to Prisma.
   # See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
   # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB (Preview).
   # See the documentation for all the connection string options: https://pris.ly/d/connection-strings
   DATABASE_URL="postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/lostark"
   ```

4. Run `yarn start` to start the bot
