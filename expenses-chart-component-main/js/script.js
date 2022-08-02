var bars = document.getElementsByClassName('bar-container');

for (let i = 0; i < bars.length; i++) {
    bars[i].addEventListener('mouseover', function() {
        bars[i].querySelector('.hide').className = 'amount';
    });
    bars[i].addEventListener('mouseout', function() {
        bars[i].querySelector('.amount').className = 'hide';
    });
}