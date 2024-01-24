const inputSearch = document.querySelector(".input-search")
const autoBox = document.querySelector(".autobox")
const outputSearch = document.querySelector(".output-search")
const autoBox2 = document.querySelector(".autobox2")
const gatauSearch = document.querySelector(".gatau-search")
const autoBox3 = document.querySelector(".autobox3")


function slugName(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ /g, "-");
    return str;
}

let recomentlist = [
    "Biên Hòa",
    "Bỉm Sơn",
    "Bình Thuận",
    "Bồng Sơn",
    "Chợ Sy",
    "Đà Nẵng",
    "Dĩ An",
    "Diêu Trì",
    "Đông Hà",
    "Đồng Hới",
    "Đồng Lê",
    "Đức Phổ",
    "Giã",
    "Hà Nội",
    "Huế",
    "Hương Phố",
    "Minh Khôi",
    "Nam Định",
    "Nha Trang",
    "Ninh Bình",
    "Ninh Hòa",
    "Núi Thành",
    "Phủ lý",
    "Quãng Ngãi",
    "Sài Gòn",
    "Sôn Mao",
    "Tam Kỳ",
    "Thanh Hóa",
    "Tháp Chàm",
    "Tuy Hòa",
    "Vinh",
    "Yên Trung",
]
  


//Nơi đi (tìm kiếm không cần dấu)
inputSearch.oninput = (e) => {
    let checkData = slugName(e.target.value);
    let dataArray = [];
    if (checkData) {
      dataArray = recomentlist.filter((data) => {
        return slugName(data).startsWith(checkData);
      });
      dataArray = dataArray.map((data) => {
        return "<li>" + data + "</li>";
      });
      autoBox.classList.add("active");
      showAddress(dataArray);
      let liItem = autoBox.querySelectorAll("li");
      for (let i = 0; i < liItem.length; i++) {
        liItem[i].addEventListener("click", function () {
          inputSearch.value = liItem[i].innerHTML;
          autoBox.classList.remove("active");
        });
      }
    } else {
      autoBox.classList.remove("active");
    }
};
  
function showAddress(list) {
    let listData;
    if (!list.length) {
      listData = "<li>" + inputSearch.value + "</li>";
    } else {
      listData = list.join("");
    }
    autoBox.innerHTML = listData;
}

//Nơi đến (tìm kiếm không cần dấu)
outputSearch.onkeyup = (e) => {
    //console.log(e.target.value)
    let checkData = slugName(e.target.value);
    let dataArray = []
    if(checkData){
        dataArray = recomentlist.filter((data) => {
            return slugName(data).startsWith(checkData);
        })
        
        dataArray = dataArray.map((data) => {
            return "<li>" + data + "</li>";
        });
        autoBox2.classList.add('active');
        showAdress2 (dataArray);
        let liItem = autoBox2.querySelectorAll("li");
        for(let i=0;i<liItem.length;i++){
            liItem[i].addEventListener("click",function(){
                outputSearch.value = liItem[i].innerHTML;
                autoBox2.classList.remove('active');
            });
        }
        //console.log(dataArray)
    }else{
        autoBox2.classList.remove('active');
    }
}
function showAdress2 (list){
    let listData2;
    if (!list.length) {
        listData2 = '<li>'+outputSearch.value+'</li>';
    }else {
        listData2 = list.join('');
    }
    autoBox2.innerHTML = listData2;
}
/////

//Tìm ga tàu (tìm kiếm không cần dấu)
gatauSearch.onkeyup = (e) => {
    //console.log(e.target.value)
    let checkData = slugName(e.target.value);
    let dataArray = []
    if(checkData){
        dataArray = recomentlist.filter((data) => {
            return slugName(data).startsWith(checkData);
        })
        
        dataArray = dataArray.map((data) => {
            return data = '<li>'+data+'</li>'
        })
        autoBox3.classList.add('active')
        showAdress3 (dataArray)
        let liItem = autoBox3.querySelectorAll("li")
        for(let i=0;i<liItem.length;i++){
            liItem[i].addEventListener("click",function(){
                gatauSearch.value = liItem[i].innerHTML
                autoBox3.classList.remove('active')
            })
        }
        //console.log(dataArray)
    }else{
        autoBox3.classList.add('active')
    }
}
function showAdress3 (list){
    let listData3
    if (!list.length) {
        listData3 = '<li>'+gatauSearch.value+'</li>'
    }else {
        listData3 = list.join('')
    }
    autoBox3.innerHTML = listData3
}
//

//////TÌM GA TÀU TRONG PHẦN TRANG CHỦ
gatauSearch.addEventListener("click", function(){
    autoBox3.classList.remove('active');
    let allDataArray = recomentlist.map((data) => {
        return data = '<li>'+data+'</li>'
    })
    autoBox3.classList.add('active')
    showAdress3 (allDataArray)
    let liItem = autoBox3.querySelectorAll("li")
    for(let i=0;i<liItem.length;i++){
        liItem[i].addEventListener("click",function(){
            gatauSearch.value = liItem[i].innerHTML
            autoBox3.classList.remove('active')
        })
    }
})
//

//Khi ckick ra khỏi ô tìm ga tàu thì bảng dữ liệu sẽ ẩn đi
document.addEventListener('click', function(event) {
    const isClickInsideInput = gatauSearch.contains(event.target);
    const isClickInsideBox = autoBox3.contains(event.target);
    if (!isClickInsideInput && !isClickInsideBox) {
        autoBox3.classList.remove('active');
    }
});
function showBox3() {
    const isActive = autoBox3.classList.contains('active');
    if (!isActive) {
        autoBox3.classList.add('active');
    }
}
gatauSearch.addEventListener('focus', showBox3);
////////

//////TÌM NƠI ĐI TRONG PHẦN TRANG CHỦ
inputSearch.addEventListener("click", function(){
    autoBox.classList.remove('active');
    let allDataArray = recomentlist.filter(data => data.toLowerCase().includes(inputSearch.value.toLowerCase())).map((data) => {
        return data = '<li>'+data+'</li>'
    })
    autoBox.classList.add('active')
    showAdress (allDataArray)
    let liItem = autoBox.querySelectorAll("li")
    for(let i=0;i<liItem.length;i++){
        liItem[i].addEventListener("click",function(){
            inputSearch.value = liItem[i].innerHTML
            autoBox.classList.remove('active')
        })
    }
})
//
function showAdress (list){
    let listData
    if (!list.length) {
        listData = '<li>'+inputSearch.value+'</li>'
    }else {
        listData = list.join('')
    }
    autoBox.innerHTML = listData
    //show các ga tàu khi click vào
    inputSearch.addEventListener("click", function() {
        document.querySelector(".table").classList.add("active");
    });
}
//Khi click ra khỏi ô tìm ga tàu thì bảng dữ liệu sẽ ẩn đi
document.addEventListener('click', function(event) {
    const isClickInsideInput = inputSearch.contains(event.target);
    const isClickInsideBox = autoBox.contains(event.target);
    if (!isClickInsideInput && !isClickInsideBox) {
        autoBox.classList.remove('active');
    }
});
function showBox() {
    const isActive = autoBox.classList.contains('active');
    if (!isActive) {
        autoBox.classList.add('active');
    }
}
inputSearch.addEventListener('focus', showBox);
//////

//////TÌM NƠI ĐẾN TRONG PHẦN TRANG CHỦ
outputSearch.addEventListener("click", function(){
    autoBox2.classList.remove('active');
    let allDataArray = recomentlist.map((data) => {
        return data = '<li>'+data+'</li>'
    })
    autoBox2.classList.add('active')
    showAdress2 (allDataArray)
    let liItem = autoBox2.querySelectorAll("li")
    for(let i=0;i<liItem.length;i++){
        liItem[i].addEventListener("click",function(){
            outputSearch.value = liItem[i].innerHTML
            autoBox2.classList.remove('active')
        })
    }
})
//
function showAdress2 (list){
    let listData
    if (!list.length) {
        listData = '<li>'+outputSearch.value+'</li>'
    }else {
        listData = list.join('')
    }
    autoBox2.innerHTML = listData
    //show các ga tàu khi click vào
    outputSearch.addEventListener("click", function() {
        document.querySelector(".table").classList.add("active");
    });
}
//Khi ckick ra khỏi ô tìm ga tàu thì bảng dữ liệu sẽ ẩn đi
document.addEventListener('click', function(event) {
    const isClickInsideInput = outputSearch.contains(event.target);
    const isClickInsideBox = autoBox2.contains(event.target);
    if (!isClickInsideInput && !isClickInsideBox) {
        autoBox2.classList.remove('active');
    }
});
function showBox() {
    const isActive = autoBox2.classList.contains('active');
    if (!isActive) {
        autoBox2.classList.add('active');
    }
}
outputSearch.addEventListener('focus', showBox);
//////


