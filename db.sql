CREATE DATABASE reward_system;

USE reward_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    task_completed BOOLEAN DEFAULT FALSE,
    referral_completed BOOLEAN DEFAULT FALSE,
    task_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE queue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reward VARCHAR(255),
    reward_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
