
let feedbackObj = {};
fetch("http://localhost:8080/product/productDetails", {
    method: "GET",
    headers: {
        'Content-type': 'Application/json',
        'token': `${key}`
    }
})
    .then(res => res.json())
    .then((data) => {
        if (data.isError) {
            return
        }
        console.log(data);
        appendForm(data.product.triggerPoints.seconds, data.product.triggerPoints.scrollUp, data.product.triggerPoints.scrollDown, data.product.triggerPoints.selectors, data.product._id, data.product.productName);
    })








function appendForm(seconds, scrollup, scrolldown, selectors, id, productName) {
    let flag = true;
    let bigcont = document.createElement("div");
    bigcont.style.width = "600px";
    bigcont.style.backgroundColor = "white";
    bigcont.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    bigcont.style.borderRadius = "10px";
    bigcont.style.position = "fixed";
    bigcont.style.top = "50%";
    bigcont.style.left = "50%";
    bigcont.style.opacity = 1;
    bigcont.style.transform = "translate(-50%, -50%)scale(1)";
    bigcont.style.transition = "top 0ms ease-in-out 0.5ms, opacity 200ms ease-in-out 0.5ms, transform 20ms ease-in-out 0.5ms";

    let closediv = document.createElement("div");
    let closebtn = document.createElement("button");
    closebtn.innerHTML = "&#10006;";
    closebtn.addEventListener("click", () => {
        bigcont.remove();
        if (feedbackObj.rating) {
            feedbackObj.productID = id;
            fetch("http://localhost:8080/feedback", {
                method: "POST",
                headers: {
                    'Content-type': 'Application/json',
                },
                body: JSON.stringify(feedbackObj)
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.isError) {
                        console.log(data.error);
                        return
                    }
                    console.log(data.message);
                })
        }
    })
    closebtn.style.fontSize = "20px";
    closebtn.style.width = "30px";
    closebtn.style.height = "30px";
    closebtn.style.position = "absolute";
    closebtn.style.top = "2%";
    closebtn.style.left = "94.7%";
    closebtn.style.borderRadius = "50%";
    closebtn.style.backgroundColor = "white";
    closebtn.style.border = "none";
    closebtn.style.outline = "none";
    closebtn.addEventListener("mouseover", () => {
        closebtn.style.backgroundColor = "red";
        closebtn.style.cursor = "pointer";
    });
    closebtn.addEventListener("mouseout", () => {
        closebtn.style.backgroundColor = "white";
        closebtn.style.cursor = "default";
    });

    closediv.append(closebtn);
    let formBox = document.createElement("div");

    let a = ratingCard();
    formBox.append(a);
    formBox.style.width = "100%";
    bigcont.append(closediv, formBox)


    setTimeout(() => {
        if (flag) {
            document.body.append(bigcont);
            flag = false
        }
    }, seconds * 1000);

    for (let i = 0; i < selectors.length; i++) {
        document.querySelector(`${selectors[i]}`).addEventListener("click", (e) => {
            if (flag) {
                e.preventDefault();
                document.body.append(bigcont);
                flag = false;
            }
        })
    }

    window.addEventListener("scroll", handleScroll);



    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / pageHeight) * 100;
        if ((scrollPercentage >= scrolldown) && flag) {
            document.body.append(bigcont);
            flag = false;
            console.log("jmd");
            window.removeEventListener("scroll", handleScroll);
        }
        // if ((scrollPercentage < (100-scrollup)) && flag) {
        //     document.body.append(bigcont);
        //     flag = false;
        //     window.removeEventListener("scroll", handleScroll);
        // }
    }
    function ratingCard() {
        let card = document.createElement("div");
        card.classList.add("ratingCard");
        card.style.padding = "30px 0px 0px 0px";
        let h1 = document.createElement("h1");
        h1.textContent = "How was your experience today?";
        h1.style.textAlign = "center";
        h1.style.marginBottom = "20px";
        let btns = document.createElement("div");
        btns.classList.add("ratingbtns");
        btns.style.width = "100%";
        btns.style.display = "flex";
        btns.style.justifyContent = "space-between";
        btns.style.alignItems = "center";
        btns.style.marginBottom = "40px"
        let b1 = document.createElement("button");
        b1.textContent = "😔";
        b1.classList.add("ratebtn");
        b1.addEventListener("click", (e) => {
            feedbackObj.rating = 1;
            e.preventDefault();
            appendForm(getFeedbackCard);
        })
        b1.style.fontSize = "40px";
        b1.style.border = "none";
        b1.style.outline = "none";
        b1.style.padding = "10px";
        b1.style.borderRadius = "10px";
        b1.addEventListener("mouseenter", () => {
            b1.style.backgroundColor = "rgb(186, 186, 186)";
            b1.style.cursor = "pointer";
        })
        b1.addEventListener("mouseleave", () => {
            b1.style.backgroundColor = "";
            b1.style.cursor = "default";
        })
        let b2 = document.createElement("button");
        b2.textContent = "🙁";
        b2.classList.add("ratebtn");
        b2.addEventListener("click", (e) => {
            feedbackObj.rating = 2
            e.preventDefault();
            appendForm(getFeedbackCard);
        })
        b2.style.fontSize = "40px";
        b2.style.border = "none";
        b2.style.outline = "none";
        b2.style.padding = "10px";
        b2.style.borderRadius = "10px";
        b2.addEventListener("mouseenter", () => {
            b2.style.backgroundColor = "rgb(186, 186, 186)";
            b2.style.cursor = "pointer";
        })
        b2.addEventListener("mouseleave", () => {
            b2.style.backgroundColor = "";
            b2.style.cursor = "default";
        })
        let b3 = document.createElement("button");
        b3.textContent = "😐";
        b3.classList.add("ratebtn");
        b3.addEventListener("click", (e) => {
            feedbackObj.rating = 3
            e.preventDefault();
            appendForm(getFeedbackCard);
        })
        b3.style.fontSize = "40px";
        b3.style.border = "none";
        b3.style.outline = "none";
        b3.style.padding = "10px";
        b3.style.borderRadius = "10px";
        b3.addEventListener("mouseenter", () => {
            b3.style.backgroundColor = "rgb(186, 186, 186)";
            b3.style.cursor = "pointer";
        })
        b3.addEventListener("mouseleave", () => {
            b3.style.backgroundColor = "";
            b3.style.cursor = "default";
        })
        let b4 = document.createElement("button");
        b4.textContent = "🙂";
        b4.classList.add("ratebtn");
        b4.addEventListener("click", (e) => {
            feedbackObj.rating = 4;
            e.preventDefault();
            appendForm(getFeedbackCard);
        })
        b4.style.fontSize = "40px";
        b4.style.border = "none";
        b4.style.outline = "none";
        b4.style.padding = "10px";
        b4.style.borderRadius = "10px";
        b4.addEventListener("mouseenter", () => {
            b4.style.backgroundColor = "rgb(186, 186, 186)";
            b4.style.cursor = "pointer";
        })
        b4.addEventListener("mouseleave", () => {
            b4.style.backgroundColor = "";
            b4.style.cursor = "default";
        })
        let b5 = document.createElement("button");
        b5.textContent = "😄";
        b5.classList.add("ratebtn");
        b5.addEventListener("click", (e) => {
            feedbackObj.rating = 5;
            e.preventDefault();
            appendForm(getFeedbackCard);

        })
        b5.style.fontSize = "40px";
        b5.style.border = "none";
        b5.style.outline = "none";
        b5.style.padding = "10px";
        b5.style.borderRadius = "10px";
        b5.addEventListener("mouseenter", () => {
            b5.style.backgroundColor = "rgb(186, 186, 186)";
            b5.style.cursor = "pointer";
        })
        b5.addEventListener("mouseleave", () => {
            b5.style.backgroundColor = "";
            b5.style.cursor = "default";
        })
        btns.append(b1, b2, b3, b4, b5);
        let footer = document.createElement("div");
        footer.classList.add("footer");
        footer.style.backgroundColor = "gainsboro";
        footer.style.display = "flex";
        footer.style.justifyContent = "center";
        footer.style.padding = "5px";
        footer.style.borderRadius = " 0px 0px 10px 10px";
        let pbtm = document.createElement("a");
        pbtm.textContent = "Powered By Feedback.io"
        pbtm.setAttribute("href", "./index.html");
        pbtm.style.textAlign = "center";
        pbtm.style.textDecoration = "none";
        footer.append(pbtm);
        card.append(h1, btns, footer)
        return card;
    }
    function getFeedbackCard() {
        let card = document.createElement("div");
        card.classList.add("feedbackCard");
        card.style.padding = "30px 0px 0px 0px";
        let h1 = document.createElement("h1");
        h1.style.textAlign = "center";
        if (feedbackObj.rating > 3) {
            h1.textContent = `What did you like about ${productName}?`;
        }
        else {
            h1.textContent = `How can we improve ${productName}`;
        }

        let box = document.createElement("textarea");
        box.setAttribute("placeholder", "Your feedback here");
        box.style.marginTop = "30px";
        box.style.marginLeft = "64px";
        box.style.height = "60px";
        box.style.padding = "10px";
        box.style.fontSize = "18px";
        box.style.border = "1px solid black";
        box.style.outline = "none";
        box.style.borderRadius = "10px";
        box.style.width = "460px"
        let div = document.createElement("div");
        div.classList.add("check");
        div.style.marginTop = "20px";
        div.style.display = "flex";
        div.style.padding = "0px 64px 0px 64px";
        let inp = document.createElement("input");
        inp.setAttribute("type", "checkbox");
        inp.checked = true;
        inp.style.marginRight = "10px";
        let p = document.createElement("p");
        p.innerText = "Make public: Permission to share your feedback on our website really helps us grow."
        div.append(inp, p);
        let div2 = document.createElement("div");
        div2.classList.add("nextprevbtn");
        div2.style.margin = " 20px 64px";
        div2.style.display = "flex";
        div2.style.alignItems = "center";
        div2.style.justifyContent = "space-between";
        let next = document.createElement("button");
        next.textContent = "Next";
        next.disabled = true;
        next.style.fontSize = "20px";
        next.style.padding = "5px";
        next.style.border = "none";
        next.style.outline = "none";
        next.style.backgroundColor = "navy"
        next.style.color = "white";
        next.style.borderRadius = "5px";
        next.addEventListener("mouseenter", () => {
            next.style.cursor = "pointer";
        })
        next.addEventListener("mouseleave", () => {
            next.style.cursor = "default";
        })
        next.addEventListener("click", () => {
            if (box.value) {
                feedbackObj.feedback = box.value;
                if (inp.checked) {
                    feedbackObj.public = true;
                }
                else {
                    feedbackObj.public = false;
                }
                appendForm(userDetailsForm);
            }
        })
        let prev = document.createElement("button");
        prev.textContent = "Back";
        prev.addEventListener("click", () => {
            appendForm(ratingCard);
        })
        prev.style.fontSize = "20px";
        prev.style.padding = "5px";
        prev.style.border = "none";
        prev.style.outline = "none";
        prev.style.backgroundColor = "navy";
        prev.style.color = "white";
        prev.style.borderRadius = "5px";
        prev.addEventListener("mouseenter", () => {
            prev.style.cursor = "pointer";
        })
        prev.addEventListener("mouseleave", () => {
            prev.style.cursor = "default";
        })
        box.addEventListener("input", (e) => {
            e.preventDefault()
            if (inp.value.trim() != "") {
                next.disabled = false;
            }
            else {
                next.disabled = true;
            }
        })
        div2.append(prev, next);
        let footer = document.createElement("div");
        footer.classList.add("footer");
        footer.style.backgroundColor = "gainsboro";
        footer.style.display = "flex";
        footer.style.justifyContent = "center";
        footer.style.padding = "5px";
        footer.style.borderRadius = " 0px 0px 10px 10px";
        let pbtm = document.createElement("a");
        pbtm.textContent = "Powered By Feedback.io"
        pbtm.setAttribute("href", "./index.html");
        pbtm.style.textAlign = "center";
        pbtm.style.textDecoration = "none";
        footer.append(pbtm);
        card.append(h1, box, div, div2, footer);
        return card
    }
    function userDetailsForm() {
        let card = document.createElement("div");
        card.classList.add("userDetailsForm");
        card.style.padding = "20px 0px 0px 0px";
        let h2 = document.createElement("h2");
        h2.textContent = "Almost Done !";
        h2.style.margin = "0px 20px 10px 20px"
        let p = document.createElement("p");
        p.style.fontSize = "20px";
        p.style.margin = "0px 20px 10px 20px";
        p.textContent = "We need a few details to show next to your testimonial."
        let form = document.createElement("form");
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.margin = "0px 20px";
        const emailLabel = document.createElement('label');
        emailLabel.setAttribute('for', 'email');
        emailLabel.textContent = 'Your Email';
        emailLabel.style.marginBottom = "5px";
        emailLabel.style.fontSize = "18px";
        const emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'text');
        emailInput.setAttribute('id', 'email');
        emailInput.setAttribute('placeholder', 'Enter your email');
        emailInput.style.height = "30px";
        emailInput.style.fontSize = "18px";
        emailInput.style.outline = "none";
        emailInput.style.padding = "0px 5px";
        emailInput.style.border = "1px solid black";
        emailInput.style.borderRadius = "5px";
        emailInput.style.marginBottom = "5px";

        // Create div elements for first name and last name
        const nameDiv = document.createElement('div');
        nameDiv.style.margin = "10px 0px";
        nameDiv.style.display = "flex";

        // Create the label and input element for first name
        const fnameLabel = document.createElement('label');
        fnameLabel.setAttribute('for', 'fname');
        fnameLabel.textContent = 'First Name';
        fnameLabel.style.fontSize = "18px";
        const fnameInput = document.createElement('input');
        fnameInput.setAttribute('type', 'text');
        fnameInput.setAttribute('id', 'fname');
        fnameInput.setAttribute('placeholder', 'Enter your first name');
        fnameInput.style.height = "30px";
        fnameInput.style.fontSize = "18px";
        fnameInput.style.outline = "none";
        fnameInput.style.padding = "0px 5px";
        fnameInput.style.border = "1px solid black";
        fnameInput.style.borderRadius = "5px";

        // Create the label and input element for last name
        const lnameLabel = document.createElement('label');
        lnameLabel.setAttribute('for', 'lname');
        lnameLabel.textContent = 'Last Name';
        lnameLabel.style.fontSize = "18px";
        const lnameInput = document.createElement('input');
        lnameInput.setAttribute('type', 'text');
        lnameInput.setAttribute('id', 'lname');
        lnameInput.setAttribute('placeholder', 'Enter your last name');
        lnameInput.style.height = "30px";
        lnameInput.style.fontSize = "18px";
        lnameInput.style.outline = "none";
        lnameInput.style.padding = "0px 5px";
        lnameInput.style.border = "1px solid black";
        lnameInput.style.borderRadius = "5px";
        let fnamediv = document.createElement("div");
        let lnamediv = document.createElement("div");
        fnamediv.append(fnameLabel, fnameInput);
        lnamediv.append(lnameLabel, lnameInput);
        // Append first name and last name elements to the nameDiv
        nameDiv.appendChild(fnamediv);
        nameDiv.appendChild(lnamediv);
        const socialLabel = document.createElement('label');
        socialLabel.setAttribute('for', 'social');
        socialLabel.textContent = 'Enter your Social Media Link (Optional)';
        socialLabel.style.marginBottom = "5px";
        socialLabel.style.fontSize = "18px";
        const socialInput = document.createElement('input');
        socialInput.setAttribute('type', 'text');
        socialInput.setAttribute('id', 'social');
        socialInput.setAttribute('placeholder', 'Social Media Link');
        socialInput.style.height = "30px";
        socialInput.style.fontSize = "18px";
        socialInput.style.outline = "none";
        socialInput.style.padding = "0px 5px";
        socialInput.style.border = "1px solid black";
        socialInput.style.borderRadius = "5px";
        socialInput.style.marginBottom = "5px";
        form.appendChild(emailLabel);
        form.appendChild(emailInput);
        form.appendChild(nameDiv);
        form.appendChild(socialLabel);
        form.appendChild(socialInput);
        let div2 = document.createElement("div");
        div2.classList.add("nextprevbtn");
        div2.style.margin = " 20px 64px";
        div2.style.display = "flex";
        div2.style.alignItems = "center";
        div2.style.justifyContent = "space-between";
        let next = document.createElement("button");
        next.textContent = "Submit";
        next.style.fontSize = "20px";
        next.style.padding = "5px";
        next.style.border = "none";
        next.style.outline = "none";
        next.style.backgroundColor = "navy"
        next.style.color = "white";
        next.style.borderRadius = "5px";
        next.addEventListener("mouseenter", () => {
            next.style.cursor = "pointer";
        })
        next.addEventListener("mouseleave", () => {
            next.style.cursor = "default";
        })
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (emailInput.value) {
                feedbackObj.email = emailInput.value;
                feedbackObj.firstName = fnameInput.value;
                feedbackObj.lastName = lnameInput.value;
                feedbackObj.social = socialInput.value;
                feedbackObj.productID = id;
                fetch("http://localhost:8080/feedback", {
                    method: "POST",
                    headers: {
                        'Content-type': 'Application/json',
                    },
                    body: JSON.stringify(feedbackObj)
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.isError) {
                            console.log(data.error);
                            bigcont.remove();
                            feedbackObj = {};
                            return
                        }
                        alert(data.message);
                        bigcont.remove();
                        feedbackObj = {};
                    })
            }
        })
        next.addEventListener("click", (e) => {
            e.preventDefault();
            if (emailInput.value) {
                feedbackObj.email = emailInput.value;
                feedbackObj.firstName = fnameInput.value;
                feedbackObj.lastName = lnameInput.value;
                feedbackObj.social = socialInput.value;
                feedbackObj.productID = id;
                fetch("http://localhost:8080/feedback", {
                    method: "POST",
                    headers: {
                        'Content-type': 'Application/json',
                    },
                    body: JSON.stringify(feedbackObj)
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.isError) {
                            console.log(data.error);
                            bigcont.remove();
                            feedbackObj = {};
                            return
                        }
                        alert(data.message);
                        bigcont.remove();
                        feedbackObj = {};
                    })
            }

        })
        let prev = document.createElement("button");
        prev.textContent = "Back";
        prev.addEventListener("click", (e) => {
            e.preventDefault();
            appendForm(getFeedbackCard);
        })
        prev.style.fontSize = "20px";
        prev.style.padding = "5px";
        prev.style.border = "none";
        prev.style.outline = "none";
        prev.style.backgroundColor = "navy";
        prev.style.color = "white";
        prev.style.borderRadius = "5px";
        prev.addEventListener("mouseenter", () => {
            prev.style.cursor = "pointer";
        })
        prev.addEventListener("mouseleave", () => {
            prev.style.cursor = "default";
        })
        div2.append(prev, next);
        let footer = document.createElement("div");
        footer.classList.add("footer");
        let pbtm = document.createElement("a");
        pbtm.textContent = "Powered By Feedback.io"
        pbtm.setAttribute("href", "./index.html");
        footer.append(pbtm);
        footer.style.backgroundColor = "gainsboro";
        footer.style.display = "flex";
        footer.style.justifyContent = "center";
        footer.style.padding = "5px";
        footer.style.borderRadius = " 0px 0px 10px 10px";
        pbtm.style.textAlign = "center";
        pbtm.style.textDecoration = "none";
        card.append(h2, p, form, div2, footer);
        return card;
    }
    function appendForm(func) {
        formBox.innerHTML = "";
        let a = func();
        formBox.append(a);
    }
}









