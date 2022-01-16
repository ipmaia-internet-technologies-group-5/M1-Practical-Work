// Creating a XML Obj Parser instance
const xotree = new XML.ObjTree();
// Converting a blog.xml from xml to js object
const blogContent = xotree.parseXML(read_from_file_sync("xml/blog/blog.xml"));

let currentCategory = findGetParameter("category");
if (currentCategory != null && currentCategory.toLowerCase() == "all") {
    currentCategory = null;
}

let blogNotices = fetchCurrentBlogNotices();

// Pagination Variables
const maxItemsPerPage = 3;
let itemsQuantity = blogNotices.length;
let maxPages = Math.ceil(itemsQuantity / maxItemsPerPage);

let currentPage = parseInt(findGetParameter("page"));
if (isNaN(currentPage)) {
    currentPage = 1;
}
// Forcing to check the boundaries
setCurrentPage(currentPage);

preparePagination(); // Preparing the pagination after showing the catalog
prepareCatalogNotices();
prepareCategories();

function setCurrentPage(newPage) {
    currentPage = newPage;
    if (currentPage > maxPages) {
        currentPage = maxPages;
    }
}

function fetchCurrentBlogNotices() {
    function compareDates(a, b) {
        if (a == b) return 0;

        return convertToDate(a.date) > convertToDate(b.date) ? -1 : 1;
    }

    let notices = blogContent.catalog.notice;

    if (currentCategory != null) {
        notices = notices.filter((n) => n.category.toLowerCase() == currentCategory.toLowerCase());
    }

    return notices.sort(compareDates);
}

function prepareCatalogNotices() {
    const catalogElement = document.getElementById("blog-catalog");

    // Removing all the elements from the catalog element before adding new ones
    while (catalogElement.lastChild) {
        catalogElement.removeChild(catalogElement.lastChild);
    }

    for (var i = (currentPage - 1) * maxItemsPerPage; i < (currentPage) * maxItemsPerPage; i++) {
        if (i >= blogNotices.length) continue;
        const notice = blogNotices[i];

        const wrappedData = convertToDate(notice.date);
        let wrappedDescription = notice.description;

        if (wrappedDescription.length > 400) {
            const shortDescription = wrappedDescription.substring(0, 400);
            wrappedDescription = shortDescription.substring(0, shortDescription.lastIndexOf(' ')) + "...";
        }

        const htmlElement = htmlToElement(`<article class="blog_item">
                                    <div class="blog_item_img">
                                        <img class="card-img rounded-0" src="xml/blog/images/${notice.image}" alt="">
                                        <a href="blog_details.html?blog_id=${notice.id}" class="blog_item_date">
                                            <h3>${wrappedData.getDate()}</h3>
                                            <p>${wrappedData.getShortMonthName()}</p>
                                        </a>
                                    </div>
                                    <div class="blog_details">
                                        <a class="d-inline-block" href="blog_details.html?blog_id=${notice.id}">
                                            <h2 class="blog-head">${notice.title}</h2>
                                        </a>
                                        <p>${wrappedDescription}</p>
                                        <ul class="blog-info-link">
                                            <li><a><i class="fa fa-user"></i> ${notice.publisher}</a></li>
                                            <li><a><i class="fa fa-calendar"></i>${notice.date}</a></li>
                                        </ul>
                                    </div>
                                </article>`);

        catalogElement.appendChild(htmlElement);
    }
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
                const htmlElement = `<li>
                                         <a href="?category=${categoryName}" class="d-flex">
                                             <p>${categoryName} ${quantity == 0 ? "" : `(${quantity})`}</p>
                                         </a>
                                     </li>`;

                categoriesElement.insertAdjacentHTML("afterbegin", htmlElement);
            });
        }

        function preparePagination() {
            function insertAfter(referenceNode, newNode) {
                referenceNode.parentNode.insertBefore(newNode, referenceNode.lastSibling);
            }

            const paginationElement = document.getElementById("blog-pagination");

            while (paginationElement.lastChild) {
                paginationElement.removeChild(paginationElement.lastChild);
            }

            const previousElement = htmlToElement(`<li class="page-item">
                                        <a href="#" class="page-link" aria-label="Previous">
                                            <i class="ti-angle-left"></i>
                                        </a>
                                    </li>`);

            previousElement.addEventListener('click', (event) => {
                event.preventDefault();

                setCurrentPage(currentPage + 1);
                updatePage();
            });

            paginationElement.appendChild(previousElement);

            for (var i = 0; i < maxPages; i++) {
                const page = i + 1;

                const itemElement = htmlToElement(`<li class="page-item ${page == currentPage ? "active" : ""}">
                                        <a class="page-link" pagination-item="${page}">${page}</a>
                                    </li>`);

                itemElement.addEventListener('click', (event) => {
                    event.preventDefault();

                    handlePaginationClick(event);
                });

                paginationElement.appendChild(itemElement);
            }

            const nextElement = htmlToElement(`<li class="page-item">
                                        <a href="#" class="page-link" aria-label="Next">
                                            <i class="ti-angle-right"></i>
                                        </a>
                                    </li>`);

            nextElement.addEventListener('click', (event) => {
                event.preventDefault();

                setCurrentPage(currentPage + 1);
                updatePage();
            });

            paginationElement.appendChild(nextElement);
        }

        function handlePaginationClick(event) {
            // Extracting the attribute from the element
            const pageAttribute = event.target.getAttribute('pagination-item');

            /* 
             * Checking if the element actually contains a page attribute 
             * (If the user clicks on the "li" element instead of clicking on the "a" element) 
             */
            if (pageAttribute == null) {
                return;
            }

            if (currentPage == pageAttribute) return;

            // Updating the current page variable
            setCurrentPage(pageAttribute);

            // Updating all notices according to the new current page
            updatePage();
        }

        function updatePage() {
            prepareCatalogNotices();
            preparePagination();

            document.getElementById("blog-categories").scrollIntoView();
        }