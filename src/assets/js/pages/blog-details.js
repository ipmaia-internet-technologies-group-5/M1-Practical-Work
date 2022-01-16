// Creating a XML Obj Parser instance
const xotree = new XML.ObjTree();
// Converting a blog.xml from xml to js object
const blogContent = xotree.parseXML(read_from_file_sync("http://localhost/savetheforest/src/xml/blog/blog.xml "));

const blogId = findGetParameter("blog_id");
if (blogId == null) {
    location.href = 'http://localhost/savetheforest/src/blog.html';
    redirectToBlog();
}

const currentNotice = getNoticeById(blogId);

if (currentNotice == null) {
    redirectToBlog();
}

document.getElementById("blog_image").src = "http://localhost/savetheforest/src/xml/blog/images/" + currentNotice.image;
document.getElementById("blog_title").innerHTML = currentNotice.title;
document.getElementById("blog_description").innerHTML = currentNotice.description;
document.getElementById("blog_publisher").innerHTML = currentNotice.publisher;
document.getElementById("blog_date").innerHTML = currentNotice.date;

prepareCategories();
prepareRecentPosts();

function getNoticeById(id) {
    let blogNotices = blogContent.catalog.notice;

    for (let i = 0; i < blogNotices.length; i++) {
        const target = blogNotices[i];

        if (target.id == id) {
            return target;
        }
    }
}

function redirectToBlog() {
    location.href = 'http://localhost/savetheforest/src/blog.html';
}

function prepareCategories() {
    const categoriesElement = document.getElementById("blog-categories");

    const categories = new Map(); // <categoryName | amount of notices>

    categories.set("All", 0); // Adding the default category

    const notices = blogContent.catalog.notice;
    for (var i = 0; i < notices.length; i++) {
        const notice = notices[i];
        const categoryName = notice.category;

        let cachedValue = categories.get(categoryName);
        if (cachedValue == undefined) {
            cachedValue = 0;
        }

        categories.set(notice.category, ++cachedValue);
    }

    categories.forEach((quantity, categoryName) => {
                const htmlElement = htmlToElement(`<li>
                                <a href="blog.html?category=${categoryName}" class="d-flex">
                                    <p>${categoryName} ${quantity == 0 ? "" : `(${quantity})`}</p>
                                </a>
                            </li>`);

                categoriesElement.appendChild(htmlElement);
            });
        }



        function fetchNewestBlogNotices() {
            function compareDates(a, b) {
                if (a == b) return 0;

                return convertToDate(a.date) > convertToDate(b.date) ? -1 : 1;
            }

            let notices = blogContent.catalog.notice;

            // Making sure that this current notice will not show on the recent posts
            notices = notices.filter((n) => n.id != currentNotice.id);

            return notices.sort(compareDates).slice(0, 4); // Get only 4 notices
        }

        function prepareRecentPosts() {
            const recentPostsElement = document.getElementById("recent_posts");

            const newestNotices = fetchNewestBlogNotices();

            for (let i = 0;i < newestNotices.length; i++) {
                const notice = newestNotices[i];

                const htmlElement = htmlToElement(`<div class="media post_item">
                                    <img src="http://localhost/savetheforest/src/xml/blog/images/${notice.image}" alt="post">
                                    <div class="media-body">
                                        <a href="?blog_id=${notice.id}">
                                            <h3>${notice.title}</h3>
                                        </a>
                                        <p>${notice.date}</p>
                                    </div>
                                </div>`);

                recentPostsElement.appendChild(htmlElement);
            }
        }