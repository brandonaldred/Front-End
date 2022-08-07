const nav = document.getElementsByTagName('li');
const text = {
    daily: "Yesterday - ",
    weekly: "Last Week - ",
    monthly: "Last Month - "
};
for (item of nav) {
    item.addEventListener('click', (e) => {
        let item = document.querySelector('.selected');
        item.classList.remove('selected');
        e.target.className = 'selected';
        populateCard(e.target.innerText.toLowerCase());
    });
}

function populateCard(timeframe) {
    for (item of data) {
        let title = item.title.toLowerCase();
        title = title.split(' ').join('-');
        let card = document.querySelector(`.${title}`);
        card.getElementsByTagName('p')[0].innerText = `${item.timeframes[timeframe].current}hrs`;
        card.getElementsByTagName('h3')[0].innerText = `${text[timeframe]} ${item.timeframes[timeframe].previous}hrs`
    }
}

populateCard('weekly');