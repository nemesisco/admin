var imgName;
var files = [];
var reader;
// Select Image
document.getElementById('select').onclick = function(e){

    var input = document.createElement('input');
    input.type= 'file';

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function(){
            document.getElementById("myimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

//ADDING PROCESS
document.getElementById('uploadItem').onclick = function(e){
    var itemName = document.getElementById('itemNameBox').value;
    var itemPrice = document.getElementById('itemPriceBox').value;
    var itemDescription = document.getElementById('itemDescBox').value;
    var itemCollection = document.getElementById('itemCollectionBox').value;
    var itemXS = document.getElementById('pXS').value;
    var itemS = document.getElementById('pS').value;
    var itemM = document.getElementById('pM').value;
    var itemL = document.getElementById('pL').value;
    var itemXL = document.getElementById('pXL').value;
    var itemXXL = document.getElementById('pXXL').value;
    var total = parseInt(itemXS) + parseInt(itemS) + parseInt(itemM) + parseInt(itemL) + parseInt(itemXL) + parseInt(itemXXL);

    var checks = document.getElementsByClassName('btn-check');
    var colors = '';

    for(i = 0; i < 6; i++){
        if(checks[i].checked === true){
            colors += checks[i].value + " ";
        }
    }


    var uploadTask = firebase.storage().ref('Designs/' + itemName + ".png").put(files[0]);

    uploadTask.on('state_changed', function (snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('upProgress').style.width = progress + '%';
        document.getElementById('upProgress').innerHTML = 'Uploading ' + progress + '%';

    },
    function(error){
        console.log(error.message);
    },
    function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            imgUrl = url;

            firebase.database().ref('Products').once('value', function(snapshot){
                var pID = "Item" + snapshot.numChildren();

            //ADDTING ITEM TO REALTIME DATABASE
            firebase.database().ref('Products/').push(
                {
                    productID: pID,
                    Image: url,
                    Name: itemName,
                    Price: itemPrice,
                    Description: itemDescription,
                    Category: itemCollection,
                    Colors: colors,
                    sizeXS: itemXS,
                    sizeS: itemS,
                    sizeM: itemM,
                    sizeL: itemL,
                    sizeXL: itemXL,
                    sizeXXL: itemXXL,
                    Total: total
                },
                (error) => {
                    if(error)
                    {
                        alert('Failed to Add New Item');
                    }
                    else
                    {
                        alert('Product Uploaded');
                        window.location = "products.html"
                    }
                }
            );
        });
        });
    }
    )

    
}

//FETCHING PROCESS
var itemNo;
var itemLists = [];

function addItemsToList(item, name, price, desc, qty, collection, colors, itemxs, items, itemm, iteml, itemxl, itemxxl, childID){
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
    var td13 = document.createElement('td');
    var td14 = document.createElement('td');
    var td15 = document.createElement('td');

    itemLists.push([item, name, price, desc, qty, collection, colors, itemxs, items, itemm, iteml, itemxl, itemxxl, childID]);

    itemNum.innerHTML = ++itemNo;
    td1.innerHTML = childID;
    td2.innerHTML = "<img src=" + item + " height='80px'; width='auto';>";
    td3.innerHTML = name
    td4.innerHTML = "₱" + price + ".00";
    td5.innerHTML = desc;
    td6.innerHTML = collection;
    td7.innerHTML = colors; 
    td8.innerHTML = itemxs; 
    td9.innerHTML = items; 
    td10.innerHTML = itemm; 
    td11.innerHTML = iteml; 
    td12.innerHTML = itemxl; 
    td13.innerHTML = itemxxl; 
    td14.innerHTML = "<b>" + qty + "</b>";
    td15.innerHTML = "<button class='btn btn-warning' id='btnUpdate'  data-bs-toggle='modal' data-bs-target='#staticBackdrop' onclick='updateItem("+ itemNo +")'>Update</button>" + " " + "<button class='btn btn-danger' onclick='removeItem("+ itemNo +")'>Delete</button>";

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
    trow.appendChild(td13);
    trow.appendChild(td14);
    trow.appendChild(td15);

    tbody.appendChild(trow);
}
function SelectAllData(query){
    itemNo = 0;
    $(".newRow").remove();
    firebase.database().ref('Products').orderByChild(query).once('value', function(snapshot){
        if(snapshot.numChildren() == 0){
            document.getElementById('tableBody').innerHTML = "<td colspan='14'>No Product are available</td>"
        }else{
            snapshot.forEach(
                function(ChildSnapshot){
                    var childID = ChildSnapshot.key;
                    var item = ChildSnapshot.val().Image;
                    var name = ChildSnapshot.val().Name;
                    var price = ChildSnapshot.val().Price;
                    var desc = ChildSnapshot.val().Description;
                    var qty = ChildSnapshot.val().Total;
                    var collection = ChildSnapshot.val().Category;
                    var colors = ChildSnapshot.val().Colors;
                    var itemxs = ChildSnapshot.val().sizeXS;
                    var items = ChildSnapshot.val().sizeS;
                    var itemm = ChildSnapshot.val().sizeM;
                    var iteml = ChildSnapshot.val().sizeL;
                    var itemxl = ChildSnapshot.val().sizeXL;
                    var itemxxl = ChildSnapshot.val().sizeXXL;
                    addItemsToList(item, name, price, desc, qty, collection, colors, itemxs, items, itemm, iteml, itemxl, itemxxl, childID);
                }
            );
        }
    });
    return true;
}
window.onload = SelectAllData("Name");

var image, name, price, description, collection, xs, s, m, l, xl, xxl, total;
image = document.getElementById("myimg");
pname = document.getElementById("itemNameBox");
price = document.getElementById('itemPriceBox');
description = document.getElementById('itemDescBox');
collection = document.getElementById('itemCollectionBox');
xs = document.getElementById('pXS');
s = document.getElementById('pS');
m = document.getElementById('pM');
l = document.getElementById('pL');
xl = document.getElementById('pXL');
xxl = document.getElementById('pXXL');

function updateItem(index){

    var modalAddBtn = document.getElementById('uploadItem');
    var modalUpdateBtn = document.getElementById('updateItem');
    var btnSelect = document.getElementById('select');


    if(index == null){
        image.src = "";
        pname.value = "";
        price.value = "";
        description.value = "";
        collection.value = "";
        xs.value = "";
        s.value = "";
        m.value = "";
        l.value = "";
        xl.value = "";
        xxl.value = "";
        
        document.getElementById('pBlack').checked = false;
        document.getElementById('pWhite').checked = false;
        document.getElementById('pGreen').checked = false;
        document.getElementById('pBlue').checked = false;
        document.getElementById('pRed').checked = false;
        document.getElementById('pYellow').checked = false;
        
        modalAddBtn.style.display = 'inline-block';
        modalUpdateBtn.style.display = 'none';
        btnSelect.style.display = 'inline-block';
    }
    else
    {
        --index;
        image.src = itemLists[index][0];
        pname.value = itemLists[index][1];
        price.value = itemLists[index][2];
        description.value = itemLists[index][3];
        collection.value = itemLists[index][5];
        xs.value = itemLists[index][7];
        s.value = itemLists[index][8];
        m.value = itemLists[index][9];
        l.value = itemLists[index][10];
        xl.value = itemLists[index][11];
        xxl.value = itemLists[index][12];

        var colorArray = itemLists[index][6].split(" ");
        for(var i = 0; i <= colorArray.length; i++){
            if(colorArray[i] == "Black"){
                document.getElementById('pBlack').checked = true;
            }else if(colorArray[i] == "White"){
                document.getElementById('pWhite').checked = true;
            }else if(colorArray[i] == "Green"){
                document.getElementById('pGreen').checked = true;
            }else if(colorArray[i] == "Blue"){
                document.getElementById('pBlue').checked = true;
            }else if(colorArray[i] == "Red"){
                document.getElementById('pRed').checked = true;
            }else if(colorArray[i] == "Yellow"){
                document.getElementById('pYellow').checked = true;
            }
        }


        modalUpdateBtn.onclick = function (e){
            var key = itemLists[index][13];
            total = parseInt(xs.value) + parseInt(s.value) + parseInt(m.value) + parseInt(l.value) + parseInt(xl.value) + parseInt(xxl.value);

            var checks = document.getElementsByClassName('btn-check');
            var colors = '';
            for(i = 0; i < 6; i++){
                if(checks[i].checked === true){
                    colors += checks[i].value + " ";
                }
            }

            firebase.database().ref('Products/' + key).update({
                    Name: pname.value,
                    Price: price.value,
                    Description: description.value,
                    Category: collection.value,
                    Colors: colors,
                    sizeXS: xs.value,
                    sizeS: s.value,
                    sizeM: m.value,
                    sizeL: l.value,
                    sizeXL: xl.value,
                    sizeXXL: xxl.value,
                    Total: total, 
            });

            alert('Successfully Updated Record');
            window.location = "products.html"

        };

        modalAddBtn.style.display = 'none';
        modalUpdateBtn.style.display = 'inline-block';
        btnSelect.style.display = 'none';
    }
}

//DELETING PROCESS
function removeItem(index){
    --index;
    var key = itemLists[index][13];
    firebase.database().ref('Products/' + key).remove().then(
        function(){
            alert('Successfully Deleted Record');
            window.location = "products.html"
        }
    )
}
document.getElementById('close').onclick = function(e){
    window.location = "products.html"
}