# Build and start (from project root)
npm run build
npm run start
# OR
npm run build-start

# Update prisma (from project root)
npx prisma db pull
npx prisma generate

# Exec mysql files (from project root)
mysql -u<user> -p<password> collection < mysql/collection_db_create.sql
mysql -u<user> -p<password> collection < mysql/comics_graded_insert.sql
