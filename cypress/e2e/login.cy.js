describe("Login test", () => {
  it.only("should login Fail", () => {
    const interceptedData = [];
    let loginRequest;
    //   ดึงข้อมูลจากไฟล์ intercepted_post_data.json
    cy.fixture("intercepted_post_data.json").then((apiData) => {
      // ใช้ข้อมูลตัวแรกจาก array
      loginRequest = apiData[0];
      // คาดหวังว่า status code จะเป็น 200
      expect(loginRequest.statusCode).to.eq(200);
      
      cy.request({
        method: loginRequest.method,
        url: loginRequest.url,
        body: loginRequest.requestBody,
        failOnStatusCode: false,
      }).then((res) => {
        cy.log("Response Body:", JSON.stringify(res.body, null, 2));
      });
    });

  });
});
