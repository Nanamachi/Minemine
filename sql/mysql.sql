CREATE TABLE IF NOT EXISTS rankings (
    id           INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(255),
    comment      TEXT,
    score        FLOAT NOT NULL,
    missed       INTEGER NOT NULL,
    sweeped      INTEGER NOT NULL,
    runtime      FLOAT NOT NULL,
    cleared_at   DATETIME NOT NULL
);
