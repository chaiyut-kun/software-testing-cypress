// === general ===
const URL = "https://robot-lab-five.vercel.app/";
const API_URL = "https://robot-lab.onrender.com/api";
const timeSleep = 2000;
const webTitle = "Lobot Framework Lab";
const formButton = "form > button";
// === login ===
const errorMessage = "Invalid email or password";
const sucessMessage = "Login successful! Welcome, ";
const userName = "cy";
const email = "cy@mail.com";
const password = "cy";
const loginButton = ".nav-btn-login";
const loginEmail = "#loginEmail";
const loginPassword = "#loginPassword";
// === register ===
const registerSucessMessage = "Registration successful! Welcome, ";
const registerErrorMessage = "User already exists";
const registerButton = ".nav-btn-register";
const registerFirstname = "#firstName";
const registerLastname = "#lastName";
const registerEmail = "#email";
const registerPassword = "#password";
const regisFirstname = "test";
const regisLastname = "test";
let regisEmail = "test@emil.com";
const regisPassword = "test";

describe("test", () => {
  // ======= Login =======
  it("should login successfully", () => {
    const interceptedData = interceptTest([]);

    cy.visit(URL);
    cy.get(".logo").should("have.text", webTitle);
    cy.wait(timeSleep);

    cy.get(loginButton).click();
    cy.wait(timeSleep);
    cy.get(loginEmail).type(email);
    cy.wait(timeSleep);
    cy.get(loginPassword).type(password);
    cy.wait(timeSleep);
    // click login button
    cy.get(formButton).click({ force: true });

    cy.wait("@anyApiPost"); // รอ POST request ให้ครบก่อน

    cy.get(".message")
      .invoke("text")
      .then((text) => {
        cy.log(text);

        if (text === sucessMessage + userName + "!") {
          cy.screenshot("login/login-success.png");
          saveInterceptedData(interceptedData, "login-success", true);
        } else if (text === errorMessage) {
          cy.screenshot("login/login-fail.png");
          saveInterceptedData(interceptedData, "login-fail", false);
        } else {
          cy.screenshot("login/login-unknown.png");
          saveInterceptedData(interceptedData, "login-unknown", false);
        }
      });
  });

  // ======= Register =======
  it.only("should Register Successfully", () => {
    let interceptedData = [];

    for (let i = 0; i < 10; i++) {
      interceptedData = interceptTest(interceptedData);

      cy.visit(URL);
      cy.get(".logo").should("have.text", webTitle);
      cy.wait(timeSleep);
      cy.get(registerButton).click();
      cy.wait(timeSleep);
      cy.get(registerFirstname).type(regisFirstname);
      cy.wait(timeSleep);
      cy.get(registerLastname).type(regisLastname);
      cy.wait(timeSleep);
      regisEmail = regisEmail.slice(0, 4) + i + regisEmail.slice(4);
      cy.get(registerEmail).type(regisEmail);
      cy.wait(timeSleep);
      cy.get(registerPassword).type(regisPassword);
      cy.wait(timeSleep);
      cy.get(formButton).click({ force: true });

      cy.get(".message")
        .invoke("text")
        .then((text) => {
          cy.log(text);

          if (text === registerSucessMessage + userName + "!") {
            cy.screenshot("register/register-success.png");
            saveInterceptedData(interceptedData, "register-success", true);
          } else if (text === registerErrorMessage) {
            cy.screenshot("register/register-fail.png");
            saveInterceptedData(interceptedData, "register-fail", false);
          } else {
            cy.screenshot("register/register-unknown.png");
            saveInterceptedData(interceptedData, "register-unknown", false);
          }
        });

        saveInterceptedData(interceptedData, "register", true);
      }
  });
});

function saveInterceptedData(interceptedData, fileName, status) {
  const path = status ? "success" : "fail";
  cy.writeFile(
    `cypress/fixtures/intercepted_post-${fileName}-${path}.json`,
    interceptedData,
    {
      log: true,
    }
  );
}

function interceptTest(interceptedData) {
  cy.intercept("POST", API_URL + "/** ", (req) => {
    req.continue((res) => {
      // ดึง request และ response แล้วเก็บใน interceptData
      interceptedData.push({
        url: req.url,
        method: req.method,
        requestBody: req.body,
        responseBody: res.body,
        statusCode: res.statusCode,
      });
    });
  }).as("anyApiPost");

  return interceptedData;
}
