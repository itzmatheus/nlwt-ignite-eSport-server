run:
	npm run dev

install:
	npm install

db-initial:
	npx prisma init --datasource-provider SQLite

db-migrate:
	npx prisma migrate dev

db-generate:
	npx prisma generate

db-web:
	npx prisma studio