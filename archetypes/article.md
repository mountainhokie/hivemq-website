+++
title = "{{ replace .Name "-" " " | title }}"
headline = "Appears on top of the blog post when title and headline should not be identical. If undefined the title parameter (line2) will appear."
date = {{ .Date }}
draft = true
authors = ["hivemq-team"]
tags = ["HiveMQ"]
poster = "/img/blog/"
special_link01 = ["/target-url/internal-links-always-with-a-trailing-slash/", "Example Link Title"]
special_link02 = ["/target-url/internal-links-always-with-a-trailing-slash/", "Example Link Title"]
special_link03 = ["/target-url/internal-links-always-with-a-trailing-slash/", "Example Link Title"]
custom_css = "css/blog.css"
custom_summary = "This becomes the summary on Blog overview page."
meta_description= "Insert meta description tag for search engines. Google displays max. 155 characters"
ogtitle = "The title to appear on Linkedin and facebook"
ogimage = "https://www.hivemq.com/img/blog/featured-image-for-social-media-og.jpg"
ogdescription = "This is a description with minimum 100 characters length for LinkedIn, Facebook, and Twitter."
url= "/article/"
+++

## Start with H2 - H1 comes automatically from frontmatter

Content: Lorem ipsum
