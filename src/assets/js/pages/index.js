// Creating a XML Obj Parser instance
const xotree = new XML.ObjTree();
// Converting a blog.xml from xml to js object
const projectsContent = xotree.parseXML(read_from_file_sync("xml/projects/projects.xml"));

fetchProjects();

function fetchProjects() {
    const numberFormatter = new Intl.NumberFormat('en-IN');

    const projectsElement = document.getElementById("projects");

    const projects = projectsContent.projects.project;

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        const progressPercentage = parseInt((project.raised / project.goal) * 100);

        const htmlElement = htmlToElement(`<div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="properties pb-30">
                        <div class="properties-card">
                            <div class="properties-img">
                                <a href="#"><img src="xml/projects/images/${project.image}" alt=""></a>

                                <div class="single-skill">
                                    <div class="bar-progress">
                                        <div id="bar${project.id}" class="barfiller">
                                            <div class="tipWrap">
                                                <span class="tip"></span>
                                            </div>
                                            <span class="fill" data-percentage="${progressPercentage}"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="wrap-wrapper">
                                <div class="properties-caption">
                                    <h3><a href="#">${project.title}</a></h3>
                                    <p>${project.description}</p>
                                </div>
                                <div class="properties-footer d-flex justify-content-between align-items-center">
                                    <div class="class-day">
                                        <a href="donations.html" class="btn">Donate</a>
                                    </div>
                                    <div class="class-day">
                                        <span class="color-font2">${numberFormatter.format(project.goal)}€</span>
                                        <p>Goal</p>
                                    </div>
                                    <div class="class-day">
                                        <span class="color-font1">${numberFormatter.format(project.raised)}€</span>
                                        <p>Raised</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);

        projectsElement.appendChild(htmlElement);

        $("#bar" + project.id).barfiller();
    }
}