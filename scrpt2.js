function getProfiles() {
    return JSON.parse(localStorage.getItem("profiles")) || [];
}

function saveProfiles(profiles) {
    localStorage.setItem("profiles", JSON.stringify(profiles));
}

/* READ */
if (document.getElementById("profileList")) {
    let profiles = getProfiles();
    let list = document.getElementById("profileList");

    profiles.forEach(p => {
        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${p.name}</strong> - ${p.headline}<br>
            <a href="edit.html?id=${p.id}">Edit</a> |
            <a href="delete.html?id=${p.id}">Delete</a>
        `;
        list.appendChild(li);
    });
}

/* CREATE */
if (document.getElementById("addForm")) {
    document.getElementById("addForm").addEventListener("submit", function(e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let headline = document.getElementById("headline").value.trim();
        let summary = document.getElementById("summary").value.trim();

        if (name === "" || headline === "" || summary === "") {
            document.getElementById("error").innerText = "All fields are required";
            return;
        }

        let profiles = getProfiles();
        profiles.push({
            id: Date.now(),
            name,
            headline,
            summary
        });

        saveProfiles(profiles);
        window.location.href = "index.html";
    });
}

/* UPDATE */
if (document.getElementById("editForm")) {
    let params = new URLSearchParams(window.location.search);
    let id = parseInt(params.get("id"));

    let profiles = getProfiles();
    let profile = profiles.find(p => p.id === id);

    if (profile) {
        document.getElementById("name").value = profile.name;
        document.getElementById("headline").value = profile.headline;
        document.getElementById("summary").value = profile.summary;
    }

    document.getElementById("editForm").addEventListener("submit", function(e) {
        e.preventDefault();

        if (
            document.getElementById("name").value.trim() === "" ||
            document.getElementById("headline").value.trim() === "" ||
            document.getElementById("summary").value.trim() === ""
        ) {
            document.getElementById("error").innerText = "All fields are required";
            return;
        }

        profile.name = document.getElementById("name").value;
        profile.headline = document.getElementById("headline").value;
        profile.summary = document.getElementById("summary").value;

        saveProfiles(profiles);
        window.location.href = "index.html";
    });
}

/* DELETE */
if (document.getElementById("deleteBtn")) {
    let params = new URLSearchParams(window.location.search);
    let id = parseInt(params.get("id"));

    document.getElementById("deleteBtn").addEventListener("click", function() {
        let profiles = getProfiles().filter(p => p.id !== id);
        saveProfiles(profiles);
        window.location.href = "index.html";
    });
}
