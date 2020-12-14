//logical short circuiting

let yes = true || false;

let other = 3 - 3 || 0 + 0 || 1 + 3;
//other 4
console.log(yes, other);

let div = document.getElementById('thing');
if (div) {

}else {
    div = document.querySelector('other');
}

let d = document.getElementById('thing') || document.querySelector('other');