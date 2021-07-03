<template>
    <div id="user">
        <h1>用户信息<el-button type="primary" icon="el-icon-edit" 
        circle size="small" style="margin-left:10px;" title="添加用户"
        @click="showUser = true"></el-button></h1>
            <el-dialog title="用户信息" :visible.sync="showUser">
                <el-form :model="userForm1">
                    <el-form-item label="编码" :label-width="formLabelWidth">
                        <el-input v-model="userForm1.code" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录名" :label-width="formLabelWidth">
                        <el-input v-model="userForm1.loginName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input v-model="userForm1.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户身份" :label-width="formLabelWidth">
                        <el-input v-model="userForm1.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" :label-width="formLabelWidth">
                        <el-input v-model="userForm1.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="formLabelWidth">
                        <el-input v-model="userForm1.id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限码" :label-width="formLabelWidth">
                        <el-input v-model="userForm1.role" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth">
                        <el-input v-model="userForm1.status" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="驾龄" :label-width="formLabelWidth">
                        <el-input v-model="userForm1.dage" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showUser = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        <div class="body">
            <el-table
            :data="userList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="code"
            label="id"
            width="180">
            </el-table-column>
            <el-table-column
            prop="loginName"
            label="登录名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="phone"
            width="180"
            label="联系方式">
            </el-table-column>
            <el-table-column
            prop="name"
            width="180"
            label="用户身份">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button @click="updateIndex(scope.$index)" type="success" size="small">修改</el-button>
                <el-dialog title="学生信息" :visible.sync="userUpdateShow" :modal="false">
                    <el-form :model="userForm2">
                        <el-form-item label="id" :label-width="formLabelWidth">
                        <el-input v-model="userForm2.code" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="登录名" :label-width="formLabelWidth">
                        <el-input v-model="userForm2.loginName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="用户身份" :label-width="formLabelWidth">
                        <el-input v-model="userForm2.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" :label-width="formLabelWidth">
                        <el-input v-model="userForm2.phone" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="userUpdateShow = false">取 消</el-button>
                        <el-button type="primary" @click="update(updateindex)">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button @click="delIndex(scope.$index)" 
                type="danger" size="small" style="margin-left:5px;">删除</el-button>
                <el-dialog
                        title="提示"
                        :visible.sync="userDelShow"
                        width="30%"
                        :modal="false"
                        :before-close="handleClose">
                        <span>您确定要删除吗？该操作将永久删除该条数据！</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="userDelShow = false">取 消</el-button>
                            <el-button type="primary" @click="deleteByName(delindex)">确 定</el-button>
                        </span>
                </el-dialog>
            </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            userList:[],//用户信息表
            showUser:false,//控制添加项的展示与隐藏
            userDelShow:false,//控制用户删除界面展开与隐藏
            userUpdateShow:false,//控制用户修改界面展开与隐藏
            delindex:'',//删除的数据处于第几行
            updateindex:'',//修改的数据处于第几行
            userForm1:{
                code:'',
                loginName:'',
                password:'',
                name:'',//用户身份
                phone:'',
                id:'',
                role:'',
                status:'',
                dage:'',
                db:'sysuser'
            },//添加的用户信息表内容
            userForm2:{
                code:'',
                loginName:'',
                phone:'',
                name:'',
                mark:'',
                db:'sysuser'
            },
            formLabelWidth: '120px',
        }
    },
    mounted(){
        this.$http.get('http://127.0.0.1:8000/getAll-server',{
            params:{
                db:"sysuser"
            }
        }).then(res=>{
                console.log(res);
                this.userList = res.data;
            }
        )
    },
    methods:{
        delIndex(index){
            this.userDelShow = true;
            this.delindex = index;
            console.log(this.delindex)
        },
        updateIndex(index){
            this.userUpdateShow = true;
            this.updateindex = index;
            this.userForm2.code=this.userList[index].code,
            this.userForm2.mark=this.userList[index].code,
            this.userForm2.loginName=this.userList[index].loginName,
            this.userForm2.phone=this.userList[index].phone,
            this.userForm2.name=this.userList[index].name
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        add(){
            console.log(this.userForm1);
            this.$http.post('http://127.0.0.1:8000/add',this.userForm1).then(res=>{
                this.userList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.userList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            },error=>{
                console.log(error);
            });
            this.showUser = false;
        },
        deleteByName(index){
            this.$http.get("http://127.0.0.1:8000/deleteI",{
                params:{
                    code:this.userList[index].code,
                    db:"sysuser"
                }
            }).then(res => {
                this.userList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.userList.splice(i, 1, res.data[i]);
                }
                console.log(res.data)
            });
            this.userDelShow = false;
        },
        update(index){
            console.log(this.userForm2);
            this.$http.post("http://127.0.0.1:8000/update",this.userForm2).then(res => {
                this.userList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.userList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            });
            this.userUpdateShow = false;
        }
    }
}
</script>
<style scoped>
#user{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>