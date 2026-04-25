console.log("Generator Loaded 🚀");

const textarea = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");
const output = document.getElementById("output");

const modal = document.getElementById("loginPrompt");
const laterBtn = document.getElementById("laterBtn");


//  Enter = إرسال
textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

//  زر الإرسال
sendBtn.addEventListener("click", sendMessage);

//  إرسال الرسالة
async function sendMessage() {
    const text = textarea.value.trim();

    if (!text) return;

    //  رسالة المستخدم
    appendMessage(text, "user");

    textarea.value = "";

    //  placeholder للموديل
    appendMessage("جاري توليد القصيدة... ", "bot");

    //  هون رح نربط الموديل لاحقًا
    // const result = await callModel(text);

    // مؤقت:
    setTimeout(() => {
        updateLastBotMessage(" قصيدة تجريبية سيتم استبدالها بالموديل لاحقًا...");
    }, 1000);
}

//  إضافة رسالة
function appendMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("msg", type);
    msg.innerText = text;

    output.appendChild(msg);

    // auto scroll
    output.scrollTop = output.scrollHeight;
}

//  تحديث آخر رسالة (البوت)
function updateLastBotMessage(newText) {
    const messages = document.querySelectorAll(".msg.bot");
    const last = messages[messages.length - 1];

    if (last) {
        last.innerText = newText;
    }
}

//  بعد دقيقة
setTimeout(() => {
    modal.classList.add("show");
}, 60000);

//  إغلاق
laterBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});