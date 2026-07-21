const button = document.getElementById("generateBtn");
const topicInput = document.getElementById("topic");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

const WEBHOOK_URL = "https://hook.eu1.make.com/q4v9qodcrb7xy16bsw9kmvngjq5ym389";

button.addEventListener("click", async () => {
    const topic = topicInput.value.trim();

    if (!topic) {
        alert("Please enter a topic");
        return;
    }

    loading.style.display = "block";
    output.innerHTML = "";

    try {

        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic: topic
            })
        });

        const rawText = await response.text();

        let data;
        try {
            data = JSON.parse(rawText);
        } catch (e) {
            output.innerText = rawText;
            loading.style.display = "none";
            return;
        }

        let article = null;

        if (data.article) {
            article = data.article;
        } else if (data.json) {
            try {
                const inner = JSON.parse(data.json);
                article = inner.article;
            } catch (e) {}
        }

        output.innerText = article || "Could not find article in response.";

    } catch (err) {
        output.innerText = "Error : " + err.message;
    }

    loading.style.display = "none";

});