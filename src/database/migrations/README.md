npm run build (debe actualizarse con los cambios)

npm run migration:generate -- src/database/migrations/Init

npm run build (otra vez para meter la migración al dist)

npx typeorm migration:run -d dist/config/typeorm.config.js

(se sube a la BD)

---

(para borrar la última migración en la BD... creo)

npx typeorm migration:revert -d dist/config/typeorm.config.js

npx typeorm-ts-node-commonjs migration:generate src/database/migrations/Init -d src/config/typeorm.config.ts

npx typeorm-ts-node-commonjs migration:run -d src/config/typeorm.config.ts
