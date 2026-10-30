# Ecoquest
EcoQuest is an open-source AI-powered app that encourages people to explore the outdoors, complete environmental missions, and earn rewards for making a positive impact on the planet.

#Implementation
# 1. (once) add Node to PATH if needed
$env:Path += ";D:\Node"

# 2. clone repo (or skip if you already have it)
git clone https://github.com/dotexeYash/ECO-QUEST
cd Ecoquest

# 3. install deps
npm.cmd install
npm.cmd --prefix client install
npm.cmd --prefix server install

# 4. create .env for server
cd server
copy .env.example .env
cd ..

# 5. start backend (keep this window open)
npm.cmd --prefix server run dev

# 6. in a new PowerShell window, start frontend
npm.cmd --prefix client run dev
