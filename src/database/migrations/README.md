# 🧩 PASO 1 — Compilar el proyecto

npm run build (debe actualizarse con los cambios)

npx typeorm migration:generate src/database/migrations/NOMBRE -d dist/config/typeorm.config.js

npm run build (otra vez para meter la migración al dist)

npx typeorm migration:run -d dist/config/typeorm.config.js

(se sube a la BD)

--- 
(para borrar la última migración en la BD... creo)

npx typeorm migration:revert -d dist/config/typeorm.config.js