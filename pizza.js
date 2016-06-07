(function() {
    class PizzaMaker {
        constructor(name, url, likes) {
            this.name = name;
            this.url = url;
            this.likes = likes
        }
        editPizza(name, url, likes) {
            this.name = name;
            this.url = url;
            this.likes = likes
        }
    }

    var pizzas = [];
    pizzas[0] = new PizzaMaker("Margherita", "img/margherita.png", 0);
    pizzas[1] = new PizzaMaker("Hawaii", "img/hawaii.png", 0);
    pizzas[2] = new PizzaMaker("Pepperoni", "img/pepperoni.png", 0);

    var selectedPizza;
    pizzas = JSON.parse(localStorage.getItem('pizzas')) || pizzas;
    if (JSON.parse(localStorage.getItem('pizzas'))) {
        var storagePizzas = JSON.parse(localStorage.getItem('pizzas'));
        for (var i = 0; i < storagePizzas.length; i++) {
            pizzas[i] = new PizzaMaker(storagePizzas[i].name, storagePizzas[i].url, storagePizzas[i].likes);
        }
    }


    function $id(id_name_quoted) {
        return document.getElementById(id_name_quoted);
    }

    for (i = 0; i < pizzas.length; i++) {
        var newDiv = document.createElement("div");
        var newContent = document.createTextNode(pizzas[i].name);
        newDiv.appendChild(newContent);
        newDiv.className = "pizza-name";
        var currentDiv = $id("section-left");
        currentDiv.appendChild(newDiv);
    }

    var currentClass = document.getElementsByClassName("pizza-name");
    for (i = 0; i < currentClass.length; i++) {
        currentClass[i].addEventListener("click", leftSectionHandler.bind(this, i));
    }

    function leftSectionHandler(i) {
        selectedPizza = i;
        $id('section-middle').style.display = 'block';
        $id("edit-button").disabled = false;
        focusedPizza(i);
        sectionMiddleData(pizzas[i].name, pizzas[i].url, pizzas[i].likes);
        sectionRightData(pizzas[i].name, pizzas[i].url, pizzas[i].likes);
    }

    var sectionMiddle = $id("section-middle");
    sectionMiddle.addEventListener("click", middleSectionHandler);

    function middleSectionHandler() {
        pizzas[selectedPizza].likes++;
        $id('number-of-likes').innerHTML = pizzas[selectedPizza].likes;
        $id('input-likes').value = pizzas[selectedPizza].likes;
        localStorage.setItem('pizzas', JSON.stringify(pizzas));
    }

    var editButton = $id("edit-button");
    editButton.addEventListener("click", editButtonHandler);

    function editButtonHandler() {
        var dummyForm = $id('dummy-form');
        var x = window.getComputedStyle(dummyForm);
        x.getPropertyValue('display') === 'none' ? dummyForm.style.display = 'block' : dummyForm.style.display = 'none';
        sectionRightData(pizzas[selectedPizza].name, pizzas[selectedPizza].url, pizzas[selectedPizza].likes);
    }

    var submitButton = $id("submit-button");
    submitButton.addEventListener("click", submitButtonHandler);

    function submitButtonHandler() {
        var v1 = $id('input-name').value;
        var v2 = $id('input-image').value;
        var v3 = $id('input-likes').value;
        pizzas[selectedPizza].editPizza(v1, v2, v3);
        sectionMiddleData(v1, v2, v3);
        currentClass[selectedPizza].innerHTML = v1;
        localStorage.setItem('pizzas', JSON.stringify(pizzas));
    }

    function sectionMiddleData(a, b, c) {
        $id('kind-of-pizza').innerHTML = a;
        var newImg = document.createElement("img");
        newImg.src = b;
        var currentDiv = $id('pizza-img');
        currentDiv.innerHTML = "";
        currentDiv.appendChild(newImg);
        $id('number-of-likes').innerHTML = c;
    }

    function sectionRightData(a, b, c) {
        $id('input-name').value = a;
        $id('input-image').value = b;
        $id('input-likes').value = c;
    }

    function focusedPizza(index) {
        for (var i = 0; i < currentClass.length; i++) {
            currentClass[i].style.backgroundImage = 'none';
        }
        currentClass[index].style.backgroundImage = 'url(img/right.png)';
        currentClass[index].style.backgroundRepeat = 'no-repeat';
        currentClass[index].style.backgroundPosition = '90% 50%';
    }

})();