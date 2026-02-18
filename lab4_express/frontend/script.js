fetch("/hits/:page")
.the(res => res.json())
.then(data => {
    hits = data.message
});