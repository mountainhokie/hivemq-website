+++
title = "Data Modelling, Contextualization and Normalization for Smart Manufacturing"
date = 2023-06-07T00:00:41+02:00
draft = false
authors = ["kudzai-manditereza"]
tags = [ "Industrial Data Management", "Industry 4.0" , "MQTT", "Smart Manufacturing" ]
poster = "/img/blog/header-image-data-modelling-contextualization-normalization-for-smart-manufacturing.png"
special_link01 = [ "/solutions/manufacturing/", "Smart Manufacturing" ]
special_link02 = ["/unified-namespace-uns-essentials-iiot-industry-40/", "Unified Namespace (UNS) Essentials"]
custom_css = "css/blog.css"
custom_summary = "Discover the methods of transforming, standardizing, normalizing, and modelling the data collected in smart manufacturing."
meta_description = "Discover the methods of transforming, standardizing, normalizing, and modelling the data collected in smart manufacturing."
ogtitle = "Data Modelling, Contextualization and Normalization for Smart Manufacturing"
ogdescription = "Discover the methods of transforming, standardizing, normalizing, and modelling the data collected in smart manufacturing."
ogurl = "https://www.hivemq.com/article/data-modelling-contextualization-normalization-for-smart-manufacturing/"
ogimage = "/img/blog/og-image-data-modelling-contextualization-normalization-for-smart-manufacturing.png"
url = "/article/data-modelling-contextualization-normalization-for-smart-manufacturing/"
+++

Welcome to Part 3 of our series [A Comprehensive Guide To Industrial Data Management for Smart Manufacturing](/comprehensive-guide-to-industrial-data-management-for-smart-manufacturing-iiot/). In part-2 of this series, [Identifying, Acquiring and Integrating Plant-Floor Data for Smart Manufacturing](/article/identify-acquire-integrate-plant-floor-data-smart-manufacturing/), we navigated through identifying data sources and integration opportunities as a first step to implementing a data management strategy for smart manufacturing. In this article, **we delve into the methods of transforming, standardizing, normalizing, and modelling the collected data.** This process is crucial to ensure that the data can be correctly understood and interpreted, thus enhancing its quality and usefulness. Let’s dive in.

**Digitalization** and **Data Analytics** play a pivotal role in successfully realizing your organization's smart manufacturing goals, regardless of their definition. This involves many benefits from using analytics to detect patterns in equipment data for predictive maintenance to tracking product quality in real time.

In reality, the full potential of these benefits can only be harnessed with a thoughtfully crafted data management strategy. This strategy will transform the extensive data produced from manufacturing operations into high-quality, actionable, real-time insights, thereby enhancing cycle time efficiency.

Nevertheless, data originating from industrial assets pose several challenges. These include domain-specific naming conventions, the absence of context, and the lack of a standard data model. Moreover, the data is typically in its raw, unprocessed state and fails to provide time-specific snapshots of an asset - a critical component for advanced analytic applications.

{{< figure src="/img/blog/image-1-data-modelling-contextualization-normalization-for-smart-manufacturing.png" alt="Plant Network Interacting with PLCs and IIoT Platform via Various Protocols" caption="Plant Network Interacting with PLCs and IIoT Platform via Various Protocols" >}}

Data management must be implemented and incorporated within the process of data integration for intelligent manufacturing, through a process that is termed DataOps. DataOps provides an automated method to ensure quality analytics while reducing the data analysis cycle time.

Simply put, it facilitates the seamless integration of data from plant-floor machines and other sources by extracting data from the source, transforming it to match the destination’s format, and then transmitting it to a central hub, typically an MQTT broker holding the Unified Namespace. We discuss more in part 5 of this series on how to use MQTT Sparkplug to create a Unified Namespace structure representing the semantic hierarchy of your organization and then plug transformed data into it from various sources.

DataOps also ensure efficient, secure, and governed data ingestion, dictating the rules for data sharing across a manufacturing enterprise to enforce uniformity. It guides how data models are structured, chosen, combined, and coordinated to create data-driven applications that meet operational goals.

In this layer, we find various tools, some specializing in DataOps, while others serve as visualization or integration platforms that also offer DataOps capabilities. HighByte Intelligence Hub, for example, is a platform primarily focused on DataOps. In contrast, Inductive Automation's Ignition and PTC Thingworx lean more towards SCADA/IIoT platforms, but they also provide DataOps functionality.

In any case, central to DataOps is a data-driven approach that requires a deep understanding of key concepts including Data Modelling, Data Normalization, Data Transformation, and Data Contextualization.

## Data Modelling for IIoT: Laying The Foundation

Data Modelling is a crucial starting point in any data integration for smart manufacturing initiatives. Its main purpose is to define the structure, relationships, and characteristics of the data that will be utilized, thereby facilitating a better understanding of the data's nature, connections, and potential. This involves a detailed process of identifying and categorizing diverse data attributes, including real-time operational data and those that provide context to such data.

In the context of industrial data, attributes can range from raw operational data to more detailed descriptors that define the data itself. These descriptors could include a unit of measurement and other types of information that, in conjunction, depict a piece of data representative of a real-world entity such as an industrial asset or process.

For example, a machine on the assembly line may have multiple sensors that track temperature, vibration, and output speed. A simple data model for this machine might include the following:

>**Machine ID** (unique identifier for the machine) <br/>**Timestamp** (time when the reading was taken) <br/> **Temperature** (current temperature of the machine) <br/> **Vibration** (current vibration level of the machine) <br/> **Output Speed** (current speed of the output from the machine)

Although this might be a simplified model, it provides a clear structure for storing and understanding machine-generated data.

Moreover, Data Modelling may entail classifying sensor data by types, such as temperature, pressure, or vibration, and delineating the relationships between different data types. It also involves establishing rules for data integrity to ensure the reliability and consistency of the data.

A well-structured data model ensures that the collected data is well-organized, easily comprehensible, and ready for further processing and analysis. This not only aids in designing the data schema for data storage but also lays a solid foundation for data manipulation, allowing for the realization of smart manufacturing use cases.Additionally, DataOps promotes an iterative approach to data modelling, allowing for continuous refinements based on changing needs or new insights.

## Data Normalization for IIoT: Ensuring Clean and Consistent Data

Data normalization is a process dedicated to refining and standardizing collected data. The primary objective of this process is to streamline the data, reducing redundancy, and enhancing data integrity, thereby making it more machine-readable and clear.

Normalization is pivotal on the plant floor, where data is generated from many sensors and devices. Data from these diverse sources may come in varied formats, contain duplicates, or even contain unneeded information. Normalization ensures that these data inconsistencies are eliminated by adhering to uniform formats for similar data types, correcting the order of time-series data, and eliminating any other errors.

For instance, if temperature readings from different sensors come in both Celsius and Fahrenheit, they should be normalized to a standard unit. Similarly, time data may come in different formats (like UNIX timestamp or different time zones), and normalizing this to a standard format (like Coordinated Universal Time, UTC) ensures consistency. So, after normalization, the data might look like:

>**Machine ID**: 001 <br/>**Timestamp**: 2023-05-12T14:00:00Z (UTC time) <br/>**Temperature**: 75 (degrees Celsius) <br/>**Vibration**: 3.2 (mm/s) <br/>**Output Speed**: 50 (units per hour)

This process is essential because messy or cluttered data can impede comprehension and generate inaccurate results when analyzed or visualized. Moreover, data redundancy can lead to unnecessary storage costs. Through normalization, the data is tidied up, made consistent, and presented in a similar format, thereby enhancing interpretability.

## Data Transformation for IIoT: Making Data Ready For Analysis

Data Transformation involves converting raw data into a more suitable format for analysis or further processing. Data transformation can involve things like aggregating data, performing mathematical computations, or converting data types.

This might mean converting sensor readings into a more human-readable format or aggregating data from multiple sensors into a single metric. It's often necessary to have clean, consistent data before you can effectively transform it.

For example, you wanted to analyze the average output speed of the machine over an 8-hour shift. You might transform the raw output speed data into an average output speed per shift, like:

>**Machine ID**: 001 <br/>**Shift**: Morning (2023-05-12T06:00:00Z to 2023-05-12T14:00:00Z) <br/>**Average Output Speed**: 48 (units per hour)

This transformed data provides a more useful metric for analysis.

## Data Contextualization for IIoT: Adding Meaning To Your Data

Data Contextualization is a crucial process in a well-structured data workflow that adds value to the raw data by adding meaningful context. It enhances the interpretability of the data, facilitating more accurate and effective decision-making.

Consider an Industrial IoT setting, where a sensor might register a high-temperature reading. Comprehending the context, such as the sensor's location, the time of the reading, and the typical range of readings, can help ascertain whether this reading is an anomaly or within expected parameters. In other words, by storing and delivering all related information in one comprehensive model, users can easily retrieve and understand the necessary data without looking up the information elsewhere.

For instance, you might add information about the specific product being manufactured during the shift, any reported maintenance activities, or anomalies reported in the environment, like a power surge. After contextualizing, the data might look like this:

>**Machine ID**: 001 <br/> **Shift**: Morning (2023-05-12T06:00:00Z to 2023-05-12T14:00:00Z) <br/> **Average Output Speed**: 48 (units per hour)<br/> **Product**: Widget A <br/> **Maintenance Activity**: None <br/> **Environmental Anomalies**: Power surge reported at 2023-05-12T13:00:00Z

This contextualized data gives a more complete picture of the situation, helping analysts to make more informed decisions. DataOps encourages the use of metadata and data lineage. These tools provide additional context, enriching the data and making identifying patterns, trends, and anomalies easier. In turn, this helps organizations optimize their processes, enhance efficiency, and reduce downtime.

Real-time contextualization is also supported in DataOps, offering immediate insights that enable timely, informed decisions. Essentially, the principle is to equip the models with all the necessary information, making the end application more reliable and efficient.

## Conclusion

In this article, we provided insights into the role of DataOps in smart manufacturing, highlighting the importance of digitalization and data analytics in achieving an organization's goals. The article underscores the need for a robust data management strategy to transform raw industrial data into actionable, real-time insights. It discusses the challenges posed by industrial assets’ data. The importance of data modelling, normalization, transformation, and contextualization are explained and how they fit into the larger picture of DataOps.

In Part 4 of this six-part series, [A Comparative Analysis of Data Modelling Standards for Smart Manufacturing](/article/comparative-analysis-of-data-modeling-standards-for-smart-manufacturing/) we'll discuss the effectiveness of utilizing existing data modelling standards to streamline data exchanges and enhance communication among various applications and machines. We’ll explore and provide a comparative analysis of four such standards.


