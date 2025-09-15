document.addEventListener("DOMContentLoaded", () => {
  let user;
  let UserInfo;
  let allBookingData = [];
  let allInHouseData = [];
  let allarchiveData = [];
  let allCasehierData = [];
  let allCasehierArchiveData = [];
  let logoutBtn = document.querySelector(".logout-btn");
  let navBrand = document.querySelector(".navbar-brand");
  let bookingForm = document.querySelector(".booking-form");
  let inHouseForm = document.querySelector(".inHouse-form");
  let allBInput = bookingForm.querySelectorAll("input");
  let allInHouseInput = inHouseForm.querySelectorAll("input");
  let bTextArea = bookingForm.querySelector("textarea");
  let inHouseTextArea = inHouseForm.querySelector("textarea");
  let bList = document.getElementById("booking-list");
  let aList = document.getElementById("archive-list");
  let iNList = document.getElementById("cbtnHouse");
  let inHouseList = document.getElementById("inHouse-list");
  let searchEl = document.querySelector(".search-input");
  let cashierBtn = document.querySelector(".cashier-tab");
  let cashierTab = document.querySelector("#cashier");
  let bookingTab = document.querySelector("#booking");
  let allTBtn = document.querySelectorAll(".tab-btn");
  let cashierInput = document.querySelectorAll(".cashier-form input");
  let cashierForm = document.querySelector(".cashier-form ");
  let casehierList = document.querySelector("#cashier-list");
  let total = document.querySelector(".total");
  let totalArch = document.querySelector(".total-arch");
  let archiveCashierList = document.querySelector("#cashier-arch-list");
  let printBtn = document.querySelectorAll(".print-btn");
  let totalDataBook = document.querySelectorAll(".total-data-book");
  let showBookingCard = document.querySelector(".show-booking-rooms");
  let showInHouseCard = document.querySelector(".show-inHouse-rooms");

  let allBdataKey = "_allBData";
  let allInHouseKey = "_allInHouse";
  let archiveKey = "_allAcrhive";
  let casehierkey = "_name";
  let cashArchiveKey = "_caseArchive";

  if (sessionStorage.getItem("__au__") == null) {
    window.location = "../index.html";
    return; // Stop further execution
  }
  UserInfo = JSON.parse(sessionStorage.getItem("__au__"));
  navBrand.textContent = UserInfo.HotelName;
  user = UserInfo.email.split("@")[0];

  function checkRooms(elm) {
    if (Number(UserInfo.totalRoom) < Number(elm.value)) {
      swal("warning", `total rooms are:${UserInfo.totalRoom}`, "warning");
      elm.value= Number(UserInfo.totalRoom)
    }
  }
  allBInput[1].oninput = (e) => {
    checkRooms(e.target);
  };
  allInHouseInput[1].oninput = (e) => {
    checkRooms(e.target);
  };

  const fetching = (key) => {
    if (localStorage.getItem(key) != null) {
      return JSON.parse(localStorage.getItem(key));
    }
    return [];
  };

  allBookingData = fetching(user + "_allBData");
  allInHouseData = fetching(user + allInHouseKey);
  allarchiveData = fetching(user + archiveKey);
  allCasehierData = fetching(user + casehierkey);
  allCasehierArchiveData = fetching(user + cashArchiveKey);
  // prnit coding btn
  printBtn.forEach((elm) => {
    elm.addEventListener("click", () => {
      window.print();
    });
  });

  // total booking total archive
  function totalbook() {
    totalDataBook[0].innerText = `Total Booking = ${allBookingData.length}`;
    totalDataBook[1].innerText = `Total InHouse = ${allInHouseData.length}`;
    totalDataBook[2].innerText = `Total Archive = ${allarchiveData.length}`;
  }
  totalbook();

  logoutBtn.onclick = () => {
    logoutBtn.textContent = "Please Wait...";
    setTimeout(() => {
      sessionStorage.removeItem("__au__");
      window.location = "../index.html";
    }, 1000); // Added delay to see the text change
  };

  function dataIntoObj(arr, noticeValue) {
    let data = {
      notice: noticeValue && noticeValue.value,
      inhouse: false,
      createDate: new Date().toLocaleString(), // Better date formatting
    };
    arr.forEach((element) => {
      let key = element.name;
      let value = element.value;
      data[key] = value;
    });
    return data;
  }

  function registrationAllFun(list, arr, inputarr, noticeValue = null) {
    let data = dataIntoObj(inputarr, noticeValue);
    arr.unshift(data);
    if (list.id == "booking-list") {
      localStorage.setItem(user + allBdataKey, JSON.stringify(arr));
    } else if (list.id == "inHouse-list") {
      localStorage.setItem(user + allInHouseKey, JSON.stringify(arr));
    } else if (list.id == "cashier-list") {
      localStorage.setItem(user + "_name", JSON.stringify(arr));
    }
    swal("Good job!", "Booking Success", "success");
  }

  bookingForm.onsubmit = (e) => {
    e.preventDefault();
    registrationAllFun(bList, allBookingData, allBInput, bTextArea);
    showListData(allBookingData, bList, allBdataKey);
    bookingForm.reset();
    document.getElementById("cbtn").click(); // Ensure this button exists
  };

  cashierForm.onsubmit = (e) => {
    e.preventDefault();
    registrationAllFun(casehierList, allCasehierData, cashierInput, null);
    showCasehierData(allCasehierData, casehierList, casehierkey);
    cashierForm.reset();
    document.getElementById("cbtnc").click();
  };

  const showListData = (arr, list, key) => {
    totalbook();
    list.innerHTML = "";
    arr.forEach((value, index) => {
      list.innerHTML += `<tr>
      <td class="no-print">${index + 1}</td>
      <td>${value.Location}</td>
      <td>${value.roomNo}</td>
      <td>${value.Name}</td>
      <td>${value.Chekin}</td>
      <td>${value.checkOut}</td>
      <td>${value.people}</td>
      <td>${value.mobile}</td>
      <td>${value.price}</td> 
      <td>${value.notice}</td>
      <td>${value.createDate}</td>
            <td class="text-nowrap no-print">
            <button class="btn btn-primary edit-btn ${key == archiveKey && "d-none"
        }"><i class="fa fa-edit p-1 px-1 "></i></button>
            
            <button class="btn btn-primary check-btn"><i class="fa fa-check p-1 px-1"></i></button>
            <button class="btn btn-primary bg-danger delete-btn"><i class="fa fa-trash p-1 px-1"></i></button>
            </td>
            </tr>`;
    });
    deleteDataFunction(list, arr, key);
    showCardInhouse();
    updateDataFunction(list, key, arr);
    checkInCheckOut(list, key, arr);
    showCardBooking();
  };

  // async function main() {
  showListData(allBookingData, bList, allBdataKey);
  showListData(allInHouseData, inHouseList, allInHouseKey);
  showListData(allarchiveData, aList, archiveKey);
  // }
  // main();

  //update fuction coding
  function updateDataFunction(list, key, arr) {
    const allEditBtn = list.querySelectorAll(".edit-btn");
    allEditBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        if (list.id == "booking-list") {
          document.getElementById("reg-btn").click(); // Check if this button exists◘
        } else if (list.id == "inHouse-list") {
          document.getElementById("inHousebtn").click(); // Check if this button exists◘
        }
        let tem = key.split("_")[1];
        let allBBtn =
          tem == "allBData"
            ? bookingForm.querySelectorAll("button")
            : inHouseForm.querySelectorAll("button");
        let notice = tem == "allBData" ? bTextArea : inHouseTextArea;
        allBBtn[0].classList.add("d-none");
        allBBtn[1].classList.remove("d-none");

        let formdata = JSON.parse(localStorage.getItem(user + key));
        let fillForm = formdata[index];
        let inp = tem == "allBData" ? allBInput : allInHouseInput;
        for (let i in fillForm) {
          inp.forEach((el) => {
            if (el.name == i) {
              el.value = fillForm[i];
            }
          });
        }

        allBBtn[1].onclick = () => {
          let updatedData = dataIntoObj(inp, notice);
          arr[index] = updatedData;
          localStorage.setItem(user + key, JSON.stringify(arr));
          showListData(arr, list, key);
          tem == "allBData" ? bookingForm.reset("") : inHouseForm.reset("");
          tem == "allBData"
            ? document.getElementById("cbtn").click()
            : document.getElementById("inHousebtn").click();
          // Ensure this button exists
          allBBtn[0].classList.remove("d-none");
          allBBtn[1].classList.add("d-none");
        };
      });
    });
  }

  // check in and check out Function coding;

  function checkInCheckOut(list, key, arr) {
    const checkingBtn = list.querySelectorAll(".check-btn");
    checkingBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        if (key === allBdataKey) {
          totalbook();
          showCardBooking();
          showCardInhouse();
          allInHouseData.unshift(allBookingData[index]);
          localStorage.setItem(
            user + allInHouseKey,
            JSON.stringify(allInHouseData)
          );
          showListData(allInHouseData, inHouseList, allInHouseKey);
          arr.splice(index, 1);
          localStorage.setItem(user + key, JSON.stringify(arr));
          showListData(arr, list, key);
          swal("Data added in inHouse list", { icon: "success" });
        } else if (key === allInHouseKey) {
          totalbook();
          showCardInhouse();
          showCardBooking();
          allarchiveData.unshift(allInHouseData[index]);
          localStorage.setItem(
            user + archiveKey,
            JSON.stringify(allarchiveData)
          );
          showListData(allarchiveData, aList, archiveKey);
          arr.splice(index, 1);
          localStorage.setItem(user + key, JSON.stringify(arr));
          showListData(arr, list, key);
          swal("Data added in archive list", { icon: "success" });
        } else if (key === archiveKey) {
          totalbook();
          showCardBooking();
          showCardInhouse();
          allBookingData.unshift(allarchiveData[index]);
          localStorage.setItem(
            user + allBdataKey,
            JSON.stringify(allBookingData)
          );
          showListData(allBookingData, bList, allBdataKey);
          arr.splice(index, 1);
          localStorage.setItem(user + key, JSON.stringify(arr));
          showListData(arr, list, key);
          swal("Data added in booking list", { icon: "success" });
        }
      });
    });
  }

  // delete function coding

  function deleteDataFunction(list, arr, key) {
    totalbook();
    showCardBooking();

    const allDBtn = list.querySelectorAll(".delete-btn");
    allDBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this data!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            arr.splice(index, 1);
            localStorage.setItem(user + key, JSON.stringify(arr));

            showListData(arr, list, key);
            swal("Poof! Your record has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Your data is safe!");
          }
        });
      });
    });
  }

  function showCardBooking() {
    showBookingCard.innerHTML = "";
    allBookingData.forEach((val, index) => {
      showBookingCard.innerHTML += `<div class="col-md-2 px-0 card">
                                    <div class="card-header  fw-bold bg-danger text-white text-center">
                                        ${val.roomNo}
                                    </div>
                                    <div class="card-body fw-bold bg-success text-white text-center">
                                        <p>${val.Chekin}</p>
                                        <p>To</p>
                                        <p>${val.checkOut}</p>
                                      
                                    </div>
                                </div>`;
    });
  }
  showCardBooking();
  function showCardInhouse() {
    showInHouseCard.innerHTML = "";
    allInHouseData.forEach((val, index) => {
      showInHouseCard.innerHTML += `<div class="col-md-2 px-0 card">
                                    <div class="card-header  fw-bold bg-danger text-white text-center">
                                        ${val.roomNo}
                                    </div>
                                    <div class="card-body fw-bold bg-success text-white text-center">
                                         <img src="${val.inhouse
          ? "https://www.worldcancercare.co.in/temp1/images/dummy.png"
          : "https://www.shutterstock.com/image-vector/3d-realistic-yellow-locked-padlock-260nw-2067940034.jpg"
        } " alt="" class="w-100">
                                      
                                    </div>
                                    <div class="card-footer text-center">
                                        <button class="btn in-btn btn-primary ">In</button>
                                        <button class="btn out-btn btn-primary ">out</button>
                                    </div>
                                </div>`;
    });


    let allInBtn = document.querySelectorAll(".in-btn");

    allInBtn.forEach((item, index) => {
      item.onclick =()=>  {
        let data = allInHouseData[index];
        data.inhouse = true;
        allInHouseData[index] = data;
        localStorage.setItem(user+allInHouseKey,JSON.stringify(allInHouseData));
        showCardInhouse();
      };
    });
  
    let allOutBtn = document.querySelectorAll(".out-btn");
  
  
    allOutBtn.forEach((item, index) => { 
      item.onclick =()=> {
        let data1 = allInHouseData[index];
        data1.inhouse = false;
        allInHouseData[index] = data1;
        localStorage.setItem(user+allInHouseKey,JSON.stringify(allInHouseData));
        showCardInhouse();
      };
    });



  }
  showCardInhouse();

  


  const searchFun = () => {
    let value = searchEl.value.toLowerCase();
    let tableEl = document.querySelector(".tab-content .search-tab.active");
    let tr = tableEl.querySelectorAll("tbody tr");

    for (elm of tr) {
      let el = elm.querySelectorAll("td");
      let SNO = el[0].innerText;
      let location = el[1].innerText;
      let name = el[3].innerText;
      let roomNo = el[2].innerText;
      let mobile = el[7].innerText;
      if (
        SNO.indexOf(value) != -1 ||
        location.toLowerCase().indexOf(value) != -1 ||
        name.toLowerCase().indexOf(value) != -1 ||
        roomNo.indexOf(value) != -1 ||
        mobile.indexOf(value) != -1
      ) {
        elm.classList.remove("d-none");
      } else {
        elm.classList.add("d-none");
      }
    }
  };

  searchEl.addEventListener("input", () => {
    searchFun();
  });

  inHouseForm.onsubmit = (e) => {
    e.preventDefault();
    registrationAllFun(
      inHouseList,
      allInHouseData,
      allInHouseInput,
      inHouseTextArea
    );
    showListData(allInHouseData, inHouseList, allInHouseKey);
    inHouseForm.reset();
    iNList.click(); // Ensure this button exists
  };

  // casehier coding

  function showCasehierData(arr, list, key) {
    let totalcase = 0;
    list.innerHTML = "";
    arr.forEach((value, index) => {
      totalcase += +value.Amount;
      list.innerHTML += `<tr>
      <td>${index + 1}</td>
      <td>${value.roomNo}</td>
      <td>${value.cashiername}</td>
      <td>${value.createDate}</td>
      <td>${value.Amount}</td>
      </tr>`;
    });
    total.innerText = totalcase;
  }
  showCasehierData(allCasehierData, casehierList, casehierkey);

  cashierBtn.addEventListener("click", () => {
    if (sessionStorage.getItem("c_name") == null) {
      let name = prompt("enter name");
      if (name) {
        sessionStorage.setItem("c_name", name);
        cashierInput[0].value = sessionStorage.getItem("c_name");

      } else {
        allTBtn[0].classList.add("active");
        bookingTab.classList.add("active");
        cashierBtn.classList.remove("active");
        cashierTab.classList.remove("active");
      }
    } else {
      cashierInput[0].value = sessionStorage.getItem("c_name");
    }
  });
  let a = document.querySelector(".addcash")
  a.onclick=()=>{
    if (sessionStorage.getItem("c_name") == null) {
      let name = prompt("enter Cashier name");
      if (name) {
        sessionStorage.setItem("c_name", name);
        cashierInput[0].value = sessionStorage.getItem("c_name");

      }
      else {
        cashierInput[0].value = sessionStorage.getItem("c_name");
      }
    }
  }
  

  function showArchiveCash() {
    let totalcase = 0;

    archiveCashierList.innerHTML = "";
    allCasehierArchiveData.forEach((value, index) => {
      totalcase += +value.cashTotal;
      archiveCashierList.innerHTML += `<tr>
      <td>${index + 1}</td>
      
      <td>${value.cashiername}</td>
      <td>${value.createdAt}</td>
      <td>${value.cashTotal}</td>
      </tr>`;
    });
    totalArch.innerText = totalcase;
  }
  showArchiveCash();
  document.getElementById("archivebtn").addEventListener("click", () => {
    showArchiveCash();
  });

  // close cashier btn coding

  let closeCashierbtn = document.querySelector(".close-cashier-btn");
  closeCashierbtn.onclick = () => {
    if (allCasehierData.length > 0) {
      let data = {
        cashiername: sessionStorage.getItem("c_name"),
        cashTotal: total.innerHTML,
        createdAt: new Date(),
      };
      allCasehierArchiveData.unshift(data);
      allCasehierData = [];
      localStorage.removeItem(user + casehierkey);
      localStorage.setItem(
        user + cashArchiveKey,
        JSON.stringify(allCasehierArchiveData)
      );

      showCasehierData(allCasehierData, casehierList, casehierkey);
      sessionStorage.removeItem("c_name")
    } else {
      swal("Warning", "there is no cashier to close amount", "warning");
    }
  };
});
