initSelection("donation-frequency");
initSelection("donation-amount");

function initSelection(elementName) {
    function removeActiveClass(elements) {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            element.classList.remove("active");
        }
    }

    const elements = document.getElementsByClassName(elementName);

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        element.addEventListener('click', (event) => {
            event.preventDefault();

            removeActiveClass(element.parentElement.getElementsByClassName(elementName));

            element.classList.add("active");
        });
    }
}