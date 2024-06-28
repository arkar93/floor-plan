# floor-plan

1. run `docker compose up` for creating docker container

   - this will create
     - PostgreSQL server with `floor_plan` database
     - pgAdmin 4
     - Redis

2. copy data from `.env.example` to `.env`

   - cp .env.example .env

3. run `npm install`

4. run project with `npm run start`

5. swagger api documentation can be open at `http://localhost:3000/api#` after project running

6. pgAdmin panel can be open at `http://localhost:8001/login?next=/`

   - credential for pgAdmin is
     - username: admin@admin.com
     - password: admin
   - add new Server to connect with PostgreSQL after login
     - Host name/address: postgresql
     - Username: postgres
     - Password: secret
