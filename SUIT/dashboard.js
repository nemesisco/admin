window.onload = loadData();

function loadData(){
    firebase.database().ref("Users").once("value").then(function(snapshot){
        document.getElementById('dashUser').innerHTML = snapshot.numChildren();
    });
    

    firebase.database().ref("Products").once("value").then(function(snapshot){
        document.getElementById('dashProduct').innerHTML = snapshot.numChildren();
    });
    
    firebase.database().ref("Returns").once("value").then(function(snapshot){
        document.getElementById('dashROrder').innerHTML = snapshot.numChildren();
    });

    var order = 0;
    var shipped = 0;
    document.getElementById('dashPOrder').innerHTML = order;
    firebase.database().ref('Order').once('value', function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                ChildSnapshot.forEach(
                    function(dataSnapshot){
                        order++;
                        document.getElementById('dashPOrder').innerHTML = order;
                    }
                );
            }
        );
    });

    document.getElementById('dashSOrder').innerHTML = shipped;
    firebase.database().ref("Shipped_Orders").once("value").then(function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                ChildSnapshot.forEach(
                    function(dataSnapshot){
                        shipped++;
                        document.getElementById('dashSOrder').innerHTML = shipped;
                    }
                );
            }
        );
    });

    var date = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var totalSale = [];
    var num = 0;

    var sales = 0;

    function loadYear(query){
        firebase.database().ref("Sales/" + query).once("value").then(function(month){
            month.forEach(
                function(day){
                    var key = parseInt(day.key);
                    var monthSale = 0;
                    switch(key){
                        case  1:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[0] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  2:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[1] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  3:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[2] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  4:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[3] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  5:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[4] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  6:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[5] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  7:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[6] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  8:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[7] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  9:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[8] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  10:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[9] = sales;
                                        }
                                    );
                                }
                            );
                            break;
                        case  11:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[10] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                        case  12:
                            day.forEach(
                                function(snaps){
                                    snaps.forEach(
                                        function(snap1){
                                            var total = snap1.val().saleTotal;
                                            monthSale = monthSale + total;
                                            sales = sales + total;
                                            totalSale[11] = monthSale;
                                        }
                                    );
                                }
                            );
                            break;
                    }
                    document.getElementById('dashSales').innerHTML = "₱" + sales;
                }
            );
        });
    }

    window.onload = loadYear("2022");

    new Chart("reportChart", {
    type: "bar",
    data: {
      labels: date,
      datasets: [{
        backgroundColor: "black",
        data: totalSale
      }]
    },
    options: {
      legend: {display: false}
    }
    });

    firebase.database().ref("Feedbacks").once("value").then(function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                var email = ChildSnapshot.val().email;
                var feedback = ChildSnapshot.val().feedback;
                var product = ChildSnapshot.val().pname;

                if (feedback == "N/A"){

                }else{
                    var listItem = document.createElement('li');
                    listItem.className = "list-group-item";
                    listItem.innerHTML = "<h6 class='text-center'>" + product + "</h6><p class='fw-normal text-center fs-5'>" + feedback + "</p><p class='fw-light text-end fs-6'>" + email + "</p>"
                    document.getElementById("feedList").appendChild(listItem);
                }
            }
        );
    });
}
