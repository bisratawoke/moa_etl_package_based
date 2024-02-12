## Introduction

This project utilizes Elasticsearch, Kibana, and Node.js. Follow the instructions below to set up the development environment.

//pasidp_biological_data_with_year, pasidp_all_national_info_with_year, pasidp_physical_data_report
//swc_bio_phy_treatment_result

## has Unit keyword
- psnp_swc_treatment_result_scheduler_test
- calm_soil_water_conservation_treatments_result
- pasidp_physical_data_report
- meret_swc_result
- slmp_2001_2015_swc_treatments_result
## Unit is keyword
- mass_mobilization_physical_swc_treatment_report

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

2. Clone the repository using the following command (replace `your/repo.git` with the actual repository URL):
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

3. Start the application:
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

#### Monitoring services

To monitor the ETL application you would need to first insert setup the smtp server which is already preconfigured to be honest you just have to specify t he email address and password of that the email will send from.

1.  ```bash
    curl -X PUT \
    -H "Content-Type: application/json" \
    -d '{"email":"your email address", "password":"your password"}' \
    -u elastic-username:elastic-password \
    http://your-ip-address/elastic/notifire/_doc/1


    ```

Thats it now your will get notification to your email about the status of the various extraction , transformation and loading activities that are being performed by the custom ETL application. You can also read the logs in kibana observations feature. Head over to your elastic dashboard and using the left side nav bar and select observability > logs and you can see the status of the various extraction , transformation and loading activities that are being performed by the custom ETL application.
