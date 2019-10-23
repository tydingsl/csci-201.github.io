function main() {
    var name = "Bobby";
    console.log(name);
    repeatGreet(name, 3);
    console.log(name);
}

function repeatGreet(theName, count) {
    while (count > 0) {
        console.log(`Hello, ${theName}!`);
        count = count - 1;
    }
}
