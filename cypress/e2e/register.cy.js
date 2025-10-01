// ทดสอบ Api การสมัครสมาชิกว่ามีการยิง ไปที่ url ไหนบ้าง method อะไรบ้างพร้อม Cap หน้าจอ
describe("Register test", () => {
    it.only("should register successfully", () => {

      for (let i = 0; i < 10; i++) {
        const interceptedData = [];
        let registerRequest;
        //   ดึงข้อมูลจากไฟล์ intercepted_post_data.json
        cy.fixture("intercepted_post-register-fail-fail.json").then((apiData) => {
          // ใช้ข้อมูลตัวแรกจาก array
        registerRequest = apiData[0];
        // คาดหวังว่า status code จะเป็น 400 เนื่องจาก user already exists
        expect(registerRequest.statusCode).to.eq(400);
        
        cy.request({
          method: registerRequest.method,
          url: registerRequest.url,
          body: registerRequest.requestBody,
          failOnStatusCode: false,
        }).then((res) => {
          cy.log("Response Body:", JSON.stringify(res.body, null, 2));
        });
      });
    }
  });

});
  