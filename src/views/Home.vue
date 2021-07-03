<template>
  <div>
    <el-container style="height:100%；margin-top:0;">
        <el-header>IB——智慧公交管理系统
          <div class="imgInfo">
              
              <el-popover
                placement="top"
                width="150px"
                v-model="visible">
                <p>
                  确定退出登录吗？
                </p>
                <div style="text-align: right; margin: 0">
                  <el-button type="primary" size="mini" @click="visible = false;log();">退出登录</el-button>
                  <el-button type="primary" size="mini" @click="visible = false;dialogFormVisible = true;">修改密码</el-button>
                </div>
              <span slot="reference" style="width:150px;margin-right:10px;font-size:14px;display:block">欢迎，{{loginName}}<img src="../assets/logo.png" alt=""></span> 
              
            </el-popover>
            
          </div>
          
        </el-header>
        <el-container>
        <el-aside width="200px"><el-menu
        router
        default-active="/sysuser"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/sysuser" v-if="auth == '1'">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户信息</span>
        </el-menu-item>
        <el-menu-item index="/sysuser" v-else disabled title="无权限">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户信息</span>
        </el-menu-item>
        <el-menu-item index="/bus"  v-if="auth == '1' || auth == '2'">
          <i class="el-icon-truck"></i>
          <span slot="title">车辆信息</span>
        </el-menu-item>
        <el-menu-item index="/bus" v-else disabled title="无权限">
          <i class="el-icon-truck"></i>
          <span slot="title">车辆信息</span>
        </el-menu-item>
        <el-menu-item index="/station">
          <i class="el-icon-location-outline"></i>
          <span slot="title">站点信息</span>
        </el-menu-item>
        <el-menu-item index="/scheduling">
          <i class="el-icon-timer"></i>
          <span slot="title">排班信息</span>
        </el-menu-item>
        <el-menu-item index="/line" v-if="auth == '1' || auth == '2'">
          <i class="el-icon-odometer"></i>
          <span slot="title">线路信息</span>
        </el-menu-item>
        <el-menu-item index="/line" v-else disabled title="无权限">
          <i class="el-icon-odometer"></i>
          <span slot="title">线路信息</span>
        </el-menu-item>
        <el-menu-item index="/role" v-if="auth == '1'">
          <i class="el-icon-user"></i>
          <span slot="title">角色信息</span>
        </el-menu-item>
        <el-menu-item index="/role" v-else disabled title="无权限">
          <i class="el-icon-user"></i>
          <span slot="title">角色信息</span>
        </el-menu-item>
        <el-menu-item index="/permission" v-if="auth == '1'">
          <i class="el-icon-s-tools"></i>
          <span slot="title">权限信息</span>
        </el-menu-item>
        <el-menu-item index="/permission" v-else disabled title="无权限">
          <i class="el-icon-s-tools"></i>
          <span slot="title">权限信息</span>
        </el-menu-item>
        </el-menu></el-aside>
          <el-main>
            <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
              <el-form :model="updateForm">
                <el-form-item label="新密码" :label-width="formLabelWidth">
                  <el-input type="password" v-model="updateForm.psw" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePSW();">确 定</el-button>
              </div>
            </el-dialog>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      visible:false,
      auth:'',
      loginName:'',
      updateForm:{
        code:'',
        psw:''
      },
      dialogFormVisible:false,
      formLabelWidth:"120px"
    }
  },
  mounted(){
    this.auth = window.sessionStorage.getItem("token");
    this.loginName = window.sessionStorage.getItem("name");
    this.updateForm.code = window.sessionStorage.getItem("code");
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      log(){
        window.sessionStorage.removeItem("token")
        this.$router.push('/login')
      },
      updatePSW(){
        this.dialogFormVisible = false;
        this.$http.post('http://127.0.0.1:8000/updatePSW',this.updateForm).then(res=>{
          console.log(res);
          this.$message({
            message: '恭喜你，修改成功，2s后将重新登陆',
            type: 'success'
          });
          setTimeout(() => {
            window.sessionStorage.removeItem("token")
            this.$router.push('/login')
          }, 2000);
        })
      }
    }
}
</script>
<style scoped>
.el-header{
    background-color: #545c64;
    color: rgb(255, 255, 255);
    text-shadow: 3px 2px 3px rgb(202, 202, 202);
    text-align: center;
    line-height: 60px;
    box-shadow: 0 -1px 3px #545c64,
                -1px 0px 3px #545c64,
                1px 1px 3px #545c64;
    /* margin-bottom: 5px; */
    font-size: 30px;
    font-weight: bolder;
    margin: 5px 5px;
  }
.imgInfo{
    width:30px;
    height:30px; 
    float:right;
    margin-right:120px;
    margin-top:10px;
  }
.imgInfo img{
  width:30px;
  height:30px; 
  cursor: pointer;
}
.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 600px;
    margin-left: 5px;
  }
  .el-main{
    overflow: hidden;
  }
</style>
