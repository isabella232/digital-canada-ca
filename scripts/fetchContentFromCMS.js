const fetch = require('node-fetch');
fs = require('fs');

var langs = ["en","fr"]
for (l in langs) {
	let lang = langs[l]
	fetch("https://cds-website-cms-test.herokuapp.com/blog-" + lang + "s")
		.then(response => response.json())
		.then(
			data => {
				for (p in data) {
					let post = data[p]
					//console.log(post)
					let out = "";
					out += "---\n"
					out += "title: " + post.Title + "\n"
					out += "description: " + post.Description + "\n"
					out += "author: '" + post.AuthorAndTitle + "'\n"
					out += "date: '" + post.PublishDate + "'\n"
					out += "image: " + post.BannerImage.url + "\n"
					out += "image-alt: " + post.ImageAltText + "\n"
					out += "thumb: " + post.BannerImage.formats.small.url + "\n"
					out += "translationKey: " + post.TranslationID + "\n"
					out += "---\n"
					out += post.Body + "\n"
					//console.log(out)
					let slug = ""
					let fields = post.Title.split(" ")
					for (i in fields) {
						slug += fields[i].toLowerCase();
						if (i < fields.length - 1) {
							slug += "-"
						}
					}
					//console.log(slug)
					fs.writeFile("content/" + lang + "/blog/posts/" + slug + ".md", out, err => {
						if (err) {
							console.error(err)
							return
						}
					})
				}
			}
		)
}