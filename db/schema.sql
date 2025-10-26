CREATE TABLE IF NOT EXISTS products
(
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    brand           VARCHAR(100) NOT NULL,
    product_type    VARCHAR(50)  NOT NULL,
    skin_type       VARCHAR(50)  NOT NULL,
    main_ingredient VARCHAR(100) NOT NULL,
    product_url     TEXT,
    image_url       TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_skin_type (skin_type),
    INDEX idx_product_type (product_type),
    INDEX idx_ingredient (main_ingredient)
    );

CREATE TABLE IF NOT EXISTS users
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(50) UNIQUE NOT NULL,
    password   VARCHAR(255)       NOT NULL,
    role       VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS recommendation_logs
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    input_skin_type    VARCHAR(50),
    input_product_type VARCHAR(50),
    input_ingredient   VARCHAR(100),
    result_product_ids TEXT,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at)
    );