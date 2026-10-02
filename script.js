const resourceForm = document.getElementById("resourceForm");

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const linkInput = document.getElementById("link");

const searchInput = document.getElementById("searchinput");
const categoryFilter = document.getElementById("categoryFilter");

const resourceSection = document.createElement("section");

resourceSection.className = "resource-section";

const addSection = document.querySelector(".add-section");

document.body.insertBefore(resourceSection, addSection);

resourceSection.style.display = "grid";
resourceSection.style.gridTemplateColumns = "repeat(2, 1fr)";
resourceSection.style.gap = "20px";
resourceSection.style.margin = "30px 0";

let resources = [
    {
        id: 1,
        title: "MDN Web Docs",
        description: "Learn HTML, CSS and JavaScript with comprehensive documentation.",
        category: "Web Dev",
        link: "https://developer.mozilla.org/"
    },
    {
        id: 2,
        title: "React",
        description: "A JavaScript library for building user interfaces.",
        category: "Web Dev",
        link: "https://react.dev/"
    },
    {
        id: 3,
        title: "Flutter",
        description: "Framework for building beautiful mobile applications.",
        category: "App Dev",
        link: "https://flutter.dev/"
    },
    {
        id: 4,
        title: "TensorFlow",
        description: "Open source library for machine learning and AI.",
        category: "AI/ML",
        link: "https://www.tensorflow.org/"
    },
    {
        id: 5,
        title: "GitHub",
        description: "Platform for storing and managing code.",
        category: "Tools",
        link: "https://github.com/"
    },
    {
        id: 6,
        title: "W3Schools",
        description: "Learn web development with easy tutorials and examples.",
        category: "Web Dev",
        link: "https://www.w3schools.com/"
    }
];

function displayResources() {
    resourceSection.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredResources = resources.filter(function(resource) {
        const searchMatch =
            resource.title.toLowerCase().includes(searchText) ||
            resource.description.toLowerCase().includes(searchText);

        const categoryMatch =
            selectedCategory === "All" ||
            resource.category === selectedCategory;

        return searchMatch && categoryMatch;
    });

    filteredResources.forEach(function(resource) {
        const card = document.createElement("div");

        card.className = "resource-card";

        card.style.backgroundColor = "white";
        card.style.padding = "20px";
        card.style.borderRadius = "10px";
        card.style.border = "1px solid #ddd";
        card.style.boxSizing = "border-box";

        card.innerHTML = `
            <h2>${resource.title}</h2>

            <p>${resource.description}</p>

            <p>
                <b>Category:</b> ${resource.category}
            </p>

            <a
                href="${resource.link}"
                target="_blank"
                style="
                    display: inline-block;
                    background-color: blue;
                    color: white;
                    text-align: center;
                    padding: 10px 15px;
                    border-radius: 6px;
                    text-decoration: none;
                    margin-right: 8px; " >
                Visit Resource
            </a>

            <button
                onclick="deleteResource(${resource.id})"
                style="
                    background-color: red;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 6px;
                    cursor: pointer;" >
                Delete
            </button>`;

        resourceSection.appendChild(card);
    });
}

resourceForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newResource = {
        id: Date.now(),
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        category: categoryInput.value,
        link: linkInput.value.trim()
    };

    resources.push(newResource);

    resourceForm.reset();

    displayResources();
});

function deleteResource(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this resource?"
    );

    if (confirmDelete) {
        resources = resources.filter(function(resource) {
            return resource.id !== id;
        });

        displayResources();
    }
}

searchInput.addEventListener("input", function() {
    displayResources();
});

categoryFilter.addEventListener("change", function() {
    displayResources();
});

displayResources();