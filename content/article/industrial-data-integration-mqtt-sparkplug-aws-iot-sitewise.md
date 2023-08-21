+++
title= "MQTT Sparkplug to AWS IoT Sitewise Integration: A Step-By-Step Guide"
date= 2022-08-25T00:00:16+02:00
draft= false
authors = ["kudzai-manditereza"]
tags= ["Real-World MQTT", "Industry 4.0", "MQTT Sparkplug"]
poster= "/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/header-img-mqtt_sparkplug_to_aws_iot_sitewise_integration.png"
custom_css = "css/blog.css"
custom_summary = "A step-by-step guide on how to integrate industrial data into AWS IoT Sitewise using MQTT Sparkplug."
meta_description= "A step-by-step guide on how to integrate industrial data into AWS IoT Sitewise using MQTT Sparkplug."
ogtitle = "MQTT Sparkplug to AWS IoT Sitewise Integration: A Step-By-Step Guide"
ogimage = "https://www.hivemq.com/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/og-img-mqtt_sparkplug_to_aws_iot_sitewise_integration.png"
ogdescription = "MQTT Sparkplug to AWS IoT Sitewise Integration: A Step-By-Step Guide"
url = "/article/industrial-data-integration-mqtt-sparkplug-aws-iot-sitewise/"
+++

## Introduction – Why use AWS IoT Sitewise and MQTT Sparkplug

Gathering data from hundreds or thousands of different types of industrial assets to extract information that could help transform a company’s business processes is a time-consuming and expensive process. Because industrial data is mostly available as discrete data points, which makes it difficult to analyze assets as whole units using either simple visualization or advanced analytics tools.

AWS IoT Sitewise is a platform that aims to solve this problem by providing an asset modeling framework that enables you to define the different types of assets and their respective data points by creating asset models for each type.

In this article, I’m going to show you, step-by-step, how to integrate industrial data into AWS IoT Sitewise using [MQTT Sparkplug](/mqtt-sparkplug-essentials/). For demonstartion, I am using Opto 22 Groov RIO as my data source, with my temperature probe representing the temperature of a Wind Turbine system, and my 0-10 volts signal generator representing Wind Turbine speed.

<figure>
<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 1.jpg" alt="Connecting Opto22 groov and Temperature sensor" title="Connecting Opto22 groov and temperature sensor" width="75%"/>
<figcaption class="caption">Image 1: Hardware Setup to Demonstrate AWS IoT Sitewise to MQTT Sparkplug Integration </figcaption>
</figure>

## System Architecture

The below image shows the system architecture for demonstrating how to integrate industrial data into AWS IoT Sitewise using MQTT Sparkplug.

<figure>
<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 2.jpg" alt="System Architecture for Demonstarting integration of AWS IoT Sitewise and MQTT Sparkplug" width="75%"/>
<figcaption class="caption">Image 2: System Architecture for Demonstarting integration of AWS IoT Sitewise and MQTT Sparkplug</figcaption>
</figure>

Followed by the creation of instances or virtual representations of real assets in the field based on the models, I update the data points of the virtual assets in real-time with data collected from the plant.

However, you have to manually  create models for each type of asset in the plant, and manually create instances of all your assets. If you had thousands of assets, this would not only be a slow process, but it would present challenges such as the accuracy of your data models and instances, among many other challenges.

MQTT Sparkplug helps to eliminate these challenges. And here’s how.

Sparkplug allows you to transmit, straight from the source, asset models, respective instances of the assets, and the sensor measurements to update the data points of virtual representation of your assets into AWS IoT Sitewise.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 3.jpg" width="75%" />

In simple terms, MQTT Sparkplug allows you to do on AWS Sitewise is to automatically create asset models, asset properties, define asset properties and efficiently update asset data with no coding at all –  just configuration.

To demonstrate this, I’m going to use an Opto22 Groov RIO as my data source at the edge. I’ll expose its temperature and speed measurements representing Wind Turbine data via an OPC UA server embedded in the device.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 4.jpg" width="75%" />

I’ll then use Inductive Automation’s Ignition Gateway together with an Ignition module from Cirrus Link called MQTT Transmission to collect data from the OPC UA server and transmit it, only when change is detected, to a HiveMQ MQTT broker, which I’ll deploy on the AWS Cloud platform.

Next, I’ll use the IoT Bridge for Sitewise software from Cirrus Link to connect to the HiveMQ MQTT broker and forward my data to the AWS IoT Sitewise platform, which then makes it available to many sophisticated Analytics tools on AWS.

So, let’s get started.

### Exploring AWS Sitewise

Let us begin by exploring the AWS IoT Sitewise interface.

In the AWS Console page, click on _Services_. Under Internet of Things, select _IoT Sitewise_.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 5.jpg" width="75%" />

This provides you access to AWS IoT Sitewise dashboard.

Click on the menu and get the options for building models, assets, and datastreams. Note that there is also an option for configuring your Edge Gateway.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 6.jpg" width="75%" />

Click on _Models_.

Currently, there are no models. If you want to create a model, click on the _Create Model_ button.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 7.jpg" width="75%" />

**Specify the details of your model, its attributes, metrics, tags, and other details**.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 8.jpg" width="75%" />

Note that, here, I am not going to do this manually. Instead, I am going to automatically create models by pushing them from the source of data at the edge using MQTT Sparkplug.

That’s why you see no assets under Assets.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 9.jpg" width="75%" />

I have an interface for creating assets. Again, we are going to automatically create instances here by publishing them from the source of the data at the edge using MQTT Sparkplug.

Now that we are familiar with the IoT Sitewise cloud interface, let’s go ahead and start putting our components together to integrate MQTT Sparkplug data with IoT Sitewise.

Note that the AWS IoT Sitewise region is **US East 1 North Virginia** in this case.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 10.jpg" width="75%" />

### Deploying HiveMQ MQTT Broker on AWS

To begin, I’m going to show you how to deploy a HiveMQ MQTT Broker instance on AWS EC2.

On the HiveMQ website, click on [_Get HiveMQ_](/downloads/) button.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 11.jpg" width="75%" />

Now, I’m going to use an Amazon Machine Image, or AMI in short, which will provide us with the information required to launch a virtual machine on an AWS EC2 instance.

Click on _HiveMQ AMI for AWS_.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 12.jpg" width="75%" />

Select a region where you want to deploy the HiveMQ MQTT Broker instance. For demonstration, I have selected US East 1 (North Virginia).

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 13.jpg" width="75%" />

When you select the AWS region, it will take you to the page for launching an EC2 instance on AWS.

First, I’ll give my deployment a name. I’ll call it _My HiveMQ MQTT Server_

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 14.jpg" width="75%" />

When I scroll down, you can see that I’ve got an Amazon Machine Image for HiveMQ version 4.8.3 prepopulated for me.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 15.jpg" width="75%" />

Scroll down to the _Instance Type_ section. Under instance type, select **m5.xlarge**, which provides us with 4 CPUs and 16GB of memory in order for us to fullfill the minimum requirements for a HiveMQ broker.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 16.jpg" width="75%" />

Next, create a Key pair here in order for securely connecting the instance. Click on _Create New Key Pair_.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 17.jpg" width="75%" />

I’ll call it **MyHiveMQDemoInstance**.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 18.jpg" width="75%" />

Select _RSA_ Encryption. Because I’ll be using PuTTy to connect to my instance, I’ll select .ppk under the Private key file format.

I’ll then click on the create key pair button. And, when I do that, it downloads a .ppk file onto my computer. We can now move on to _Network Settings_. Because we want to configure some custom settings here, I’ll click on Edit.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 19.jpg" width="75%" />

I’ll leave these settings at the top as default.

And then give my security configuration a name, I’ll call it _hivemq-demo-instance-security-config_.

Give it a description. Allow MQTT client and SSH access.

Click on Add security group rule. Make sure Custom TCP is selected, and then put 1883 under port range in order to expose the port so that my HiveMQ Instance is accessible to MQTT Clients.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 20.jpg" width="75%" />

Because I want my HiveMQ Instance to be accessible from anywhere on the internet, I’ll select Anywhere under source type.

I’ll add another security group. This one is for allowing access to my HiveMQ Control Center at port 8080.

Note that for the control center, I want it to be accessible only from my IP address.

I want SSH access to my machine. So, I add a security group for accessing port 22. Note that I want this to be accessible only from my IP address.

So, I’ve added three security rules. Now, let’s move on to the Configure storage section.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 21.jpg" width="75%" />

The minimum recommended amount of storage for HiveMQ Broker is 20GB, so I’ll leave that as default.

Finally, we move on to the summary section. Here, you can change the number of instances. But for the use case here, one instance would be enough.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 22.jpg" width="75%" />

Click on _Launch Instance_.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 23.jpg" width="75%" />

The deployment is complete. You can now see under EC2 Instances that I have _My HiveMQ MQTT Server_ running.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 24.jpg" width="75%" />

Click into the instance and find the url address of the HiveMQ MQTT broker instance.

Copy the URL, and use it to access the HiveMQ Control Center to confirm that the MQTT broker is up and running.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 25.jpg" width="75%" />

When you have accessed and logged into the HiveMQ Control Center, this means that the HiveMQ MQTT broker has been successfully deployed on AWS EC2 instance.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 26.jpg" width="75%" />

### Installing IoT Bridge for Sitewise

Next, I’m going to show you how to install the IoT Bridge for Sitewise application.

Now, IoT Bridge for Sitewise is an Amazon Machine Image product that we need to deploy on an AWS EC2 virtual machine.

Because I’ll need to remotely access the terminal of that virtual machine via SSH, I’ll need to begin by creating an AWS EC2 key pair, which will allow me to securely access the virtual machine terminal.

To do that, Go to my EC2 dashboard. Under network and Security, select key Pairs.

Click on the _Create Key Pair_ button.

I’ll give my Key Pair a name. I’ll call it _MyIoTBridgeInstance._

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 27.jpg" width="75%" />

Select RSA for key pair type.

Under Private key file format, select .ppk since you need to use PuTTy to access the terminal.

Add a Tag to identify the Instance.

For key, use Owner, and for the value, use HiveMQIoTBridgeDemo

Click on Create key pair. A private key file is automatically downloaded onto the computer. Save it in a safe place for future use.

Install my IoT Bridge for Sitewise Software once you’ve created the Key Pair.

The first step is to browse to the Amazon Marketplace using this url: [https://aws.amazon.com/marketplace.](https://aws.amazon.com/marketplace)

On the Amazon Marketplace web page, type IoT Bridge for Sitewise and press Enter.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 28.jpg" width="75%" />

Click on _IoT Bridge_ by Cirrus Link.

Click on the _Continue to Subscribe_ button.

Click on the _Continue to Configuration_ button.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 29.jpg" width="75%" />

On this page, begin by choosing a delivery method. Select _CloudFormation Template_ from the drop-down options.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 30.jpg" width="75%" />

This sets up some defaults, including a field for the _Cirrus Link IoT Bridge for AWS Sitewise Template_, software version, and the region.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 31.jpg" width="75%" />

For the region, make sure that you deploy my IoT Bridge for Sitewise on the same region as my IoT Sitewise platform.

Click on the _Continue to Launch_ button.

This brings up a review page.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 32.jpg" width="75%" />

Scroll down, and under _Choose Action_, select _Launch_ Cloud Formation.

Click on _Launch_.

This brings up the CloudFormation stack creation page, which is prepopulated with the required template.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 33.jpg" width="75%" />

Click on _Next_. This brings up the stack configuration page.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 34.jpg" width="75%" />

Here, you need to set the Stack Name, which I have set it as IoT-Bridge-AWS-Sitewise.

Under the Instance type, leave it as default.

Under KeyName, select the Key Pair that you created for this instance.

And then for SSH location, make it accessible from anywhere on the internet for now, by putting this IP address.

Click on _Next_. This brings up the Configure stack options page.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 35.jpg" width="75%" />

Ensure the Roll back all stack resources option is selected in case there is a failure in deployment.

Click on _Next_. This brings up a review page.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 36.jpg" width="75%" />

Accept the IAM changes that the IoT Bridge Cloud Formation deployment makes to your AWS account. Click on the _Create stack_ button.

The deployment should take a few minutes to complete.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 37.jpg" width="75%" />

When the deployment is complete, move on to the next step.

### Configuring IoT Bridge for Sitewise

The next step is to configure my IoT Bridge for Sitewise application.

In order to do that, you need to access the EC2 instance.

Use PuTTy and get the public IP address of my Instance.

Go to my EC2 dashboard and select Instances.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 38.jpg" width="75%" />

Click into my IoT Bridge Sitewise Instance.

Here, you can copy the public IP address.

Because IoT Bridge for Sitewise uses Ubuntu image, my instance username is ubuntu.

Now that you have this information, start PuTTy.

Enter my instance username and public DNS name of the instance in the hostname field using this format.

ubuntu@ipaddress

I’ll ensure that my port value is 22.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 39.jpg" width="75%" />

Under connection, I’ll expand SSH. Choose Auth.

Click on _Browse_, navigate to my .ppk file that was downloaded when creating my EC2 Key Pair.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 40.jpg" width="75%" />

Click on _Open_.

Save the session information for future use. Go to Session, and enter a session name under Saved Sessions. Click on Save.

Proceed by selecting Open.

Now that you’ve gained access to the virtual machine via PuTTy, configure the IoT Bridge for Sitewise application.

IoT bridge for Sitewise is configured with a configuration file called _ibas.properties_

Navigate to the file using the following path: `/opt/ib/conf/ibas.properties`

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 41.jpg" width="75%" />

Once the file is open, configure the various options in the file.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 42.jpg" width="75%" />

The first option is a friendly name for our IoT Bridge instance. I will omit it to have a default name assigned to it, which is IBAS-ec2-instance-id

```
# The IBAS is a instance friendly name. If ommitted, it will become 'IBAS-ec2-instance-id'
#ibas_instance_name =
```
The second option is the region in which my target Sitewise platform is located. Which is us-east-1, North Virginia in my case.

```
# The AWS region the target SiteWise instance is in - if commented out, the region 
will default to the region the IoT Bridge for AWS EC2 instance is in
#aws_sitewise_region = us-east-1
```

The next option is the MQTT Server URL and port number. So here I’ll enter details of my HiveMQ Broker that I deployed on AWS

```
# The MQTT Server URL
mqtt_server_url = ssl://REPLACE_WITH_MQTT_SERVER_ENDPOINT:8883
```
Then under The MQTT Server name, I’ll enter My HiveMQ MQTT Server
```
# The MQTT Server name
mqtt_server_name = My MQTT Server
```
No username and password, but if you are using security on your broker, which you should, you can enter the details here.
```
# The MQTT username (if required by the MQTT Server)
#mqtt_username =
# The MQTT password (if required by the MQTT Server)
#mqtt_password =
```
I’ll leave the rest of the options as default.

There are also options for configuring your asset model creation, I’ll leave those as default too.

So, I’ve finished configuring my IoT Bridge for Sitewise to point it to my MQTT broker on one end , and my IoT Sitewise platform on the other end.

Now, restart my application using the following command:

```
sudo /etc/init.d/ibas restart
```
<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 43.jpg" width="75%" />

### Configuring Hardware

The next thing that I’m going to do is to show you how my hardware is configured.

I have a Groov RIO remote IO device.

Connected to Channel 0 of it IO interface is a temperature sensor, representing the temperature of a Wind Turbine system.

On Channel 1, I have a 0 to 10 volt signal transmitter representing the Speed of Wind Turbine rotation in RPM.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 44.jpg" width="75%" />

The Groov RIO is exposing these values using its embedded OPC UA server.

Read these values and mapping them onto an instance based on a Wind Turbine model that you will create on Ignition and publish the model and its instance as Sparkplug messages to IoT Sitewise.

Before we go on, let’s quickly go to the Groov RIO web interface to see the data points.

Under IO Channels, here, you can see temperature and Turbine RPM.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 45.jpg" width="75%" />

I’ve scaled my 0 to 10v signal to represent 0-20000 RPMs. And if I turn it down you can see it change.

Next, go to Data Service.

This is where my OPC UA Configuration is done.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 46.jpg" width="75%" />

Move on to the next step, which is configuring my Ignition and MQTT Transmission modules.

### Configuring Ignition and MQTT Transmission

Now that the edge device is configured and exposing the data that I need, my IoT Bridge is configured and ready to receive data. You need to get data flowing into IoT Bridge for Sitewise by setting up Inductive Automation's Ignition platform along with the MQTT Transmission module from Cirrus Link.

I already have Ignition installed on my computer, and I’m logged into the Ignition web interface.

Go to OPC Connections, check if you have a connection to the Groov RIO OPC UA Server.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 47.jpg" width="75%" />

And if I launch my OPC Client, you can see that we are indeed accessing Temperature and Turbine Speed variables from my Groov RIO.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 48.jpg" width="75%" />

To proceed, I’ll launch my Ignition Designer software.

Once it is launched, I’ll expand my MQTT Tags from the Transmission module, under my Tag browser, and delete the automatically created example tags.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 49.jpg" width="75%" />

Click on the UDT definitions tab.

Click on the _plus_ sign here, and select New Data Type.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 50.jpg" width="75%" />

This opens a dialog box, and I can give my UDT a name.

Here, we are essentially creating a Model as I want to create a model for a Wind Turbine.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 51.jpg" width="75%" />

I’ll call my UDT WindTurbine.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 52.jpg" width="75%" />

Use this New member tag button to add metrics to my UDT, which are essentially properties of my Wind Turbine model.

Click on the button and select _OPC Tag_.

Set the name of the tag to Temperature, which is the first property.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 53.jpg" width="75%" />

Set its Data Type to Float and the Engineering Units to Celcius

Add another tag to the UDT.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 54.jpg" width="75%" />

And this time, I’ll call it TurbineSpeed.

I’ll set its data type to Integer.

And Engineering Units to RPM

So, that’s my UDT representing a basic Wind Turbine model.

Now, when that is done I’ll switch back to the Tags tab.

And under PLC1, right click and select Add New Tag->Data Type Instance->WindTurbine.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 55.jpg" width="75%" />

Here, I am creating an instance of a Wind Turbine using the UDT or Wind Turbine model that I just created. So I can call this WindTurbine1.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 56.jpg" width="75%" />

Apply and click OK.

The next thing that I need to do is to map values from my downstream device. In this case my Groov RIO OPC UA Server data points to my WindTurbine instance.

Here you can see the power of being able to group together discrete data points from multiple sources into one meaningful object, and publishing it as a Sparkplug message.

On my instance, I can go into each property and specify where I need to ge the value to map onto the property.

I’ll click on the Temperature property, and select OPC under Value Source.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 57.jpg" width="75%" />

Under OPC item path, specify the path of my data source, which is the GROOV RIO OPC UA Server.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 58.jpg" width="75%" />

I’ll do the same for Turbine Speed.

When that is done, you can see the values of Temperature and Turbine Speed for our instance.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 59.jpg" width="75%" />

If I was to create a second Wind Turbine instance, say, Wind Turbine 2. I’d use the same UDT or Wind Turbine model to create an instance and then point to a different data source for mapping to its properties.

So, I’ve successfully defined and configured my UDT, which will map to a Sitewise Asset Model, and I’ve also created a UDT Instance which will map to Sitewise Assets.

To start publishing this information as Sparkplug messages, I need to configure my MQTT Transmission module to point to my HiveMQ MQTT Broker on AWS.

### Publishing Sparkplug-based MQTT data to IoT Sitewise

To configure the MQTT Transmission module with HiveMQ MQTT Broker details, go back to the Ignition Gateway web UI.

Under Config, go to _MQTT Transmission_, and go to _Settings_.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 60.jpg" width="75%" />

Select Transmitters.

Click on EDIT under Example Transmitter.

Scroll down.

Make sure that Convert UDTs is unchecked and ensure Publish UDT definitions in Birth is checked.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 61.jpg" width="75%" />

Select the Servers tab, and go to settings.

This is where you need to put the HiveMQ MQTT Broker details.

Delete the existing Chariot SCADA server.

Create a new one.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 62.jpg" width="75%" />

I’ll call it My HiveMQ MQTT Server

And then I’ll enter the url of my HiveMQ broker.

Save this information.

Check to see if the connection to the broker was sucessful.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 63.jpg" width="75%" />

Okay, so what this means is that, my Wind Turbine data should be flowing into AWS Sitewise.

To find out, go to my AWS Console.

Select _IoT Sitewise_.

Click on Models. Note that you now have a Wind Turbine Asset Model in Sitewise that corresponds to the Wind Turbine UDT definition that I created in Ignition.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 64.jpg" width="75%" /> 

Click into it.

When you go under Measurement definitions, you can see the two properties – Temperature and Turbine Speed.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 65.jpg" width="75%" /> 

Navigate to _Assets_.

And you can see that I have my Wind Turbine instance, Wind Turbine 1, associated with the UDT instance that I created in Ignition.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 66.jpg" width="75%" /> 

I’ll click into it.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 67.jpg" width="75%" /> 

Go to Measurements, and make a note of the values of the tags.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 68.jpg" width="75%" />

Adjust the turbine Speed you can see the value change.

<img src="/img/blog/real_world_mqtt_for_industry_40_mqtt_sparkplug_to_aws-iot_sitewise_integration/mqtt_sparkplug_to_aws_iot_sitewise_integration_img 69.jpg" width="75%" />

Integrate MQTT Sparkplug data published from the Edge with AWS Iot Sitewise platform.

### Conclusion: 

Once your data is on AWS Sitewise, you can leverage a host of other AWS services such as AWS IoT Analytics, Amazon Athena, Amazon SageMaker, and Amazon QuickSight, to perform analytics and build machine learning (ML) models.

You can also augment your equipment data with other data sources in your data lake such as from ERPs to get even richer insights that enable you to optimize your maintenance and operations activities.

You can also watch the video guide I created on integration industrial data with AWS IoT Sitewise and MQTT Sparkplug below:

<div class="iframe-video-wrapper">
<iframe src="https://www.youtube.com/embed/D17nCKg7kZg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

