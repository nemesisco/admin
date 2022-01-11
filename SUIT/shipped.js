
var itemNo;
var orderDetails = [];
var userDetails = [];

function addItemsToList(productID, date, customer, email, address, contact, product, quantity, size, color, payment, total, status){
    var tbody = document.getElementById('tableBody');
    var trow = document.createElement('tr');
    trow.className = "newRow";

    var itemNum = document.createElement('td');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');
    var td9 = document.createElement('td');
    var td10 = document.createElement('td');
    var td11 = document.createElement('td');
    var td12 = document.createElement('td');

    orderDetails.push([productID, date, customer, email, address, contact, product, quantity, size, color, payment, total, status]);

    itemNum.innerHTML = ++itemNo;
    td1.innerHTML = date;
    td2.innerHTML = customer;
    td3.innerHTML = address;
    td4.innerHTML = email; 
    td5.innerHTML = contact; 
    td6.innerHTML = product; 
    td7.innerHTML = quantity;
    td8.innerHTML = size;
    td9.innerHTML = color;
    td10.innerHTML = payment;
    td11.innerHTML = "₱" + total;
    td12.innerHTML = "<p class='fst-italic'>" + status + "</p>";

    trow.appendChild(itemNum);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);
    trow.appendChild(td10);
    trow.appendChild(td11);
    trow.appendChild(td12);

    tbody.appendChild(trow);
}
function SelectAllData(){
    itemNo = 0;
    firebase.database().ref('Shipped_Orders').once('value', function(snapshot){
        if(snapshot.numChildren() == 0){
            document.getElementById('tableBody').innerHTML = "<td colspan='13'>Currently no shipped orders are available</td>";
        }else{
            snapshot.forEach(
                function(ChildSnapshot){
                    ChildSnapshot.forEach(
                        function(dataSnapshot){                        
                            var productID = dataSnapshot.key;
                            var date = dataSnapshot.val().Date;
                            var customer = dataSnapshot.val().Name;
                            var address = dataSnapshot.val().Address;
                            var email = dataSnapshot.val().Email;
                            var contact = dataSnapshot.val().Contact;
                            var product = dataSnapshot.val().ProductName;
                            var quantity = dataSnapshot.val().Quantity;
                            var size = dataSnapshot.val().Size;
                            var color = dataSnapshot.val().Color;
                            var payment = dataSnapshot.val().Payment;
                            var total = dataSnapshot.val().Total;
                            var status = dataSnapshot.val().Status;
                            
                            addItemsToList(productID, date, customer, email, address, contact, product, quantity, size, color, payment, total, status);

                        }
                    );
                }
            );
        }
    });
}
window.onload = SelectAllData();