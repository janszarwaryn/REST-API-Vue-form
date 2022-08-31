<template>
    <div>
        <div class="mb-4 text-center" v-if="successData">
            <div class="alert alert-success">
                {{errorMsg}}
            </div>
            <button class="btn btn-send btn-lg" type="button" @click="successData = false">
                Send message again
            </button>
        </div>
        <form v-if="!successData">
            <div class="row">
                <div class="form-group col-md-6 mb-4">
                    <label>Name</label>
                    <input type="text" data-testId ="name" placeholder="type your name"  v-model="name" class="form-control">
                </div>
                <div class="form-group col-md-6 mb-4">
                    <label>Email</label>
                    <input type="text" data-testId ="email" placeholder="type your email" v-model="email" class="form-control">
                </div>
                <div class="form-group col-12 mb-4">
                    <label>Subject</label>
                    <input type="text" data-testId ="subject" placeholder="subject" v-model="subject" class="form-control">
                </div>
                <div class="form-group col-12 mb-4">
                    <label>Message</label>
                    <textarea cols="5" data-testId ="message" rows="3" class="form-control" v-model="message" placeholder="message"></textarea>
                </div>
                <div class="mb-4" v-if="error">
                    <div class="alert alert-danger">
                        {{errorMsg}}
                    </div>
                </div>
                
                <div class="col-12">
                    <div class="text-right">
                        <button :disabled="loading"  class="btn btn-send btn-lg " id="sendButton" type="button" @click="sendMessage()">
                            <span v-if="loading">
                                <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                                ></span>
                                Sending...
                            </span>
                            
                            <span v-if="loading == false"> Send Message </span>
                        </button>
                    </div>
                </div>
            </div> 
        </form>
        
    </div>
</template>

<style scoped>
    .text-right{
        text-align: right;
    }
    .input, input:hover, input:focus, textarea, textarea:hover, textarea:focus{
        outline: none;
        border: 1px solid #575757;
        box-shadow: none;
    }
    ::placeholder,::-webkit-input-placeholder{
        color: #ccc;
    }
    .btn-send, .btn-send:hover{
        background-color: #737373;
        color: #fff;

    }
</style>

<script>
import axios from "axios";
export default {
    name :'Form',
    data(){
        return{
            name : '',
            email : '',
            subject : '',
            message : '',
            loading :false,
            errorMsg : '',
            error:false,
            successData:false
        }
    },
    methods: {
        validEmail: function (email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        sendMessage(){
            this.successData = false
            this.loading = true;
            if(this.name == ""){
                this.error = true;
                this.errorMsg = "Name is required"
                this.loading = false;
            }else if(this.name.length < 5 || this.name.length > 50){
                this.error = true;
                this.errorMsg = "Name must be up to 5 and low then 50"
                this.loading = false;
            }else if(this.email == ""){
                this.error = true;
                this.errorMsg = "Email is required"
                this.loading = false;
            }else if(!this.validEmail(this.email)){
                this.error = true;
                this.errorMsg = "Invalid email format (format: name@domain.pl)"
                this.loading = false;
            }else if(this.subject.length > 100){
                this.error = true;
                this.errorMsg = "Subject must be 100 characters or lower"
                this.loading = false;
            }else if(this.message == ""){
                this.error = true;
                this.errorMsg = "Message is required"
                this.loading = false;
            }else if(this.message.length > 500){
                this.error = true;
                this.errorMsg = "Message must be 500 characters or lower"
                this.loading = false;
            }else{
                const config = {
                    headers: {
                    "Content-Type": "application/json",
                    },
                };
                let data = {
                    "name" : this.name,
                    "email" : this.email,
                    "subject": this.subject,
                    "messag" : this.message,

                }

                axios
                .post("https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message", data, config)
                .then((response) => {
                    console.log(response)   
                    this.error = false;
                    this.successData = true
                    this.errorMsg =  "Successfully sent"
                    this.loading = false;
                    this.subject = ''
                    this.message = '' 
                })
                .catch(() => {
                    this.error = true;
                    this.errorMsg =  "Error"
                    this.loading = false;
                });
            }
        }
    },
    mounted() {
        this.successData = false;
        this.errorMsg = '';
    },
}
</script>

