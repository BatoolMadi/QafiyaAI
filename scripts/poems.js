let poems = [
    {
        id: 1,
        title: "وطن",
        content: `يا موطني في القلب نبضك حاضرُ
وبحبك العمر الجميل يُسافرُ
أرضٌ بها الأحلام تنمو عزةً
وبها الكرامة والفخار يُجاهرُ`
    },
    {
        id: 2,
        title: "حب",
        content: `أحبك حبًا لو يُقاس بنبضةٍ
لصار القلب من حبك يفيضُ`
    }
];

const poemsGrid = document.getElementById("poemsGrid");
const searchInput = document.getElementById("searchInput");

function displayFavorites() {
    favoritesGrid.innerHTML = "";

    const favPoems = poems.filter(p => favorites.includes(p.id));

    if (favPoems.length === 0) {
        emptyFavorites.style.display = "block";
        return;
    }

    emptyFavorites.style.display = "none";

    favPoems.forEach(poem => {
        const card = document.createElement("div");
        card.classList.add("poem-card");

        card.innerHTML = `
            <h3>${poem.title}</h3>
            <p>${poem.content.replace(/\n/g, "<br>")}</p>
        `;

        favoritesGrid.appendChild(card);
    });
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoritesGrid = document.getElementById("favoritesGrid");
const emptyFavorites = document.getElementById("emptyFavorites");


// 🎯 عرض القصائد
function displayPoems(list) {
    poemsGrid.innerHTML = "";
    if (list.length === 0) {
        poemsGrid.innerHTML = "<p>لا توجد قصائد بعد </p>";
        return;
    }

    list.forEach(poem => {
        const isFav = favorites.includes(poem.id);

        const card = document.createElement("div");
        card.classList.add("poem-card");

        card.innerHTML = `
            <h3>${poem.title}</h3>
            <p>${poem.content.replace(/\n/g, "<br>")}</p>

            <div class="actions">
                <span class="fav ${isFav ? "active" : ""}" onclick="toggleFavorite(${poem.id})">
                    <svg viewBox="0 0 24 24" class="icon">
                        <path d="M12 21s-6.7-4.35-10-9C-1 7 3 3 7 5c2 1 3 3 5 5 2-2 3-4 5-5 4-2 8 2 5 7-3.3 4.65-10 9-10 9z"/>
                    </svg>
                </span>

                <span onclick="downloadPoem(${poem.id})">
                    <svg viewBox="0 0 24 24" class="icon">
                        <path d="M6 2h12v20l-6-4-6 4z"/>
                    </svg>
                </span>
            </div>
        `;

        poemsGrid.appendChild(card);
    });
}

// 🔍 Search
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = poems.filter(p =>
        p.title.includes(value) || p.content.includes(value)
    );

    displayPoems(filtered);
});

/*
// 🗑️ حذف
function deletePoem(id) {
    showConfirm("هل أنت متأكد من حذف القصيدة؟", () => {
        poems = poems.filter(p => p.id !== id);
        displayPoems(poems);
    });
}*/

// ❤️ مفضلة
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayPoems(poems);
}

// 📥 تحميل
function downloadPoem(id) {
    const poem = poems.find(p => p.id === id);

    const blob = new Blob([poem.content], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = poem.title + ".txt";
    link.click();
}
/*
function showConfirm(message, onConfirm) {
    const modal = document.getElementById("confirmModal");
    const text = document.getElementById("confirmText");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");

    text.innerText = message;
    modal.style.display = "flex";

    // Yes
    yesBtn.onclick = () => {
        modal.style.display = "none";
        onConfirm();
    };

    // No
    noBtn.onclick = () => {
        modal.style.display = "none";
    };
}*/

// أول تحميل
displayPoems(poems);