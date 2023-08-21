+++
title = "A Comparative Analysis of Data Modelling Standards for Smart Manufacturing"
date = 2023-06-14T00:21:07+02:00
draft = false
authors = ["kudzai-manditereza"]
tags = [ "Industrial Data Management", "Industry 4.0" , "MQTT Sparkplug", "Smart Manufacturing", "MQTT"]
poster = "/img/blog/header-image-comparative-analysis-of-data-modeling-standards-for-smart-manufacturing.png"
special_link01 = [ "/solutions/manufacturing/", "Smart Manufacturing" ]
special_link02 = ["/unified-namespace-uns-essentials-iiot-industry-40/", "Unified Namespace (UNS) Essentials"]
custom_css = "css/blog.css"
custom_summary = "Here’s a analysis of data modelling standards like Digital Twin Definition Language (DTDL), MQTT Sparkplug, OPC UA, AAS, etc. for smart manufacturing."
meta_description = "Here’s a analysis of data modelling standards like Digital Twin Definition Language (DTDL), MQTT Sparkplug, OPC UA, AAS, etc. for smart manufacturing."
ogtitle = "A Comparative Analysis of Data Modelling Standards for Smart Manufacturing"
ogdescription = "Here’s a analysis of data modelling standards like Digital Twin Definition Language (DTDL), MQTT Sparkplug, OPC UA, AAS, etc. for smart manufacturing."
ogurl = "https://www.hivemq.com/article/comparative-analysis-of-data-modeling-standards-for-smart-manufacturing/"
ogimage = "/img/blog/og-image-comparative-analysis-of-data-modeling-standards-for-smart-manufacturing.png"
url = "/article/comparative-analysis-of-data-modeling-standards-for-smart-manufacturing/"
+++

Welcome to Part 4 of our series [A Comprehensive Guide To Industrial Data Management for Smart Manufacturing](/comprehensive-guide-to-industrial-data-management-for-smart-manufacturing-iiot/). In Part 3 of this series, [Data Modelling, Contextualization and Normalization for Smart Manufacturing](/article/data-modelling-contextualization-normalization-for-smart-manufacturing/), we delved into the methods of transforming, standardizing, normalizing, and modelling the collected data. In this article, we make a comparative analysis of data modelling standards like Digital Twin Definition Language (DTDL), MQTT Sparkplug, OPC UA, AAS, etc. for smart manufacturing. Let’s dive in.

As we navigate the advent of smart manufacturing, data modeling emerges as a pivotal factor enabling seamless interoperability across the entire manufacturing ecosystem. Crafting custom data models for specific use cases and applications, as we’ve shown in Part 3 of this series, can certainly be effective. However, there are situations where utilizing a standardized data modeling approach proves advantageous. This approach fosters interoperability throughout the whole manufacturing ecosystem, encompassing not only your operations but also extending to suppliers and customers.

In essence, adopting data modeling standards can facilitate seamless data exchange across the entire value chain, enhancing overall efficiency and cooperation among various applications and machines. Crucial to this evolution is semantic modeling, allowing machines to deduce meaning without human intervention. Thus, the concept of information modeling, encapsulating not only data but its meaning, is paramount to facilitating intelligent, autonomous decisions.

In this article, we'll delve into the world of four data modeling standards detailing how they enable interoperability through data modeling. Our comparative analysis will provide insights into their unique purposes and overlapping areas, guiding you to the standard best suited for your needs, thereby fostering a smart manufacturing success for your organisation.

## Digital Twin Definition Language (DTDL)

Digital Twin Definition Language (DTDL) is a language for creating models for Digital Twin use cases. It allows manufacturers to capture the rich semantics of their IoT solutions, including the relationships between different devices, their properties, commands, and telemetry.

DTDL's relevance for smart manufacturing lies in its support for the creation of highly interoperable and scalable digital twins. These twins can model all elements of a manufacturing line, from individual machines to the whole factory, offering a comprehensive and real-time overview of operations.

The DTDL language follows JSON syntax but is based on JSON-LD. JSON-LD, or JSON for Linked Data, is a method of encoding Linked Data using JSON. It is a World Wide Web Consortium (W3C) standard that provides a way to enrich your data by contextualizing it with schemas (vocabularies) that you choose. This makes it easy to define complex models and relationships between different parts of a system.

By leveraging JSON-LD, DTDL can provide a common structure and semantics for digital twin models, making them interoperable across different systems. This makes integrating different systems in a smart manufacturing environment easier, where you might have digital twins for various machines, processes, and workflows.

Here is a simple example to illustrate the concept. In a typical JSON representation, information about a machine might look like this:

{{< highlight js "linenos=table" >}}

{
    "id": "Machine123",
    "type": "CNCMachine",
    "status": "Active",
    "lastMaintenance": "2022-12-01",
    "output": 2000
}

{{< /highlight >}}

In this JSON representation, we have basic information about a CNC machine. However, it lacks context and semantics, which can cause interoperability issues when integrating with other systems.

In a JSON-LD representation using DTDL, the same machine might be represented like this:

{{< highlight js "linenos=table" >}}

{
  "@context": {
     "@vocab": "dtmi:com:example:Machine;1",
     "lastMaintenance": {
        "@id": "dtmi:com:example:Machine;1#lastMaintenance",
        "@type": "xsd:date"
     },
     "output": {
         "@id": "dtmi:com:example:Machine;1#output",
         "@type": "xsd:integer"
     }
},
"id": "Machine123",
"type": "CNCMachine",
"status": "Active",
"lastMaintenance": "2022-12-01",
"output": 2000
}

{{< /highlight >}}

In this example, @context provides additional semantics for our machine data. "@vocab": "dtmi:com:example:Machine;1" sets a default vocabulary for terms in our data. The terms "lastMaintenance" and "output" are further defined, linking them to specific definitions in our vocabulary and specifying their data types.

Providing these additional semantics makes our data self-describing and easier to integrate with other systems. 

## MQTT Sparkplug

[MQTT](/mqtt-essentials/) is publish-subscribe based messaging protocol for the Internet of Things (IoT) and Industrial IoT. [Sparkplug](/solutions/technology/mqtt-sparkplug/) offers a specification that enables OEM device manufacturers and application developers to build comprehensive and interoperable SCADA/IIoT solutions, leveraging MQTT as the core messaging technology.

Beyond establishing a standardised MQTT topic namespace enriched with semantic properties to ensure interoperability in smart manufacturing systems, Sparkplug's true distinction lies in its MQTT payload definition which provides a standardized approach to data modeling through binary message encoding.

To enforce interoperability, Sparkplug supports data type definitions for its payload components, thse include primitive data types, complex data types via templates, datasets, enhanced metrics with customizable metadata, metric aliasing for bandwidth efficiency, as well as historical and file data.

To illustrate the concept of complex data types using templates, let's consider a manufacturing setting with multiple machines, each equipped with various sensors. These sensors might monitor metrics like temperature, vibration, and energy usage. In a Sparkplug implementation, each machine could be considered an "Edge of Network (EON) Node," and each sensor could be a "Device." A "template" in this context could be a predefined set of metrics that each sensor should report. For example, a temperature sensor's template might include metrics for current temperature, maximum and minimum recorded temperatures, and status information indicating whether the sensor is currently operational.

When a new sensor is added to the system, it could use this template to know what data it should report and how that data should be structured. This would ensure consistency across all sensors of the same type and would make it easier to manage and interpret the sensor data.

While Sparkplug uses Google's Protocol Buffers for encoding data, here's a basic representation of a Sparkplug Template schema in JSON for the temperature sensor example:

{{< highlight js "linenos=table" >}}

{
    "TemperatureSensor": {
    "device_id": "string",
    "metrics": {
      "current_temperature": {
        "type": "float",
        "unit": "°C",
        "description": "Current temperature reading"
      },
      "max_temperature": {
        "type": "float",
        "unit": "°C",
        "description": "Maximum temperature recorded"
      },
      "min_temperature": {
        "type": "float",
        "unit": "°C",
        "description": "Minimum temperature recorded"
      },
      "status": {
        "type": "boolean",
        "description": "Operational status of the sensor"
      }
    }
  }
}

{{< /highlight >}}

In this simplified example, the template for a temperature sensor ("TemperatureSensor") includes an ID for the device ("device_id") and a set of metrics. Each metric includes a type, a unit (for temperature readings), and a description.

In SCADA/IIoT platforms like Inductive Automation Ignition, templates are formed by incorporating User Defined Types (UDTs). This process essentially involves publishing models and their instances that reference Ignition UDTs into the IIoT data infrastructure. These models and instances can then be dynamically utilized by other Sparkplug-enabled applications, facilitating seamless interoperability and data exchange.

## OPC UA Companion Specifications

OPC UA is a set of standards developed by the OPC Foundation for industrial information exchange. It promotes a unified approach for interacting with different data sources in an industrial setting.

OPC Companion Specifications are guidelines that define how a particular industry, vendor, or group of products should use OPC UA to ensure uniformity and interoperability. They provide a common framework that companies can adhere to, ensuring their products can interact seamlessly with others in the ecosystem.

These specifications are developed by industry-specific working groups within the OPC Foundation or by external organizations in partnership with the OPC Foundation. They're formulated based on the specific requirements of each industry, taking into consideration the unique data structures and communication protocols involved.

In smart manufacturing, OPC UA Companion Specifications are instrumental in ensuring interoperability. By providing a common language and set of rules, they enable diverse manufacturing systems, devices, and software applications to communicate and exchange data effectively.

The OPC UA Companion Specification for MTConnect, a standard that allows for the organized retrieval of process information from numerically controlled machine tools, specifies a set of OPC UA object types that map to the various components and data items defined by the MTConnect standard. For instance, a machine tool may be represented as a hierarchical structure of OPC UA objects designating different components like controllers, axes, or sensors, and these components may have properties or variables detailing data items like temperature, speed, or status.

This specification ensures that any machine tool that supports the MTConnect standard can expose its data in a way that can be easily understood and integrated into any system that supports OPC UA and the MTConnect OPC UA Companion Specification. This promotes interoperability and data exchange in industries where machine tools are used.

For illustration, below is a very simplified representation of the XML structure defined by the MTConnect OPC UA Companion Specification. The actual specification includes additional elements, such as events, methods, and complex data types, to fully represent the capabilities and data provided by the MTConnect standard.

{{< highlight js "linenos=table" >}}

<opc:UANodeSet 
xmlns:opc="http://opcfoundation.org/UA/2011/03/UANodeSet.xsd">
    <opc:Aliases>
        <!-- Aliases for data types, like Boolean, String, etc. -->
    </opc:Aliases>
    <opc:UAObject NodeId="ns=1;s=MachineTool" BrowseName="1:MachineTool">
        <!-- Object representing a machine tool -->
        <opc:UAVariable NodeId="ns=1;s=MachineTool.Status" 
BrowseName="1:Status">
        <!-- Variable representing the status of the machine tool -->
    </opc:UAVariable>
    <opc:UAObject NodeId="ns=1;s=MachineTool.Controller" 
BrowseName="1:Controller">
        <!-- Object representing the controller of the machine tool -->
    <opc:UAVariable NodeId="ns=1;s=MachineTool.Controller.Program" 
BrowseName="1:Program">
        <!-- Variable representing the program running on the controller -->
    </opc:UAVariable>
    <!-- More variables or objects representing other aspects of the controller -->
    </opc:UAObject>
    <!-- More components or other aspects of the machine tool -->
    </opc:UAObject>
</opc:UANodeSet>

{{< /highlight >}}

In this structure, the UAObject with the NodeId "ns=1;s=MachineTool" represents the machine tool. It contains a variable representing its status and another object describing its controller. The controller object, in turn, has a variable displaying the program currently running on the controller.

The NodeId is used by OPC UA to uniquely identify each object or variable in the structure, and the BrowseName provides a human-readable name for each element.

## Asset Administration Shell (AAS)

The Asset Administration Shell, conceptualized within the context of the German Industrie 4.0 initiative, is a digital representation or 'digital twin' of a physical asset in the production process. An AAS encapsulates all information about an asset, including technical features, functionalities, and lifecycle data. This information is stored and shared in a standardized manner, allowing for seamless communication between different systems.

The AAS can be envisioned as an API, exposing the properties and capabilities of a physical asset to facilitate its administration. It offers a suite of services, some generic and others specific, that correspond to the asset it represents. Generic services include Identification, Configuration, Condition Monitoring, and Events, while specific services encompass the unique capabilities or functions performed by that particular asset.

For illustration, let's consider a conveyor belt system in a smart factory. This conveyor belt system could have an associated AAS which acts as its digital twin.

* **Identification**: The AAS would include a unique identifier for the conveyor belt system, making it easily identifiable in a complex network of other systems and devices. 
* **Configuration**: The AAS would store configuration data for the conveyor belt system. This could include information about the system's capacity, speed, power requirements, and more. 
* **Condition Monitoring**: The AAS would provide real-time data about the operating status of the conveyor belt system. This could include information about the system's current speed, load, temperature, and other relevant metrics. 
* **Events**: The AAS would log any significant events related to the conveyor belt system. This could include system errors, maintenance activities, and changes in operating status. 
* **Specific Services**: The AAS could also provide access to services specific to the conveyor belt system. For example, it could allow a user to adjust the speed of the conveyor belt or to initiate a maintenance routine. 
* **Lifecycle Data**: The AAS would also maintain a record of the conveyor belt system's lifecycle data. This would include information about the system's design, manufacture, installation, operation, maintenance, and eventual decommissioning.

In this way, the AAS for the conveyor belt system would provide a standardized, comprehensive, and easily accessible source of information about the system. This would enable different devices, systems, and users to interact with the conveyor belt system in a seamless and coordinated manner, enhancing the overall efficiency and flexibility of the smart factory.

The Asset Administration Shell (AAS) is typically represented using structured data formats that align with web standards. The specific format can vary depending on the needs and capabilities of the systems interacting with the AAS, but it's often represented in JSON or XML format due to their wide use and compatibility with web technologies.

In the case of our hypothetical conveyor belt system, let's consider a simplified example of how the AAS might be represented in JSON format:

{{< highlight js "linenos=table" >}}

{
    "id": "conveyor123",
    "type": "Conveyor System",
    "manufacturer": "Conveyor Co.",
    "dateOfManufacture": "2022-01-01",
    "configuration": {
        "capacity": 500,
        "speed": 100,
        "powerRequirements": "220V AC"
    },
    "conditionMonitoring": {
        "currentSpeed": 75,
        "currentLoad": 250,
        "temperature": 30,
        "status": "Running"
    },
    "events": [
    {
    "timeStamp": "2023-05-14T09:00:00",
    "eventType": "Maintenance",
    "description": "Routine maintenance performed"
    },
    {   
    "timeStamp": "2023-05-14T10:00:00",
    "eventType": "Error",
    "description": "Overload error",
    "resolved": true
    }
  ],
    "specificServices": {
    "adjustSpeed": "http://example.com/api/conveyor123/adjustSpeed",
    "initiateMaintenance": "http://example.com/api/conveyor123/initiateMaintenance"
    }
}

{{< /highlight >}}

This JSON object represents the conveyor belt system's AAS. It includes information for identification (e.g., id, type, manufacturer, date of manufacture), configuration (capacity, speed, power requirements), condition monitoring (current speed, current load, temperature, status), and events (list of events with timestamp, event type, and description).

Specific services are represented as URLs where these services can be accessed. These would typically point to RESTful APIs that allow for interaction with the conveyor belt system.

## Comparisons and Complementarity of Data Modelling Standards

### Digital Twin Definition Language (DTDL)

DTDL allows for creating models of digital twins, virtual replicas of real-world machines or processes, with a focus on capturing relationships, properties, commands, and telemetry. The use of JSON-LD helps provide context and semantics, making the data self-describing and easier to integrate with other systems. DTDL is especially useful when you want to model a complete manufacturing line or a whole factory. It allows you to create and maintain a real-time overview of operations, which can be invaluable for decision making and optimization.

### MQTT Sparkplug

MQTT Sparkplug shines in situations where you need to manage multiple machines, systems or devices, each with multiple sensors. Sparkplug's use of templates for complex data types ensures consistency across all data generators of the same type, facilitating data management and interpretation. Moreover, Sparkplug's emphasis on data type definitions and efficient bandwidth utilization makes it ideal for large-scale operations and cloud connectivity where communication efficiency is paramount.

### OPC UA Companion Specifications

OPC UA Companion Specifications highly versatile and can be used across various industries. OPC UA excels in environments that use a diverse range of systems, devices, and software applications since it provides a common language and set of rules for communication and data exchange. The example of MTConnect demonstrates the benefits of using OPC UA Companion Specifications when dealing with machine tools in manufacturing, as it simplifies data exposure and integration into OPC UA-compatible systems.

### Asset Administration Shell

Asset Administration Shell is especially useful when you need a standardized way to manage individual assets within a production process. It can provide real-time data about an asset's operating status, log events, and even provide access to specific services related to the asset. AAS is also helpful for lifecycle management of assets as it keeps track of data from design and manufacture to operation and decommissioning.

While each standard has its strengths and ideal use cases, they also have areas of overlap, and they can complement each other in certain scenarios.

For example, DTDL and AAS both provide a way to create a digital twin of a physical asset. However, DTDL places a strong emphasis on the relationships between different devices, while AAS focuses more on the individual asset and its lifecycle.

[Sparkplug and OPC UA](/article/iiot-protocols-opcua-vs-mqtt-sparkplug-digital-transformation/), on the other hand, provide a way to structure data and ensure interoperability. Sparkplug uses MQTT and Protocol Buffers, focusing on SCADA/IIoT solutions and efficient data encoding, while OPC UA provides a more generalized approach, offering industry-specific guidelines through companion specifications.

## Conclusion

In a complex smart manufacturing setup, it is conceivable that all four standards could be used together. For instance, you might use DTDL to create digital twin models of your assets, AAS to manage the lifecycle data for each asset, Sparkplug to handle communication between sensors and devices, and OPC UA to ensure interoperability between different systems, devices, and software applications.

In Part 5 of this six-part series, [Semantic Data Structuring with MQTT Sparkplug and Unified Namespace](/article/semantic-data-structuring-mqtt-sparkplug-unified-namespace-uns-smart-manufacturing/), we will explore the pivotal role of MQTT Sparkplug in establishing a robust data infrastructure for smart manufacturing, focusing on the creation of a Unified Namespace (UNS). We delve into the strategic approach required to design the UNS data architecture, emphasizing the importance of identifying existing namespaces within the Operational Technology (OT) environment.

