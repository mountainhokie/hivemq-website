# HiveMQ Website

The HiveMQ Website is built with a static site generator called [Hugo](https://gohugo.io/).

After checking out this repository and [set up git-lfs](#git-lfs), you can work on the website in two ways:

1. Run through docker (quick setup if you have docker installed already, slower during development): `./start`
2. Setup and run dependencies manually (needs all dependencies installed on the local machine, faster during development): `./start-dev`

## Take Home Test

### Files Updated

- themes/beeswarm/assets/css/blog.css
- themes/beeswarm/layouts/article/single.html
- themes/beeswarm/layouts/partials/header.html
- themes/beeswarm/static/js/toc.js

### Notes for Take Home Test

- The Article Template made use of the "Inter" font and that has been included from Google Fonts.
- At the mobile breakpoint of 768px and below I have the Table of Contents above the article since there is no real room to flow around the content nor a mobile template to give an alternate location.
- I commented out the Social Media Sidebar since it was not in the Figma Article Template
- I had a lowercase c in "Table of contents" to match the Figma file
- Tested on the latest versions of Chrome, Edge, Firefox, and Safari
- A smooth scroll script was added for the anchor links.

## Git LFS

This git repository contains large files, for this GIT LFS (https://git-lfs.github.com) is used, to install and setup GIT LFS run:

<code>$ brew install git-lfs</code>

From inside the project folder run once, to setup GIT LFS for this repository:

<code>$ git lfs install</code>

If you already have a local version of the repo, you can run the following command to update all large files.

<code>$ git lfs pull</code>

All these commands only need to be run once for the repository.

## Instructions

After downloading this Git repo, you can run Hugo from your terminal. Go to the folder with your cloned repo. The most important commands you need for hugo are

### Starting a local server

Run either `./start` or `./start all` if you want to use the Docker setup.

You can use locally installed dependencies by using `./start-dev` or `./start-dev all`.

If you have Homebrew installed and a dependency is missing, the `start-dev` script should prompt you whether you want to install it. The script can currently not select specific versions, so it will echo a warning if the dependencies installed do not match the ones that are expected.

Both scripts to start the development server accept `all` as an argument, if you want to work on draft and future content as well.

The site can be viewed with live reload on http://localhost:1313

#### Under the hood

The complete site will be generated through the static site generator [Hugo](https://gohugo.io/) and built into a folder called `public`.

We're using [TailwindCSS](https://tailwindcss.com/) to use utility CSS classes. It will automatically run and compile when using the development (= `./start*`) scripts.

For deployment, [Netlify](https://www.netlify.com/) is used. After a pull request is done, Netlify will create a deployment preview you can use to test the built version.

# How to create a new blog post

The best way to create a new blog post is having it created by Hugo. This guarantees the latest blog post archetype is used. To create a blog post, type

`hugo new blog/individual-blog-name.md`

By creating it within `blog/`, Hugo recognizes that the _blog_ archetype is required for this file.

After duplicating a .md file, change the frontmatter. It contains everything, that belongs in the pages header.

- **title:** Pick a title with max. 65 characters. This will automatically be the headline for the box on the overview page [hivemq.com/blog](https://www.hivemq.com/blog)

- **date:** The date defines the point in time for publishing the blog post. If this date lies in the future, the blog post is not visible on the built website. If someone needs to review it on the dev server, the publish date needs to be in the past. The date also defines the order in which the posts are sorted on the blog list.
- **draft:** As long as it´s set to _true_ the post will not be published. You can see it on your local Hugo server, when you add `-D`after the Hugo command: `hugo server -D`. But it won´t appear on the dev or live server
- **authors:** Add the keys of the author(s) as an array, for example `["shashank-sharma", "andrej-schujkow"]` - check [Blog author below](#blog-author) for additional information
- **poster:** Create a 1280 x 350px image and save it to "/img/blog/header-your-filename.jpg"
- **tags:** Define the blog´s category. Common categories that were used in the past, were _HiveMQ_, _MQTT_, _HiveMQ Release_. If more than one category is needed, use a arrays `["MQTT", "Security", "IoT"]`
- **custom-css:** Must be `css/blog.css`. Don't change this.
- **special_link01** Optional Link to an internal page relevant to your blog posts topic. It has to be defined as an array with two values: URL and title. If your blog post does not have relevant internal pages, just leave quotation marks with nothing in between: `""`
  Example `["/target-url/always-with-a-trailing-slash/", "Link Title"]`
- **special_link02** Second optional link.
- **special_link03** Third optional link.
- **custom_summary:** A description what the blog post is about max. 200 character. This is the description for the overview page.
- **meta-description:** This is the Meta Tag for search engines. Google displays max. 155 characters. The ideal length is 120 - 250 characters.
- **ogtitle:** Open graph title for social media
- **ogimage:** Open graph featured image for social media. For Linkedin:
  - Max file size: 5 MB
  - Minimum image dimensions: 1200 (w) x 627 (h) pixels
  - Recommended ratio: 1.91:1
- **ogdescription:** Open graph description for social media
- **url:** Change to an individual URL, or leave it blank, to use the filename (without _.md_) as URL.

## Blog author

To add author details to a blog post, follow the instructions below:

**Include the authors key in the frontmatter of the post to specify the author(s).**

Use the following format:

- For a single author: `authors = ["ravi-subramanyan"]`
- For multiple authors: `authors = ["andrej-schujkow", "stefan-frehse"]`

The author's name should correspond to the filename, which can be found in [data/authors](data/authors), without the `.json` extension. For example, if the author's JSON file is named `ravi-subramanyan.json`, use `"ravi-subramanyan"` as the author name.

_Note: The keys author and authorpic are no longer required._

**To create a new author, follow these steps:**

- Create a JSON file using the suggested JSON schema provided below.

```
{
    "name": {
        "firstName": "",
        "lastName": ""
    },
    "image": "/img/blog/author-.jpg",
    "description": "Co-founder and CTO at HiveMQ.",
    "links": {
        "email": "@hivemq.com",
        "twitter": "https://twitter.com/",
        "linkedin": "https://de.linkedin.com/in/",
        "github": "https://github.com",
        "website": "https://mywebsite.com"
    },
    "isGuestAuthor": "true"
}
```

- Customize the JSON file with the author's details, including their first name, last name, image path, description (required), and optional links.
- Place the JSON file in the [data/authors](data/authors) directory.

**If you need to create a new layout or update an existing one, follow these steps:**

- To add an authorbox, include `{{ partial "authorbox.html" . }}` in the layout file.

![Authorbox screenshot](https://github.com/hivemq/hivemq-website/assets/64638000/7465a4a7-4fb8-4c55-a0e0-3d8e578f6c85)

- To add an info box, include `{{ partial "post-infobox-top.html" . }}` in the layout file.

![Infobox screenshot](https://github.com/hivemq/hivemq-website/assets/64638000/1300bd4e-1d9c-44a3-8758-c74d686cd0d8)

## How to format

Content for hugo pages is written in markdown. A thorough documentation of markdown shortcodes can be found
<a href="https://github.github.com/gfm/">here</a>

## Preformatted Code

The styles for preformatted code we used in WordPress are no longer available. The common boxes that were rendered by the plugin _Crayons_ are now replaced by a built in Hugo template called _Chroma_. The syntax for "Chroma" is following:

**For a single word or short expression** Use Markdown formatting Shift+Apostroph

```
`ShortExpression`
```

**HTML Tags** can also be used for a single line, word or expression

```
<code>Expression</code>, <pre>Single line of code<pre>
```

**For more than one line of code** the _Chroma_ styles should be used

```
{{< highlight xml "linenos=table" >}}

Write your code in between opening and closing tag line

{{< /highlight >}}
```

The argument behind _highlight_ indicates the language displayed. But it only changes color, no syntax check is processed. The argument _"linenos=table"_ toggles line numbers on.

When the lines of code exceed the maximum width of the page, a horizontal scrollbar is displayed automatically. When using HTML tags no scrollbar will be displayed.

## Links

### Internal links

All internal links should be relative and not absolute. And they should have a trailing slash. For example:

This URL is bad, because it´s absolute and the trailing slash is missing `[Download HivemQ](https://www.hivemq.com/download)`
And this is how it should look like: `[Download HivemQ](/download/)`

### External links

For external links it´s usually advisable those are opened in a new browser tab. We don´t want the user to definitively leave HiveMQ. Use this shortcode

{{< targetlink "link description appearing on the page" "http://url.com" "_blank" "title" >}}

## Add a customer logo to customer page

First of all: make sure we have the allowance to use the logo. If yes, resize it proportianally to 400x300 px and save it preferably as GIF. Then add the filename to the list in _data/customers.toml_. You can add it anywhere in the list, when building the HTML files HUGO will sort the logos by Alphabet.

# How to create a blog post announcing HiveMQ updates

The easiest way is to duplicate an existing release blog post and update it´s content. Don´t forget to update `content/changelog.md`.

## Terminology and headers

For HiveMQ there are three defined types of releases with according header-images.

### 1. Version Update

For maintenance and bugfix Releases like HiveMQ 4.2.**1**

In Frontmatter set poster to

`poster= "/img/blog/header-version-update-hivemq.jpg"`

![HiveMQ Version Update](https://www.hivemq.com/img/blog/header-version-update-hivemq.jpg)

### 2. Feature Release

For Feature Releases like HiveMQ 4.**2**

In Frontmatter set poster to

`poster= "/img/blog/header-feature-release-hivemq.jpg"`

![HiveMQ Feature](https://www.hivemq.com/img/blog/header-feature-release-hivemq.jpg)

### 3. Major Release

For Major Releases like HiveMQ **4**

In Frontmatter set poster to

`poster= "/img/blog/header-major-release-hivemq.jpg"`

![HiveMQ Major Release](https://www.hivemq.com/img/blog/header-major-release-hivemq.jpg)

### 4. The same schema applies to ESE and MQTT Client

ESE

`poster= "/img/blog/header-version-update-ese.jpg"`

`poster= "/img/blog/header-feature-release-ese.jpg"`

MQTT Client

`poster= "/img/blog/header-version-update-mqtt-client.jpg"`

`poster= "/img/blog/header-feature-release-mqtt-client.jpg"`

There are no header images for major releases for ESE and MQTT client at this moment.
