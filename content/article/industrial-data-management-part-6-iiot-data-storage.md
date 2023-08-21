+++
title = "IIoT Data Storage and Actionable Analytics Generation"
date = 2023-06-28T00:00:16+02:00
draft = false
authors= ["kudzai-manditereza"]
tags = [ "Industrial Data Management", "Industry 4.0" , "MQTT Sparkplug", "Smart Manufacturing", "MQTT", "UNS"]
poster = "/img/blog/header-image-iiot-data-storage-and-actionable-analytics-generation.png"
special_link01 = [ "/solutions/manufacturing/", "Smart Manufacturing" ]
special_link02 = ["/unified-namespace-uns-essentials-iiot-industry-40/", "Unified Namespace (UNS) Essentials"]
custom_css = "css/blog.css"
custom_summary = "Explore IIoT data storage such as time-series databases, structured DBs, data lakes, etc. and delve into actionable analytics from the stored IIoT data."
meta_description = "Explore IIoT data storage such as time-series databases, structured DBs, data lakes, etc. and delve into actionable analytics from the stored IIoT data."
ogtitle = "IIoT Data Storage and Actionable Analytics Generation"
ogdescription = "Explore IIoT data storage such as time-series databases, structured DBs, data lakes, etc. and delve into actionable analytics from the stored IIoT data."
ogurl = "https://www.hivemq.com/article/iiot-data-storage-and-actionable-analytics-generation/"
ogimage = "https://www.hivemq.com/img/blog/og-image-iiot-data-storage-and-actionable-analytics-generation.png"
url = "/article/iiot-data-storage-and-actionable-analytics-generation/"
+++

Welcome to Part 6 of our series [A Comprehensive Guide To Industrial Data Management for Smart Manufacturing](/comprehensive-guide-to-industrial-data-management-for-smart-manufacturing-iiot/). In Part 5 of this series, [Semantic Data Structuring with MQTT Sparkplug and Unified Namespace](/article/semantic-data-structuring-mqtt-sparkplug-unified-namespace-uns-smart-manufacturing/), we explored the identification of data sources, the process of data collection, and data formatting. We also discussed how using a [Unified Namespace (UNS)](/unified-namespace-uns-essentials-iiot-industry-40/) architecture can provide a real-time overview of your operations, thereby facilitating data-driven decision-making in your day-to-day manufacturing tasks. However, there's more to it. You will still need to rely on various database technologies for transactional and analytical operations, or any historical access requirements. Hence, it's important that your data is persistently stored.

In this article, our focus will shift to an **exploration of diverse data storage mechanisms such as time-series databases (TSDBs), structured databases, data lakes, and graph databases.** We'll be discussing their respective roles, advantages, and challenges within the Industrial Internet of Things (IIoT) environment. Furthermore, we'll **delve into how actionable analytics can be created from the stored IIoT data.** The article will emphasize the significance of adopting a **unified analytics approach**, which allows effective cross-contextualization and correlation.

## Time-Series Databases for Industrial IoT

Time-series databases (TSDB) are designed to handle time-stamped data, which is data collected over time. In IIoT, sensors and devices continuously generate vast amounts of time-stamped data. TSDBs are crucial for storing, retrieving, and processing this data efficiently. They enable real-time analytics, predictive maintenance, and trend analysis. The data model typically used in TSDBs is the time-series data model, where data points are indexed in time order. This model is particularly useful in IIoT for monitoring machine health and predicting failures. However, their focus on time-stamped data can limit their flexibility for other types of data. Examples of TSDBs include InfluxDB from InfluxData and TimescaleDB.

Here's a simplified view of how you might structure your data on InfluxDB:

**Measurement**: This is the name of the dataset. For IIoT, you might use the name of the machine or sensor, like "Temperature_Sensor_1" or "Pressure_Sensor_2".

**Tags**: Tags are used to store metadata. They are indexed, making them ideal for storing data you'll frequently query. In the IIoT context, this could be information like "machine_ID," "location," or "operator."

**Fields**: Fields are where you store your actual time-series data. For a temperature sensor, for example, you might have a field called "temperature." Unlike tags, fields are not indexed.

**Time**: The timestamp for your data. InfluxDB automatically stores timestamps in nanosecond precision, but you can also store time in other precisions, like seconds, minutes, or hours.

Here is an example of how the data might be structured:

>Measurement: `"Temperature_Sensor_1"`<br/>
    Tags: <br/>
        `"machine_ID": "Machine_7"`<br/>
        `"location": "Factory_A"`<br/>
        `"operator": "Operator_John"`<br/>
    Fields:<br/>
        `"temperature": 72.4`<br/>
    Time: `1676532340000000000`<br/>

Each entry in the database (each "point") includes the measurement name, the set of tag values, the set of field values, and the timestamp.

This kind of data structure allows for powerful and flexible querying. For example, you could easily query for all temperature readings from "Machine_7" in "Factory_A" over the past 24 hours or calculate the average temperature reading from sensors operated by "Operator_John" over the past week.

The implementation of TSDBs in IIoT finds expression in various use cases. These databases make real-time monitoring of equipment performance, product quality, and system efficiency possible, especially in smart manufacturing. They can store and present this data easily, comprehensibly and actionable.

TSDBs also underpin predictive maintenance, detecting patterns and anomalies that could signal inefficiencies or impending failures. Further, they enable quality control by tracking product quality and production parameters in real-time, facilitating prompt adjustments. Time-series data also aid in energy management and supply chain optimization, revealing patterns and trends that can help streamline operations.

However, the application of TSDBs in IIoT isn't without its challenges. On the positive side, the structured, chronological nature of time-series data lends itself to machine learning and AI applications, providing rich training data for AI models to generate insights and predictions. Moreover, storing data in a sequence allows for easy retrieval and analysis of past data to identify trends and make future forecasts. Yet, the focus on time-stamped data, while enhancing efficiency in managing sequential data, could limit their flexibility for other types of data. As a result, this could necessitate the use of additional databases for other data types, like structured databases.

## Structured Databases for Industrial IoT

Structured databases, also known as relationaldatabases, store data in predefined structures or tables. They are essential in IIoT for managing structured data like device metadata, user information, and transaction logs. They provide robust data integrity and support complex queries. The relational data model, with its structured tables and relationships, is commonly used in these databases.

In the context of the Industrial Internet of Things (IIoT), structured databases play a pivotal role. The primary reason is their proficiency in managing structured data, including critical information such as production schedules, inventory data, and quality control information. These aspects are integral to the operation of IIoT, and structured databases make their management more efficient. Despite this, one challenge for structured databases in IIoT environments is dealing with high velocity and high volume data, as these databases might not scale as efficiently as required.

<figure>
<img src="/img/blog/image-1-simplified-database-iiot-data-storage-and-actionable-analytics-generation.jpg" alt="Simplified view of database tables in a relational database" title="Simplified view of database tables in a relational database" width="75%"/>
<figcaption class="caption">Simplified view of database tables in a relational database </figcaption>
</figure>

The application of structured databases in IIoT can be seen in multiple use cases. For instance, inventory management is made more efficient through structured databases. They can effectively manage data related to inventory, like product details, quantity, and location. The relational structure allows for complex queries, providing detailed inventory status. Furthermore, order management, which involves tracking and managing customer orders or internal production orders, can also be handled by structured databases. They store essential details such as who placed the order, when it was placed, and its current status. Structured databases are also employed for quality assurance processes. They can organize data related to quality checks and inspections, including pass/fail data, timestamps of inspections, and inspector details.

Despite their importance and broad use, structured databases in IIoT come with their pros and cons. On the positive side, these databases enhance data integrity, enable complex queries, and aid in managing production schedules, inventory, and quality control data. They are also beneficial for workforce management, supplier and vendor management, and customer relationship management (CRM). On the downside, these databases may struggle to scale in response to the high velocity and volume of data typically associated with IIoT environments. This means that while they provide a robust and efficient solution for structured data, they may not be the ideal choice for every IIoT scenario, especially those involving extensive or rapid data streams.

## Data Lakes for Industrial IoT

Data lakes are large storage repositories that hold raw data in its native format until it's needed. In IIoT, data lakes are used to store massive amounts of diverse data from various sources. They offer flexibility, scalability, and the ability to handle structured and unstructured data. The schema-on-read data model, where the schema is applied only when reading the data, is typically used in data lakes. This is in contrast to traditional data warehouses that use a schema-on-write model.

The schema-on-read model used by data lakes allows raw data to be stored in its native format and a schema is applied only when the data is read for analysis. This approach offers immense flexibility because it allows any data from any source to be stored immediately without the need for transformation, including structured, semi-structured, and unstructured data common in IIoT such as time series data from sensors, machine logs, images, and even data from traditional business systems.

For example, consider a manufacturing plant where various machines are equipped with numerous sensors collecting data such as temperature, pressure, vibration, humidity, and more, at regular intervals. Alongside this, there may be visual data collected from cameras for quality inspection, log data from the machines themselves, and data from enterprise resource planning (ERP) systems.

In a schema-on-read data lake model, all these diverse data types would be stored in their native format in the data lake. Each piece of data would be associated with metadata, indicating its source, type, collection time, and more, but without any rigid structure applied. The data lake can rapidly ingest this diverse and high-velocity data without worrying about schema constraints.

<figure>
<img src="/img/blog/image-2-datalake-iiot-data-storage-and-actionable-analytics-generation.jpg" alt="Data Lake ingesting data" title="Data Lake ingesting data" width="75%"/>
<figcaption class="caption">Data Lake ingesting data </figcaption>
</figure>

When an analysis needs to be performed, the relevant data is retrieved and a schema is applied on-the-fly according to the requirements of the analysis. For example, if there is a need to analyze the relationship between machine temperature and failure rates, the temperature data from the sensor and failure logs from the machine logs would be read, a schema applied that allows these two data sets to be related, and then the analysis performed.

As smart manufacturing systems produce vast quantities of diverse data from various sources such as machines, sensors, and business systems, data lakes serve as the central repository for all manufacturing data. Their capacity to handle both real-time and batch data processing enables instantaneous analysis for immediate decision-making and historical analysis for long-term strategic decisions. Therefore, the importance of data lakes in IIoT lies in their ability to consolidate, process, and provide immediate access to data, aiding in both operational and strategic decisions.

Despite their numerous advantages, data lakes in IIoT come with their own set of challenges. The most significant of these challenges is the requirement for a robust data governance strategy. Without proper metadata management and data quality checks, data lakes can quickly become unmanageable, turning into data swamps and leading to inefficiencies and inaccuracies in data-driven decision-making. A strong data governance strategy necessitates defining roles and responsibilities, establishing data standards and procedures, implementing metadata management, ensuring data quality, data security, and privacy, managing the data lifecycle, providing training and support, and regularly monitoring and auditing. Ultimately, the pros and cons of data lakes in IIoT highlight the necessity of sound data governance practices to fully harness their potential.

## Graph Databases for Industrial IoT

Graph databases are data structures that utilize graph theory to store, map, and query relationships within data. Nodes, edges, and properties are the basic components of these databases, where nodes represent entities, edges depict relationships, and properties offer additional data about the nodes or edges. The advantage of these databases lies in their superior capability to handle complex, interconnected data. Instead of arranging data linearly as in traditional relational databases, the graph data model in these databases symbolizes data as interconnected nodes and edges, making them highly optimized for mapping and analyzing intricate structures and relationships.

In Industrial IoT (IIoT), graph databases become pivotal in dealing with interconnected devices, systems, and data sets. As IIoT inherently involves many devices interconnected within a network, managing this data complexity becomes a challenge. Here, graph databases can effectively model these complex relationships and interconnections, thus facilitating advanced analytics, network analysis, and real-time recommendations. The power of these databases to integrate diverse data sources proves immensely beneficial in consolidating and analyzing information from disparate systems within a smart manufacturing setup.

There are numerous applications and use-cases for graph databases within the IIoT ecosystem. One key application is in supply chain management, where graph databases can map the entire supply chain network. This includes suppliers, production sites, distribution centers, and customers, making it easier to visualize and analyze the relationships for efficient planning and operations. Another instance is in product lifecycle management (PLM) and quality control. graph databases can represent the relationships between various stages of a product's lifecycle, from design to disposal, aiding efficient resource allocation and production planning.

Additionally, they can trace the origin and path of specific components or batches, which is critical in quality control and product recall scenarios. Graph databases also prove beneficial in maintenance and troubleshooting by mapping relationships between different machinery, their parts, and maintenance records. Lastly, in process optimization, graph databases, by mapping interdependencies between various manufacturing processes, can help identify inefficiencies that can be optimized.

While graph databases bring a host of advantages, they do come with their set of drawbacks, particularly in an IIoT context. These databases demand specialized skills for effective management and may not be suitable for all types of data. While they excel in managing complex, interconnected data, their utility may not extend to simpler, linear data models, potentially leading to unnecessary complexity. Additionally, the integration of diverse data sources, while advantageous, can sometimes lead to data inconsistency issues. However, the main strength of a graph database is in its ability to understand and represent relationships and interconnections between different data elements, providing unique insights and supporting data-driven decision-making in a smart manufacturing context.

## Generating Actionable Analytics from Stored IIoT Data

Actionable Analytics refers to the process of analyzing data to derive insights that can be acted upon. In IIoT, it's used to transform raw data into meaningful information for decision-making. It enables predictive maintenance, process optimization, and anomaly detection. Actionable Analytics often works best with a combination of data models, depending on the specific use case.

Therefore, to best generate actionable insights for your smart manufacturing initiatives it is important to invest in data integration technologies or platforms which can combine data from various sources in a consistent and usable manner. Essentially, unifying your data analytics under a single pane of glass. A Unified Analytics approach in a smart manufacturing setup can be highly advantageous, providing comprehensive insights across the entire operation. To accomplish this, data from time-series databases, structured databases, data lakes, and graph databases need to be interconnected and analyzed in a holistic manner.

<figure>
<img src="/img/blog/image-3-order-iiot-data-storage-and-actionable-analytics-generation.jpg" alt="Graph Database" title="Graph Database" width="75%"/>
<figcaption class="caption">Graph Database Representation </figcaption>
</figure>

A lot of data operations can benefit from a unified view of your smart manufacturing analytics, among those are cross-contextualisation and correlation. Cross-contextualization involves understanding the data in different contexts and linking these contexts to gain more insights. Correlation, on the other hand, involves finding relationships between different data points across these databases.

For example, consider a manufacturing plant that makes automotive parts. The plant has several machines equipped with IoT sensors that send data to a time-series database. It has order, inventory, and supplier data in a structured database, diverse historical and operational data in a data lake, and relationships between entities in a graph database.

An issue arises when a certain machine shows signs of possible malfunction, as indicated by the time-series data. A simple analysis of this data might lead to a decision to shut down the machine for repair or maintenance. But, before making that decision, a unified analytics approach would look at a broader context, i.e:

* **Cross-Contextualization with Structured Data**: The system can check the structured database to see if there are pending orders that require the machine. Also, it can look at inventory data to see if there's enough stock to cover the downtime. 
* **Correlation with Data Lake**: It can analyze historical data from the data lake to determine if this machine has had similar issues in the past and how those were resolved. It can also find out how often the machine has had problems and what impact it had on production. 
* **Correlation with Graph Database**: Using the graph database, it can identify what other machines or processes are dependent on the machine in question and how a shutdown might affect them.

## Conclusion

To summarize, the pursuit of smart manufacturing adoption brings along many data management challenges. The solution to these challenges lies not in a single data management approach, but rather in the astute utilization of a combination of them, depending on the specific use-case. Time-series databases (TSDBs), while exceptional at handling time-stamped data, have limitations in dealing with non-time-stamped data types. Structured databases excellently manage structured data, yet may falter when facing high velocity and volume data associated with IIoT environments. Data lakes provide an excellent repository for raw data in its native format from various sources but necessitate a robust data governance strategy. Graph databases showcase superior capabilities in handling complex, interconnected data, yet may struggle with simpler, linear data models.

While each of these data management systems plays a vital role in the IIoT data architecture, their potential is truly harnessed when they work in tandem, contributing to a holistic view of the data landscape. This integrated data structure aids in generating actionable analytics, enabling real-time decision-making, predictive maintenance, trend analysis, and more.

This brings to an end of our six-part series titled [A Comprehensive Guide To Industrial Data Management for Smart Manufacturing](/comprehensive-guide-to-industrial-data-management-for-smart-manufacturing-iiot/). We hope you enjoyed this series.
