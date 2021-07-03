<template>
    <div id="login">
        <el-card class="box-card"  shadow="hover">
            <h2>欢迎来到IB系统</h2>
            <el-input v-model="loginForm.loginName" placeholder="请输入账号" type="text"></el-input>
            <el-input v-model="loginForm.psw" placeholder="请输入密码" type="password"></el-input>
            <div class="btn">
                <el-button type="primary" @click="login()">登陆</el-button>
                <el-button type="info" @click="reset()">重置</el-button>
            </div>
        </el-card>

    </div>
</template>
<script>
export default {
    data(){
        return {
            loginForm:{
                loginName:'',
                psw:''
            },
            msg:''
        }
    },
    methods:{
        login(){
            console.log("login")
            this.$http.post('http://127.0.0.1:8000/login',this.loginForm).then(res=>{
                console.log(res);
                if(res.status == 204){
                    this.$message.error('账号不存在');
                }else if(res.status == 205){
                    this.$message.error('密码错误');
                }else if(res.status == 200){
                    window.sessionStorage.setItem("token",res.data[0].role)
                    window.sessionStorage.setItem("name",res.data[0].loginName)
                    window.sessionStorage.setItem("code",res.data[0].code)
                    this.$message({
                    message: '恭喜你，登陆成功',
                    type: 'success'
                    });
                    if(res.data[0].role == 2 || res.data[0].role == 3){
                        this.$router.push('/station')
                    }else{
                        this.$router.push('/home')
                    }
                    
                }
            })
        },
        reset(){
            this.loginForm.loginName = '';
            this.loginForm.psw = '';
        }
    }
}
</script>
<style scoped>
#login{
    background-color: rgba(78, 214, 255, 0.5);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 480px;
    height: 300px;
    
}
.el-input{
    margin-top: 15px;
}
.btn{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    float: right;
}
.el-button{
    font-size: 18px;
    font-weight: bold;
}
</style>