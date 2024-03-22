## Introduction

This project utilizes Elasticsearch, Kibana, and Node.js. Follow the instructions below to set up the development environment.

## Prerequisites

- Ubuntu 20.04
- Java (Elasticsearch and Kibana require Java)
- Node.js (for running the application)
- Git (for cloning the repository)

## Installation

### 1. Elasticsearch

#### Linux

1. Download and install the public signing key:

   ```bash
   wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
   ```

2. Add the Elasticsearch APT repository to your system:

   ```bash
   sudo sh -c 'echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list'
   ```

3. Update your package index and install Elasticsearch:

   ```bash
   sudo apt-get update && sudo apt-get install elasticsearch
   ```

4. Start and enable the Elasticsearch service:
   ```bash
   sudo service elasticsearch start
   sudo systemctl enable elasticsearch
   ```

#### Windows

- Download and install Elasticsearch from [https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch)

### 2. Kibana

#### Linux

1. Download and install the public signing key:

   ```bash
   wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
   ```

2. Add the Kibana APT repository to your system:

   ```bash
   sudo sh -c 'echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list'
   ```

3. Update your package index and install Kibana:

   ```bash
   sudo apt-get update && sudo apt-get install kibana
   ```

4. Start and enable the Kibana service:
   ```bash
   sudo service kibana start
   sudo systemctl enable kibana
   ```

#### Windows

- Download and install Kibana from [https://www.elastic.co/downloads/kibana](https://www.elastic.co/downloads/kibana)

### 3. Node.js

- Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)

### 4. Clone Main Repository

1. Open a terminal and navigate to the desired directory where you want to clone the repository.

2. Clone the repository using the following command (replace `your/repo.git` with the actual repository repo path ):
   ```bash
   git clone https://github.com/your/repo.git
   ```

## Usage

1. Navigate to the project directory:

   ```bash
   cd your-project-directory
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Set NODE_ENV enviroment variable to production

```bash
    export NODE_ENV=production
```

4. Check that prodConfig.json file exists in the project directory. If it does not exist create the file by copying the prodConfig.default to prodConfig.json and inserting the appropriate variables.

```bash
    cd packages/config/dist \
    ls
```

5. Start the application:
   ```bash
   npm start
   ```

### 5. Clone Kibana plugin repo

1. Open a terminal and navigate to the desired directory where you want to clone the repository.

2. Clone the repository using the following command (replace `your/repo.git` with the actual repository URL):
   ```bash
   git clone https://github.com/your/repo.git
   ```

### 6. Install required Kibana plugins

1. Install plugin

```bash
   kibana-plugin install file:\\\\/dir/to/plugin
```

2. Restart kibana service for the plugin to take effect

```bash
    sudo systemctl restart kibana.service
```

## Operations

#### Starting services

To start the application you would need to start elasticsearch , kibana , nginx and the custom built ETL application.

1.  ```bash
    sudo systemctl start elastic.service

    ```

2.  ```bash
    sudo systemctl start kibana.service

    ```

3.  ```bash
    sudo systemctl start etl.service
    ```
4.  ```bash
    sudo systemctl start nginx.service
    ```

#### Restarting services

To restart the application you would need to restart elasticsearch , kibana , nginx and the custom built ETL application.

1.  ```bash
    sudo systemctl restart elastic.service

    ```

2.  ```bash
    sudo systemctl restart kibana.service

    ```

3.  ```bash
    sudo systemctl restart etl.service
    ```
4.  ```bash
    sudo systemctl restart nginx.service
    ```

#### Stopping services

To stop the application you would need to stop elasticsearch , kibana , nginx and the custom built ETL application.

1.  ```bash
    sudo systemctl stop elastic.service

    ```

2.  ```bash
    sudo systemctl stop kibana.service

    ```

3.  ```bash
    sudo systemctl stop etl.service
    ```
4.  ```bash
    sudo systemctl stop nginx.service
    ```
