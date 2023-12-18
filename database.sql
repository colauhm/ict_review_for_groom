CREATE DATABASE connection default CHARACTER SET UTF8;
USE connection;
CREATE TABLE user
  (
     email     VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
     id        VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
     password  VARCHAR(255) DEFAULT NULL,
     nickname  VARCHAR(255) DEFAULT NULL,
     createdat DATETIME DEFAULT NULL,
     idx       BIGINT UNSIGNED NOT NULL auto_increment comment '사용자 인덱스',
     img       LONGBLOB,
     imgtitle  VARCHAR(255) DEFAULT NULL,
     PRIMARY KEY (idx)
  );