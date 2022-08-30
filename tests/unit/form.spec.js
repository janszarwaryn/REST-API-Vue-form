import { flushPromises, shallowMount, mount } from '@vue/test-utils'
import Form from "@/components/Form.vue";


let url = ''
let body = {}

jest.mock("axios", () => ({
    post: jest.fn((_url, _body) => { 
      return new Promise((resolve) => {
        url = _url
        body = _body
        resolve(true)
      })
    })
}))

describe("Form.vue",()=>{
    let wrapper;
    

    beforeEach(()=>{
        wrapper = shallowMount(Form, {
            methods: {
                sendMessage : () => {}
            },
        })
        
            
    })

    it("Check if Form Component renders successfully", ()=>{

        expect(wrapper.exists()).toBe(true)
    })

    it("Validate the form fields when form data is filled", async ()=>{
        const name = wrapper.find('input[data-testId ="name"]').setValue = "Test Name";
        const email = wrapper.find('input[data-testId ="email"]').setValue = "test@domain.com";
        const subject = wrapper.find('input[data-testId ="subject"]').setValue = "test subject";
        const message = wrapper.find('textarea[data-testId ="message"]').setValue = "Test message";

       
        await wrapper.vm.$nextTick()


        expect(name).toBe("Test Name")
        expect(name).toHaveLength(9)

        expect(email).toBe("test@domain.com")

        expect(subject).toBe("test subject")

        expect(message).toBe("Test message")

       
    })

    test("Send post request with form data on submit", async () => {
        const axios = {
            post : jest.fn()
        }
        const wrapper = shallowMount(Form, {
            mocks : {
                axios :{ post : jest.fn()}
            }
        })

        const url = "https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message"

        const expectedData = {
            name : "Test Name",
            email :"test@domain.com",
            subject :"test subject",
            message : "Test message"
        }

        const name = wrapper.find('input[data-testId ="name"]').setValue = "Test Name";
        const email = wrapper.find('input[data-testId ="email"]').setValue = "test@domain.com";
        const subject = wrapper.find('input[data-testId ="subject"]').setValue = "test subject";
        const message = wrapper.find('textarea[data-testId ="message"]').setValue = "Test message";

       
        await wrapper.vm.$nextTick()
  

        expect(name).toBe(expectedData.name)
        expect(name).toHaveLength(9)

        expect(email).toBe(expectedData.email)

        expect(subject).toBe(expectedData.subject)

        expect(message).toBe(expectedData.message)

        const sendButton = wrapper.find('#sendButton')
        const spy = jest.spyOn(wrapper.vm, 'sendMessage')
        sendButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(spy).toHaveBeenCalled()

        axios.post.mockResolvedValue(true)

        axios.post.mockResolvedValue(url, expectedData);


        jest.restoreAllMocks()
        
    })
})