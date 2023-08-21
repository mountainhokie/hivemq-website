+++
title = "Semantic Data Structuring with MQTT Sparkplug and Unified Namespace"
date = 2023-06-21T00:00:38+02:00
draft = false
authors = ["kudzai-manditereza"]
tags = [ "Industrial Data Management", "Industry 4.0" , "MQTT Sparkplug", "Smart Manufacturing", "MQTT", "UNS"]
poster = "/img/blog/header-image-semantic-data-structuring-mqtt-sparkplug-unified-namespace-uns-smart-manufaturing.png"
special_link01 = [ "/solutions/manufacturing/", "Smart Manufacturing" ]
special_link02 = ["/unified-namespace-uns-essentials-iiot-industry-40/", "Unified Namespace (UNS) Essentials"]
custom_css = "css/blog.css"
custom_summary = "Learn how MQTT Sparkplug and Unified Namespace (UNS) help with semantic data structuring in smart manufacturing and IIoT."
meta_description = "Learn how MQTT Sparkplug and Unified Namespace (UNS) help with semantic data structuring in smart manufacturing and IIoT."
ogtitle = "Semantic Data Structuring with MQTT Sparkplug and Unified Namespace"
ogdescription = "Learn how MQTT Sparkplug and Unified Namespace (UNS) help with semantic data structuring in smart manufacturing and IIoT."
ogurl = "https://www.hivemq.com/article/semantic-data-structuring-mqtt-sparkplug-unified-namespace-uns-smart-manufacturing/"
ogimage = "https://www.hivemq.com/img/blog/og-image-semantic-data-structuring-mqtt-sparkplug-unified-namespace-uns-smart-manufaturing.png"
url = "/article/semantic-data-structuring-mqtt-sparkplug-unified-namespace-uns-smart-manufacturing/"
+++

Welcome to Part 5 of our series [A Comprehensive Guide To Industrial Data Management for Smart Manufacturing](/comprehensive-guide-to-industrial-data-management-for-smart-manufacturing-iiot/). In Part 4 of this series, [A Comparative Analysis of Data Modelling Standards for Smart Manufacturing](/article/comparative-analysis-of-data-modeling-standards-for-smart-manufacturing/), we delved into comparative analysis of data modelling standards such as, Digital Twin Definition Language (DTDL), MQTT Sparkplug, OPC UA, AAS, etc. In this article, we will discuss how [MQTT Sparkplug](/solutions/technology/mqtt-sparkplug/) and [Unified Namespace (UNS)](/unified-namespace-uns-essentials-iiot-industry-40/) enables an efficient smart manufacturing data infrastructure. Let’s dive in.

## Introduction

The achievement of smart manufacturing hinges significantly on the robustness of its core data architecture. Key to this are aspects such as the fluidity of digital interactions between various systems and applications throughout both business and manufacturing operations. Equally crucial is the semantic alignment among data producers and consumers within your ecosystem, as this facilitates the automation of data-driven decision-making across the entire enterprise, thereby automating entire business operations.

**This article delves into how [MQTT Sparkplug](/mqtt-sparkplug-essentials/) enables an efficient smart manufacturing data infrastructure. It does this by allowing the creation of a semantically structured depiction of the organization's structure and events, known as the Unified Namespace.** We will explore how to root the Unified Namespace architecture in the existing information organization of a manufacturing company. Typically, this information is arranged around a conceptual model of the physical or logical assets used by the company in conducting its business.

Such a conceptual structure is often found in Enterprise applications like ERP or MES, organized hierarchically in accordance with the ISA-95/ISA-88 standard. We will further explore these concepts, illuminating how MQTT Sparkplug and the Unified Namespace can effectively support smart manufacturing infrastructure.

## The Industrial Asset Model

The ISA-95/ISA-88 standard delivers a shared framework for managing production processes and resources while offering a standard interface connecting this model to higher-tier ERP and lower-tier control systems. Initially, the ISA-95 standard was crafted to bridge the divide between the finer details of machine control and the macro-level workings of ERP systems that oversee planning and scheduling.

Presently, ISA-95 serves as the globally recognized standard for merging enterprise and control systems. It comprises both models and a standard vocabulary, which can be utilized to identify the necessary information that needs to be transferred between various systems. This includes the **transfer of data between sales, finance, and logistics systems and those involved in production, maintenance, and quality**. This standard ensures smooth integration and data exchange, streamlining operations across different levels of an organization.

<figure>
<img src="/img/blog/image-1-semantic-data-structuring-mqtt-sparkplug-unified-namespace-uns-smart-manufaturing.png" alt="The Industrial Asset Model" title="The Industrial Asset Model" width="75%"/>
<figcaption class="caption">The Industrial Asset Model </figcaption>
</figure>

The ISA-95 model presents a hierarchical structure of equipment entities, each having distinct organizational functions and relationships. Let us elaborate on these entities a bit further below:

**Enterprise**: This entity typically represents an organization with well-defined objectives. This could be an entire company, a subdivision, or a functional unit within a company, focusing on a specific product or service.

**Site**: This refers to a physical or geographic segment of an enterprise. It could be a factory, a complex with multiple factories, or a single building. The specific definition of a site depends on the enterprise's size and the organization of its various activities.

**Area**: This is a physical, geographical, or logical grouping within a site. It might encompass process cells, production units, production lines, and storage zones.

**Production Line**: A facility that houses equipment dedicated to manufacturing a distinct product or a group of related products. It comprises all the necessary equipment to produce a specific product or component.

**Production Unit**: A facility that houses production equipment designed to transform, separate, or react with raw materials to generate intermediate or final products.

**Process Cell**: A facility that houses production equipment used for a processing step in batch operations.

**Unit**: An entity that adds value to a product for batch and continuous production.

**Work Cell**: An entity that adds value to a product for discrete manufacturing.

The granularity of this model depends on a company's specific objectives, sometimes, it can be extended to include Equipment and Control Modules as per the S88 standard. The company needs to evaluate its work processes and information flow in alignment with its business goals.

## Designing Your UNS Data Architecture

Determining what data will reside where and in what format within the Unified Namespace (UNS) is a crucial aspect of designing your UNS data architecture. This decision shapes the type of information available for consumption and whether it can facilitate actionable analysis. The point is, structuring UNS data isn't merely about mapping isolated tags onto the UNS hierarchy. Instead, it requires a strategic approach that begins with identifying existing namespaces within your Operational Technology (OT) environment. These could include machine time-series metrics like temperature, descriptive details like asset ID, profit and loss calculations, [Overall Equipment Efficiency (OEE)](/blog/why-overall-equipment-effectiveness-oee-kpi-for-industrial-processes/) calculations, power consumption, and so on. The goal is to integrate these namespaces into suitable levels of your UNS hierarchy.

Walker Reynolds, the architect behind the UNS concept and a strong advocate for it, suggests four types of namespaces for mapping OT data to UNS. For example, Functional Namespaces could be established for Overall Equipment Efficiency (OEE), covering all necessary parameters. Informative Namespaces consist of abstracted data designed solely for consumption by software, data lakes, and other systems. Definitional Namespaces encompass parameters that seldom or never change, such as an asset's installation date, and these namespaces can be positioned anywhere in the hierarchy. Lastly, Ad-Hoc namespaces are unique to a specific organization, site, or production line, unlike standardized metrics like OEE.

<figure>
<img src="/img/blog/image-2-semantic-data-structuring-mqtt-sparkplug-unified-namespace-uns-smart-manufaturing.png" alt="UNS Data Architecture" title="UNS Data Architecture" width="75%"/>
<figcaption class="caption">UNS Data Architecture </figcaption>
</figure>

In essence, you'll end up with various types of namespaces at every hierarchical level within your organization. Some will be common across your organization, while others will be unique to a specific level.

## UNS Data Architecture Using MQTT Sparkplug

ISA 95 or a custom asset model essentially creates a semantic hierarchical representation of an organization's structure. This structure allows for different sets of information to reside at various levels of the hierarchy, facilitating easy navigation and access to relevant data. For instance, if one wants real-time analytics for a specific production line, they can navigate the organizational structure to access the needed data. This approach is more efficient and reliable than coding or database scripting, which can be time-consuming and is not scalable.

The added advantage here is that while humans can easily interpret meaning from a well-defined naming convention, machines cannot. However, if a machine understands the concept of hierarchies and the relationship between entities, it can autonomously find relevant information and act on it. **This paves the way for the kind of automatic data-driven decisions that enable automation of business processes.**

Building a Unified Namespace (UNS) involves creating a semantic hierarchy for your business based on ISA 95 or a custom asset model. Then, collecting data from the Operational Technology (OT) side, as discussed previously. After consolidating the data, it requires allocation to the appropriate levels of the hierarchy.

This process results in a centralized repository of information, with the UNS acting as a single source of truth for all data within an organization. It also becomes the central hub, replacing multiple point-to-point communication interfaces with a single interface.

To implement the UNS, you need technology capable of organizing data centrally based on your organizational structure and events. This centralization allows network participants to access information easily, knowing where and how to find relevant data. The technology should also ensure data transparency and availability to all authorized users. MQTT is a common technology used for implementing the UNS, with the MQTT broker acting as the central hub, as shown in the diagram below.

<figure>
<img src="/img/svg/uns-bottling.svg" alt="UNS Data Architecture Using MQTT Sparkplug" title="UNS Data Architecture Using MQTT Sparkplug" width="75%"/>
<figcaption class="caption">UNS Data Architecture Using MQTT Sparkplug </figcaption>
</figure>

In this context, we adhere to the suggested ISA-95 common data model to align a bottling company's organizational structure with the MQTT topic structure. This approach is beneficial because, within MQTT's publish-subscribe architecture, subscribers can leverage the MQTT topic structure to filter messages using wildcard subscriptions. This offers all components linked to the MQTT broker hierarchical data access and data source location specification for a UNS.

Nevertheless, MQTT Sparkplug extends this functionality. It enhances MQTT's capabilities by offering guidelines on structuring topics in a universally comprehensible way.

The topic structure as mandated by MQTT Sparkplug is as follows:

`spBv1.0/group_id/message_type/edge_node_id/[device_id]`

**spBv1.0**: This refers to the Sparkplug encoding mechanism being used. For example, here reference is made to Sparklpug B encoding which uses Google protobufs.

**Group ID**: This is a logical grouping of edge nodes. It can be used to group together edge nodes that are geographically close or that perform similar functions.

**Message Type**: This represents the type of the MQTT message. In Sparkplug, this could be a few different values such as "NCMD" for a Node Command, "DCMD" for a Device Command, "NBIRTH" for a Node Birth Certificate, "DBIRTH" for a Device Birth Certificate, "NDATA" for Node Data, or "DDATA" for Device Data.

**Edge Node ID**: This is a unique identifier for the edge node. An edge node is a device that communicates directly with the MQTT server (broker).

**Device ID**: This is a unique identifier for the device that is communicating with the edge node.

Taking the bottling company as an example, you can apply Sparkplug's defined topic namespace to your UNS structure in the following manner:

`spBv1.0/BottlingCompany:Munich/DDATA/FillingArea1:FillingLine1/Cell1`

Moreover, Sparkplug provides advantages such as Payload Definition, fostering interoperability by utilizing data types that are consistently interpreted across your UNS ecosystem. It also offers Session State Management for all connected components.

## Conclusion

In this article, we explored the pivotal role of MQTT Sparkplug in establishing a robust data infrastructure for smart manufacturing, focusing on the creation of a Unified Namespace (UNS). We delved into the strategic approach required to design the UNS data architecture, emphasizing the importance of identifying existing namespaces within the Operational Technology (OT) environment. We also highlighted the benefits of MQTT Sparkplug, including its ability to enhance MQTT's capabilities and provide universally comprehensible guidelines for structuring topics. Ultimately, the implementation of MQTT Sparkplug and a well-designed UNS can lead to streamlined operations, improved data accessibility, and the automation of data-driven decisions across an organization.

In [Part 6](/article/iiot-data-storage-and-actionable-analytics-generation/) of this six-part series titled [A Comprehensive Guide To Industrial Data Management for Smart Manufacturing](/comprehensive-guide-to-industrial-data-management-for-smart-manufacturing-iiot/), we will discuss Industrial IoT data storage mechanisms and the generation of actionable analytics to power your smart manufacturing needs.


