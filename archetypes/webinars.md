+++
title= "{{ replace .Name "-" " " | title }}"
date= {{ .Date }}
draft= true
headerClass = "header-img-hidden"
announcement = "Upcoming Webinar" #upcoming or on-demand webinar
webinarh1 = "" #Replace with h1
webinarh2 = "" #Optional h2
webinardate = "" #Replace with date
webinartime = "" #Replace with time and remove after the webinar has taken place
speaker1 = ""
speaker2 = ""
speaker3 = ""
speaker4 = ""
custom_summary = "insert summary"
custom_css = "css/webinar.css"
meta_description= "insert meta description"
ogtitle = "HiveMQ Webinar: {{ replace .Name "-" " " | title }}"
ogimage = "https://www.hivemq.com/img/webinar-header-bg-og.jpg" 
ogdescription = "insert description for Social Media"
url = "/webinars/{{ lower .Name }}"
+++

<section class="webinar-section">
{{% webinar-abstract
speaker1=""
speaker1-portrait="author-is.jpg" 
speaker1-bio=""
speaker1mail=""
speaker1linked=""
speaker2=""
speaker2-portrait=""
speaker2-bio=""
speaker2mail=""
speaker2linkedin=""
speaker3=""
speaker3-portrait=""
speaker3-bio=""
speaker3mail=""
speaker3linkedin=""
speaker4=""
speaker4-portrait=""
speaker4-bio=""
speaker4mail=""
speaker4linkedin=""
speaker5-portrait=""
speaker5-bio=""
speaker5mail=""
speaker5linkedin=""
%}}

<!-- YouTube iframe ** TODO ** When you copy the iframe from youTube, remove parameters "width" and "height" -->
<div class="iframe-video-wrapper">
<iframe src="https://www.youtube.com/embed/wophkv7PaFw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

** INSERT ABSTRACT HERE - You can use Markdown for formatting **

{{% /webinar-abstract %}}

<!-- #TODO: Forms available? After the webinar change headline to "Download Slides". Delete Line 55-59 -->

{{< webinar-aside headline="Register now" formid="9dace695-a9cb-456c-8819-6e22b6bc6f9e" >}}

<!-- #TODO: No forms available? Use this shortcode and delete the one in line 53 -->

{{< webinar-aside-formless headline="Ask Me Anything" >}}
This was a live Q&A session without slides, where everyone could ask their questions about MQTT and get an answer from our experts. Watch out for our monthly "Ask me Anything" sessions.
{{< webinar-aside-formless >}}

</section>