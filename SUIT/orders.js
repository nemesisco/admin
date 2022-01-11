
var itemNo;
var orderDetails = [];
var userDetails = [];

function addItemsToList(productID, productName, total, quantity, size, color, design, payment, uname, uaddress, uemail, ucontact, id, uid){
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

    orderDetails.push([productID, productName, total, quantity, size, color, design, payment, uname, uaddress, uemail, ucontact, id, uid]);

    itemNum.innerHTML = ++itemNo;
    td1.innerHTML = "<img src=" + design + " height='80px'; width='auto';>";
    td2.innerHTML = uname;
    td3.innerHTML = uemail;
    td4.innerHTML = ucontact; 
    td5.innerHTML = uaddress; 
    td6.innerHTML = quantity; 
    td7.innerHTML = size;
    td8.innerHTML = color;
    td9.innerHTML = payment;
    td10.innerHTML = "₱" + total;
    td11.innerHTML = "<button class='btn btn-success'  data-bs-toggle='modal' data-bs-target='#deliverSetting' onclick='deliver("+ itemNo +")'>Deliver</button>" + " " + "<button class='btn btn-danger'  data-bs-toggle='modal' data-bs-target='#deliveryCancel' onclick='cancel("+ itemNo +")'>Cancel</button>";

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

    tbody.appendChild(trow);
}
var userID, item, itemID;
var itemSplit, userName, userAddress, userEmail, userContact;
function SelectAllData(){
    itemNo = 0;
    firebase.database().ref('Order').once('value', function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                if(snapshot.numChildren() == 0){
                    document.getElementById('tableBody').innerHTML = "<td colspan='12'>Currently no returning order are available</td>";
                }else{
                    userID = ChildSnapshot.key;
                    ChildSnapshot.forEach(
                        function(dataSnapshot){                        
                            itemID = dataSnapshot.key;
                            firebase.database().ref('Users/' + userID).once('value', function(snapshot1){
                                userName = snapshot1.val().name;
                                userAddress = snapshot1.val().address;
                                userEmail = snapshot1.val().email;
                                userContact = snapshot1.val().contact;

                                item = dataSnapshot.val().item;
                                itemSplit = item.split('@');
                                addItemsToList(itemSplit[0], itemSplit[1], itemSplit[2], itemSplit[3], itemSplit[4], itemSplit[5], itemSplit[6], itemSplit[7], userName, userAddress, userEmail, userContact, itemID, userID);

                            });
                        }
                    );
                }
            }
        );
    });
}
window.onload = SelectAllData();

var username = document.getElementById('deliveryName');
var address = document.getElementById('deliveryAddress');
var email = document.getElementById('deliveryEmail');
var contact = document.getElementById('deliveryContact');
var pname = document.getElementById('deliveryPName');
var pquantity = document.getElementById('deliveryQuantity');
var psize = document.getElementById('deliverySize');
var pcolor = document.getElementById('deliveryColor');
var pmethod = document.getElementById('deliveryMethod');
var total = document.getElementById('deliveryTotal');
var pdate = document.getElementById('deliveryDate');

function deliver(index){
    if(index == null){
        username.value = "";
        address.value = "";
        email.value = "";
        contact.value = "";
        pname.value = "";
        pquantity.value = "";
        psize.value = "";
        pcolor.value = "";
        pmethod.value = "";
        total.value = "";
    }else{
        --index;
        username.value = orderDetails[index][8];
        address.value = orderDetails[index][9];
        email.value = orderDetails[index][10];
        contact.value = orderDetails[index][11];
        pname.value = orderDetails[index][1];
        pquantity.value = orderDetails[index][3];
        psize.value = orderDetails[index][4];
        pcolor.value = orderDetails[index][5];
        pmethod.value = orderDetails[index][7];
        total.value = orderDetails[index][2];

        document.getElementById('confirmOrder').onclick = function (e){
            var key = orderDetails[index][0];
            var pkey = orderDetails[index][12];
            var ukey = orderDetails[index][13];

            firebase.database().ref('Products/' + key).once('value', function(snapshot){
                var sizexs = snapshot.val().sizeXS;
                var sizes = snapshot.val().sizeS;
                var sizem = snapshot.val().sizem;
                var sizel = snapshot.val().sizeL;
                var sizexl = snapshot.val().sizeXL;
                var sizexxl = snapshot.val().sizeXXL;
                var total = snapshot.val().Total;
                var updateValue, updateTotal;

                switch (psize.value) {
                    case "XS":
                        updateValue = sizexs - pquantity.value;
                        updateTotal = total - pquantity.value;
                        firebase.database().ref('Products/' + key).update({
                            sizeXS: updateValue
                        });
                        break;
                    case "S":
                        updateValue = sizes - pquantity.value;
                        updateTotal = total - pquantity.value;
                        firebase.database().ref('Products/' + key).update({
                            sizeS: updateValue,
                            Total: updateTotal
                        });
                        break;
                    case "M":
                        updateValue = sizem - pquantity.value;
                        updateTotal = total - pquantity.value;
                        firebase.database().ref('Products/' + key).update({
                            sizeM: updateValue,
                            Total: updateTotal
                        });
                        break;
                    case "L":
                        updateValue = sizel - pquantity.value;
                        updateTotal = total - pquantity.value;
                        firebase.database().ref('Products/' + key).update({
                            sizeL: updateValue,
                            Total: updateTotal
                        });
                        break;
                    case "XL":
                        updateValue = sizexl - pquantity.value;
                        updateTotal = total - pquantity.value;
                        firebase.database().ref('Products/' + key).update({
                            sizeXL: updateValue,
                            Total: updateTotal
                        });
                        break;
                    case "XXL":
                        updateValue = sizexxl - pquantity.value;
                        updateTotal = total - pquantity.value;
                        firebase.database().ref('Products/' + key).update({
                            sizeXXL: updateValue,
                            Total: updateTotal
                        });
                        break;
                }

                console.log(updateValue);
                console.log(updateTotal);
            });

            firebase.database().ref('Shipped_Orders/' + ukey).push({
                Name: username.value,
                Address: address.value,
                Email: email.value,
                Contact: contact.value,
                ProductName: pname.value,
                Quantity: pquantity.value,
                Size: psize.value,
                Color: pcolor.value,
                Payment: pmethod.value,
                Date: pdate.value,
                Total: total.value,
                Status: "Out for Delivery"
            }); 

            var orderMessage = "Your order (" + pquantity.value + "x " + psize.value + " | " + pcolor.value + ") "  
            + pname.value + " will be deliver " + pdate.value + " kindly prepare ₱" + total.value;

            firebase.database().ref('Order/' + ukey + '/' + pkey).remove().then(
                function(){
                    Email.send({
                        SecureToken : "d1fe37ce-a1aa-43f0-b7e9-bb3c497138e1",
                        To : email.value,
                        From : "markbernardabecia@gmail.com",
                        Subject : "Order Details",
                        Body : orderMessage
                    }).then(
                        message => alert(message)
                    );
                    alert('Successfully Shipped Orders');
                    window.location = "orders.html"
                }
            );

        };
    }
}

function cancel(index){
    if(index == null){

    }else{
        --index;
        var email = orderDetails[index][10];
        var pname = orderDetails[index][1];
        var pquantity = orderDetails[index][3];
        var psize = orderDetails[index][4];
        var pcolor = orderDetails[index][5];
        var orderMessage = "Your order (" + pquantity + "x " + psize + " | " + pcolor + ") "  
        + pname + " is been CANCELLED, for more inqueries kindly message us on our Facebook Page: Nemesis or contact us 09656495543";

        document.getElementById('cancelOrder').onclick = function (e){
            var pkey = orderDetails[index][12];
            var ukey = orderDetails[index][13];
            firebase.database().ref('Order/' + '/' + ukey + '/' + pkey).remove().then(
                function(){
                    Email.send({
                        SecureToken : "d1fe37ce-a1aa-43f0-b7e9-bb3c497138e1",
                        To : email,
                        From : "markbernardabecia@gmail.com",
                        Subject : "Order Details",
                        Body : orderMessage
                    }).then(
                        message => alert(message)
                    );
                    alert('Successfully Cancelled Record');
                    window.location = "orders.html"
                }
            );
        }

    }
}