fetch("/hits/:page")
.then(res => res.json())
.then(data => {
    hits = data.message
});