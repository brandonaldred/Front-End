function buildCard(item) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.setAttribute('src', `/${item.url}/design/desktop-preview.jpg`);

    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skills';

    console.log(item.skills);

    for (skill of item.skills) {
        const p = document.createElement('p');
        p.innerText = skill;

        skillsContainer.append(p);
    }

    const repoLink = document.createElement('a');
    repoLink.href = `https://github.com/brandonaldred/Front-End/tree/main/${item.url}`;
    repoLink.setAttribute('target', '_blank');

    const repoImg = document.createElement('img');
    repoImg.setAttribute('src', 'github.svg');
    repoLink.appendChild(repoImg);
    skillsContainer.appendChild(repoLink);

    const h2 = document.createElement('h2');
    h2.innerText = item.name;

    const button = document.createElement('a');
    button.className = 'button';
    button.href = `https://brandonaldred.github.io/Front-End/${item.url}`;
    button.setAttribute('target', '_blank');
    button.innerText = 'View Project';

    card.appendChild(img);
    card.appendChild(skillsContainer);
    card.appendChild(h2);
    card.appendChild(button);

    const container = document.getElementById('container');
    container.appendChild(card);
}

for (card of projects) {
    buildCard(card);
}