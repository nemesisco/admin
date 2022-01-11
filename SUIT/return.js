var returnInfo = [];
var count = 0;

firebase.database().ref("Returns").once("value").then(function(snapshot){
    snapshot.forEach(
        function(childSnaps){
            if(snapshot.numChildren() == 0){
                document.getElementById('tableBody').innerHTML = "<td colspan='12'>Currently no returning orders are available</td>";
            }else{
                var key = childSnaps.key;
                var name = childSnaps.val().rName;
                var address = childSnaps.val().rAddress;
                var email = childSnaps.val().rEmail;
                var contact = childSnaps.val().rContact;
                var product = childSnaps.val().rTitle;
                var quantity = childSnaps.val().rQuantity;
                var color = childSnaps.val().rColor;
                var size = childSnaps.val().rSize;
                var total = childSnaps.val().rTotal;
                var reason = childSnaps.val().rReason;
    
                returnInfo.push([name, address, email, contact, product, quantity, color, size, total, reason, key]);
    
                var trow = document.createElement('tr');
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
    
                td1.innerHTML = ++count;
                td2.innerHTML = name;
                td3.innerHTML = address;
                td4.innerHTML = email;
                td5.innerHTML = contact;
                td6.innerHTML = product;
                td7.innerHTML = quantity;
                td8.innerHTML = size;
                td9.innerHTML = color;
                td10.innerHTML = "<b>₱" + total + "</b>";
                td11.innerHTML = "<p class='font-monospace'>" + reason + "</p>";
                td12.innerHTML = "<button class='btn btn-success' onclick='accept(" + count + ")'>ACCEPT</button>" + " " + "<button class='btn btn-danger' onclick='deny(" + count + ")'>REJECT</button>";
    
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
    
                document.getElementById("tableBody").appendChild(trow);

            }

        }
    );
});

function accept(index){
    --index;
    var text = "Are you sure to accept the returning order?";
    if (confirm(text) == true) {
        var email = returnInfo[index][2];
        var id = returnInfo[index][10];
        var returnMessage = "Your returning order (" + returnInfo[index][4] + ": " 
        + returnInfo[index][5] + "x " + returnInfo[index][6] + " " + returnInfo[index][7] + ") with a total of ₱" + returnInfo[index][8] 
        + " was been ACCEPTED. For more inquiries kindly message to our Facebook page (Nemesis), thank you and enjoy shopping.";
    
        Email.send({
            SecureToken : "d1fe37ce-a1aa-43f0-b7e9-bb3c497138e1",
            To : email,
            From : "markbernardabecia@gmail.com",
            Subject : "Order Details",
            Body : returnMessage
        }).then(
            message => alert(message)
        );

        firebase.database().ref("Returns/" + id).remove().then(
            function(){
                alert('You successfully sent a succession for the return item');
            }
        );

    }else{
        text = "You canceled!";
    }

}

function deny(index){
    --index;
    var text = "Are you sure to reject the returning order?";
    if (confirm(text) == true) {
        var email = returnInfo[index][2];
        var id = returnInfo[index][10];
        var returnMessage = "Your returning order (" + returnInfo[index][4] + ": " 
        + returnInfo[index][5] + "x " + returnInfo[index][6] + " " + returnInfo[index][7] + ") with a total of ₱" + returnInfo[index][8] 
        + " was been REJECTED. For more inquiries kindly message to our Facebook page (Nemesis), thank you and enjoy shopping.";
    
        Email.send({
            SecureToken : "d1fe37ce-a1aa-43f0-b7e9-bb3c497138e1",
            To : email,
            From : "markbernardabecia@gmail.com",
            Subject : "Order Details",
            Body : returnMessage
        }).then(
            message => alert(message)
        );

        firebase.database().ref("Returns/" + id).remove().then(
            function(){
                alert('You successfully sent a rejection for the return item');
            }
        );

    }else{
        text = "You canceled!";
    }
}