let hits = 0;

function getHits() {
    return 'Hits: ' + (++hits);
}
exports.getHits = getHits;