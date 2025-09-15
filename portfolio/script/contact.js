let button = document.getElementById("submit");
let form = document.querySelector("form");
function text(inp) {
  let a = inp.textContent;
  let b = a.split(" *");
  inp.textContent = b[0];
}

async function validation(e) {
  e.preventDefault();
  val = true;
  let namereg = /^[a-zA-Z/s]+$/;

  let nameval = form.fullname.value;
  let spn = form.fullname.parentElement.querySelector("span");
  text(spn);
  if (nameval.length < 3) {
    form.fullname.focus();
    spn.textContent += "  * name is to short";

    val = false;
  } else if (nameval.match(namereg)) {
    val = true;
  } else {
    alert("enter valid name");
    val = false;
  }

  return val;
}
form.addEventListener("submit", async (e) => {
  await validation(e).then((val) => {
    if (val != false) {
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "vipgurjar60@gmail.com",
        Password: "E9BE55A2C2906324DCD845E5C3054FCC9D5C",
        To: "vipgurjar60@gmail.com",
        From: form.email.value,
        Subject: "This is the subject",
        Body: "And this is the body",
      }).then((message) => alert(message));
      form.reset();
    }
  });
});
