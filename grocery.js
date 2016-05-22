$(document).ready(function() {

    var groceries = [
        { name: "Tomatoes", status: "needed", price: "3.99", quantity: 5 },
        { name: "Onions", status: "needed", price: "1.85", quantity: 2 },
        { name: "Cilantro", status: "needed", price: ".95", quantity: 1 },
        { name: "Limes", status: "complete", price: ".33", quantity: 3 },
        { name: "Jalapeno", status: "complete", price: ".15", quantity: 2 }
    ];

    // Before we start anything, string up the css file, this javascript file, and
    // the jQuery CDN to grocery.html file.

    //1. Display the existing list of grocery items (from the grocery array)
    // in an unordered list in the "list" id that already exists in grocery.html.
    // Display each item's name, price, and quantity.
    // Ex: Tomatoes (5) @ $3.99

    for (i = 0; i < groceries.length; i++) {
        var item = groceries[i]
        if (item.status === "needed"){
        $("#list").append($("<li>" + item.name + " (" + item.quantity + ") @ $" + item.price + "</li>"))
   	}
	}

    function displayTotal() {
        var total = 0;

        for (i = 0; i < groceries.length; i++) {
        	var item = groceries[i]
        	if (item.status === "needed"){
            total += (item.quantity * item.price)
        	}
        }
        $(".totalCost h4 span").text("$" + total.toFixed(2))
    }

    displayTotal();

    //2. Use the inputs and add button to add grocery items to the beginning of the list.
    // Default status should be "needed". The item should appear above the existing grocery items.

    $(".btn-success").click(function() {
        var nameInput = $("#addItem").val();
        var priceInput = $("#addPrice").val();
        var quantityInput = $("#addQuantity").val();


    //4. Put a check in to make sure users aren't adding items without a name, price, or quantity.  
        if (nameInput == '' || priceInput == '' || quantityInput == '') {
            alert("Please fill in all fields")
        } else {
            addItem(nameInput, priceInput, quantityInput);
        }
    });

    // 3. Make sure that the grocery list displayed updates when you add an item to the list. Display 
    // the total cost of the groceries. Make sure this updates as you add items to the list.

    function addItem(name, price, quantity) {
        groceries.unshift({ name: name, status: "needed", price: price, quantity: quantity });
        updateList(groceries[0]);
        displayTotal();
    };

    function updateList(item) {
        $("<li>" + item.name + " (" + item.quantity + ") @ $" + item.price + "</li>").insertBefore('#list li:first-child');
 
    }

    // 5. Add the CDN for jQuery UI script to grocery.html
    // You can find the snippet here: https://developers.google.com/speed/libraries/#jquery-ui
    // 6. Add a remove button at the bottom below the total. When clicked, it should remove
    // the last item and update the total.

    $('#removeLast').click(function(){
        groceries.pop();
        $('#list').children().eq(-1).remove();
        displayTotal();
    });

    // 7. Make each grocery item (each li element) draggable using .sortable().
    // Use the example here https://johnny.github.io/jquery-sortable/ to figure out how to implement this.
    // The three steps under 'Getting Started' should get you there. You do not NEED the css provided.
	
	$(function () {
		$("#list").sortable();
		$("#purchased").sortable();
	});

    // 8. In the HTML document, add a list below "#list" called "purchased". All of the items that are status complete
    // should go in the purchased list.

    for (k = 0; k < groceries.length; k++) {
        var item = groceries[k];
        if (item.status === "complete"){
            $("#purchased").append($("<li>" + item.name + " (" + item.quantity + ") @ $" + item.price + "</li>"))
        }
    	}
    // 9. When one of the grocery items in "#list" is double-clicked the status for that item
    // should change to "complete" and populate in the complete list.
    	
    	$("li").dblclick(function() {
    	    $(this).remove();
    	    $("#purchased").append(this);
    	    displayTotal();
    	});

    		

});





